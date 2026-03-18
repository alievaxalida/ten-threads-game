import React, { useState } from 'react';
import './StartScreen.css';
import evidenceBg from './assets/evidence-bg.jpg'; // Sübutlar şəklini import et

export default function StartScreen({ onStartGame }) {
  const [detectiveName, setDetectiveName] = useState('');
  const [isStamping, setIsStamping] = useState(false); 
  const [showSmoke, setShowSmoke] = useState(false); 

  const handleStartRequest = () => {
    const finalName = detectiveName.trim() === '' ? 'Məchul Detektiv' : detectiveName;
    setIsStamping(true);
    
    setTimeout(() => {
      setShowSmoke(true);
    }, 200);

    setTimeout(() => {
      onStartGame(finalName);
    }, 800);
  };

  return (
    <div className={`start-wrapper ${isStamping ? 'camera-shake' : ''}`}>
      {/* Qaranlıq Dumanlı Atmosfer Arxa Planı */}
      <div className="detective-smoke-bg"></div>

      {/* SÜBUTLAR KONTEYNERİ (Yeni əsas struktur) */}
      <div className="evidence-container" style={{ backgroundImage: `url(${evidenceBg})` }}>
        {/* Başlıq (Daktilo şrifti) */}
        <h1 className="game-title-v2">TEN THREADS</h1>
        <p className="game-subtitle">WHO IS THE KILLER?</p>

        {/* Ad yazılan kağız hissəsi - Sübutlar konteynerinin mərkəzində */}
        <div className="name-paper-integrated">
          <label className="paper-label-v2">DETECTIVE NAME:</label>
          <input 
            type="text" 
            className="name-input-v2" 
            placeholder="TYPE NAME... (R. CROFT)" 
            value={detectiveName}
            onChange={(e) => setDetectiveName(e.target.value)}
            maxLength={20}
          />
        </div>

        {/* MÖHÜR VURAN DÜYMƏ STRUKTURU - Sağ aşağıda sabit qalır */}
        <div className="seal-button-area">
          <button 
            className={`wax-seal-stamp-btn ${isStamping ? 'stamping' : ''}`} 
            onClick={handleStartRequest}
            disabled={isStamping} 
          >
            {/* Möhürün dairəvi yazısı */}
            <svg className="seal-text-svg" viewBox="0 0 100 100">
              <path id="sealPath" d="M 20,50 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none"/>
              <text className="seal-text-content">
                <textPath xlinkHref="#sealPath">START CASE • TEN THREADS • </textPath>
              </text>
            </svg>
          </button>
          
          {/* Möhür dəyəndə çıxan xəfif duman */}
          {showSmoke && <div className="stamp-smoke-puff"></div>}
        </div>
      </div>
    </div>
  );
}