import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import smallchart from "../../public/image.png"
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // for animation of counting
    const statNumbers = document.querySelectorAll('.website-stat-number');
    let animated = false;

    function animateCount(el, target, decimals = 0, suffix = '') {
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + (target - start) * progress;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toFixed(decimals) + suffix;
        }
      }
      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          //for counting animation
          if (entry.isIntersecting && !animated) {
            animated = true;
            statNumbers.forEach(el => {
              const target = parseFloat(el.getAttribute('data-target'));
              const decimals = parseInt(el.getAttribute('data-decimals')) || 0;
              const suffix = el.getAttribute('data-suffix') || '';
              animateCount(el, target, decimals, suffix);
            });
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
              Experience next-generation crypto trading with Bitqilo. 
              Secure, fast, and intuitive platform trusted by millions of traders worldwide.
            </p>
            
            <div className="website-hero-actions">
              <button className="website-btn-primary website-btn-large" onClick={() => navigate('/auth')}>
                Start Trading
                <ArrowRight className="website-btn-icon" />
              </button>
              <button
                className="website-btn-outline"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Learn More
              </button>
            </div>

            {/* <div className="website-hero-features">
              <div className="website-feature-item">
               
                <span>Bank-Grade Security</span>
              </div>
              <div className="website-feature-item">
              
                <span>Lightning Fast</span>
              </div>
              <div className="website-feature-item">
               
                <span>Global Access</span>
              </div>
            </div> */}
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
                  <img className="chart-stonks" src={smallchart} alt='chart image stonks' width={350}></img>
                </div>
                <div className="website-trading-actions">
                  <button className="website-trade-btn website-buy">Buy</button>
                  <button className="website-trade-btn website-sell">Sell</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replace .website-hero-stats with TradingViewWidget */}
        <TradingViewWidget />
      </div>
    </section>
  );
};

const TradingViewWidget = () => {
  const container = useRef();

  useEffect(() => {
    // Clear previous widget if any
    if (container.current) {
      container.current.innerHTML = "";
    }
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          {
            "proName": "FOREXCOM:SPXUSD",
            "title": "S&P 500 Index"
          },
          {
            "proName": "FOREXCOM:NSXUSD",
            "title": "US 100 Cash CFD"
          },
          {
            "proName": "FX_IDC:EURUSD",
            "title": "EUR to USD"
          },
          {
            "proName": "BITSTAMP:BTCUSD",
            "title": "Bitcoin"
          },
          {
            "proName": "BITSTAMP:ETHUSD",
            "title": "Ethereum"
          }
        ],
        "colorTheme": "light",
        "locale": "en",
        "largeChartUrl": "true",
        "isTransparent": true,
        "showSymbolLogo": true,
        "displayMode": "compact"
      }`;
    if (container.current) {
      container.current.appendChild(script);
    }
    // Cleanup on unmount
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container" ref={container}>
      <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"></a>
    </div>
  );
};

export default Hero;