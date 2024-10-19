import React from 'react';
import './DengueInfoPage.css';

const DengueInfoPage = () => {
  return (
    <div className="dengue-info-page">
      <header className="header">
        <div className="logo">
          <img src="/images/mosquito-icon.png" alt="Mosquito icon" />
        </div>
        
        <div className="author">
          <p>Wassay Haider</p>
        </div>
      </header>
      <main className="content">
      <h1>Dengue Epidemic</h1>
        <p className="description">a mosquito-borne tropical disease caused by dengue virus.</p>
        <div className="button-container">
          <button className="button visuals-button">Visuals →</button>
          <button className="button graphs-button">Graphs →</button>
        </div>
      </main>
    </div>
  );
};

export default DengueInfoPage;
