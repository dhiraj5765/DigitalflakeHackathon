import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Category from './Pages/Category';
import Subcategory from './Pages/Subcategory';
import Products from './Pages/Products';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';


function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for Login, Register, and ForgotPassword */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        

        {/* Define routes under the dashboard with different sub-pages */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="subcategory" element={<Subcategory />} />
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
