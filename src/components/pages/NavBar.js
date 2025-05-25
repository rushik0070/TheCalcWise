  import React from 'react'
  // import '../style/NavBar.module.css'
  import { useState } from 'react';
  const NavBar = () => {
      const [darkMode, setDarkMode] = useState(false);

      const toggleDarkMode = () => {
        document.body.classList.toggle('dark');
        setDarkMode(!darkMode);
      };

      return (
          <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm px-3">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <img src="/logo/icon.webp" alt="Logo" height={40} width={40}/>
            <span className="fw-bold">TheCalcWise</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/finance">Financial</a>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-2">
              <button className="btn btn-outline-secondary" onClick={toggleDarkMode}>
                {darkMode ? "☀️" : "🌙"}
              </button>
              {/* Optional Login Button */}
              {/* <button className="btn btn-primary">Login/Signup</button> */}
            </div>
          </div>
        </div>
      </nav>
      )
  }

  export default NavBar