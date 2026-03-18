import React, { useState, useEffect } from 'react';
import StartScreen from './StartScreen';

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
  // 1. STATELƏR
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

  // 2. EFFEKTLƏR
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

  // 3. FUNKSİYALAR
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

  // 4. GİRİŞ EKRANI (YENİ QAPI)
  if (!username) {
    // Burada StartScreen komponentini çağırırıq və ad daxil ediləndə onu setUsername-ə ötürürük
    return <StartScreen onStartGame={(name) => setUsername(name)} />;
  }

  // 5. ƏSAS TƏTBİQ (APP) EKRANI
  return (
    <div style={{ 
      backgroundColor: '#000', 
      color: '#fff', 
      minHeight: '100vh', 
      width: '100%', 
      maxWidth: '450px', 
      margin: '0 auto', 
      padding: '0 16px 100px 16px', 
      position: 'relative', 
      boxSizing: 'border-box',
      fontFamily: 'monospace',
      textAlign: 'left'
    }}>
      
      <style>
        {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
      </style>

      {/* --- GLOBAL ÜST BAŞLIQ (HƏR TABDA GÖRÜNƏCƏK) --- */}
      <div style={{ paddingTop: '20px', paddingBottom: '15px', borderBottom: '1px solid #222', marginBottom: '20px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ margin: 0, color: '#8b0000', fontSize: '1.1rem' }}>DET. {username.toUpperCase()}</h2>
            <div style={{ color: '#00ccff', fontSize: '0.75rem', marginTop: '5px' }}>
              ⚡ ENERGY: {energy}/10 
              {energy < 10 && <span style={{ color: '#555', marginLeft: '5px' }}>({Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')})</span>}
            </div>
          </div>
          <div style={{ color: '#ffd700', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'right' }}>
            {balance} CC
          </div>
        </div>
      </div>

      {/* --- TAB 1: CASE (OYUN EKRANI) --- */}
      {activeTab === 'case' && (
        <div style={{ width: '100%' }}>
          <div style={{ minHeight: '70px', backgroundColor: '#111', borderRadius: '12px', borderLeft: '4px solid #8b0000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 15px', boxSizing: 'border-box', marginBottom: '20px', width: '100%' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#ddd', fontWeight: 'bold', textAlign: 'center' }}>
              {clueMessage}
            </p>
          </div>

          {clueLog.length > 0 && !isGameOver && (
            <div style={{ marginBottom: '20px', padding: '12px', backgroundColor: '#080808', borderRadius: '10px', border: '1px dashed #333', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ fontSize: '0.65rem', color: '#666', marginBottom: '8px' }}>FILE EVIDENCE:</div>
              {clueLog.map((log, index) => (
                <div key={index} style={{ fontSize: '0.7rem', color: '#aaa', marginBottom: '4px', borderLeft: '2px solid #444', paddingLeft: '8px' }}>{log}</div>
              ))}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingBottom: '30px', width: '100%' }}>
            {suspectsData.map(s => (
              <div key={s.id} onClick={() => !isGameOver && setSelectedSuspect(s)} style={{ backgroundColor: '#111', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222', opacity: isGameOver ? 0.3 : 1, cursor: 'pointer', width: '100%' }}>
                <div style={{ width: '100%', height: '145px', backgroundColor: '#0a0a0a' }}>
                  <img src={s.image} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                </div>
                <div style={{ padding: '10px', textAlign: 'center' }}>
                  <h4 style={{ margin: 0, fontSize: '0.8rem', color: '#fff' }}>{s.name.toUpperCase()}</h4>
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: 'fixed', bottom: '90px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '410px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!isGameOver ? (
              energy > 0 ? (
                <button onClick={handleSearch} style={{ width: '100%', padding: '18px', backgroundColor: '#8b0000', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', boxSizing: 'border-box' }}>
                  🔍 SEARCH EVIDENCE (-1⚡)
                </button>
              ) : (
                <>
                  <button disabled style={{ width: '100%', padding: '12px', backgroundColor: '#222', color: '#888', border: 'none', borderRadius: '15px', fontWeight: 'bold', boxSizing: 'border-box' }}>
                    WAIT FOR REFILL ({Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')})
                  </button>
                  <button onClick={handleWatchAd} style={{ width: '100%', padding: '16px', backgroundColor: '#00ccff', color: '#000', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,204,255,0.4)', boxSizing: 'border-box' }}>
                    📺 WATCH AD (+1 ⚡)
                  </button>
                </>
              )
            ) : (
              <button onClick={initGame} style={{ width: '100%', padding: '18px', backgroundColor: '#ffd700', color: '#000', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.5)', boxSizing: 'border-box' }}>
                🔄 NEW CASE
              </button>
            )}
          </div>
        </div>
      )}

      {/* --- TAB 2: SHOP --- */}
      {activeTab === 'shop' && (
        <div style={{ width: '100%' }}>
          <h3 style={{ color: '#fff', margin: '0 0 15px 0' }}>DETECTIVE SHOP</h3>
          <div style={{ backgroundColor: '#111', padding: '20px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #222', width: '100%', boxSizing: 'border-box' }}>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>⚡ FULL ENERGY</div>
              <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '5px' }}>Instantly refill 10 energy.</div>
            </div>
            <button onClick={() => {
              if(balance >= 200) { setBalance(b => b - 200); setEnergy(10); } else { alert("Not enough CC!"); }
            }} style={{ backgroundColor: '#ffd700', color: '#000', border: 'none', padding: '12px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>200 CC</button>
          </div>
        </div>
      )}

      {/* --- TAB 3: LEADERBOARD --- */}
      {activeTab === 'leaderboard' && (
        <div style={{ width: '100%' }}>
          <h3 style={{ color: '#fff', margin: '0 0 15px 0' }}>TOP DETECTIVES</h3>
          <div style={{ width: '100%' }}>
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: i === 1 ? '#222' : '#111', marginBottom: '8px', borderRadius: '8px', border: i===1 ? '1px solid #ffd700' : 'none', width: '100%', boxSizing: 'border-box' }}>
                <span style={{ fontWeight: i === 1 ? 'bold' : 'normal', color: i === 1 ? '#ffd700' : '#fff' }}>
                  {i}. {i === 1 ? username.toUpperCase() : `AGENT_${i*912}`}
                </span>
                <span style={{ color: '#00ccff' }}>LVL {6-i}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 4: WALLET & PROFILE --- */}
      {activeTab === 'wallet' && (
        <div style={{ width: '100%' }}>
          <h3 style={{ color: '#fff', margin: '0 0 15px 0', textAlign: 'left' }}>YOUR PROFILE</h3>
          <div style={{ padding: '40px 20px', backgroundColor: '#111', borderRadius: '20px', border: '1px solid #ffd700', width: '100%', boxSizing: 'border-box', textAlign: 'center' }}>
            <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '10px' }}>TOTAL BALANCE</div>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffd700' }}>{balance} CC</div>
            <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#00ccff', display: 'flex', justifyContent: 'center', gap: '15px' }}>
              <span>LEVEL: {level}</span>
              <span>|</span>
              <span>XP: {xp}/{XP_PER_LEVEL}</span>
            </div>
            <div style={{ width: '80%', height: '6px', backgroundColor: '#222', margin: '15px auto 0 auto', borderRadius: '3px' }}>
              <div style={{ width: `${(xp/XP_PER_LEVEL)*100}%`, height: '100%', backgroundColor: '#00ccff', borderRadius: '3px' }}></div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', marginTop: '40px', padding: '18px', background: '#1a0505', color: '#ff4444', border: '1px solid #ff4444', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxSizing: 'border-box' }}>LOGOUT SYSTEM</button>
        </div>
      )}

      {/* --- AŞAĞI MENYU (BOTTOM NAVIGATION) --- */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '450px', height: '70px', backgroundColor: '#0a0a0a', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderTop: '2px solid #222', zIndex: 1000, boxSizing: 'border-box' }}>
        <div onClick={() => setActiveTab('case')} style={{ textAlign: 'center', color: activeTab === 'case' ? '#ffd700' : '#555', cursor: 'pointer', flex: 1 }}>
          <div style={{ fontSize: '1.4rem', opacity: activeTab === 'case' ? 1 : 0.6 }}>🔍</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 'bold', marginTop: '3px' }}>CASE</div>
        </div>
        <div onClick={() => setActiveTab('shop')} style={{ textAlign: 'center', color: activeTab === 'shop' ? '#ffd700' : '#555', cursor: 'pointer', flex: 1 }}>
          <div style={{ fontSize: '1.4rem', opacity: activeTab === 'shop' ? 1 : 0.6 }}>🛒</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 'bold', marginTop: '3px' }}>SHOP</div>
        </div>
        <div onClick={() => setActiveTab('leaderboard')} style={{ textAlign: 'center', color: activeTab === 'leaderboard' ? '#ffd700' : '#555', cursor: 'pointer', flex: 1 }}>
          <div style={{ fontSize: '1.4rem', opacity: activeTab === 'leaderboard' ? 1 : 0.6 }}>🏆</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 'bold', marginTop: '3px' }}>RANK</div>
        </div>
        <div onClick={() => setActiveTab('wallet')} style={{ textAlign: 'center', color: activeTab === 'wallet' ? '#ffd700' : '#555', cursor: 'pointer', flex: 1 }}>
          <div style={{ fontSize: '1.4rem', opacity: activeTab === 'wallet' ? 1 : 0.6 }}>💰</div>
          <div style={{ fontSize: '0.65rem', fontWeight: 'bold', marginTop: '3px' }}>WALLET</div>
        </div>
      </div>

      {/* --- REKLAM MODALI --- */}
      {isWatchingAd && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 3000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📺</div>
          <h2 style={{ color: '#00ccff', letterSpacing: '2px', margin: 0 }}>PLAYING AD...</h2>
          <p style={{ color: '#888', marginTop: '10px', fontSize: '0.9rem' }}>Please wait to receive your reward.</p>
          <div style={{ width: '50px', height: '50px', border: '5px solid #222', borderTop: '5px solid #00ccff', borderRadius: '50%', marginTop: '40px', animation: 'spin 1s linear infinite' }}></div>
        </div>
      )}

      {/* --- ŞÜBHƏLİ MODALI (ACCUSE EKRANI) --- */}
      {selectedSuspect && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.98)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', boxSizing: 'border-box' }}>
          <div style={{ width: '220px', height: '220px', borderRadius: '15px', overflow: 'hidden', marginBottom: '15px', border: '2px solid #8b0000' }}>
            <img src={selectedSuspect.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h2 style={{ color: '#8b0000', margin: '0 0 5px 0' }}>{selectedSuspect.name.toUpperCase()}</h2>
          <p style={{ color: '#ffd700', fontSize: '0.7rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>{selectedSuspect.title}</p>
          
          <div style={{ backgroundColor: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #333', marginBottom: '25px', width: '100%', maxWidth: '300px', boxSizing: 'border-box' }}>
            <span style={{ color: '#8b0000', fontSize: '0.6rem', display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>POSSIBLE MOTIVE:</span>
            <p style={{ color: '#ccc', fontSize: '0.75rem', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>"{selectedSuspect.motive}"</p>
          </div>

          <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => handleAccuse(selectedSuspect.id)} style={{ padding: '16px', backgroundColor: '#8b0000', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxSizing: 'border-box' }}>👉 ACCUSE</button>
            <button onClick={() => setSelectedSuspect(null)} style={{ padding: '12px', background: 'none', border: '1px solid #444', color: '#888', borderRadius: '12px', cursor: 'pointer', boxSizing: 'border-box' }}>GO BACK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;