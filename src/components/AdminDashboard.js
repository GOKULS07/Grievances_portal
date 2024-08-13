import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ManageGrievances from './ManageGrievances';
import Settings from './Settings';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="dashboard-sidebar">
        <ul>
          <li>
            <Link to="/admin-dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin-dashboard/manage-grievances">Manage Grievances</Link>
          </li>
          <li>
            <Link to="/admin-dashboard/settings">Settings</Link>
          </li>
          
        </ul>
      </nav>
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Admin Dashboard</h1>
              <section className="admin-details">
                <img
                  src="th.jpeg"
                  alt="Admin"
                  className="admin-photo"
                />
                <div className="details">
                  <h2 className="admin-name">Admin Name</h2>
                  <p className="admin-info"><strong>Email:</strong> admin@example.com</p>
                </div>
              </section>
              
              <p>Welcome to the Admin Dashboard. Use the sidebar to navigate between different sections.</p>
              <p>Here you can manage grievances, adjust settings, and view various reports.</p>
            </div>
          } />
          <Route path="manage-grievances" element={<ManageGrievances />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
