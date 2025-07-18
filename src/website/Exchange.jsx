import React, { useRef, useEffect, useState } from 'react';
import { TrendingUp, TrendingDown} from 'lucide-react';
import image from "../../public/chartImg.webp"

const getRandom = (base, minDelta, maxDelta, decimals = 3) => {
  const delta = Math.random() * (maxDelta - minDelta) + minDelta;
  return (base + delta).toFixed(decimals);
};

const initialOrderBook = [
  { type: 'sell', price: 42880, amount: 0.125 },
  { type: 'sell', price: 42875, amount: 0.234 },
  { type: 'buy', price: 42850, amount: 0.456 },
  { type: 'buy', price: 42845, amount: 0.789 },
];

const symbols = [
  { symbol: 'BTC', stream: 'btcusdt', name: 'Bitcoin' },
  { symbol: 'ETH', stream: 'ethusdt', name: 'Ethereum' },
  { symbol: 'ADA', stream: 'adausdt', name: 'Cardano' },
  { symbol: 'DOT', stream: 'dotusdt', name: 'Polkadot' },
  { symbol: 'SOL', stream: 'solusdt', name: 'Solana' },
  { symbol: 'DOGE', stream: 'dogeusdt', name: 'Dogecoin' },
  { symbol: 'BNB', stream: 'bnbusdt', name: 'Binance Coin' },
];

const symbolIcons = {
  BTC: '/color/btc.svg',
  ETH: '/color/eth.svg',
  ADA: '/color/ada.svg',
  DOT: '/color/dot.svg',
  SOL: '/color/sol.svg',
  DOGE: '/color/doge.svg',
  BNB: '/color/bnb.svg',
};

const Exchange = () => {
  const sectionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [colVisible, setColVisible] = useState([false, false]);
  const [activeTab, setActiveTab] = useState('spot');

  // Dynamic order book state
  const [orderBook, setOrderBook] = useState(initialOrderBook);

  // Live crypto data state
  const [cryptoData, setCryptoData] = useState(symbols.map(s => ({
    symbol: s.symbol,
    name: s.name,
    price: '0.00',
    change: '0.0%',
    positive: true,
  })));

  useEffect(() => {
    const streams = symbols.map(s => `${s.stream}@ticker`).join('/');
    const ws = new window.WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const ticker = data.data;
      setCryptoData(prev =>
        prev.map(coin =>
          coin.symbol === ticker.s.replace('USDT', '')
            ? {
                ...coin,
                price: parseFloat(ticker.c).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                change: `${parseFloat(ticker.P).toFixed(2)}%`,
                positive: parseFloat(ticker.P) >= 0,
              }
            : coin
        )
      );
    };

    return () => ws.close();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderBook(prev => prev.map((item, idx) => {
        // Randomly add/subtract up to 10 from price, 0.01 from amount
        const price = parseFloat(getRandom(item.price, -10, 10, 2));
        const amount = parseFloat(getRandom(item.amount, -0.01, 0.01, 3));
        return {
          ...item,
          price: price > 0 ? price : item.price,
          amount: amount > 0 ? amount : item.amount,
        };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const screenerRef = useRef();
  useEffect(() => {
    const container = screenerRef.current;
    if (!container) return;
    container.innerHTML = `
      <div class="tradingview-widget-container__widget"></div>
      <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text"></span></a></div>
    `;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `{
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "light",
      "isTransparent": false,
      "locale": "en",
      "width": "100%",
      "height": 550
    }`;
    container.querySelector('.tradingview-widget-container__widget').appendChild(script);
    return () => { container.innerHTML = ''; };
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [visible]);

  useEffect(() => {
    if (visible) {
      [0, 1].forEach((i) => {
        setTimeout(() => {
          setColVisible(prev => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
          });
        }, i * 200);
      });
    }
  }, [visible]);

  return (
    <section id="exchange" className="website-exchange" ref={sectionRef}>
      <div className="website-container">
        <div className="website-section-header">
          <h2 className="website-section-title">Advanced Trading Platform</h2>
          <p className="website-section-subtitle">
            Professional-grade tools for advanced traders
          </p>
        </div>

        <div className="website-exchange-platform">
          <div className={`website-platform-sidebar section-fade-in${colVisible[0] ? ' visible' : ''}`}>
            <div className="website-tab-group">
              <button 
                className={`website-tab ${activeTab === 'spot' ? 'website-active' : ''}`}
                onClick={() => setActiveTab('spot')}
              >
                Spot Trading
              </button>
              <button 
              disabled="true"
                className={`website-tab ${activeTab === 'futures' ? 'website-active' : ''}`}
                onClick={() => setActiveTab('futures')}
              >
                Futures
              </button>
              <button 
                disabled="true"
                className={`website-tab ${activeTab === 'options' ? 'website-active' : ''}`}
                onClick={() => setActiveTab('options')}
              >
                Options
              </button>
            </div>

            <div className="website-market-list">
              <h3>Top Markets</h3>
              {cryptoData.map((crypto, index) => (
                <div key={index} className="website-market-item">
                  <div className="website-market-info">
                    <img src={symbolIcons[crypto.symbol]} alt={crypto.symbol + ' logo'} style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                    <span className="website-market-symbol">{crypto.symbol}</span>
                  </div>
                  <div className="website-market-data">
                    <span className="website-market-price">${crypto.price}</span>
                    <span className={`website-market-change ${crypto.positive ? 'website-positive' : 'website-negative'}`}>
                      {crypto.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {crypto.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`website-platform-main section-fade-in${colVisible[1] ? ' visible' : ''}`}>
            <div className="website-chart-section">
              <div className="website-chart-header">
                <h3>CRYPTO/USD</h3>
                 {/* <div className="website-chart-controls">
                  <button className="website-chart-btn website-active">1H</button>
                  <button className="website-chart-btn">4H</button>
                  <button className="website-chart-btn">1D</button>
                </div>  */}
              </div>
              <div className="tradingview-widget-container" ref={screenerRef}></div>
              
            </div>

            <div className="website-trading-panel">
              <div className="website-order-book">
                <h4>Order Book</h4>
                <div className="website-order-book-content">
                  <div className="website-order-book-header">
                    <span>Price</span>
                    <span>Amount</span>
                    <span>Total</span>
                  </div>
                  <div className="website-order-book-data">
                    {orderBook.map((item, idx) => (
                      <div key={idx} className={`website-order-item website-${item.type}`}>
                        <span>{item.price}</span>
                        <span>{item.amount}</span>
                        <span>{(item.price * item.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="website-trade-form">
                <div className="website-trade-tabs">
                  <button className="website-trade-tab website-active">Buy</button>
                  <button className="website-trade-tab">Sell</button>
                </div>
                <div className="website-trade-inputs">
                  <div className="website-input-group">
                    <label>Amount</label>
                    <input type="number" placeholder="0.00" readOnly />
                  </div>
                  <div className="website-input-group">
                    <label>Price</label>
                    <input type="number" placeholder="42,850.00" readOnly/>
                  </div>
                  <div className="website-input-group">
                    <label>Total</label>
                    <input type="number" placeholder="0.00" readOnly />
                  </div>
                </div>
                <button className="website-trade-execute">Place Buy Order</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exchange;