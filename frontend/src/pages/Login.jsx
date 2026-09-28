import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes/routes';
import { Building2, User, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, HardHat, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, isUserLoggedIn } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate(ROUTES.HOME);
    }
  }, [isUserLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await loginUser(username.trim(), password);
      setIsLoading(false);
      if (res.success) {
        navigate(ROUTES.HOME);
      } else {
        setError(res.message || 'Invalid username or password.');
      }
    } catch {
      setIsLoading(false);
      setError('An unexpected error occurred during login. Please try again.');
    }
  };

  const handleGuestExplore = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#0b1120',
      backgroundImage: `radial-gradient(circle at 10% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(30, 58, 138, 0.25) 0%, transparent 50%)`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Decorative Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{
        margin: 'auto',
        padding: '2.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          maxWidth: '960px',
          width: '100%',
          backgroundColor: '#0f172a',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08)',
          overflow: 'hidden'
        }} className="login-card-grid">

          {/* Left Panel: Brand Showcase */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #111827 100%)',
            padding: '3.5rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative'
          }} className="login-brand-panel">
            <div>
              {/* Brand Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2.5rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  color: '#ffffff',
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(249, 115, 22, 0.35)'
                }}>
                  <Building2 size={28} />
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 800,
                    fontSize: '1.4rem',
                    color: '#ffffff',
                    letterSpacing: '-0.5px',
                    lineHeight: 1
                  }}>
                    GUNA <span style={{ color: '#f97316' }}>CONSTRUCTION</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginTop: '3px' }}>
                    Cheyyur, Tamil Nadu
                  </div>
                </div>
              </div>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(249, 115, 22, 0.12)',
                color: '#f97316',
                padding: '0.4rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '1.25rem',
                border: '1px solid rgba(249, 115, 22, 0.25)'
              }}>
                <HardHat size={15} /> Client Portal
              </div>

              <h1 style={{
                fontSize: '2.1rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.25,
                marginBottom: '1rem',
                fontFamily: 'Outfit, sans-serif'
              }}>
                Building Dreams with Uncompromising <span style={{ color: '#f97316' }}>Quality</span>.
              </h1>

              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Welcome to GUNA CONSTRUCTION. Access your project documents, milestones, estimations, and construction updates.
              </p>
            </div>

            {/* Feature Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
                <CheckCircle2 size={18} color="#10b981" /> Over 15+ years of verified construction excellence
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
                <CheckCircle2 size={18} color="#10b981" /> 100+ Completed residential & commercial projects
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#cbd5e1', fontSize: '0.88rem' }}>
                <CheckCircle2 size={18} color="#10b981" /> End-to-end encrypted Django REST security
              </div>
            </div>
          </div>

          {/* Right Panel: Login Form */}
          <div style={{
            padding: '3.5rem 3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: '#090d16'
          }} className="login-form-panel">
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.4rem' }}>
                Sign In
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Enter your username and password to access your account
              </p>
            </div>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '0.75rem 1rem',
                borderRadius: '10px',
                fontSize: '0.88rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <ShieldCheck size={16} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    autoComplete="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem 1rem 0.8rem 2.75rem',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f97316'}
                    onBlur={(e) => e.target.style.borderColor = '#334155'}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8', marginBottom: '0.5rem' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem 3rem 0.8rem 2.75rem',
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#f97316'}
                    onBlur={(e) => e.target.style.borderColor = '#334155'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  marginTop: '0.5rem',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? 'Verifying...' : 'Sign In'} <ArrowRight size={18} />
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', margin: '1.75rem 0', gap: '0.75rem' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
              <span style={{ color: '#64748b', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#334155' }} />
            </div>

            {/* Guest / Direct Explorer Option */}
            <button
              type="button"
              onClick={handleGuestExplore}
              style={{
                width: '100%',
                padding: '0.8rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                border: '1px solid #334155',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Explore Website as Guest <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .login-card-grid {
            grid-template-columns: 1fr !important;
          }
          .login-brand-panel {
            padding: 2.25rem !important;
          }
          .login-form-panel {
            padding: 2.25rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
