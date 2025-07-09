import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`website-header ${scrolled ? 'website-header-scrolled' : ''}`}>
      <div className="website-container">
        <div className="website-header-content">
          <div className="website-logo">
            <img src="/customIcon.png" alt="Bitqilo Logo" className="website-logo-icon" />
            <span className="website-logo-text" style={{ color: '#111' }}>Bitqilo</span>
          </div>
          
          <nav className={`website-nav ${isMenuOpen ? 'website-nav-open' : ''}`}>
            <a href="#home" className="website-nav-link">Home</a>
            <a href="#features" className="website-nav-link">Features</a>
            <a href="#exchange" className="website-nav-link">Exchange</a>
            <a href="#security" className="website-nav-link">Security</a>
            <a href="#contact" className="website-nav-link">Contact</a>
          </nav>

          <div className="website-header-actions">
            <button className="website-btn-secondary" onClick={() => navigate('/auth')}>LogIn</button>
            <button className="website-btn-primary" onClick={() => navigate('/auth')}>Get Started</button>
          </div>

          <button 
            className="website-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;