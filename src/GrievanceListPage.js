import React from 'react';
import './GrievanceListPage.css'; // Adjust the path as necessary

const grievances = [
  {
    id: 1,
    date: '2024-07-24',
    Category: 'Anonymous',
    IssueType: 'Academics',
    Title: 'Issue with classroom seating arrangement.',
    status: 'Resolved',
  },
  {
    id: 2,
    date: '2024-07-22',
    Category: 'Personal',
    IssueType: 'Transport',
    Title: 'Broken projector in the lecture hall.',
    status: 'Pending',
  },
  {
    id: 3,
    date: '2024-07-20',
    Category: 'Anonymous',
    IssueType: 'Academics',
    Title: 'Delayed response to lab equipment request.',
    status: 'In Progress',
  },
];

const GrievanceListPage = () => {
  return (
    <div className="container">
      <h1>Grievance List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Category</th>
            <th>Issue Type</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((grievance) => (
            <tr key={grievance.id}>
              <td>{grievance.id}</td>
              <td>{grievance.date}</td>
              <td>{grievance.Category}</td>
              <td>{grievance.IssueType}</td>
              <td>{grievance.Title}</td>
              <td>{grievance.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceListPage;
