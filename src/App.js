import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DengueEpidemicPage from './DengueEpidemicPage';
import LoginPage from './LoginPage';
import DengueInfoPage from './DengueInfoPage';
import Map from './Map';
import Graph from './Graph';  // Import the Graph component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DengueEpidemicPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dengue-info" element={<DengueInfoPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/predictions" element={<Graph />} />  {/* New route for predictions */}
      </Routes>
    </Router>
  );
}

export default App;