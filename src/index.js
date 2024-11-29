import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SplashCloud from './SplashCloud';
import MainLandingPage from './MainLandingPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Enable routing for SplashCloud */}
    <BrowserRouter>
      <Routes>
        {/* Define the main routes */}
        <Route path="/" element={<MainLandingPage />} />
        <Route path="/splashcloud" element={<SplashCloud />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();