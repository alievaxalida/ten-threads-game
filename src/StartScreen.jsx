import React, { useState } from 'react';
import './StartScreen.css';
import evidenceBg from './assets/evidence-bg.jpg';
import mySealImg from './assets/my-seal.png';

export default function StartScreen({ onStartGame }) {
  const [detectiveName, setDetectiveName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const confirmAndStartGame = () => {
    if (detectiveName.trim().length > 2) {
      setIsConfirmed(true);

      // BURA DƏYİŞDİ: Tam olaraq 2.5 saniyə (2500ms) gözləyir
      setTimeout(() => {
        onStartGame(detectiveName);
      }, 2500); 
    } else {
      alert("Zəhmət olmasa adınızı daxil edin (min. 3 hərf)");
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
                placeholder="USERNAME..." // <-- BURA DƏYİŞDİ ("DETECTIVE NAME..." yerinə)
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