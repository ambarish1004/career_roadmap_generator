// src/components/Footer.jsx
import React from "react";
import "../components/footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Aarohan</h3>
          <p>Your AI-powered career roadmap platform.</p>
        </div>

        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Aarohan. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
