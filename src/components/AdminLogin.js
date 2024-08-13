import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = (event) => {
    event.preventDefault();
    navigate('/admin-dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>BANNARI AMMAN INSTITUTE OF TECHNOLOGY</h1>
        <h3>ADMIN</h3>
        <form onSubmit={handleGoogleSignIn}>
          <button type="submit" className="google-signin-button">
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
