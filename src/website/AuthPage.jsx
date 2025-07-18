import React, { useState, useEffect, useRef } from 'react';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', terms: false, privacy: false });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginAnimate, setLoginAnimate] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' }); // type: 'success' | 'error'

  useEffect(() => {
    if (mode === 'login') {
      setLoginAnimate(false);
      const timer = setTimeout(() => setLoginAnimate(true), 700); // Wait for blue mountain to finish
      return () => clearTimeout(timer);
    } else {
      setLoginAnimate(false);
    }
  }, [mode]);

  const navigate = useNavigate();

  // Dummy user credentials
  const DUMMY_USER = { email: 'demo@krypttos.com', password: 'demo123', username: 'DemoUser' };

  // Handlers for form changes
  const handleSignupChange = e => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleLoginChange = e => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };
 
  // Password validation helper
  const isValidPassword = (password) => {
    // At least 8 chars, at least one letter, one number, one special char
    // regular expression written with the help of gpt to reduce redundent checks
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password);
  };

  // Store user in localStorage on signup
  const handleSignup = e => {
    e.preventDefault();
    if (!isValidPassword(signupData.password)) {
      setPopup({ show: true, message: 'Password must be at least 8 characters, include a letter, a number, and a special character.', type: 'error' });
      setTimeout(() => setPopup({ show: false, message: '', type: '' }), 2500);
      return;
    }
    // Save user to localStorage (by email)
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[signupData.email]) {
      setPopup({ show: true, message: 'User already exists with this email.', type: 'error' });
      setTimeout(() => setPopup({ show: false, message: '', type: '' }), 2000);
      return;
    }
    users[signupData.email] = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password
    };
    localStorage.setItem('users', JSON.stringify(users));
    setPopup({ show: true, message: 'Account created! You can now log in.', type: 'success' });
    setTimeout(() => {
      setPopup({ show: false, message: '', type: '' });
      setMode('login');
      setLoginData({ email: signupData.email, password: '' });
    }, 1800);
  };

  // Login handler: check dummy user or localStorage
  const handleLogin = e => {
    e.preventDefault();
    const { email, password } = loginData;
    let valid = false;
    // Check dummy user
    if (email === DUMMY_USER.email && password === DUMMY_USER.password) {
      valid = true;
      localStorage.setItem('currentUser', JSON.stringify(DUMMY_USER));
    } else {
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      if (users[email] && users[email].password === password) {
        valid = true;
        localStorage.setItem('currentUser', JSON.stringify(users[email]));
      }
    }
    if (valid) {
      setLoginSuccess(true);
      setTimeout(() => {
        setLoginSuccess(false);
        navigate('/'); // Route to home
      }, 1000);
    } else {
      setPopup({ show: true, message: 'Invalid email or password.', type: 'error' });
      setTimeout(() => setPopup({ show: false, message: '', type: '' }), 2000);
    }
  };

  const otpRefs = useRef([]);

  // Add a helper to check if all signup fields are filled
  const isSignupFilled = signupData.username && signupData.email && signupData.password;

  return (
    <div className={`auth-root ${mode}`}> {/* mode class for animation */}
      {/* Blue mountain and text for signup mode, animated out on login */}
      <div className={`auth-side auth-side-left${mode === 'login' ? ' hide' : ''} hide-mobile`}> {/* add hide-mobile class */}
        {mode === 'signup' && (
          <img src="/mountainLogin.webp" alt="Logo" className="auth-logo-mountain" />
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
              Fast transactions, low fees, and Zero compromise security.<br/>
              Built for traders, investors, and beginners alike.<br />
              Start your crypto journey with confidence.
            </p>
          </div>
        </div>
      </div>
      {/* Auth form section */}
      <div className={`auth-side auth-side-right${mode === 'login' ? (loginAnimate ? ' login-animate-in' : '') : ''}`}>
        {mode === 'login' && loginAnimate && (
          <img src="/whiteLogin.webp" alt="Logo" className="auth-logo-mountain" />
        )}
        {mode === 'signup' ? (
          <>
            {/* Show whiteLogin.png logo on mobile when blue mountain is hidden */}
            <img src="/whiteLogin.webp" alt="Logo" className="auth-logo-mobile" />
            <form className="auth-form" onSubmit={handleSignup}>
              <h2 className="auth-form-title">Sign Up</h2>
              <div className="website-form-group">
                <input type="text" name="username" placeholder="Username" value={signupData.username} onChange={handleSignupChange} required className="website-form-group-input" />
              </div>
              <div className="website-form-group">
                <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} required className="website-form-group-input" />
              </div>
              <div className="website-form-group">
                <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} required className="website-form-group-input" />
              </div>
              <div className="auth-checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="terms"
                    checked={signupData.terms}
                    onChange={handleSignupChange}
                    required
                    disabled={!isSignupFilled}
                  />
                  I agree to the Terms & Conditions
                </label>
                {/* <label><input type="checkbox" name="privacy" checked={signupData.privacy} onChange={handleSignupChange} required /> I agree to the Privacy Policy</label> */}
              </div>
              <button type="submit" className="auth-submit-btn">Create Account</button>
            </form>
            <div className="auth-form-toggle-text">
              Already have an account?{' '}
              <span className="auth-toggle-link" onClick={() => setMode('login')}>Log in</span>
            </div>
          </>
        ) : (
          <>
            {loginAnimate && (
              <form className="auth-form show-login-form" onSubmit={handleLogin}>
                {loginSuccess && (
                  <div className="animated-message-box">Login is successful</div>
                )}
                <h2 className="auth-form-title">Log In</h2>
                <div className="website-form-group">
                  <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required className="website-form-group-input" />
                </div>
                <div className="website-form-group">
                  <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required className="website-form-group-input" />
                </div>
                <div style={{textAlign:'left',margin:'-10px 0 8px 2px'}}>
                  <button type="button" style={{background:'none',border:'none',color:'#2563eb',fontWeight:400,cursor:'pointer',padding:0}} onClick={()=>setForgotOpen(true)}>
                    Forgot Password?
                  </button>
                </div>
                <button type="submit" className="auth-submit-btn">Log In</button>
              </form>
            )}
            <ForgotPasswordModal open={forgotOpen} onClose={()=>setForgotOpen(false)} />
            <div className="auth-form-toggle-text">
              Don't have an account with Krypttos?{' '}
              <span className="auth-toggle-link" onClick={() => setMode('signup')}>Sign up</span>
            </div>
          </>
        )}
      </div>
      {/* Popup UI */}
      {popup.show && (
        <div className={`auth-popup ${popup.type}`}>{popup.message}</div>
      )}
    </div>
  );
};

export default AuthPage; 