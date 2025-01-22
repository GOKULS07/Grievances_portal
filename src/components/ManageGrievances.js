import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const ManageGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [viewDescription, setViewDescription] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);

  // Fetch grievances from Firestore
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

  // Update grievance status with optional reason
  const updateGrievanceStatus = async (id, newStatus, reason = '') => {
    try {
      const grievanceRef = doc(db, 'grievances', id);
      const updateData = { status: newStatus };
      if (reason) {
        updateData.reason = reason;
      }
      await updateDoc(grievanceRef, updateData);

      // Update local state
      setGrievances((prevGrievances) =>
        prevGrievances.map((grievance) =>
          grievance.id === id ? { ...grievance, status: newStatus, reason } : grievance
        )
      );
    } catch (error) {
      console.error('Error updating grievance status:', error);
    }
  };

  // Delete old grievance
  const deleteGrievance = async (id) => {
    try {
      const grievanceRef = doc(db, 'grievances', id);
      await deleteDoc(grievanceRef);

      // Update local state
      setGrievances((prevGrievances) =>
        prevGrievances.filter((grievance) => grievance.id !== id)
      );
    } catch (error) {
      console.error('Error deleting grievance:', error);
    }
  };

  // Categorize grievances
  const categorizedGrievances = grievances.reduce((acc, grievance) => {
    const { category } = grievance;
    if (!acc[category]) acc[category] = [];
    acc[category].push(grievance);
    return acc;
  }, {});

  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          textAlign: 'center',
          marginBottom: '20px',
          color: '#495057',
        }}
      >
        Manage Grievances
      </h2>
      {Object.keys(categorizedGrievances).map((category) => (
        <div key={category} style={{ marginBottom: '30px' }}>
          <h4
            style={{
              fontSize: '1.5rem',
              color: '#007bff',
              marginBottom: '10px',
            }}
          >
            {category}
          </h4>
          <ul
            style={{
              listStyleType: 'none',
              paddingLeft: '0',
              marginBottom: '0',
            }}
          >
            {categorizedGrievances[category].map((grievance) => (
              <li
                key={grievance.id}
                style={{
                  padding: '15px',
                  marginBottom: '10px',
                  backgroundColor: '#ffffff',
                  borderRadius: '5px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div>
                  <strong>ID:</strong> {grievance.id} | <strong>Title:</strong>{' '}
                  {grievance.title} | <strong>Status:</strong>{' '}
                  {grievance.status}
                </div>

                {grievance.issueType === 'Non-Anonymous' && (
                  <div
                    style={{
                      marginTop: '10px',
                      fontSize: '1rem',
                      color: '#495057',
                    }}
                  >
                    <strong>Name:</strong> {grievance.name} |{' '}
                    <strong>Email:</strong> {grievance.email}
                  </div>
                )}

                <button
                  onClick={() => setViewDescription(grievance.id)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 15px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                >
                  Read
                </button>
                {viewDescription === grievance.id && (
                  <p
                    style={{
                      marginTop: '15px',
                      padding: '10px',
                      backgroundColor: '#f1f1f1',
                      borderRadius: '4px',
                    }}
                  >
                    <strong>Description:</strong> {grievance.description}
                  </p>
                )}

                {grievance.status === 'Pending' && (
                  <div
                    style={{
                      marginTop: '15px',
                      display: 'flex',
                      gap: '10px',
                    }}
                  >
                    <button
                      onClick={() =>
                        updateGrievanceStatus(grievance.id, 'Solved')
                      }
                      style={{
                        padding: '8px 15px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      Solve
                    </button>
                    <button
                      onClick={() => setShowRejectModal(grievance.id)}
                      style={{
                        padding: '8px 15px',
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s',
                      }}
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* Delete Button for old grievances */}
                <button
                  onClick={() => deleteGrievance(grievance.id)}
                  style={{
                    marginTop: '15px',
                    padding: '8px 15px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {showRejectModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
          }}
        >
          <h4 style={{ marginBottom: '10px' }}>Enter reason for rejection:</h4>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '10px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={() => {
              updateGrievanceStatus(showRejectModal, 'Rejected', rejectReason);
              setShowRejectModal(null);
              setRejectReason('');
            }}
            style={{
              padding: '8px 15px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Submit
          </button>
          <button
            onClick={() => setShowRejectModal(null)}
            style={{
              padding: '8px 15px',
              backgroundColor: 'gray',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageGrievances;
