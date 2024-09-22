import React from 'react';
import { Link, Outlet } from 'react-router-dom'; // Import Outlet for nested routes
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Navbar Section */}
      <div className="navbar">
        <div className="navbar-left">
          <img src={`${process.env.PUBLIC_URL}/logo2.png`} alt="Digitalflake Logo" className="navbar-logo" />
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={() => window.location.href = '/'}>Logout</button>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className="sidebar">
        <h2 className="sidebar-title">Dashboard</h2>
        <ul>
          <li><Link to="home" className="sidebar-link">Home</Link></li>
          <li><Link to="category" className="sidebar-link">Category</Link></li>
          <li><Link to="subcategory" className="sidebar-link">Subcategory</Link></li>
          <li><Link to="products" className="sidebar-link">Products</Link></li>
        </ul>
      </div>

      {/* Main content area: Renders the matched child route */}
      <div className="main-content">
        <Outlet /> {/* This will render the matching child route (like Welcome, Category, etc.) */}
      </div>
    </div>
  );
};

export default Dashboard;
