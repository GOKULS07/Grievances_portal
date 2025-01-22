import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';  
import { auth } from '../firebase';  
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);  

  const handleAuth = async (event) => {
    event.preventDefault();

    try {
      if (isSignUp) {
       
        if (username !== 'gokuls@gmail.com') {
          setError('Only the admin email (gokuls@gmail.com) is allowed to sign up.');
          return;
        }
        await createUserWithEmailAndPassword(auth, username, password);
        navigate('/admin-dashboard');  
      } else {
        
        if (username !== 'gokuls@gmail.com') {
          setError('Invalid username. Only admin access is allowed.');
          return;
        }
        await signInWithEmailAndPassword(auth, username, password);
        navigate('/admin-dashboard');  
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
        <h3>{isSignUp ? 'ADMIN SIGN UP' : 'ADMIN LOGIN'}</h3>
        <form onSubmit={handleAuth}>
          <div className="form-group">
            <label htmlFor="username">Username (Email)</label>
            <input
              type="email" 
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
            onClick={() => setIsSignUp(!isSignUp)}  
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
