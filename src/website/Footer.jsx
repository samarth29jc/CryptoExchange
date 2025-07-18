import React, { useState } from 'react';
import { TrendingUp, Instagram, Linkedin, Facebook, Mail } from 'lucide-react';
import { createPortal } from 'react-dom';

const legalContent = {
  'Terms of Service': 'These are the Terms of Service for using Krypttos. By accessing or using our platform, you agree to abide by all terms and conditions set forth herein.',
  'Privacy Policy': 'Our Privacy Policy explains how we collect, use, and protect your personal information when you use Krypttos.',
  'Cookie Policy': 'The Cookie Policy describes how and why we use cookies and similar technologies on Krypttos.',
  'Compliance': 'Krypttos is committed to regulatory compliance and upholding the highest standards of security and transparency.'
};

function LegalModal({ open, onClose, title, content }) {
  if (!open) return null;
  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };
  return createPortal(
    <div className="footer-modal-overlay" onClick={onClose}>
      <div className="footer-modal" onClick={e => e.stopPropagation()}>
        <button className="footer-modal-close" onClick={onClose}>&times;</button>
        <img src="/motaStudy.webp" alt="modal visual" style={{ display: 'block', margin: '0 auto 16px', width: '170px', height: '170px', objectFit: 'fill' }} />
        <h3 style={{ textAlign: 'center', marginBottom: '12px' }}>{title}</h3>
        <p style={{ textAlign: 'center', marginBottom: '24px' }}>{content}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            style={{ background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 20px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
            onClick={handleContactClick}
          >
            Contact Us
          </button>
          <button
            style={{ background: '#f3f4f6', color: '#111827', border: 'none', borderRadius: '8px', padding: '12px 20px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
            onClick={onClose}
          >
            Back To Page
          </button>
        </div>
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
              <img src="/mountainLogin.webp" alt="Krypttos Logo" className="website-logo-icon" style={{ width: '120px', height: 'auto' }} />
            </div>
            <p className="website-footer-description">
               Fundex Pay LLC is a legally registered private limited company under the laws of the Republic of Poland. The company is officially authorized and registered as a Virtual Asset Service Provider (VASP) in accordance with Polish anti-money laundering (AML) and counter-terrorism financing (CTF) regulations. Fundex Pay LLC is permitted to provide virtual asset-related services, including cryptocurrency exchange and wallet services, in full compliance with national and EU regulatory standards. 
               <br></br>The company maintains its registered business addresses at Piotrkowska Street 148/150 and Stanisława Przybyszewskiego Street 91–99, Łódź, 90-063 and 93-126, Poland.
            </p>
            <div className="website-social-links">
              <a href="https://instagram.com" className="website-social-link" target="_blank" rel="noopener noreferrer"><Instagram /></a>
              <a href="https://linkedin.com" className="website-social-link" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
              <a href="https://facebook.com" className="website-social-link" target="_blank" rel="noopener noreferrer"><Facebook /></a>
              <a href="mailto:support@krypttos.com" className="website-social-link"><Mail /></a>
            </div>
          </div>

          <div className="website-footer-columns">
            <div className="website-footer-section">
              <h4>Company</h4>
              <ul>
              <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#exchange">Exchange</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#contact">Contact</a></li>
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
          <p style={{fontSize:'1vw'}}>&copy; 2025 Krypttos. All rights reserved.</p>
          <p style={{fontSize:'1vw'}}>The future of crypto trading. Secure, fast, and trusted by millions worldwide.</p>
        </div>
      </div>
      <LegalModal open={modal.open} onClose={closeModal} title={modal.title} content={modal.content} />
    </footer>
  );
};

export default Footer;