import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Import your CSS if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    // Simulated API call for forgot password logic
    console.log('Sending password reset link to:', email);
    setMessage('If this email is registered, you will receive a password reset link.');

    // Optionally navigate back to login after a delay
    setTimeout(() => {
      navigate('/'); // Redirect to login page
    }, 3000);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p className="message">{message}</p>}
      <button className="back-button" onClick={() => navigate('/')}>Back to Login</button>
    </div>
  );
};

export default ForgotPassword;
