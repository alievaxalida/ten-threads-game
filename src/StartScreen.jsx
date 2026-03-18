import React, { useState } from 'react';
import './StartScreen.css';
import evidenceBg from './assets/evidence-bg.jpg';
import mySealImg from './assets/my-seal.png'; // Sənin hazırladığın möhür şəkli

export default function StartScreen({ onStartGame }) {
  const [detectiveName, setDetectiveName] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false); // Adın təsdiqi üçün

  // Adı təsdiqləyən və oyunu başladan funksiya
  const confirmAndStartGame = () => {
    if (detectiveName.trim().length > 2) {
      // 1. Adı təsdiqlə (bu, möhür animasiyasını başladır)
      setIsConfirmed(true);

      // 2. Animasiya bitdikdən (məs: 800ms) sonra oyunu başlat
      setTimeout(() => {
        onStartGame(detectiveName);
      }, 800); // 0.8 saniyəlik gecikmə
    } else {
      alert("Zəhmət olmasa adınızı daxil edin (min. 3 hərf)");
    }
  };

  return (
    <div className="start-wrapper">
      {/* Qaranlıq Dumanlı Atmosfer Arxa Planı */}
      <div className="detective-smoke-bg"></div>

      {/* SÜBUTLAR KONTEYNERİ */}
      <div className="evidence-container" style={{ backgroundImage: `url(${evidenceBg})` }}>
        <h1 className="game-title-v2">TEN THREADS</h1>
        <p className="game-subtitle">WHO IS THE KILLER?</p>
        
        {/* Ad yazılan kağız hissəsi */}
        <div className="name-area-wrapper">
          <div className="input-group">
            <input 
              type="text" 
              className={`name-input-v2 ${isConfirmed ? 'confirmed-text' : ''}`}
              placeholder="DETECTIVE NAME..." 
              value={detectiveName}
              onChange={(e) => !isConfirmed && setDetectiveName(e.target.value)}
              disabled={isConfirmed}
              maxLength={20}
            />
            
            {/* Təsdiq Düyməsi (Checkmark) - Artıq bu düymə oyunu başladır */}
            {!isConfirmed && (
              <button className="confirm-btn" onClick={confirmAndStartGame}>✓</button>
            )}
          </div>

          {/* Animasiyalı Möhür (Adın üzərinə düşən - Sənin möhürünün balaca, qırmızı variantı) */}
          {isConfirmed && (
            <img 
              src={mySealImg} 
              alt="Approved" 
              className="name-stamp-overlay red-filter" 
            />
          )}
        </div>

        {/* BURA DİQQƏT: Alt hissədəki .seal-button-area blokunu tamamilə sildik! */}
      </div>
    </div>
  );
}