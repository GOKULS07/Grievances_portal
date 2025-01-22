import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';  // Import the auth object from firebase.js
import { onAuthStateChanged } from 'firebase/auth';  // Import Firebase method to listen to auth state
import HomePage from './components/HomePage';
import AdminLogin from './components/AdminLogin';
import FacultyLogin from './components/FacultyLogin';
import AdminDashboard from './components/AdminDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import GrievanceListPage from './components/GrievanceListPage';
import GrievanceFormPage from './components/GrievanceFormPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);  // User is authenticated
      } else {
        setIsAuthenticated(false);  // No user is authenticated
      }
    });

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/faculty-login" element={<FacultyLogin />} />

        <Route
          path="/admin-dashboard/*"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        >
          <Route path="view-grievances" element={<GrievanceListPage />} />
          <Route path="submit-grievance" element={<GrievanceFormPage />} />
        </Route>

        <Route
          path="/faculty-dashboard/*"
          element={isAuthenticated ? <FacultyDashboard /> : <Navigate to="/faculty-login" />}
        >
          <Route path="view-grievances" element={<GrievanceListPage />} />
          <Route path="submit-grievance" element={<GrievanceFormPage />} />
        </Route>

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
