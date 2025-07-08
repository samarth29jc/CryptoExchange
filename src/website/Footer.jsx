import React, { useState } from 'react';
import { TrendingUp, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { createPortal } from 'react-dom';

const legalContent = {
  'Terms of Service': 'These are the Terms of Service for using Bitqilo. By accessing or using our platform, you agree to abide by all terms and conditions set forth herein.',
  'Privacy Policy': 'Our Privacy Policy explains how we collect, use, and protect your personal information when you use Bitqilo.',
  'Cookie Policy': 'The Cookie Policy describes how and why we use cookies and similar technologies on Bitqilo.',
  'Compliance': 'Bitqilo is committed to regulatory compliance and upholding the highest standards of security and transparency.'
};

function LegalModal({ open, onClose, title, content }) {
  if (!open) return null;
  return createPortal(
    <div className="footer-modal-overlay" onClick={onClose}>
      <div className="footer-modal" onClick={e => e.stopPropagation()}>
        <button className="footer-modal-close" onClick={onClose}>&times;</button>
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    </div>,
    document.body
  );
}

const Footer = () => {
  const [modal, setModal] = useState({ open: false, title: '', content: '' });

  const openModal = (title) => {
    setModal({ open: true, title, content: legalContent[title] });
  };
  const closeModal = () => setModal({ open: false, title: '', content: '' });

  return (
    <footer className="website-footer">
      <div className="website-container">
        <div className="website-footer-content">
          <div className="website-footer-section">
            <div className="website-footer-logo">
              <TrendingUp className="website-logo-icon" />
              <span className="website-logo-text">Bitqilo</span>
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

          <div className="website-footer-columns">
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
              <h4>Legal</h4>
              <ul>
                {Object.keys(legalContent).map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      onClick={e => { e.preventDefault(); openModal(item); }}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { openModal(item); } }}
                      tabIndex={0}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="website-footer-bottom">
          <p>&copy; 2024 Bitqilo. All rights reserved.</p>
          <p>Licensed and regulated financial services provider</p>
        </div>
      </div>
      <LegalModal open={modal.open} onClose={closeModal} title={modal.title} content={modal.content} />
    </footer>
  );
};

export default Footer;