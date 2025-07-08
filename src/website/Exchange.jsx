import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import image from "../../public/chartImg.png"

const Exchange = () => {
  const [activeTab, setActiveTab] = useState('spot');

  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: '42,850.00', change: '+5.2%', volume: '1.2B', positive: true },
    { symbol: 'ETH', name: 'Ethereum', price: '3,245.80', change: '+3.8%', volume: '800M', positive: true },
    { symbol: 'ADA', name: 'Cardano', price: '1.23', change: '-2.1%', volume: '450M', positive: false },
    { symbol: 'DOT', name: 'Polkadot', price: '28.90', change: '+1.5%', volume: '320M', positive: true },
    { symbol: 'SOL', name: 'Solana', price: '158.40', change: '+8.2%', volume: '680M', positive: true },
  ];

  return (
    <section id="exchange" className="website-exchange">
      <div className="website-container">
        <div className="website-section-header">
          <h2 className="website-section-title">Advanced Trading Platform</h2>
          <p className="website-section-subtitle">
            Professional-grade tools for serious traders
          </p>
        </div>

        <div className="website-exchange-platform">
          <div className="website-platform-sidebar">
            <div className="website-tab-group">
              <button 
                className={`website-tab ${activeTab === 'spot' ? 'website-active' : ''}`}
                onClick={() => setActiveTab('spot')}
              >
                Spot Trading
              </button>
              <button 
                className={`website-tab ${activeTab === 'futures' ? 'website-active' : ''}`}
                onClick={() => setActiveTab('futures')}
              >
                Futures
              </button>
              <button 
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
                    <span className="website-market-symbol">{crypto.symbol}</span>
                    <span className="website-market-name">{crypto.name}</span>
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

          <div className="website-platform-main">
            <div className="website-chart-section">
              <div className="website-chart-header">
                <h3>BTC/USD</h3>
                <div className="website-chart-controls">
                  <button className="website-chart-btn website-active">1H</button>
                  <button className="website-chart-btn">4H</button>
                  <button className="website-chart-btn">1D</button>
                  <button className="website-chart-btn">1W</button>
                </div>
              </div>
              <img src={image} alt="chart image" className="website-chart-video" />
              
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
                    <div className="website-order-item website-sell">
                      <span>42,880</span>
                      <span>0.125</span>
                      <span>5,360</span>
                    </div>
                    <div className="website-order-item website-sell">
                      <span>42,875</span>
                      <span>0.234</span>
                      <span>10,032</span>
                    </div>
                    <div className="website-order-item website-buy">
                      <span>42,850</span>
                      <span>0.456</span>
                      <span>19,540</span>
                    </div>
                    <div className="website-order-item website-buy">
                      <span>42,845</span>
                      <span>0.789</span>
                      <span>33,825</span>
                    </div>
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
                    <input type="number" placeholder="0.00" />
                  </div>
                  <div className="website-input-group">
                    <label>Price</label>
                    <input type="number" placeholder="42,850.00" />
                  </div>
                  <div className="website-input-group">
                    <label>Total</label>
                    <input type="number" placeholder="0.00" />
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