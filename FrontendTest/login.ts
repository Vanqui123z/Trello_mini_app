import React, { useState } from 'react';

interface LoginFormProps {}

const LoginVerificationUI: React.FC<LoginFormProps> = () => {
  const [currentStep, setCurrentStep] = useState<'login' | 'verification'>('login');
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setCurrentStep('verification');
    }
  };

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verification code submitted:', verificationCode);
    // Handle verification logic here
  };

  const renderLoginForm = () => (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side - Illustration */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden">
          <div className="position-absolute w-100 h-100">
            <svg viewBox="0 0 400 300" className="w-100 h-100">
              {/* Background waves */}
              <defs>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4285f4" />
                  <stop offset="100%" stopColor="#34a853" />
                </linearGradient>
              </defs>
              
              {/* Platform */}
              <rect x="50" y="200" width="120" height="80" fill="url(#blueGradient)" rx="8" />
              
              {/* Characters */}
              <circle cx="90" cy="180" r="15" fill="#ff9800" />
              <rect x="85" y="185" width="10" height="25" fill="#2196f3" />
              <rect x="82" y="210" width="6" height="15" fill="#ff5722" />
              <rect x="92" y="210" width="6" height="15" fill="#ff5722" />
              
              <circle cx="130" cy="175" r="15" fill="#ff9800" />
              <rect x="125" y="180" width="10" height="25" fill="#e91e63" />
              <rect x="122" y="205" width="6" height="15" fill="#ff5722" />
              <rect x="132" y="205" width="6" height="15" fill="#ff5722" />
              
              {/* Charts and data visualization */}
              <rect x="200" y="150" width="150" height="100" fill="white" stroke="#e0e0e0" strokeWidth="2" rx="8" />
              <polyline points="220,220 240,200 260,210 280,180 300,190 320,170" 
                       fill="none" stroke="#4285f4" strokeWidth="3" />
              <circle cx="240" cy="200" r="4" fill="#4285f4" />
              <circle cx="280" cy="180" r="4" fill="#4285f4" />
              <circle cx="320" cy="170" r="4" fill="#4285f4" />
              
              {/* Floating elements */}
              <rect x="300" y="100" width="40" height="30" fill="#34a853" rx="4" />
              <rect x="250" y="80" width="30" height="25" fill="#ea4335" rx="4" />
            </svg>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="text-center mb-5">
              <div className="mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect width="40" height="40" rx="8" fill="#ea4335"/>
                  <path d="M20 10 L30 20 L20 30 L10 20 Z" fill="white"/>
                </svg>
              </div>
              <h4 className="fw-normal text-muted mb-4">Log in to continue</h4>
            </div>

            <div onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control form-control-lg border-0 bg-light"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                onClick={handleLogin}
                className="btn btn-primary btn-lg w-100 mb-4"
                style={{ backgroundColor: '#4285f4', border: 'none' }}
              >
                Continue
              </button>

              <div className="text-center">
                <small className="text-muted">
                  <a href="#" className="text-decoration-none">Privacy Policy</a>
                </small>
                <br />
                <small className="text-muted">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="#" className="text-decoration-none">Privacy Policy</a>{' '}
                  and <a href="#" className="text-decoration-none">Terms of Service</a> apply.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerificationForm = () => (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side - Illustration */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-light position-relative overflow-hidden">
          <div className="position-absolute w-100 h-100">
            <svg viewBox="0 0 400 300" className="w-100 h-100">
              {/* Background waves */}
              <defs>
                <linearGradient id="blueGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4285f4" />
                  <stop offset="100%" stopColor="#34a853" />
                </linearGradient>
              </defs>
              
              {/* Platform */}
              <rect x="50" y="200" width="120" height="80" fill="url(#blueGradient2)" rx="8" />
              
              {/* Characters */}
              <circle cx="90" cy="180" r="15" fill="#ff9800" />
              <rect x="85" y="185" width="10" height="25" fill="#2196f3" />
              <rect x="82" y="210" width="6" height="15" fill="#ff5722" />
              <rect x="92" y="210" width="6" height="15" fill="#ff5722" />
              
              {/* Right side illustration with documents and magnifying glass */}
              <rect x="280" y="120" width="80" height="100" fill="white" stroke="#e0e0e0" strokeWidth="2" rx="8" />
              <rect x="290" y="140" width="60" height="4" fill="#e0e0e0" />
              <rect x="290" y="150" width="40" height="4" fill="#e0e0e0" />
              <rect x="290" y="160" width="50" height="4" fill="#e0e0e0" />
              
              {/* Magnifying glass */}
              <circle cx="320" cy="100" r="20" fill="none" stroke="#4285f4" strokeWidth="4" />
              <circle cx="320" cy="100" r="12" fill="#4285f4" opacity="0.2" />
              <line x1="335" y1="115" x2="345" y2="125" stroke="#4285f4" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Right Side - Verification Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="text-center mb-5">
              <h2 className="fw-normal mb-4">Email Verification</h2>
              <p className="text-muted">
                Please enter your code that sent to your email address
              </p>
            </div>

            <div onSubmit={handleVerification}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-lg border-0 bg-light text-center"
                  placeholder="Enter code verification"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                />
              </div>

              <button
                onClick={handleVerification}
                className="btn btn-primary btn-lg w-100 mb-4"
                style={{ backgroundColor: '#4285f4', border: 'none' }}
              >
                Submit
              </button>

              <div className="text-center">
                <small className="text-muted">
                  <a href="#" className="text-decoration-none">Privacy Policy</a>
                </small>
                <br />
                <small className="text-muted">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="#" className="text-decoration-none">Privacy Policy</a>{' '}
                  and <a href="#" className="text-decoration-none">Terms of Service</a> apply.
                </small>
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link text-decoration-none"
                onClick={() => setCurrentStep('login')}
              >
                ← Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      {currentStep === 'login' ? renderLoginForm() : renderVerificationForm()}
    </div>
  );
};

export default LoginVerificationUI;