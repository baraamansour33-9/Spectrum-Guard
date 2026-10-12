import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    axios.post('http://localhost:3002/login', values)
      .then((res) => {
        if (res.data === 'Success') {
          navigate('/home');
        } else {
          setMessage(
            'The email or password is incorrect. Please try again.'
          );
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        setMessage('Unable to log in. Please check your connection and try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">

       

        <main className="auth-main">
          <section className="auth-card">
            <div className="auth-logo-small">
              <svg viewBox="0 0 48 48" aria-hidden="true">
                <path
                  d="M24 4 40 10v12c0 10-6.5 17-16 22C14.5 39 8 32 8 22V10Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                />
                <path
                  d="M18 29V22 M24 29V16 M30 29V19"
                  stroke="#079b70"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1>Welcome back</h1>
            <p className="auth-subtitle">
              Sign in to continue to Spectrum Guard
            </p>

            {message && (
              <div className="auth-message" role="alert">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="login-email">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleInput}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={values.password}
                  onChange={handleInput}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Log in'}
                {!loading && <span aria-hidden="true"> →</span>}
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <span>or</span>
              <span />
            </div>

            <p className="auth-switch">
              New to Spectrum Guard?
              <Link to="/signup"> Create account</Link>
            </p>
          </section>
        </main>

      </div>
    </div>
  );
}

export default Login;