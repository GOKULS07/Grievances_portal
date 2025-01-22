import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';  // Import Firebase methods for login and signup
import { auth } from '../firebase';  // Import the auth object from firebase.js
import './FacultyLogin.css';

const FacultyLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);  // State to toggle between login and sign-up

  const handleAuth = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        // Sign Up Logic
        await createUserWithEmailAndPassword(auth, username, password);
        navigate('/faculty-dashboard');  // Redirect to the faculty dashboard after successful sign-up
      } else {
        // Login Logic
        await signInWithEmailAndPassword(auth, username, password);
        navigate('/faculty-dashboard');  // Redirect to the faculty dashboard after successful login
      }
    } catch (error) {
      if (isSignUp) {
        setError('An error occurred during sign-up. Please try again.');
      } else {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setError('Invalid username or password');
        } else {
          setError('An error occurred. Please try again.');
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>BANNARI AMMAN INSTITUTE OF TECHNOLOGY</h1>
        <h2>{isSignUp ? 'FACULTY SIGN UP' : 'FACULTY LOGIN'}</h2>
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label htmlFor="username">Username (Email)</label>
            <input
              type="email"  // Use email for login and sign-up
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">{isSignUp ? 'Sign Up' : 'Login'}</button>
        </form>
        <p>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span 
            className="toggle-link" 
            onClick={() => setIsSignUp(!isSignUp)}  // Toggle between Login and Sign Up forms
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FacultyLogin;
