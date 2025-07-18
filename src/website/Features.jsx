import React, { useRef, useEffect, useState } from 'react';
import { Shield, Zap, Users, BarChart3, CheckCircle, AlertTriangle } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: "Accessibility",
    description: "Easily start investing with no prior crypto knowledge. Designed to remove barriers and make crypto trading accessible to everyone."
  },
  {
    icon: Zap,
    title: "Fully Automated",
    description: "Enjoy fast, secure, and efficient trading with a fully automated system that reduces manual work and minimizes risks."
  },
  {
    icon: AlertTriangle,
    title: "Risk Management",
    description: "Advanced risk controls help protect your investments and improve decision-making for more consistent, long-term gains."
  },
  {
    icon: BarChart3,
    title: "Only Pay for Profits",
    description: "No upfront fees—only pay when your AI trading agents generate actual profits for your account."
  },
  {
    icon: Shield,
    title: "Security",
    description: "Your funds never leave your exchange. Trade securely through encrypted API connections while maintaining full control."
  },
  {
    icon: CheckCircle,
    title: "Security Audit Completed",
    description: "Externally audited to confirm strong security, system reliability, and a trustworthy user experience for all investors."
  }
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
          <h2 className="website-section-title">Why Choose Krypttos?</h2>
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