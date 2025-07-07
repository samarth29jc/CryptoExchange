import React from 'react';
import { Shield, Lock, Eye, Users, Award, CheckCircle } from 'lucide-react';

const Security = () => {
  const securityFeatures = [
    {
      icon: Shield,
      title: "Multi-Layer Security",
      description: "Advanced encryption, 2FA, and biometric authentication"
    },
    {
      icon: Lock,
      title: "Cold Storage",
      description: "95% of funds stored offline in secure vaults"
    },
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "24/7 surveillance and threat detection systems"
    },
    {
      icon: Users,
      title: "Regulatory Compliance",
      description: "Licensed and regulated in multiple jurisdictions"
    }
  ];

  const certifications = [
    "ISO 27001 Certified",
    "SOC 2 Type II",
    "PCI DSS Level 1",
    "GDPR Compliant"
  ];

  return (
    <section id="security" className="website-security">
      <div className="website-container">
        <div className="website-security-content">
          <div className="website-security-text">
            <h2 className="website-section-title">
              Your Security is Our
              <span className="website-gradient-text"> Priority</span>
            </h2>
            <p className="website-section-subtitle">
              We employ bank-grade security measures to protect your assets 
              and personal information with the highest standards in the industry.
            </p>

            <div className="website-security-features">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="website-security-feature">
                  <div className="website-security-icon">
                    <feature.icon />
                  </div>
                  <div className="website-security-info">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="website-certifications">
              <h4>Industry Certifications</h4>
              <div className="website-certification-list">
                {certifications.map((cert, index) => (
                  <div key={index} className="website-certification-item">
                    <CheckCircle className="website-cert-icon" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="website-security-visual">
            <div className="website-security-card">
              <div className="website-security-header">
                <Award className="website-security-logo" />
                <h3>Security Center</h3>
              </div>
              <div className="website-security-metrics">
                <div className="website-metric">
                  <div className="website-metric-value">100%</div>
                  <div className="website-metric-label">Uptime</div>
                </div>
                <div className="website-metric">
                  <div className="website-metric-value">$50B+</div>
                  <div className="website-metric-label">Assets Secured</div>
                </div>
                <div className="website-metric">
                  <div className="website-metric-value">0</div>
                  <div className="website-metric-label">Security Breaches</div>
                </div>
              </div>
              <div className="website-security-status">
                <div className="website-status-indicator website-active"></div>
                <span>All Systems Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;