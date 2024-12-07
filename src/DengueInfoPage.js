import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DengueInfoPage.css';

const DengueInfoPage = () => {
  const navigate = useNavigate();

  const handleVisualsClick = () => {
    navigate('/map');
  };

  const handleGraphsClick = () => {
    navigate('/predictions');
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src="/images/mosquito-icon.png" alt="Mosquito icon" />
        </div>
        <div className="user-info">
          <div className="user-avatar">
          </div>
        </div>
      </header>
      
      <main>
        <h1>Dengue Epidemic</h1>
        <div className="underline"></div>
        <p className="description">A mosquito-borne tropical disease caused by dengue virus.</p>
        
        <div className="illustration">
          <img src="/images/dengue-illustration.png" alt="Dengue illustration" />
        </div>
        
        <div className="buttons">
          <button className="btn visuals" onClick={handleVisualsClick}>
            Visuals
            <span className="arrow">→</span>
          </button>
          <button className="btn graphs" onClick={handleGraphsClick}>
            Graphs
            <span className="arrow">→</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default DengueInfoPage;