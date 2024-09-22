// Home.js
import React from 'react';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <img 
        src={`${process.env.PUBLIC_URL}/images/logo.png`} 
        alt="Company Logo" 
        className="home-logo" 
      />
      <h1>Welcome to the Dashboard Home Page!</h1>
    </div>
  );
};

export default Home;
