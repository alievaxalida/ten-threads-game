import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import StartScreen from './StartScreen';
import './App.css';

// Şəkillərin importu
import saraImg from './assets/Sara (The Influencer).png';
import alexImg from './assets/Alex (The Hacker).png';
import millerImg from './assets/Dr. Miller (The Surgeon).png';
import robertImg from './assets/Robert (The Banker).png';
import elenaImg from './assets/Elena (The Maid).png';
import leoImg from './assets/Leo (The Student).png';
import kateImg from './assets/Kate (The Journalist).png';
import samImg from './assets/Sam (The Driver).png';
import markImg from './assets/Mark (The Actor).png'; 
import generalImg from './assets/The General (The Veteran).png';
// İkonların importu
import caseIcon from './assets/case.png';
import shopIcon from './assets/shop.png';
import rankIcon from './assets/rank.png';
import walletIcon from './assets/wallet.png';

const suspectsData = [
  { id: 1, name: "Sara", title: "The Influencer", image: saraImg, motive: "The victim was about to expose her fake lifestyle.", clues: ["A faint scent of expensive French perfume.", "A loose silk thread from a designer scarf.", "A ring light was found near the body."] },
  { id: 2, name: "Alex", title: "The Hacker", image: alexImg, motive: "The victim blackmailed him over stolen crypto.", clues: ["A customized USB drive was left behind.", "The security logs show a remote bypass.", "A high-tech biometric lens was found."] },
  { id: 3, name: "Dr. Miller", title: "The Surgeon", image: millerImg, motive: "The victim witnessed a failed surgery.", clues: ["A drop of surgical antiseptic on the floor.", "The cut is too precise for an amateur.", "A specialized medical scalpel is missing."] },
  { id: 4, name: "Robert", title: "The Banker", image: robertImg, motive: "The victim discovered his money laundering.", clues: ["A smudge of rare, expensive fountain pen ink.", "A receipt for a million-dollar transaction.", "Smell of 'fresh cash' lingers in the air."] },
  { id: 5, name: "Elena", title: "The Maid", image: elenaImg, motive: "She overheard plans to fire her.", clues: ["A master key was left in the lock.", "Traces of industrial cleaning bleach.", "A hidden camera lens from a mirror."] },
  { id: 6, name: "Leo", title: "The Student", image: leoImg, motive: "The victim stole his grandfather's research.", clues: ["An old library card from the 19th century.", "Traces of ancient dust and old paper.", "A vintage medical textbook was left behind."] },
  { id: 7, name: "Kate", title: "The Journalist", image: kateImg, motive: "The victim sold her story to a rival.", clues: ["A tiny microphone pin under the table.", "A press badge was found in the shadows.", "Recording device caught a muffled whisper."] },
  { id: 8, name: "Mark", title: "The Actor", image: markImg, motive: "The victim ended his career with a review.", clues: ["Traces of theatrical makeup on the victim.", "A costume button from a famous play.", "The witness heard a perfectly faked accent."] },
  { id: 10, name: "Sam", title: "The Driver", image: samImg, motive: "The victim refused to pay medical bills.", clues: ["A pair of black leather driving gloves.", "Tire tracks lead to the back entrance.", "The smell of premium gasoline on the carpet."] },
  { id: 9, name: "General", title: "The Veteran", image: generalImg, motive: "The victim was going to declassify documents.", clues: ["A military-grade signal jammer was used.", "Boot prints consistent with army issue.", "A medal ribbon was found near the door."] }
];

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('username') || "");
  const [activeTab, setActiveTab] = useState('case'); 
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 0);
  const [energy, setEnergy] = useState(() => Number(localStorage.getItem('energy')) || 10);
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level')) || 1);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('xp')) || 0);
  const [lastEnergyUpdate, setLastEnergyUpdate] = useState(() => Number(localStorage.getItem('lastEnergyUpdate')) || Date.now());
  const [timeLeft, setTimeLeft] = useState(0);
  const [killer, setKiller] = useState(() => JSON.parse(localStorage.getItem('currentKiller')) || null);
  const [clueLog, setClueLog] = useState(() => JSON.parse(localStorage.getItem('clueLog')) || []);
  const [clueMessage, setClueMessage] = useState(localStorage.getItem('clueMessage') || "INVESTIGATION BEGINS...");
  const [isGameOver, setIsGameOver] = useState(localStorage.getItem('isGameOver') === 'true');
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  const REFILL_TIME = 5 * 60 * 1000; 
  const XP_PER_LEVEL = 300;

  // Enerji dolma sistemi
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (energy < 10) {
        const diff = now - lastEnergyUpdate;
        if (diff >= REFILL_TIME) {
          const energyToAdd = Math.floor(diff / REFILL_TIME);
          setEnergy(prev => Math.min(10, prev + energyToAdd));
          setLastEnergyUpdate(now - (diff % REFILL_TIME));
        } else {
          setTimeLeft(Math.ceil((REFILL_TIME - diff) / 1000));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [energy, lastEnergyUpdate]);

  // Yaddaşda saxlama
  useEffect(() => {
    if(username) {
      localStorage.setItem('username', username);
      localStorage.setItem('balance', balance);
      localStorage.setItem('energy', energy);
      localStorage.setItem('level', level);
      localStorage.setItem('xp', xp);
      localStorage.setItem('lastEnergyUpdate', lastEnergyUpdate);
      localStorage.setItem('currentKiller', JSON.stringify(killer));
      localStorage.setItem('clueLog', JSON.stringify(clueLog));
      localStorage.setItem('clueMessage', clueMessage);
      localStorage.setItem('isGameOver', isGameOver);
    }
  }, [username, balance, energy, level, xp, lastEnergyUpdate, killer, clueLog, clueMessage, isGameOver]);

  useEffect(() => { if (username && !killer) initGame(); }, [username]);

  const initGame = () => {
    const randomSuspect = suspectsData[Math.floor(Math.random() * suspectsData.length)];
    setKiller(randomSuspect);
    setClueLog([]);
    setClueMessage("INVESTIGATION BEGINS...");
    setIsGameOver(false);
    setSelectedSuspect(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");
    window.location.reload();
  };

  const handleSearch = () => {
    if (isGameOver || energy <= 0) return;
    setBalance(prev => prev + 10);
    if (energy === 10) setLastEnergyUpdate(Date.now());
    setEnergy(prev => prev - 1);
    const randomClue = killer.clues[Math.floor(Math.random() * killer.clues.length)];
    const upperClue = randomClue.toUpperCase();
    setClueMessage(upperClue);
    if (!clueLog.includes(upperClue)) setClueLog(prev => [upperClue, ...prev]);
  };

  const handleAccuse = (id) => {
    if (id === killer.id) {
      setClueMessage(`🏆 SUCCESS! IT WAS ${killer.name.toUpperCase()}`);
      setBalance(prev => prev + 1000);
      let newXp = xp + 100;
      if (newXp >= XP_PER_LEVEL) { setLevel(prev => prev + 1); setXp(0); } else { setXp(newXp); }
    } else {
      setClueMessage(`❌ FAILED! IT WAS ${killer.name.toUpperCase()}`);
    }
    setIsGameOver(true);
    setSelectedSuspect(null);
  };

  const handleInvitePartner = async () => {
    const referralCode = username.trim().toUpperCase().replace(/\s+/g, '-');
    const text = `Join my Detective Hub. Referral: ${referralCode}`;
    try {
      await navigator.clipboard.writeText(text);
      alert('Referral copied to clipboard.');
    } catch {
      alert(text);
    }
  };

  if (!username) {
    return <StartScreen onStartGame={(name) => setUsername(name)} />;
  }

  return (
    <div className="dashboard-container detective-hub">
      <header className="hub-topbar">
        <div className="hub-topbar-left">
          <div className="hub-kicker">DAY</div>
          <div className="hub-day">1</div>
        </div>

        <div className="hub-topbar-center">
          <div className="hub-title">DETECTIVE HUB</div>
          <div className="hub-subtitle">{clueMessage}</div>
        </div>

        <div className="hub-topbar-right">
          <div className="hub-kicker">CLUECOIN</div>
          <div className="hub-balance">{balance}</div>
          <button className="hub-logout" onClick={handleLogout} aria-label="Logout">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="hub-main">
        <div className="hub-grid" role="grid" aria-label="Suspects">
          {suspectsData.slice(0, 9).map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className="hub-suspect"
              onClick={() => setSelectedSuspect(s)}
              aria-label={`Suspect ${idx + 1}`}
            >
              <div className="hub-silhouette" aria-hidden="true" />
              <div className="hub-suspect-tag">SUSPECT {idx + 1}</div>
            </button>
          ))}
        </div>
      </main>

      <footer className="hub-actions" aria-label="Actions">
        <button
          type="button"
          className="hub-btn hub-btn-primary"
          onClick={handleSearch}
          disabled={isGameOver || energy <= 0}
        >
          SEARCH FOR CLUES
          <span className="hub-btn-meta">
            -1 ⚡ • {energy}/10
          </span>
        </button>
        <button type="button" className="hub-btn hub-btn-secondary" onClick={handleInvitePartner}>
          INVITE PARTNER (REFERRAL)
        </button>
      </footer>

      {/* ŞÜBHƏLİNİ GÜNAHLANDIRMA MODALI */}
      {selectedSuspect && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
          <div style={{background: '#111', border: '2px solid #8b0000', borderRadius: '15px', padding: '20px', width: '100%', maxWidth: '320px', textAlign: 'center'}}>
            <img src={selectedSuspect.image} alt={selectedSuspect.name} style={{width: '150px', height: '150px', objectFit: 'cover', borderRadius: '10px', marginBottom: '10px'}} />
            <h2 style={{margin: '0 0 5px 0', color: '#fff'}}>{selectedSuspect.name.toUpperCase()}</h2>
            <p style={{color: '#ffd700', fontSize: '0.8rem', margin: '0 0 15px 0'}}>{selectedSuspect.title}</p>
            <div style={{background: '#000', padding: '10px', borderRadius: '5px', marginBottom: '20px'}}>
              <small style={{color: '#8b0000'}}>POSSIBLE MOTIVE:</small>
              <p style={{color: '#ccc', fontStyle: 'italic', margin: '5px 0 0 0'}}>"{selectedSuspect.motive}"</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <button onClick={() => handleAccuse(selectedSuspect.id)} style={{background: '#8b0000', color: '#fff', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: 'Special Elite'}}>👉 ACCUSE</button>
              <button onClick={() => setSelectedSuspect(null)} style={{background: 'none', color: '#888', border: '1px solid #444', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Special Elite'}}>GO BACK</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;