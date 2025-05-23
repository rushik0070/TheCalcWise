import React from 'react';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
// import '../style/Footer.module.css'
const Footer = () => {
  return (
    <footer className="bg-light text-dark mt-5 pt-4 pb-3 border-top">
      <div className="container text-center">
        <h5 className="mb-3 fw-bold">TheCalcWise</h5>

        <div className="d-flex justify-content-center gap-4 mb-3">
          <a href="https://instagram.com/your_username" target="_blank" rel="noopener noreferrer" className="text-dark social-icon">
            <FaInstagram size={24} />
          </a>
          <a href="https://x.com/your_username" target="_blank" rel="noopener noreferrer" className="text-dark social-icon">
            <FaXTwitter size={24} />
          </a>
        </div>

        <p className="small mb-0">© {new Date().getFullYear()} TheCalcWise. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
