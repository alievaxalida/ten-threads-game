import React, { useState } from 'react';
import './StartScreen.css';

export default function StartScreen({ onStartGame }) {
  const [detectiveName, setDetectiveName] = useState('');
  const [isStamping, setIsStamping] = useState(false); // Möhür animasiyası gedir?
  const [showSmoke, setShowSmoke] = useState(false); // Duman effekti görünsün?

  const handleStartRequest = () => {
    // Əgər ad yazmayıbsa, standart ad veririk
    const finalName = detectiveName.trim() === '' ? 'Məchul Detektiv' : detectiveName;
    
    // Animasiyanı başladırıq
    setIsStamping(true);
    
    // Möhür tam dəyəndə (məsələn 300ms sonra) duman çıxsın
    setTimeout(() => {
      setShowSmoke(true);
    }, 200);

    // Animasiya tam bitəndən sonra (məsələn 800ms) oyunu başla
    setTimeout(() => {
      onStartGame(finalName);
    }, 800);
  };

  return (
    <div className={`start-wrapper ${isStamping ? 'camera-shake' : ''}`}>
      {/* Qaranlıq, dumanlı detektiv atmosferi background */}
      <div className="detective-smoke-bg"></div>

      {/* Əsas Qovluq (Case File) */}
      <div className="case-folder-v2">
        {/* Metal bəndlər (yuxarıda) */}
        <div className="folder-metal-clasps"></div>
        
        {/* QIRMIZI "CONFIDENTIAL" MÖHÜRÜ */}
        <div className="confidential-stamp">CONFIDENTIAL</div>
        
        {/* Başlıq (Daktilo şrifti) */}
        <h1 className="game-title-v2">TEN THREADS</h1>
        <p className="game-subtitle">WHO IS THE KILLER?</p>

        {/* Ad yazılan kağız hissəsi */}
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

        {/* MÖHÜR VURAN DÜYMƏ STRUKTURU */}
        <div className="seal-button-area">
          <div className="detective-label">START CASE:</div>
          
          <button 
            className={`wax-seal-stamp-btn ${isStamping ? 'stamping' : ''}`} 
            onClick={handleStartRequest}
            disabled={isStamping} // Animasiya vaxtı təkrarlanmasın
          >
            {/* Möhürün ortasındakı xüsusi ikon (Mansion/Gate) */}
            <div className="seal-icon-design">
              <svg viewBox="0 0 100 100" className="mansion-svg">
                <path d="M10,90 L90,90 L90,50 L50,10 L10,50 Z M30,90 L30,60 L70,60 L70,90 M50,10 L50,60" stroke="#fcebeb" fill="none" strokeWidth="3"/>
              </svg>
            </div>
            {/* Möhürün dairəvi yazısı (Düzəldilmiş versiya) */}
            <svg className="seal-text-svg" viewBox="0 0 100 100">
              {/* Daha geniş və mərkəzli dairə yolu */}
              <path id="sealPath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none"/>
              <text className="seal-text-content">
                <textPath xlinkHref="#sealPath" startOffset="0%">• START CASE • TEN THREADS </textPath>
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