import React from 'react';
import { Shield, Zap, Users, BarChart3, Lock, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption and multi-layer security protocols protect your digital assets 24/7."
    },
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Execute trades in milliseconds with our advanced matching engine and global infrastructure."
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Get expert help whenever you need it with our round-the-clock customer support team."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Make informed decisions with real-time market data and professional trading tools."
    },
    {
      icon: Lock,
      title: "Cold Storage",
      description: "Your funds are secured in offline cold storage with institutional-grade protection."
    },
    {
      icon: Smartphone,
      title: "Mobile Trading",
      description: "Trade on the go with our feature-rich mobile app available on iOS and Android."
    }
  ];

  return (
    <section id="features" className="website-features">
      <div className="website-container">
        <div className="website-section-header">
          <h2 className="website-section-title">Why Choose AxiPays?</h2>
          <p className="website-section-subtitle">
            Built for traders, by traders. Experience the difference with our cutting-edge platform.
          </p>
        </div>

        <div className="website-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="website-feature-card">
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