import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sectionIds = ['home', 'features', 'exchange', 'security', 'contact'];
    const handleScroll = () => {
      let found = 'home';
      for (let id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menu toggle handler
  const handleMenuToggle = () => {
    if (!isMenuOpen && !isMenuClosing) {
      setIsMenuOpen(true);
      setIsMenuClosing(false);
    } else if (isMenuOpen) {
      setIsMenuClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsMenuClosing(false);
      }, 400); // match CSS transition duration
    }
  };

  // Close menu and navigate
  const handleGetStarted = () => {
    setIsMenuClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
      navigate('/auth');
    }, 400);
  };

  return (
    <header className={`website-header ${scrolled ? 'website-header-scrolled' : ''}`}>
      <div className="website-container">
        <div className="website-header-content">
          <div className="website-logo">
            <img src="/whiteLogin.webp" alt="Krypttos Logo" className="website-logo-icon" style={{ width: '120px', height: 'auto' }} />
          </div>
          
          <nav className={`website-nav${isMenuOpen ? ' website-nav-open' : ''}${isMenuClosing ? ' website-nav-closing' : ''}`}>
            
            <a href="#home" className={`website-nav-link${activeSection==='home' ? ' active' : ''}`}>Home</a>
            <a href="#features" className={`website-nav-link${activeSection==='features' ? ' active' : ''}`}>Features</a>
            <a href="#exchange" className={`website-nav-link${activeSection==='exchange' ? ' active' : ''}`}>Exchange</a>
            <a href="#security" className={`website-nav-link${activeSection==='security' ? ' active' : ''}`}>Security</a>
            <a href="#contact" className={`website-nav-link${activeSection==='contact' ? ' active' : ''}`}>Contact</a>
            {isMenuOpen && (
              <button className="website-btn-primary website-nav-mobile-btn" onClick={handleGetStarted}>Get Started</button>
            )}
          </nav>

          <div className="website-header-actions" style={{ display: isMenuOpen ? 'none' : undefined }}>
            
            <button className="website-btn-primary" onClick={() => navigate('/auth')}>Get Started</button>
          </div>

          <button 
            className="website-menu-toggle"
            onClick={handleMenuToggle}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;