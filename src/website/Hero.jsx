import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';
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

  // Inline TradingViewWidget implementation (React way)
  const tradingViewRef = useRef();
  useEffect(() => {
    const container = tradingViewRef.current;
    if (!container) return;

    // Clear container to prevent script duplication
    container.innerHTML = '';

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          { "proName": "BITSTAMP:BTCUSD", "title": "Bitcoin" },
          { "proName": "BITSTAMP:ETHUSD", "title": "Ethereum" },
          { "proName": "XETR:POLY", "title": "polygoan" },
          { "proName": "CRYPTOCAP:DOGE", "title": "dogecoin" },
          { "proName": "TRADENATION:SOLANA", "title": "solana" },
          { "proName": "CRYPTOCAP:BNB", "title": "BNB" },
          { "proName": "CRYPTOCAP:XRP", "title": "XRP" },
          { "proName": "TRADENATION:TRONUSD", "title": "TRON" }
        ],
        "colorTheme": "light",
        "locale": "en",
        "largeChartUrl": "",
        "isTransparent": false,
        "showSymbolLogo": true,
        "displayMode": "compact"
      }`;
    
    // The TradingView script populates the container, so we just append it
    container.appendChild(script);

    // Cleanup on unmount
    return () => {
        if (container) {
            container.innerHTML = '';
        }
    };
}, []);

  // Ref for TradingView Market Overview widget
  const marketOverviewRef = useRef();
  useEffect(() => {
    const container = marketOverviewRef.current;
    if (!container) return;
    container.innerHTML = `
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text"></span></a></div>
    `;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    script.innerHTML = `{
      "title": "Cryptocurrencies",
      "title_raw": "Cryptocurrencies",
      "tabs": [
        {
          "title": "Overview",
          "title_raw": "Overview",
          "symbols": [
            { "s": "CRYPTOCAP:TOTAL" },
            { "s": "BITSTAMP:BTCUSD" },
            { "s": "BITSTAMP:ETHUSD" },
            { "s": "COINBASE:SOLUSD" },
            { "s": "BINANCE:AVAXUSD" },
            { "s": "COINBASE:UNIUSD" }
          ],
          "quick_link": { "title": "More cryptocurrencies", "href": "/markets/cryptocurrencies/prices-all/" }
        },
        {
          "title": "Bitcoin",
          "title_raw": "Bitcoin",
          "symbols": [
            { "s": "BITSTAMP:BTCUSD" },
            { "s": "COINBASE:BTCEUR" },
            { "s": "COINBASE:BTCGBP" },
            { "s": "BITFLYER:BTCJPY" },
            { "s": "BMFBOVESPA:BIT1!" }
          ],
          "quick_link": { "title": "More Bitcoin pairs", "href": "/symbols/BTCUSD/markets/" }
        },
        {
          "title": "Ethereum",
          "title_raw": "Ethereum",
          "symbols": [
            { "s": "BITSTAMP:ETHUSD" },
            { "s": "KRAKEN:ETHEUR" },
            { "s": "COINBASE:ETHGBP" },
            { "s": "BITFLYER:ETHJPY" },
            { "s": "BINANCE:ETHBTC" },
            { "s": "BINANCE:ETHUSDT" }
          ],
          "quick_link": { "title": "More Ethereum pairs", "href": "/symbols/ETHUSD/markets/" }
        },
        {
          "title": "Solana",
          "title_raw": "Solana",
          "symbols": [
            { "s": "COINBASE:SOLUSD" },
            { "s": "BINANCE:SOLEUR" },
            { "s": "COINBASE:SOLGBP" },
            { "s": "BINANCE:SOLBTC" },
            { "s": "COINBASE:SOLETH" },
            { "s": "BINANCE:SOLUSDT" }
          ],
          "quick_link": { "title": "More Solana pairs", "href": "/symbols/SOLUSD/markets/" }
        },
        {
          "title": "Uniswap",
          "title_raw": "Uniswap",
          "symbols": [
            { "s": "COINBASE:UNIUSD" },
            { "s": "KRAKEN:UNIEUR" },
            { "s": "COINBASE:UNIGBP" },
            { "s": "BINANCE:UNIBTC" },
            { "s": "KRAKEN:UNIETH" },
            { "s": "BINANCE:UNIUSDT" }
          ],
          "quick_link": { "title": "More Uniswap pairs", "href": "/symbols/UNIUSD/markets/" }
        }
      ],
      "title_link": "/markets/cryptocurrencies/prices-all/",
      "width": "100%",
      "height": "100%",
      "showChart": true,
      "showFloatingTooltip": false,
      "locale": "en",
      "plotLineColorGrowing": "#2962FF",
      "plotLineColorFalling": "#2962FF",
      "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
      "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
      "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
      "gridLineColor": "rgba(240, 243, 250, 0)",
      "scaleFontColor": "rgba(120, 123, 134, 1)",
      "showSymbolLogo": true,
      "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
      "colorTheme": "light"
    }`;
    container.querySelector('.tradingview-widget-container__widget').appendChild(script);
    return () => { container.innerHTML = ''; };
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
              Experience next-generation crypto trading with Krypttos. 
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
                {/* <div className="website-price-display"> */}
                  {/* <span className="website-price">$42,850.00</span>
                  <span className="website-change website-positive">+5.2%</span> */}
                {/* </div> */}
                <div className="website-chart-placeholder">
                  {/* TradingView Market Overview Widget */}
                  <div
                    className="tradingview-widget-container tv-embed-widget-wrapper__body js-embed-widget-body"
                    ref={marketOverviewRef}
                  ></div>
                </div>
                <div className="website-trading-actions">
                  <button className="website-trade-btn website-buy">Buy</button>
                  <button className="website-trade-btn website-sell">Sell</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TradingView Widget */}
        <div className="tradingview-widget-container" ref={tradingViewRef}>
          <div className="tradingview-widget-container__widget"></div>
          <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text"></span></a></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;