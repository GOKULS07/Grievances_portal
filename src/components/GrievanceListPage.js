import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './GrievanceListPage.css';

const GrievanceListPage = () => {
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const grievancesRef = collection(db, 'grievances');
    const unsubscribe = onSnapshot(grievancesRef, (snapshot) => {
      const fetchedGrievances = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGrievances(fetchedGrievances);
    });

    return () => unsubscribe();
  }, []);

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
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {grievances.map((grievance) => (
            <tr key={grievance.id}>
              <td>{grievance.id}</td>
              <td>{grievance.date}</td>
              <td>{grievance.category}</td>
              <td>{grievance.issueType}</td>
              <td>{grievance.title}</td>
              <td
                style={{
                  color:
                    grievance.status === 'Solved'
                      ? 'green'
                      : grievance.status === 'Rejected'
                      ? 'red'
                      : 'black',
                  fontWeight: 'bold',
                }}
              >
                {grievance.status}
              </td>
              <td>{grievance.reason || '-'}</td> {/* Display the reason or a dash if not available */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrievanceListPage;
