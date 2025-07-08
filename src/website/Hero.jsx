import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import smallchart from "../../public/image.png"

const Hero = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('website-animate-counter');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="website-hero">
      <div className="website-container">
        <div className="website-hero-content">
          <div className="website-hero-text">
            <h1 className="website-hero-title">
              The Future of
              <span className="website-gradient-text"> Crypto Trading</span>
              <br />
              Starts Here
            </h1>
            <p className="website-hero-description">
              Experience next-generation crypto trading with AxiPays. 
              Secure, fast, and intuitive platform trusted by millions of traders worldwide.
            </p>
            
            <div className="website-hero-actions">
              <button className="website-btn-primary website-btn-large">
                Start Trading
                <ArrowRight className="website-btn-icon" />
              </button>
              <button className="website-btn-outline">Learn More</button>
            </div>

            <div className="website-hero-features">
              <div className="website-feature-item">
                <Shield className="website-feature-icon" />
                <span>Bank-Grade Security</span>
              </div>
              <div className="website-feature-item">
                <Zap className="website-feature-icon" />
                <span>Lightning Fast</span>
              </div>
              <div className="website-feature-item">
                <Globe className="website-feature-icon" />
                <span>Global Access</span>
              </div>
            </div>
          </div>

          <div className="website-hero-visual">
            <div className="website-trading-card">
              <div className="website-trading-header">
                <h3>Live Trading</h3>
                <div className="website-status-indicator"></div>
              </div>
              <div className="website-trading-content">
                <div className="website-price-display">
                  <span className="website-price">$42,850.00</span>
                  <span className="website-change website-positive">+5.2%</span>
                </div>
                <div className="website-chart-placeholder">
                  <img src={smallchart} alt='chart image stonks' width={350} height={150} zoom="300"></img>
                </div>
                <div className="website-trading-actions">
                  <button className="website-trade-btn website-buy">Buy</button>
                  <button className="website-trade-btn website-sell">Sell</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="website-hero-stats" ref={statsRef}>
          <div className="website-stat-item">
            <div className="website-stat-number" data-target="50">0</div>
            <div className="website-stat-label">Billion+ Volume</div>
          </div>
          <div className="website-stat-item">
            <div className="website-stat-number" data-target="2">0</div>
            <div className="website-stat-label">Million+ Users</div>
          </div>
          <div className="website-stat-item">
            <div className="website-stat-number" data-target="200">0</div>
            <div className="website-stat-label">Countries</div>
          </div>
          <div className="website-stat-item">
            <div className="website-stat-number" data-target="99">0</div>
            <div className="website-stat-label">% Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;