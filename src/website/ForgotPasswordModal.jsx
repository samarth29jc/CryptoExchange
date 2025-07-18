import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ForgotPasswordModal = ({ open, onClose }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [otpResend, setOtpResend] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpRefs = useRef([]);

  // Mask email for display: show first 3 letters, then asterisks, then @domain
  const getMaskedEmail = (email) => {
    if (!email) return '';
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    const visible = user.slice(0, 3);
    const masked = '*'.repeat(Math.max(user.length - 3, 0));
    return `${visible}${masked}@${domain}`;
  };

  // Timer for resend OTP
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleResendOTP = () => {
    setOtpResend(true);
    setResendTimer(60); // 1 minute
    // Here you would trigger the resend OTP logic
  };

  const handleOTPInput = (idx, val) => {
    if (/^\d?$/.test(val)) {
      const arr = [...otp];
      arr[idx] = val;
      setOtp(arr);
      if (val && idx < 5) {
        otpRefs.current[idx+1]?.focus();
      }
    }
  };
  const handleEmailSubmit = e => {
    e.preventDefault();
    setStep(2);
  };
  const handleOTPSubmit = e => {
    e.preventDefault();
    setStep(3);
  };
  const handlePassSubmit = e => {
    e.preventDefault();
    onClose();
    setTimeout(() => {
      setStep(1);
      setEmail('');
      setOtp(['', '', '', '', '', '']);
      setNewPass('');
      setConfirmPass('');
      setOtpResend(false);
    }, 300);
  };
  if (!open) return null;
  return createPortal(
    <div className="footer-modal-overlay" onClick={onClose}>
      <div className="footer-modal" style={{minWidth:320, maxWidth:500, width:'90vw', textAlign:'left'}} onClick={e=>e.stopPropagation()}>
        <button className="footer-modal-close" onClick={onClose}>&times;</button>
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="auth-form-title">Reset Password</h2>
            <p style={{marginBottom:16}}>Use your e-mail to reset your password.</p>
            <input type="email" className="auth-input" placeholder="Email ID" value={email} onChange={e=>setEmail(e.target.value)} required style={{marginBottom:20}} />
            <button className="auth-submit-btn" type="submit" style={{width:'100%'}}>Get OTP &rarr;</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleOTPSubmit}>
            <h2 className="auth-form-title">Enter verification code</h2>
            <p style={{marginBottom:16}}>Enter the 6 digit code that you have received on<br/><b style={{fontSize:'1rem'}}>{getMaskedEmail(email)}</b></p>
            <div style={{display:'flex',gap:8,justifyContent:'center',margin:'16px 0'}}>
              {otp.map((v,i)=>(
                <input key={i} ref={el => otpRefs.current[i] = el} id={`otp-input-${i}`} type="text" inputMode="numeric" maxLength={1} value={v} onChange={e=>handleOTPInput(i,e.target.value)} style={{width:36,height:36,textAlign:'center',fontSize:'1.3rem',borderRadius:6,border:'1px solid #cbd5e1'}} />
              ))}
            </div>
            <button className="auth-submit-btn" type="submit" style={{width:'100%'}}>Next &rarr;</button>
            <div style={{marginTop:12,fontSize:'0.97rem',textAlign:'center'}}>
              Didn't Receive OTP?{' '}
              <button
                type="button"
                style={{background:'none',border:'none',color: resendTimer > 0 ? '#94a3b8' : '#2563eb',cursor: resendTimer > 0 ? 'not-allowed' : 'pointer',fontWeight:600}}
                onClick={handleResendOTP}
                disabled={resendTimer > 0}
              >
                {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : 'Resend OTP'}
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handlePassSubmit}>
            <h2 className="auth-form-title">Create new password</h2>
            <p style={{marginBottom:16}}>Use your registered e-mail address to reset your password.</p>
            <input type="password" className="auth-input" placeholder="Create New Password" value={newPass} onChange={e=>setNewPass(e.target.value)} required style={{marginBottom:12}} />
            <input type="password" className="auth-input" placeholder="Confirm Password" value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} required style={{marginBottom:20}} />
            <button className="auth-submit-btn" type="submit" style={{width:'100%'}}>Create</button>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ForgotPasswordModal; 