import React, { useRef } from 'react';
import { Shield, Lock, Eye, Users, Award, CheckCircle } from 'lucide-react';

// SVGs for Bitcoin, Ethereum, and Solana
// const BitcoinSVG = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="12" cy="12" r="12" fill="#F7931A"/>
//     <text x="12" y="16" textAnchor="middle" fontSize="14" fill="#fff" fontWeight="bold">₿</text>
//   </svg>
// );
// const EthSVG = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="12" cy="12" r="12" fill="#627EEA"/>
//     <polygon points="12,4 19,12 12,20 5,12" fill="#fff"/>
//   </svg>
// );
// const SolSVG = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="12" cy="12" r="12" fill="#00FFA3"/>
//     <rect x="6" y="8" width="12" height="2" rx="1" fill="#fff"/>
//     <rect x="6" y="14" width="12" height="2" rx="1" fill="#fff"/>
//   </svg>
// );
// const icons = [BitcoinSVG, EthSVG, SolSVG];

const Security = () => {
  //code for cursor animation
  const particleRef = useRef();

  // BEAUTIFUL CURSOR ANIMATION ON MOUSE MOVE

  // const handleMouseMove = (e) => {
  //   const Icon = icons[Math.floor(Math.random() * icons.length)];
  //   const particle = document.createElement('div');
  //   particle.className = 'particle';
  //   // Position relative to the section
  //   const rect = particleRef.current.getBoundingClientRect();
  //   particle.style.left = `${e.clientX - rect.left}px`;
  //   particle.style.top = `${e.clientY - rect.top}px`;
  //   particle.innerHTML = Icon().props.children.reduce((acc, el) => acc + (el && el.type ? el.type === 'svg' ? '' : el.props.children : ''), '') || Icon().props.children;
  //   // Actually render the SVG
  //   particle.innerHTML = Icon().props.children ? Icon().props.children.map((el, i) => {
  //     if (typeof el === 'string') return el;
  //     const { type, props } = el;
  //     if (type === 'circle') return `<circle cx="${props.cx}" cy="${props.cy}" r="${props.r}" fill="${props.fill}"/>`;
  //     if (type === 'polygon') return `<polygon points="${props.points}" fill="${props.fill}"/>`;
  //     if (type === 'rect') return `<rect x="${props.x}" y="${props.y}" width="${props.width}" height="${props.height}" rx="${props.rx}" fill="${props.fill}"/>`;
  //     if (type === 'text') return `<text x="${props.x}" y="${props.y}" text-anchor="middle" font-size="${props.fontSize}" fill="${props.fill}" font-weight="bold">${props.children}</text>`;
  //     return '';
  //   }).join('') : '';
  //   particle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24">${particle.innerHTML}</svg>`;
  //   particleRef.current.appendChild(particle);
  //   // Animate and remove after 1s
  //   setTimeout(() => {
  //     particle.classList.add('particle-fade');
  //     setTimeout(() => particle.remove(), 500);
  //   }, 500);
  // };

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


  // .website-exchange nikala nicha sa
  return (
    <section id="security" className="website-security" style={{position: 'relative', overflow: 'hidden'}}>
      <div ref={particleRef} className="particle-container" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20}}></div>
      <div className="website-container">
        <div className="website-security-content">
          <div className="website-security-text">
            <h2 className="website-section-titlee">
              Your Security is Our
              <span className="website-gradient-text"> Priority</span>
            </h2>
            <p className="website-section-subtitlee">
            We use advanced security protocols and encryption to safeguard your assets and personal data—your safety is our top priority
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
                  <div className="website-metric-value">99.99%</div>
                  <div className="website-metric-label">Uptime</div>
                </div>
                <div className="website-metric">
                  <div className="website-metric-value">$50B+</div>
                  <div className="website-metric-label">Assets Secured</div>
                </div>
                <div className="website-metric">
                  <div className="website-metric-value">5.3M+</div>
                  <div className="website-metric-label">Transactions Processed</div>
                </div>
                <div className="website-metric">
                  <div className="website-metric-value">24/7</div>
                  <div className="website-metric-label">Monitoring</div>
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