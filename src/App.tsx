// src/App.tsx (Struktur yang Benar)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './Pages/HomePage';
import CariMakanan from './Pages/CariMakanan'; 
import BrowseFoodPage from './sections/Food';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="/makanan" element={<Layout />}>
          <Route index element={<CariMakanan />} />
          <Route path="browse" element={<BrowseFoodPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;