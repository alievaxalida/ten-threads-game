import React, { useState, useEffect } from 'react'; // BURA DƏYİŞDİ: useEffect əlavə olundu
import './StartScreen.css';
import evidenceBg from './assets/evidence-bg.jpg';
import mySealImg from './assets/my-seal.png';

export default function StartScreen({ onStartGame }) {
  const [detectiveName, setDetectiveName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // YENİ ƏLAVƏ OLUNAN HİSSƏ: Telegram məlumatlarını çəkmək üçün
  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.expand();

      const user = tg.initDataUnsafe?.user;
      
      if (user) {
        // Telegram-dan gələn xam ad
        const rawName = user.username || user.first_name || "Detektiv";
        
        // BURA DƏYİŞDİ: Adı sistemə yazmamışdan ƏVVƏL 6 hərfə kəsib böyüdürük
        const formattedName = rawName.slice(0, 6).toUpperCase(); 
        
        setDetectiveName(formattedName);
      }
    }
  }, []);

  const confirmAndStartGame = () => {
    if (detectiveName.trim().length > 2) {
      setIsConfirmed(true);

      // BURA DƏYİŞDİ: Tam olaraq 2.5 saniyə (2500ms) gözləyir
      setTimeout(() => {
        onStartGame(detectiveName);
      }, 2500); 
    } else {
      alert("Please add your username (min. 3 character)");
    }
  };

  return (
    <div className="start-wrapper">
      <div className="detective-smoke-bg"></div>
      <div className="evidence-container" style={{ backgroundImage: `url(${evidenceBg})` }}>
        <div className="central-ui-wrapper">
          <h1 className="game-title-v2">TEN THREADS</h1>
          <p className="game-subtitle">WHO IS THE KILLER?</p>

          <div className="name-area-wrapper">
            <div className="input-group">
            <input 
              type="text" 
              className={`name-input-v2 ${isConfirmed ? 'confirmed-text' : ''}`}
              placeholder="USERNAME..." 
              value={detectiveName}
              // BURA DƏYİŞDİ: həm onChange daxilində, həm də maxLength-də 12 simvol limiti qoyuruq
              onChange={(e) => !isConfirmed && setDetectiveName(e.target.value.slice(0, 6))}
              disabled={isConfirmed}
              maxLength={6} // 
            />
              
              {!isConfirmed && (
                <button className="confirm-btn active" onClick={confirmAndStartGame}>✓</button>
              )}
            </div>

            {isConfirmed && (
              <img 
                src={mySealImg} 
                alt="Approved" 
                className="name-stamp-overlay red-filter" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}