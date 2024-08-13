import React, { useState } from 'react';

const initialGrievances = [
  { id: '001', date: '2024-07-24', category: 'Anonymous', issueType: 'Academics', title: 'Issue with classroom seating arrangement.', description: 'There is a problem with the seating arrangement in the classroom...', status: 'Resolved' },
  { id: '002', date: '2024-07-22', category: 'Personal', issueType: 'Transport', title: 'Broken projector in the lecture hall.', description: 'The projector in the main lecture hall is broken...', status: 'Pending' },
  { id: '003', date: '2024-07-20', category: 'Anonymous', issueType: 'Academics', title: 'Delayed response to lab equipment request.', description: 'The lab equipment request is taking too long to process...', status: 'In Progress' }
  // Add more grievance items here
];

const ManageGrievances = () => {
  const [viewAll, setViewAll] = useState(false);
  const [viewDescription, setViewDescription] = useState(null);

  const handleViewAll = () => {
    setViewAll(true);
  };

  const handleReadDescription = (id) => {
    setViewDescription(id);
  };

  const categorizedGrievances = initialGrievances.reduce((acc, grievance) => {
    const { status } = grievance;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(grievance);
    return acc;
  }, {});

  return (
    <div className="grievances-container-unique">
      <h2 className="grievances-title-unique">Manage Grievances</h2>
      {viewAll ? (
        <div className="grievances-categorized-unique">
          <h3>All Grievances</h3>
          {Object.keys(categorizedGrievances).map(status => (
            <div key={status}>
              <h4 className="grievances-status-title-unique">{status}</h4>
              <ul className="grievances-list-unique">
                {categorizedGrievances[status].map(grievance => (
                  <li className="grievance-item-unique" key={grievance.id}>
                    <strong>ID:</strong> {grievance.id} | <strong>Date:</strong> {grievance.date} | <strong>Category:</strong> {grievance.category} | <strong>Issue Type:</strong> {grievance.issueType} | <strong>Title:</strong> {grievance.title} | <button className="grievance-btn-small-unique" onClick={() => handleReadDescription(grievance.id)}>Read</button>
                    {viewDescription === grievance.id && (
                      <p className="grievance-description-unique"><strong>Description:</strong> {grievance.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="grievances-pending-unique">
          <p>Here, you can view and manage the grievances submitted by users. You can filter, sort, and resolve issues as needed.</p>
          <h3>Pending Grievances</h3>
          <ul className="grievances-list-unique">
            {initialGrievances.filter(g => g.status === 'Pending').map(grievance => (
              <li className="grievance-item-unique" key={grievance.id}>
                <strong>ID:</strong> {grievance.id} | <strong>Date:</strong> {grievance.date} | <strong>Category:</strong> {grievance.category} | <strong>Issue Type:</strong> {grievance.issueType} | <strong>Title:</strong> {grievance.title} | <button className="grievance-btn-small-unique" onClick={() => handleReadDescription(grievance.id)}>Read</button>
                {viewDescription === grievance.id && (
                  <p className="grievance-description-unique"><strong>Description:</strong> {grievance.description}</p>
                )}
              </li>
            ))}
          </ul>
          <button className="grievance-btn-unique" onClick={handleViewAll}>View All</button>
        </div>
      )}
    </div>
  );
};

export default ManageGrievances;
