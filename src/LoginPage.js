import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <LeftSide />
      <RightSide />
    </div>
  );
};

const LeftSide = () => {
  return (
    <div className="left-side">
      <div className="logologin">
        <img src="/images/mosquito-icon.png" alt="Mosquito icon" />
      </div>
      <h1 className="welcome-text">Welcome!</h1>
      <p className="authorities-text">Only For Government Authorities</p>
    </div>
  );
};

const RightSide = () => {
  const navigate = useNavigate(); // Hook to access the navigation function

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., validation)
    
    // If login is successful, navigate to the DengueInfoPage
    navigate('/dengue-info'); // Navigate to the DengueInfoPage
  };

  return (
    <div className="right-side">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>
          <span className="log">Log</span>
          <span className="in">In</span>
        </h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="ENTER USERNAME" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="ENTER PASSWORD" />
        </div>
        <div className="forgot-password">
          <a href="/">Forgot Password?</a>
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
