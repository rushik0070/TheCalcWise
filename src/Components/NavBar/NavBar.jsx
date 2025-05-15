import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">TheCalcWise</div>

      <ul className="navbar-menu">
        <li className="navbar-item dropdown">
          Products
          <div className="dropdown-content">
            <div className="dropdown-column">
              <h4>Individual Products</h4>
              <a href="#">GST</a>
              <a href="#">Accounts Payable</a>
              <a href="#">Vendor Management</a>
              <a href="#">MaxITC</a>
              <a href="#">E-Invoicing & E-Way Bill</a>
              <a href="#">TDS</a>
              <a href="#">Invoice Discounting</a>
              <a href="#">Financing</a>
              <a href="#">CimplyFive</a>
            </div>
            <div className="dropdown-column">
              <h4>Product Suites</h4>
              <a href="#">Clear Finance Cloud</a>
              <a href="#">Clear Compliance Cloud</a>
              <a href="#">Clear Supply Chain Cloud</a>
            </div>
            <div className="dropdown-column">
              <h4>Consumer Products</h4>
              <a href="#">ITR Filing</a>
              <a href="#">Tax Consultant Services</a>
            </div>
          </div>
        </li>

        <li className="navbar-item">Resources</li>
        <li className="navbar-item">Blog</li>
      </ul>

      <button className="login-btn">Login/Signup</button>
    </nav>
  );
};

export default NavBar;
