import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DengueEpidemicPage.css';

const DengueEpidemicPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="dengue-epidemic-page">
      <header>
        <div className="logo">
          <img src="/images/mosquito-icon.png" alt="Mosquito icon" />
        </div>
        <button className=" login-button " onClick={handleLoginClick}>Login</button>
      </header>
      
      <main>
        <h1>Dengue Epidemic</h1>
        <p className="description">a mosquito-borne tropical disease caused by dengue virus.</p>
        
        <div className="content-wrapper">
          <div className="info-cards">
            <div className="card symptoms">
              <h2>Symptoms</h2>
              <ul>
                <li>high fever (40°C/104°F)</li>
                <li>severe headache</li>
                <li>pain behind the eyes</li>
                <li>muscle and joint pains</li>
                <li>nausea</li>
                <li>vomiting</li>
                <li>swollen glands</li>
                <li>rash</li>
              </ul>
            </div>
            <div className="card prevention">
              <h2>Prevention</h2>
              <ul>
                <li>clothes that cover as much of your body as possible</li>
                <li>mosquito nets if sleeping during the day, ideally nets sprayed with insect repellent</li>
                <li>window screens</li>
                <li>mosquito repellents</li>
                <li>coils and vaporizers</li>
              </ul>
            </div>
          </div>
          <div className="illustration">
            <img src="/images/dengue-illustration.png" alt="Dengue illustration" />
          </div>
        </div>
        
        <div className="visuals-section">
          <p>To get visuals, click below</p>
          <button className="visuals-button">VISUALS →</button>
        </div>
      </main>
    </div>
  );
};

export default DengueEpidemicPage;
