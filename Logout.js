import React from 'react';
import './Logout.css';


const Logout = () => {
  return (
    <div className="logout-container">
      <div className="logout-message">
        <h2>You have been logged out</h2>
        <p>Thank you for using our application. Please log in again to continue.</p>
        <a href="/login" className="login-link">Login Again</a>
      </div>
    </div> 
  );
};

export default Logout;
