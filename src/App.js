import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DengueEpidemicPage from './DengueEpidemicPage';
import LoginPage from './LoginPage';
import DengueInfoPage from './DengueInfoPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DengueEpidemicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dengue-info" element={<DengueInfoPage />} />

      </Routes>
    </Router>
  );
}

export default App;
