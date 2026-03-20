import React, { useState } from 'react';
import { Briefcase, ShoppingBag, Gamepad2, Trophy, Wallet } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ detectiveName }) {
  const [activeTab, setActiveTab] = useState('case');

  // Şübhəlilərin Siyahısı (Məlumat Bazası)
  const suspects = [
    { id: 1, name: 'Sara', role: 'The Influencer', emoji: '📸' },
    { id: 2, name: 'Mark', role: 'The Actor', emoji: '🎭' },
    { id: 3, name: 'Elena', role: 'The Maid', emoji: '🧹' },
    { id: 4, name: 'Sam', role: 'The Driver', emoji: '🚗' },
    { id: 5, name: 'Kate', role: 'The Journalist', emoji: '📰' },
    { id: 6, name: 'Alex', role: 'The Hacker', emoji: '💻' },
    { id: 7, name: 'Robert', role: 'The Banker', emoji: '💼' },
    { id: 8, name: 'Dr. Miller', role: 'The Surgeon', emoji: '🩺' },
    { id: 9, name: 'Leo', role: 'The Student', emoji: '🎒' },
    { id: 10, name: 'The General', role: 'The Veteran', emoji: '🎖️' }
  ];
  // Menyuların məzmunu
  const renderContent = () => {
    switch (activeTab) {
      case 'case': 
        return (
          <div className="tab-content case-board">
            <h2>🕵️‍♂️ Suspects Dossier</h2>
            <p>10 Threads. 10 Lies. Find the contradictions.</p>
            
            <div className="suspects-grid">
              {suspects.map(suspect => (
                <div 
                  key={suspect.id} 
                  className="suspect-card" 
                  // Gələcəkdə bu kliklənəndə əsl dosye pəncərəsi (Modal) açılacaq
                  onClick={() => alert(`Opening file for: ${suspect.name}`)}
                >
                  <div className="suspect-emoji">{suspect.emoji}</div>
                  <div className="suspect-info">
                    <span className="suspect-name">{suspect.name}</span>
                    <span className="suspect-role">{suspect.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* ÜST HİSSƏ - Status Bar */}
      <div className="status-bar">
        {/* BURA DƏYİŞDİ: Bayaq App.css-ə yazdığımız o "player-name-display" class-ını bura əlavə etdik ki, uzun adlar ... ilə kəsilsin */}
        <span className="det-name player-name-display" title={detectiveName}>
          Det. {detectiveName}
        </span>
        
        <div className="det-stats">
          <span>⭐ Lvl 1</span>
          {/* İstəyə bağlı: Yuxarı paneldə də balansı göstərə bilərsən */}
          <span style={{ marginLeft: '10px' }}>🪙 0 CC</span> 
        </div>
      </div>

      {/* MƏRKƏZ - Hansı menyu seçilibsə o görünür */}
      <div className="main-display">
        {renderContent()}
      </div>

      {/* ALT HİSSƏ - Navigation Bar (Dəyişilməyib, əladır!) */}
      <nav className="bottom-nav">
        <button className={activeTab === 'case' ? 'active' : ''} onClick={() => setActiveTab('case')}>
          <Briefcase size={24} />
          <span>Case</span>
        </button>
        <button className={activeTab === 'shop' ? 'active' : ''} onClick={() => setActiveTab('shop')}>
          <ShoppingBag size={24} />
          <span>Shop</span>
        </button>
        <button className={activeTab === 'game' ? 'active' : ''} onClick={() => setActiveTab('game')}>
          <Gamepad2 size={24} />
          <span>Game</span>
        </button>
        <button className={activeTab === 'rank' ? 'active' : ''} onClick={() => setActiveTab('rank')}>
          <Trophy size={24} />
          <span>Rank</span>
        </button>
        <button className={activeTab === 'wallet' ? 'active' : ''} onClick={() => setActiveTab('wallet')}>
          <Wallet size={24} />
          <span>Wallet</span>
        </button>
      </nav>
    </div>
  );
}