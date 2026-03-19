import React, { useState, useEffect } from 'react'; // useEffect əlavə olundu
import './StartScreen.css';
import evidenceBg from './assets/evidence-bg.jpg';
import mySealImg from './assets/my-seal.png';

export default function StartScreen({ onStartGame }) {
  const [detectiveName, setDetectiveName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  // 1. Telegram-dan istifadəçi adını avtomatik götürmək
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg && tg.initDataUnsafe?.user) {
      // Əgər Telegram-da adı varsa, avtomatik daxil et
      setDetectiveName(tg.initDataUnsafe.user.first_name || '');
      
      // Mini-app-ı tam ekrana yaymaq və rəngləri tənzimləmək üçün
      tg.expand(); 
      tg.ready();
    }
  }, []);

  const confirmAndStartGame = () => {
    if (detectiveName.trim().length > 2) {
      setIsConfirmed(true);

      // 2. VİBRASİYA (Haptic Feedback) - Möhür vurulan an
      if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      }

      // Tam olaraq 2.5 saniyə gözləyir
      setTimeout(() => {
        onStartGame(detectiveName);
      }, 2500); 
    } else {
      // İngiliscə xəbərdarlıq
      alert("Identification required: Please enter at least 3 characters.");
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
                placeholder="IDENTIFY YOURSELF..." 
                value={detectiveName}
                onChange={(e) => !isConfirmed && setDetectiveName(e.target.value)}
                disabled={isConfirmed}
                maxLength={20}
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