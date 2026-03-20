import React, { useState } from 'react';
import { Briefcase, ShoppingBag, Gamepad2, Trophy, Wallet } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ detectiveName }) {
  const [activeTab, setActiveTab] = useState('case');

  // Menyuların məzmunu
  const renderContent = () => {
    switch (activeTab) {
      case 'case': return <div className="tab-content">🕵️‍♂️ {detectiveName}, yeni bir cinayət işi var!</div>;
      case 'shop': return <div className="tab-content">🛒 Detektiv mağazası tezliklə açılacaq.</div>;
      case 'game': return <div className="tab-content">🎮 Mini oyunlar burada olacaq.</div>;
      case 'rank': return <div className="tab-content">🏆 Ən yaxşı detektivlər siyahısı.</div>;
      // BURA DƏYİŞDİ: P2E konsepsiyasına uyğun olaraq AZN yerinə ClueCoin yazdıq
      case 'wallet': return <div className="tab-content">💰 Balansınız: 0 ClueCoin</div>; 
      default: return null;
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