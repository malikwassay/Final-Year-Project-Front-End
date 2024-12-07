import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DengueEpidemicPage.css';

const DengueEpidemicPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleVisualsClick = () => {
    navigate('/map');  
  };

  return (
    <div className="dengue-epidemic-page">
      <header>
        <div className="logo">
          <img src="/images/mosquito-icon.png" alt="Mosquito icon" />
        </div>
        <button className="login-button" onClick={handleLoginClick}>Login</button>
      </header>
      
      <main>
        <h1>Dengue Epidemic</h1>
        <p className="description">A mosquito-borne tropical disease caused by dengue virus.</p>
        
        <div className="content-wrapper">
          <div className="info-cards">
            <div className="card symptoms">
              <h2>Symptoms</h2>
              <ul>
                <li>High fever (40°C/104°F)</li>
                <li>Severe headache</li>
                <li>Pain behind the eyes</li>
                <li>Muscle and joint pains</li>
                <li>Nausea</li>
                <li>Vomiting</li>
                <li>Swollen glands</li>
                <li>Rash</li>
              </ul>
            </div>
            <div className="card prevention">
              <h2>Prevention</h2>
              <ul>
                <li>Clothes that cover as much of your body as possible</li>
                <li>Mosquito nets if sleeping during the day, ideally nets sprayed with insect repellent</li>
                <li>Window screens</li>
                <li>Mosquito repellents</li>
                <li>Coils and Vaporizers</li>
              </ul>
            </div>
          </div>
          <div className="illustrations">
            <img src="/images/dengue-illustration.png" alt="Dengue illustration" />
          </div>
        </div>
        
        <div className="visuals-section">
          <p>To get visuals, click below</p>
          <button className="visuals-button" onClick={handleVisualsClick}>VISUALS →</button>
        </div>
      </main>
    </div>
  );
};

export default DengueEpidemicPage;