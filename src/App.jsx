import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import StartScreen from './StartScreen';
import './App.css';

// Yeni Header Şəkillərinin importu
import bannerImg from './assets/banner.png';
import badgeImg from './assets/badge.png';
import coffeeImg from './assets/coffee.png';
import ccImg from './assets/cc.png';

// Şübhəli Şəkillərinin importu
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
    
    setEnergy(prev => prev - 1);
    if (energy === 10) setLastEnergyUpdate(Date.now());
  
    const chance = Math.random(); // 0 ilə 1 arası rəqəm
  
    if (chance > 0.4) { // 60% ehtimalla ipucu tapılır
      const randomClue = killer.clues[Math.floor(Math.random() * killer.clues.length)];
      const upperClue = randomClue.toUpperCase();
      setClueMessage(`🔎 YENİ İPUCU: ${upperClue}`);
      if (!clueLog.includes(upperClue)) setClueLog(prev => [upperClue, ...prev]);
      setBalance(prev => prev + 15); // İpucu tapanda daha çox pul
    } else {
      setClueMessage("🚫 Try Again...");
      setBalance(prev => prev + 5); // Boş çıxanda az pul
    }
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

  if (!username) {
    return <StartScreen onStartGame={(name) => setUsername(name)} />;
  }

  return (
    <div className="dashboard-container detective-hub">
      
      {/* SƏNİN YENİ VİZUAL HEADER-in */}
      <header className="detective-header" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="header-overlay">
          <div className="profile-group">
            <div className="badge-wrapper">
              <img src={badgeImg} alt="Badge" className="badge-img" />
            </div>
            <div className="text-group">
              <span className="rank">DET.</span>
              <h1 className="name">{username.toUpperCase()}</h1>
            </div>
          </div>

          <div className="stats-group">
            <div className="stat-item">
              <div className="icon-frame">
                <img src={coffeeImg} alt="Energy" className="stat-icon" />
              </div>
              <div className="progress-info">
                <div className="bar-bg">
                  <div className="bar-fill energy-fill" style={{ width: `${(energy / 10) * 100}%` }}></div>
                </div>
                <span className="stat-value">
                  {energy}/10 
                  {energy < 10 && (
                    <span style={{marginLeft: '5px', fontSize: '11px', color: '#ccc', fontWeight: 'normal'}}>
                      ({Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')})
                    </span>
                  )}
                </span>
              </div>
            </div>

            <div className="stat-item">
              <div className="icon-frame">
                <img src={ccImg} alt="Currency" className="stat-icon" />
              </div>
              <span className="stat-value gold-text">{balance} CC</span>
            </div>
          </div>
        </div>
      </header>

      <main className="game-content hub-main">
        {/* TAB 1: CASE */}
        {activeTab === 'case' && (
          <div className="case-tab">
            <div className="clue-display"><p>{clueMessage}</p></div>
            
            {clueLog.length > 0 && !isGameOver && (
              <div style={{background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '5px', marginBottom: '15px', borderLeft: '3px solid #8b0000'}}>
                <small style={{color: '#888'}}>EVIDENCE FILE:</small>
                {clueLog.map((log, i) => <div key={i} style={{color: '#ddd', fontSize: '0.8rem', marginTop: '5px'}}>- {log}</div>)}
              </div>
            )}

            {/* SƏNİN YENİ ŞÜBHƏLİ DİZAYNIN (hub-suspect) */}
            <div className="suspects-grid hub-grid">
              {suspectsData.map(s => (
                <div key={s.id} className="hub-suspect suspect-card" style={{opacity: isGameOver ? 0.4 : 1}} onClick={() => !isGameOver && setSelectedSuspect(s)}>
                  <div className="hub-silhouette">
                    <img src={s.image} alt={s.name} className="suspect-img" style={{height: '100%'}} />
                  </div>
                  <div className="suspect-info">
                     <span className="hub-suspect-tag">{s.title}</span>
                     <h4>{s.name.toUpperCase()}</h4>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="action-buttons hub-actions">
              {!isGameOver ? (
                energy > 0 ? (
                  <button className="hub-btn hub-btn-primary search-btn" onClick={handleSearch}>
                     🔍 SEARCH
                     <span className="hub-btn-meta">-1 ENERGY</span>
                  </button>
                ) : (
                  <button className="hub-btn hub-btn-secondary" disabled>WAIT FOR ENERGY</button>
                )
              ) : (
                <button className="hub-btn hub-btn-primary" onClick={initGame}>🔄 NEW CASE</button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: SHOP */}
        {activeTab === 'shop' && (
          <div className="shop-tab">
            <h3 style={{textShadow: '1px 1px 2px #000'}}>DETECTIVE SHOP</h3>
            <div style={{background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #333'}}>
              <div>
                <strong>⚡ FULL ENERGY</strong>
                <p style={{fontSize: '0.8rem', color: '#aaa', margin: '5px 0 0 0'}}>Refill 10 energy.</p>
              </div>
              <button onClick={() => { if(balance >= 200) { setBalance(b => b - 200); setEnergy(10); } else { alert("Not enough CC!"); } }} style={{background: '#ffd700', border: 'none', padding: '10px', borderRadius: '5px', fontWeight: 'bold'}}>200 CC</button>
            </div>
          </div>
        )}

        {/* TAB 3: RANK */}
        {activeTab === 'rank' && (
          <div className="rank-tab">
             <h3 style={{textShadow: '1px 1px 2px #000'}}>TOP DETECTIVES</h3>
             {[1,2,3,4,5].map(i => (
                <div key={i} style={{background: i===1 ? 'rgba(255,215,0,0.2)' : 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '8px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', border: i===1 ? '1px solid #ffd700' : '1px solid #333'}}>
                  <span style={{color: i===1 ? '#ffd700' : '#fff'}}>{i}. {i === 1 ? username.toUpperCase() : `AGENT_${i*912}`}</span>
                  <span style={{color: '#00ccff'}}>LVL {6-i}</span>
                </div>
             ))}
          </div>
        )}
        
        {/* TAB 4: WALLET */}
        {activeTab === 'wallet' && (
          <div className="wallet-tab">
             <h3 style={{textShadow: '1px 1px 2px #000'}}>YOUR PROFILE</h3>
             <div style={{background: 'rgba(0,0,0,0.6)', padding: '20px', borderRadius: '8px', textAlign: 'center', border: '1px solid #ffd700'}}>
                <div style={{color: '#aaa', fontSize: '0.8rem'}}>TOTAL BALANCE</div>
                <div style={{fontSize: '2.5rem', color: '#ffd700', fontWeight: 'bold', margin: '10px 0'}}>{balance} CC</div>
                <div style={{color: '#00ccff', display: 'flex', justifyContent: 'space-around'}}>
                  <span>LVL: {level}</span>
                  <span>XP: {xp}/{XP_PER_LEVEL}</span>
                </div>
             </div>
             <button className="hub-btn hub-btn-secondary" onClick={handleLogout} style={{width: '100%', marginTop: '20px', color: '#ff4444', borderColor: '#ff4444'}}><LogOut size={16}/> LOGOUT</button>
          </div>
        )}
      </main>

      {/* SƏNİN YENİ AŞAĞI MENYUN (İkonlarla) */}
      <nav className="bottom-navbar">
        <button className={activeTab === 'case' ? 'active' : ''} onClick={() => setActiveTab('case')}>
          <img src={caseIcon} alt="Case" />
        </button>
        <button className={activeTab === 'shop' ? 'active' : ''} onClick={() => setActiveTab('shop')}>
          <img src={shopIcon} alt="Shop" />
        </button>
        <button className={activeTab === 'rank' ? 'active' : ''} onClick={() => setActiveTab('rank')}>
          <img src={rankIcon} alt="Rank" />
        </button>
        <button className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}>
          <img src={walletIcon} alt="Wallet" />
        </button>
      </nav>

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