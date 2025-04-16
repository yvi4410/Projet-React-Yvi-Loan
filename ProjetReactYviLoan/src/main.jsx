import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import Home from './Home.jsx';   // Exemple de page d'accueil

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> {/* Route pour la page d'accueil */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);