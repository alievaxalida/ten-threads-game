import React, { useState, useEffect } from 'react';
import { Briefcase, ShoppingBag, Trophy, Wallet, Zap, LogOut } from 'lucide-react';
import StartScreen from './StartScreen';

// Şəkillərin importu (Sənin mövcud importların)
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

const suspectsData = [
  { id: 1, name: "Sara", title: "The Influencer", image: saraImg, motive: "The victim was about to expose her fake lifestyle and bought followers to the press.", clues: ["A faint scent of expensive French perfume.", "A loose silk thread from a designer scarf.", "A ring light was found near the body."] },
  { id: 2, name: "Alex", title: "The Hacker", image: alexImg, motive: "The victim blackmailed him after discovering his secret database of stolen crypto.", clues: ["A customized USB drive was left behind.", "The security logs show a remote bypass.", "A high-tech biometric lens was found."] },
  { id: 3, name: "Dr. Miller", title: "The Surgeon", image: millerImg, motive: "The victim was a witness to a failed surgery that Miller tried to cover up.", clues: ["A drop of surgical antiseptic on the floor.", "The cut is too precise for an amateur.", "A specialized medical scalpel is missing."] },
  { id: 4, name: "Robert", title: "The Banker", image: robertImg, motive: "The victim discovered Robert's multi-million dollar money laundering scheme.", clues: ["A smudge of rare, expensive fountain pen ink.", "A receipt for a million-dollar transaction.", "Smell of 'fresh cash' lingers in the air."] },
  { id: 5, name: "Elena", title: "The Maid", image: elenaImg, motive: "She overheard the victim planning to fire her and leave her homeless.", clues: ["A master key was left in the lock.", "Traces of industrial cleaning bleach.", "A hidden camera lens from a mirror."] },
  { id: 6, name: "Leo", title: "The Student", image: leoImg, motive: "The victim stole Leo's grandfather's ancient medical research to sell it.", clues: ["An old library card from the 19th century.", "Traces of ancient dust and old paper.", "A vintage medical textbook was left behind."] },
  { id: 7, name: "Kate", title: "The Journalist", image: kateImg, motive: "The victim was her secret source who suddenly decided to sell the story to a rival.", clues: ["A tiny microphone pin under the table.", "A press badge was found in the shadows.", "Recording device caught a muffled whisper."] },
  { id: 8, name: "Mark", title: "The Actor", image: markImg, motive: "The victim was a critic who ended Mark's career with a single brutal review.", clues: ["Traces of theatrical makeup on the victim.", "A costume button from a famous play.", "The witness heard a perfectly faked accent."] },
  { id: 10, name: "Sam", title: "The Driver", image: samImg, motive: "The victim refused to pay for Sam's daughter's medical bills after a car accident.", clues: ["A pair of black leather driving gloves.", "Tire tracks lead to the back entrance.", "The smell of premium gasoline on the carpet."] },
  { id: 9, name: "General", title: "The Veteran", image: generalImg, motive: "The victim was going to declassify documents that would ruin the General's reputation.", clues: ["A military-grade signal jammer was used.", "Boot prints consistent with army issue.", "A medal ribbon was found near the door."] },
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
  const [isWatchingAd, setIsWatchingAd] = useState(false);

  const REFILL_TIME = 5 * 60 * 1000; 
  const XP_PER_LEVEL = 300;

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

  const handleWatchAd = () => {
    setIsWatchingAd(true);
    setTimeout(() => {
      setEnergy(prev => Math.min(10, prev + 1)); 
      setClueMessage("⚡ +1 ENERGY RESTORED!");
      setIsWatchingAd(false);
    }, 3000);
  };

  if (!username) {
    return <StartScreen onStartGame={(name) => setUsername(name)} />;
  }

  // --- RENDER CONTENT (DASHBOARD LOGIC) ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'case':
        return (
          <div className="case-tab">
            <div className="clue-display">
              <p>{clueMessage}</p>
            </div>

            {clueLog.length > 0 && !isGameOver && (
              <div className="evidence-log">
                <small>EVIDENCE FILE:</small>
                {clueLog.map((log, i) => <div key={i} className="log-item">{log}</div>)}
              </div>
            )}

            <div className="suspects-grid">
              {suspectsData.map(s => (
                <div key={s.id} className={`suspect-card ${isGameOver ? 'disabled' : ''}`} onClick={() => !isGameOver && setSelectedSuspect(s)}>
                  <img src={s.image} alt={s.name} />
                  <div className="suspect-info">
                    <h4>{s.name.toUpperCase()}</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="action-buttons">
              {!isGameOver ? (
                energy > 0 ? (
                  <button className="search-btn" onClick={handleSearch}>🔍 SEARCH EVIDENCE (-1⚡)</button>
                ) : (
                  <div className="out-of-energy">
                    <button disabled className="disabled-btn">WAIT: {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')}</button>
                    <button className="ad-btn" onClick={handleWatchAd}>📺 WATCH AD (+1⚡)</button>
                  </div>
                )
              ) : (
                <button className="new-case-btn" onClick={initGame}>🔄 NEW CASE</button>
              )}
            </div>
          </div>
        );
      case 'shop':
        return (
          <div className="shop-tab">
            <h3>DETECTIVE SHOP</h3>
            <div className="shop-item">
              <div>
                <strong>⚡ FULL ENERGY</strong>
                <p>Instantly refill 10 energy.</p>
              </div>
              <button onClick={() => {
                if(balance >= 200) { setBalance(b => b - 200); setEnergy(10); } else { alert("Not enough CC!"); }
              }}>200 CC</button>
            </div>
          </div>
        );
      case 'rank':
        return (
          <div className="rank-tab">
            <h3>TOP DETECTIVES</h3>
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`rank-item ${i===1 ? 'gold' : ''}`}>
                <span>{i}. {i === 1 ? username.toUpperCase() : `AGENT_${i*912}`}</span>
                <span className="lvl">LVL {6-i}</span>
              </div>
            ))}
          </div>
        );
      case 'wallet':
        return (
          <div className="wallet-tab">
            <h3>YOUR PROFILE</h3>
            <div className="profile-card">
              <span className="label">TOTAL BALANCE</span>
              <div className="big-money">{balance} CC</div>
              <div className="profile-stats">
                <span>LVL: {level}</span>
                <span>XP: {xp}/{XP_PER_LEVEL}</span>
              </div>
              <div className="xp-bar-bg"><div className="xp-bar-fill" style={{width: `${(xp/XP_PER_LEVEL)*100}%`}}></div></div>
            </div>
            <button className="logout-btn" onClick={handleLogout}><LogOut size={16}/> LOGOUT SYSTEM</button>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="game-header">
        <div className="det-header-info">
          <h2 className="det-title">DET. {username.toUpperCase()}</h2>
          <div className="energy-info">
            <Zap size={14} fill="#00ccff" /> {energy}/10 
            {energy < 10 && <span className="timer">({Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')})</span>}
          </div>
        </div>
        <div className="balance-badge">{balance} CC</div>
      </header>

      <main className="game-content">
        {renderTabContent()}
      </main>

      <nav className="bottom-navbar">
        <button className={activeTab === 'case' ? 'active' : ''} onClick={() => setActiveTab('case')}>
          <Briefcase size={22} />
          <span>Case</span>
        </button>
        <button className={activeTab === 'shop' ? 'active' : ''} onClick={() => setActiveTab('shop')}>
          <ShoppingBag size={22} />
          <span>Shop</span>
        </button>
        <button className={activeTab === 'rank' ? 'active' : ''} onClick={() => setActiveTab('rank')}>
          <Trophy size={22} />
          <span>Rank</span>
        </button>
        <button className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}>
          <Wallet size={22} />
          <span>Wallet</span>
        </button>
      </nav>

      {/* Ad Modal */}
      {isWatchingAd && (
        <div className="ad-overlay">
          <div className="ad-spinner"></div>
          <h2>PLAYING AD...</h2>
        </div>
      )}

      {/* Accuse Modal */}
      {selectedSuspect && (
        <div className="accuse-overlay">
          <div className="accuse-modal">
            <img src={selectedSuspect.image} alt={selectedSuspect.name} />
            <h2>{selectedSuspect.name.toUpperCase()}</h2>
            <p className="suspect-title">{selectedSuspect.title}</p>
            <div className="motive-box">
              <small>POSSIBLE MOTIVE:</small>
              <p>"{selectedSuspect.motive}"</p>
            </div>
            <div className="modal-actions">
              <button className="accuse-now-btn" onClick={() => handleAccuse(selectedSuspect.id)}>👉 ACCUSE</button>
              <button className="back-btn" onClick={() => setSelectedSuspect(null)}>GO BACK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;