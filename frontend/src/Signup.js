import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const ACTIONS = {/
  SET_NAME: 'SET_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_MESSAGE: 'SET_MESSAGE',
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NAME:
      return { ...state, Name: action.payload };

    case ACTIONS.SET_EMAIL:
      return { ...state, Email: action.payload };

    case ACTIONS.SET_PASSWORD:
      return { ...state, Password: action.payload };

    case ACTIONS.SET_MESSAGE:
      return { ...state, Message: action.payload };

    default:
      return state;
  }
};

function Signup() {
  const [state, dispatch] = useReducer(reducer, {
    Name: '',
    Email: '',
    Password: '',
    Message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({ type: ACTIONS.SET_MESSAGE, payload: '' });
    setLoading(true);

    axios.post('http://localhost:3002/signup', {
      Name: state.Name,
      Email: state.Email,
      Password: state.Password,
    })
      .then((response) => {
        dispatch({
          type: ACTIONS.SET_MESSAGE,
          payload: response.data.message || 'Account created successfully.',
        });
      })
      .catch((error) => {
        console.error('Error creating account:', error);

        dispatch({
          type: ACTIONS.SET_MESSAGE,
          payload:
            error.response?.data?.message ||
            'Unable to create your account. Please try again.',
        });
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

            <h1>Create your account</h1>
            <p className="auth-subtitle">
              Get started with Spectrum Guard
            </p>

            {state.Message && (
              <div className="auth-message" role="status">
                {state.Message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="auth-field">
                <label htmlFor="signup-name">Full name</label>
                <input
                  id="signup-name"
                  type="text"
                  name="Name"
                  placeholder="Enter your name"
                  value={state.Name}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_NAME,
                      payload: e.target.value,
                    })
                  }
                  autoComplete="name"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-email">Email address</label>
                <input
                  id="signup-email"
                  type="email"
                  name="Email"
                  placeholder="Enter your email"
                  value={state.Email}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_EMAIL,
                      payload: e.target.value,
                    })
                  }
                  autoComplete="email"
                  required
                />
              </div>

              <div className="auth-field">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  name="Password"
                  placeholder="Create a password"
                  value={state.Password}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.SET_PASSWORD,
                      payload: e.target.value,
                    })
                  }
                  autoComplete="new-password"
                  required
                />
              </div>

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
                {!loading && <span aria-hidden="true"> →</span>}
              </button>
            </form>

            <div className="auth-divider">
              <span />
              <span>or</span>
              <span />
            </div>

            <p className="auth-switch">
              Already have an account?
              <Link to="/"> Log in</Link>
            </p>
          </section>
        </main>

      </div>
    </div>
  );
}

export default Signup;