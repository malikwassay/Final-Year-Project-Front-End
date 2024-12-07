import React, { useState, useEffect, useCallback } from 'react';
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if ( (formData.email === 'Admin@admin.com' && formData.password === 'Admin123') || (formData.email === 'Malikwassay6@gmail.com' && formData.password === 'Wassay123') ) {
      // Successful login
      navigate('/dengue-info');
    } else {
      // Failed login
      setError('Invalid email or password');
    }
  };

  return (
    <div className="right-side">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>
          <span className="log">Log</span>
          <span className="in">In</span>
        </h2>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="ENTER EMAIL"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="ENTER PASSWORD"
            value={formData.password}
            onChange={handleChange}
            required
          />
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
