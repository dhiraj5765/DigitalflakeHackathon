import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const emailSuggestions = [
  'dhirajdhage9370@gmail.com',
  'example@gmail.com',
  'user@example.com',
  // Add more suggestions as needed
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Filter suggestions based on input
    if (value) {
      const filteredSuggestions = emailSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setEmail(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    setError('');
    const loginSuccessful = email === 'dhirajdhage9370@gmail.com' && password === 'dhiraj'; 

    if (loginSuccessful) {
      localStorage.setItem('user', email);
      navigate('/dashboard/home');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src="/logo.png" alt="Digitalflake Logo" className="logo" />
          <p>Welcome to Digitalflake Admin</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email-id"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="error-message">{error}</p>}

          <div className="forgot-password">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="login-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
