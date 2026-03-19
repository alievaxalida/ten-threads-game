import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Dashboard yox, məhz App olmalıdır!
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);