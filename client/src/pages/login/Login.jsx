import { useState } from 'react';
import '../../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');
  const [alert, setAlert] = useState({ visible: false, type: 'error', message: '' });
  const [loading, setLoading] = useState(false);

  // ── OAuth handler ────────────────────────────────────────
  function handleOAuth(provider) {
    // TODO: Replace with your actual backend OAuth2 endpoints
    const endpoints = {
      google: '/auth/oauth2/google',
      github: '/auth/oauth2/github',
    };
    window.location.href = endpoints[provider];
  }

  // ── Validation ───────────────────────────────────────────
  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  // ── Form submit ──────────────────────────────────────────
  async function handleSubmit(e) {
    e.preventDefault();
    setAlert({ visible: false, type: 'error', message: '' });

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPwError('Password is required.');
      valid = false;
    } else {
      setPwError('');
    }

    if (!valid) return;

    setLoading(true);
    try {
      // TODO: Replace with your actual backend login endpoint
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        const storage = remember ? localStorage : sessionStorage;
        if (data.token) storage.setItem('auth_token', data.token);
        window.location.href = data.redirect || '/listings';
      } else {
        setAlert({
          visible: true,
          type: 'error',
          message: data.message || 'Invalid email or password. Please try again.',
        });
      }
    } catch {
      setAlert({
        visible: true,
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">

      {/* ── Left: Brand Panel ─────────────────────────────── */}
      <aside className="panel-brand" aria-hidden="true">
        <div className="brand-grid" />

        <div className="brand-tags">
          <span className="brand-tag"><span className="dot" />Textbooks</span>
          <span className="brand-tag"><span className="dot" />Electronics</span>
          <span className="brand-tag"><span className="dot" />Dorm Essentials</span>
          <span className="brand-tag"><span className="dot" />Study Supplies</span>
          <span className="brand-tag"><span className="dot" />Campus Gear</span>
        </div>

        <div className="brand-content">
          <div className="brand-badge">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4" /></svg>
            Student Marketplace
          </div>

          <h1 className="brand-title">
            Buy, sell &amp; trade<br />
            <em>on campus</em>
          </h1>

          <p className="brand-desc">
            The easiest way for students to exchange textbooks, electronics, and everything in between.
          </p>

          <div className="brand-stats">
            <div>
              <div className="stat-value">12k+</div>
              <div className="stat-label">Active Listings</div>
            </div>
            <div>
              <div className="stat-value">3.4k</div>
              <div className="stat-label">Students</div>
            </div>
            <div>
              <div className="stat-value">98%</div>
              <div className="stat-label">Satisfaction</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right: Login Form ──────────────────────────────── */}
      <main className="panel-form">
        <div className="form-box">

          {/* Logo */}
          <a href="/" className="logo">
            <div className="logo-mark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="logo-name">
              StudentMart
              <small>Campus Marketplace</small>
            </div>
          </a>

          <h1 className="form-heading">Welcome back</h1>
          <p className="form-subheading">
            New here? <a href="/register">Create an account</a>
          </p>

          {/* Alert */}
          {alert.visible && (
            <div className={`alert alert-${alert.type}`} role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{alert.message}</span>
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="oauth-group">
            <button className="oauth-btn oauth-btn-google" onClick={() => handleOAuth('google')}>
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <button className="oauth-btn oauth-btn-github" onClick={() => handleOAuth('github')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#24292f">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              Continue with GitHub
            </button>
          </div>

          <div className="divider">or sign in with email</div>

          {/* Email / Password form */}
          <form onSubmit={handleSubmit} noValidate>

            <div className="field">
              <label className="label" htmlFor="email">Email address</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </span>
                <input
                  className={`input${emailError ? ' is-error' : ''}`}
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  autoComplete="email"
                />
              </div>
              {emailError && <div className="field-error">{emailError}</div>}
            </div>

            <div className="field">
              <label className="label" htmlFor="password">Password</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                </span>
                <input
                  className={`input${pwError ? ' is-error' : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="pw-toggle"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(v => !v)}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {pwError && <div className="field-error">{pwError}</div>}
            </div>

            <div className="field-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
