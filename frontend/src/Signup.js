import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Acties voor de reducer
const ACTIONS = {
  SET_NAME: 'SET_NAME',
  SET_EMAIL: 'SET_EMAIL',
  SET_PASSWORD: 'SET_PASSWORD',
  SET_MESSAGE: 'SET_MESSAGE',
};

// Reducer-functie
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
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3002/signup', state)
      .then((response) => {
        dispatch({ type: ACTIONS.SET_MESSAGE, payload: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ACTIONS.SET_MESSAGE, payload: error.response.data.message });
        console.error('Error creating account:', error);
      });
  };

  return (
    <div style={{ height: "100vh" }} className='d-flex justify-content-center align-items-center  w-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          {state.Message && <div className="alert alert-warning" role="alert">{state.Message}</div>}
          <div className='mb-3'>
            <label htmlFor="name"><strong>Name </strong></label>
            <input type="text" placeholder='Enter Name' onChange={(e) => dispatch({ type: ACTIONS.SET_NAME, payload: e.target.value })} className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="email"><strong>Email </strong></label>
            <input type="email" onChange={(e) => dispatch({ type: ACTIONS.SET_EMAIL, payload: e.target.value })} placeholder='Enter Email' name='email' required 
            className='form-control rounded-0' />
          </div>
          <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter Password' name='password' required onChange={(e) => dispatch({ type: ACTIONS.SET_PASSWORD, payload: e.target.value })} 
            className='form-control rounded-0' />
          </div>
          <button type='submit' className='btn btn-success w-100 rounden-0'> Sign up </button>
          <Link to="/" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
