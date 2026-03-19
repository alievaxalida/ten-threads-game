import React, { useState, useEffect } from 'react';
import { Briefcase, ShoppingBag, Trophy, Wallet, Zap, LogOut } from 'lucide-react';
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

const suspectsData = [
  { id: 1, name: "Sara", title: "The Influencer", image: saraImg, motive: "The victim was about to expose her fake lifestyle." },
  { id: 2, name: "Alex", title: "The Hacker", image: alexImg, motive: "The victim blackmailed him over stolen crypto." },
  { id: 3, name: "Dr. Miller", title: "The Surgeon", image: millerImg, motive: "The victim witnessed a failed surgery." },
  { id: 4, name: "Robert", title: "The Banker", image: robertImg, motive: "The victim discovered his money laundering." },
  { id: 5, name: "Elena", title: "The Maid", image: elenaImg, motive: "She overheard plans to fire her." },
  { id: 6, name: "Leo", title: "The Student", image: leoImg, motive: "The victim stole his grandfather's research." },
  { id: 7, name: "Kate", title: "The Journalist", image: kateImg, motive: "The victim sold her story to a rival." },
  { id: 8, name: "Mark", title: "The Actor", image: markImg, motive: "The victim ended his career with a review." },
  { id: 10, name: "Sam", title: "The Driver", image: samImg, motive: "The victim refused to pay medical bills." },
  { id: 9, name: "General", title: "The Veteran", image: generalImg, motive: "The victim was going to declassify documents." }
];

function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('username') || "");
  const [activeTab, setActiveTab] = useState('case'); 
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 0);
  const [energy, setEnergy] = useState(() => Number(localStorage.getItem('energy')) || 10);
  const [level, setLevel] = useState(() => Number(localStorage.getItem('level')) || 1);
  const [xp, setXp] = useState(() => Number(localStorage.getItem('xp')) || 0);
  const [killer, setKiller] = useState(null);
  const [clueMessage, setClueMessage] = useState("INVESTIGATION BEGINS...");
  const [isGameOver, setIsGameOver] = useState(false);
  const [selectedSuspect, setSelectedSuspect] = useState(null);

  useEffect(() => { if (username && !killer) initGame(); }, [username]);

  const initGame = () => {
    const randomSuspect = suspectsData[Math.floor(Math.random() * suspectsData.length)];
    setKiller(randomSuspect);
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
    setEnergy(prev => prev - 1);
    setClueMessage("FOUND A NEW CLUE!");
  };

  if (!username) {
    return <StartScreen onStartGame={(name) => setUsername(name)} />;
  }

  return (
    <div className="dashboard-container">
      <header className="game-header">
        <div className="det-header-info">
          <h2 className="det-title">DET. {username.toUpperCase()}</h2>
          <div className="energy-info">
            <Zap size={14} fill="#00ccff" /> {energy}/10 
          </div>
        </div>
        <div className="balance-badge">{balance} CC</div>
      </header>

      <main className="game-content">
        {activeTab === 'case' && (
          <div className="case-tab">
            <div className="clue-display"><p>{clueMessage}</p></div>
            <div className="suspects-grid">
              {suspectsData.map(s => (
                <div key={s.id} className="suspect-card" onClick={() => setSelectedSuspect(s)}>
                  <img src={s.image} alt={s.name} className="suspect-img" />
                  <div className="suspect-info"><h4>{s.name.toUpperCase()}</h4></div>
                </div>
              ))}
            </div>
            <div className="action-buttons">
              <button className="search-btn" onClick={handleSearch}>🔍 SEARCH EVIDENCE (-1⚡)</button>
            </div>
          </div>
        )}
        
        {activeTab === 'wallet' && (
          <div className="wallet-tab">
             <button className="logout-btn" onClick={handleLogout}><LogOut size={16}/> LOGOUT SYSTEM</button>
          </div>
        )}
      </main>

      <nav className="bottom-navbar">
        <button className={activeTab === 'case' ? 'active' : ''} onClick={() => setActiveTab('case')}>
          <Briefcase size={22} /><span>Case</span>
        </button>
        <button className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}>
          <Wallet size={22} /><span>Wallet</span>
        </button>
      </nav>
    </div>
  );
}

export default App;