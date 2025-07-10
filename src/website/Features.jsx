import React, { useRef, useEffect, useState } from 'react';
import { Shield, Zap, Users, BarChart3, Lock, Smartphone } from 'lucide-react';

const features = [
  { icon: Shield, title: "Trusted Security", description: "Trade in milliseconds with our high-performance matching engine and globally distributed infrastructure." },
  { icon: Zap, title: "Instant Help", description: "Execute trades in milliseconds with our advanced matching engine and global infrastructure." },
  { icon: Users, title: "24/7 Support", description:"Get instant help from our expert team — available 24/7 to resolve issues and answer your questions." },
  { icon: BarChart3, title: "Advanced Analytics", description: "Stay ahead of the market with real-time data, smart insights, and powerful trading tools built for precision." },
  { icon: Lock, title: "Cold Storage", description: "We store the majority of assets in secure, offline environments, using high-assurance security standards to ensure maximum protection from online threats." },
  { icon: Smartphone, title: "All-in-One Access", description: "Your one-stop platform to explore, trade, and manage multiple cryptocurrencies with ease." }
];

const Features = () => {
  const sectionRef = useRef();
  const [visible, setVisible] = useState(false);
  const [cardVisible, setCardVisible] = useState(Array(features.length).fill(false));

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
      features.forEach((_, i) => {
        setTimeout(() => {
          setCardVisible(prev => {
            const updated = [...prev];
            updated[i] = true;
            return updated;
          });
        }, i * 200);
      });
    }
  }, [visible]);

  return (
    <section
      id="features"
      className="website-features"
      ref={sectionRef}
    >
      <div className="website-container">
        <div className="website-section-header">
          <h2 className="website-section-title">Why Choose Bitqilo?</h2>
          <p className="website-section-subtitle">
          Built by traders, for traders — experience the power of a platform crafted for performance, precision, and profit.
          </p>
        </div>

        <div className="website-features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`website-feature-card section-fade-in${cardVisible[index] ? ' visible' : ''}`}
            >
              <div className="website-feature-icon-wrapper">
                <feature.icon className="website-feature-icon" />
              </div>
              <h3 className="website-feature-title">{feature.title}</h3>
              <p className="website-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;