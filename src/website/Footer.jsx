import React from 'react';
import { TrendingUp, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="website-footer">
      <div className="website-container">
        <div className="website-footer-content">
          <div className="website-footer-section">
            <div className="website-footer-logo">
              <TrendingUp className="website-logo-icon" />
              <span className="website-logo-text">AxiPays</span>
            </div>
            <p className="website-footer-description">
              The future of crypto trading. Secure, fast, and trusted by millions worldwide.
            </p>
            <div className="website-social-links">
              <a href="#" className="website-social-link"><Twitter /></a>
              <a href="#" className="website-social-link"><Linkedin /></a>
              <a href="#" className="website-social-link"><Github /></a>
              <a href="#" className="website-social-link"><Mail /></a>
            </div>
          </div>

          <div className="website-footer-section">
            <h4>Product</h4>
            <ul>
              <li><a href="#">Spot Trading</a></li>
              <li><a href="#">Futures</a></li>
              <li><a href="#">Options</a></li>
              <li><a href="#">Staking</a></li>
            </ul>
          </div>

          <div className="website-footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          <div className="website-footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">API Docs</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>

          <div className="website-footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="website-footer-bottom">
          <p>&copy; 2024 AxiPays. All rights reserved.</p>
          <p>Licensed and regulated financial services provider</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;