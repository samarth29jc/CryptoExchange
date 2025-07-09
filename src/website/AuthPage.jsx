import React, { useState, useEffect } from 'react';

const AuthPage = () => {
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', terms: false, privacy: false });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginAnimate, setLoginAnimate] = useState(false);

  useEffect(() => {
    if (mode === 'login') {
      setLoginAnimate(false);
      const timer = setTimeout(() => setLoginAnimate(true), 700); // Wait for blue mountain to finish
      return () => clearTimeout(timer);
    } else {
      setLoginAnimate(false);
    }
  }, [mode]);

  // Handlers for form changes
  const handleSignupChange = e => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  // Placeholder submit handlers
  const handleSignup = e => { e.preventDefault(); alert('Signup submitted!'); };
  const handleLogin = e => { e.preventDefault(); alert('Login submitted!'); };

  return (
    <div className={`auth-root ${mode}`}> {/* mode class for animation */}
      {/* Blue mountain and text for signup mode, animated out on login */}
      <div className={`auth-side auth-side-left${mode === 'login' ? ' hide' : ''} hide-mobile`}> {/* add hide-mobile class */}
        {mode === 'signup' && (
          <img src="/mountainLogin.png" alt="Logo" className="auth-logo-mountain" />
        )}
        <div className="auth-bg-mountain">
          <div className="auth-text-block">
            <h1 className="auth-highlight-text">
              <span className="white-gradient">
                You trade the Crypto.<br />
                We power the Exchange.<br />
              </span>
              <span className="auth-highlight-subtext">Securely. Instantly. Globally.</span>
            </h1>
            <p className="auth-support-text">
              Join a trusted platform to buy, sell, and store crypto assets.<br />
              Fast transactions, low fees, and military-grade security.<br />
              Built for traders, investors, and beginners alike.<br />
              Start your crypto journey with confidence.
            </p>
          </div>
        </div>
      </div>
      {/* Auth form section */}
      <div className={`auth-side auth-side-right${mode === 'login' ? (loginAnimate ? ' login-animate-in' : '') : ''}`}>
        {mode === 'login' && loginAnimate && (
          <img src="/whiteLogin.png" alt="Logo" className="auth-logo-mountain" />
        )}
        {mode === 'signup' ? (
          <>
            <form className="auth-form" onSubmit={handleSignup}>
              <h2 className="auth-form-title">Sign Up</h2>
              <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupChange} required />
              <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required />
              <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required />
              <div className="auth-checkbox-group">
                <label><input type="checkbox" name="terms" checked={signupData.terms} onChange={handleSignupChange} required /> I agree to the Terms & Conditions</label>
                <label><input type="checkbox" name="privacy" checked={signupData.privacy} onChange={handleSignupChange} required /> I agree to the Privacy Policy</label>
              </div>
              <button type="submit" className="auth-submit-btn">Create Account</button>
            </form>
            <div className="auth-form-toggle">
              <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Log In</button>
              <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign Up</button>
            </div>
          </>
        ) : (
          <>
            {loginAnimate && (
              <form className="auth-form show-login-form" onSubmit={handleLogin}>
                <h2 className="auth-form-title">Log In</h2>
                <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                <button type="submit" className="auth-submit-btn">Log In</button>
              </form>
            )}
            <div className="auth-form-toggle">
              <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Log In</button>
              <button className={mode === 'signup' ? 'active' : ''} onClick={() => setMode('signup')}>Sign Up</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage; 