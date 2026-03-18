import React, { useState } from 'react';
import './StartScreen.css';
import evidenceBg from './assets/evidence-bg.jpg';
import mySealImg from './assets/my-seal.png'; // Sənin hazırladığın möhür şəklini import et

export default function StartScreen({ onStartGame }) {
  const [detectiveName, setDetectiveName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false); 
  const [isStamping, setIsStamping] = useState(false);

  // Adı təsdiqləyən funksiya
  const confirmName = () => {
    if (detectiveName.trim().length > 2) {
      setIsConfirmed(true);
    } else {
      alert("Zəhmət olmasa adınızı daxil edin (min. 3 hərf)");
    }
  };

  const handleStartRequest = () => {
    if (!isConfirmed) return; // Ad təsdiqlənməyibsə oyuna başlama
    setIsStamping(true);
    setTimeout(() => {
      onStartGame(detectiveName);
    }, 1000);
  };

  return (
    <div className="start-wrapper">
      {/* Qaranlıq Dumanlı Atmosfer Arxa Planı */}
      <div className="detective-smoke-bg"></div>

      {/* SÜBUTLAR KONTEYNERI */}
      <div className="evidence-container" style={{ backgroundImage: `url(${evidenceBg})` }}>
        <h1 className="game-title-v2">TEN THREADS</h1>
        <p className="game-subtitle">WHO IS THE KILLER?</p>
        
        <div className="name-area-wrapper">
          <div className="input-group">
            <input 
              type="text" 
              className={`name-input-v2 ${isConfirmed ? 'confirmed-text' : ''}`}
              placeholder="TYPE NAME... (R. CROFT)" 
              value={detectiveName}
              onChange={(e) => !isConfirmed && setDetectiveName(e.target.value)}
              disabled={isConfirmed}
              maxLength={20}
            />
            
            {/* Təsdiq Düyməsi (Checkmark) */}
            {!isConfirmed && (
              <button className="confirm-btn" onClick={confirmName}>✓</button>
            )}
          </div>

          {/* Animasiyalı Möhür (Adın üzərinə düşən - Sənin möhürünün qırmızı variantı) */}
          {isConfirmed && (
            <img 
              src={mySealImg} 
              alt="Approved" 
              className="name-stamp-overlay red-filter" 
            />
          )}
        </div>

        {/* BAŞLATMA MÖHÜRÜ DÜYMƏSİ (Sənin möhürün) */}
        <div className={`seal-button-area ${!isConfirmed ? 'locked' : ''}`}>
          <button 
            className={`my-wax-seal-btn ${isStamping ? 'stamping' : ''}`} 
            onClick={handleStartRequest}
            disabled={!isConfirmed || isStamping}
          >
            <img src={mySealImg} alt="Start Case" className="seal-image" />
            <span className="seal-btn-text">START CASE</span>
          </button>
        </div>
      </div>
    </div>
  );
}