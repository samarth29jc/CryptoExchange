import React, { useRef, useEffect, useState } from 'react';
import { Shield, Zap, Users, BarChart3, Lock, Smartphone } from 'lucide-react';

const features = [
  { icon: Shield, title: "Enterprise Security", description: "Military-grade encryption and multi-layer security protocols protect your digital assets 24/7." },
  { icon: Zap, title: "Lightning Speed", description: "Execute trades in milliseconds with our advanced matching engine and global infrastructure." },
  { icon: Users, title: "24/7 Support", description: "Get expert help whenever you need it with our round-the-clock customer support team." },
  { icon: BarChart3, title: "Advanced Analytics", description: "Make informed decisions with real-time market data and professional trading tools." },
  { icon: Lock, title: "Cold Storage", description: "Your funds are secured in offline cold storage with institutional-grade protection." },
  { icon: Smartphone, title: "Mobile Trading", description: "Trade on the go with our feature-rich mobile app available on iOS and Android." }
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
            Built for traders, by traders. Experience the difference with our cutting-edge platform.
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