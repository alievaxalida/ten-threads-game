import React, { useState, useEffect } from 'react';
import { Briefcase, ShoppingBag, Gamepad2, Trophy, Wallet } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard({ detectiveName }) {
  const [activeTab, setActiveTab] = useState('case');

  // Gecə/Gündüz yoxlaması (Səhər 10:00-dan axşam 18:00-a qədər aktiv/işıqlıdır)
  useEffect(() => {
    const currentHour = new Date().getHours();
    
    // Əgər saat 10-dan böyük/bərabər və 18-dən kiçikdirsə:
    if (currentHour >= 10 && currentHour < 18) {
      setIsDayTime(true);  // Gündüz Növbəsi (İşıqlı rejim)
    } else {
      setIsDayTime(false); // Gecə Növbəsi (Qaranlıq rejim)
    }
  }, []);

  // Şübhəlilərin Siyahısı (Məlumat Bazası)
  const suspects = [
    { id: 'moreno', name: 'Moreno Montes', role: 'The Victim', emoji: '👑', age: 58, height: '182 cm', weight: '76 kg', info: 'Sistemin qurucusu. Ölüm səbəbi şübhəlidir.' },
    { id: 'sara', name: 'Sara', role: 'The Influencer', emoji: '📸', age: 26, height: '170 cm', weight: '55 kg', info: 'Həmişə diqqət mərkəzindədir. Çox bahalı həyat tərzi var.' },
    { id: 'mark', name: 'Mark', role: 'The Actor', emoji: '🎭', age: 32, height: '179 cm', weight: '75 kg', info: 'Cazibədar və yalan danışmağı peşəyə çevirən biri.' },
    { id: 'elena', name: 'Elena', role: 'The Maid', emoji: '🧹', age: 35, height: '165 cm', weight: '60 kg', info: 'Səssizdir, amma malikanədəki hər şeyi görür və eşidir.' },
    { id: 'sam', name: 'Sam', role: 'The Driver', emoji: '🚗', age: 40, height: '183 cm', weight: '82 kg', info: 'Sadiq görünür, lakin hara getdiyini həmişə gizlədir.' },
    { id: 'kate', name: 'Kate', role: 'The Journalist', emoji: '📰', age: 30, height: '168 cm', weight: '58 kg', info: 'Böyük bir hekayənin arxasındadır. Elenanın əlaqəsidir.' },
    { id: 'alex', name: 'Alex', role: 'The Hacker', emoji: '💻', age: 28, height: '175 cm', weight: '70 kg', info: 'Qapalı və əsəbi. Hər kəsin rəqəmsal izini bilir.' },
    { id: 'robert', name: 'Robert', role: 'The Banker', emoji: '💼', age: 45, height: '180 cm', weight: '85 kg', info: 'Sakit və hesablayıcı. Qrupun ən varlılarındandır.' },
    { id: 'dr_miller', name: 'Dr. Miller', role: 'The Surgeon', emoji: '🩺', age: 52, height: '177 cm', weight: '80 kg', info: 'Əlləri bəzən əsir. Keçmişdə böyük bir xəta edib.' },
    { id: 'leo', name: 'Leo', role: 'The Student', emoji: '🎒', age: 21, height: '178 cm', weight: '68 kg', info: 'Morenonun təqaüd verdiyi sadəlövh gənc... yoxsa?' },
    { id: 'general', name: 'The General', role: 'The Veteran', emoji: '🎖️', age: 65, height: '185 cm', weight: '90 kg', info: 'Sərt və nizam-intizamlı. Qisas axtarır.' }
  ];

  const handleCharacterClick = (suspect) => {
    if (isPremium || isDayTime) {
      alert(`📂 DOSYE AÇILDI:\n\nAd: ${suspect.name}\nPeşə: ${suspect.role}\nYaş: ${suspect.age}\nBoy/Çəki: ${suspect.height} / ${suspect.weight}\n\nQeyd: ${suspect.info}`);
    } else {
      const confirmAd = window.confirm("🔦 Otaq zülmət qaranlıqdır. Fənəri yandırmaq və dosyeni oxumaq üçün 1 reklam izləyin. (+10 CC qazanacaqsınız)");
      if (confirmAd) {
        alert(`✅ Reklam izləndi! İşıq yandı.\n\n📂 DOSYE: ${suspect.name}\nQeyd: ${suspect.info}`);
      }
    }
  };
  // Menyuların məzmunu
  const renderContent = () => {
    switch (activeTab) {
      case 'case': 
        const caseModeClass = (!isDayTime && !isPremium) ? 'dark-mode' : 'light-mode';

        return (
          <div className={`tab-content case-board ${caseModeClass}`}>
            
            {(!isDayTime && !isPremium) && (
              <div className="night-warning" style={{backgroundColor: '#ff4444', color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '15px', textAlign: 'center'}}>
                ⚠️ Gecə Növbəsi: Məlumatlar üçün fənər (reklam) lazımdır.
              </div>
            )}

            <h2>🕵️‍♂️ Suspects Dossier</h2>
            <p>10 Threads. 10 Lies. Find the contradictions.</p>
            
            <div className="suspects-grid">
              {suspects.map(suspect => (
                <div 
                  key={suspect.id} 
                  className="suspect-card" 
                  onClick={() => handleCharacterClick(suspect)}
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