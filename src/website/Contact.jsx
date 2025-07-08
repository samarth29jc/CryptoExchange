import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Users, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@bitqilo.com",
      description: "Get in touch via email"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "24/7 customer support"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Crypto Street, Digital City",
      description: "Our headquarters"
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: MessageSquare, value: "24/7", label: "Support Available" },
    { icon: Clock, value: "<1hr", label: "Response Time" },
    { icon: CheckCircle, value: "99.9%", label: "Satisfaction Rate" }
  ];

  return (
    <section id="contact" className="website-contact">
      <div className="website-container">
        <div className="website-section-header">
          <h2 className="website-section-title">
            Get in <span className="website-gradient-text">Touch</span>
          </h2>
          <p className="website-section-subtitle">
            Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="website-contact-stats">
          {stats.map((stat, index) => (
            <div key={index} className="website-contact-stat">
              <div className="website-contact-stat-icon">
                <stat.icon />
              </div>
              <div className="website-contact-stat-content">
                <div className="website-contact-stat-value">{stat.value}</div>
                <div className="website-contact-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="website-contact-content">
          <div className="website-contact-info">
            <h3>Let's Start a Conversation</h3>
            <p>
              Whether you're a new trader looking to get started or an experienced investor 
              seeking advanced features, our team is ready to assist you.
            </p>

            <div className="website-contact-methods">
              {contactInfo.map((info, index) => (
                <div key={index} className="website-contact-method">
                  <div className="website-contact-method-icon">
                    <info.icon />
                  </div>
                  <div className="website-contact-method-content">
                    <h4>{info.title}</h4>
                    <p className="website-contact-method-value">{info.content}</p>
                    <p className="website-contact-method-desc">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          <div className="website-contact-form-container">
            <div className="website-contact-form-wrapper">
              <h3>Send us a Message</h3>
              <p>Fill out the form below and we'll get back to you within 24 hours.</p>

              <form onSubmit={handleSubmit} className="website-contact-form">
                <div className="website-form-row">
                  <div className="website-form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="website-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="website-form-group">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="trading">Trading Questions</option>
                    <option value="account">Account Issues</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="website-form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`website-contact-submit ${isSubmitting ? 'website-submitting' : ''} ${isSubmitted ? 'website-submitted' : ''}`}
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="website-submit-icon" />
                      Message Sent!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="website-submit-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="website-submit-icon" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;