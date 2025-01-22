import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';  // Import Firestore methods

const GrievanceFormPage = () => {
  const [issueType, setIssueType] = useState('Non-Anonymous');
  const [category, setCategory] = useState('Academics');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleIssueTypeChange = (e) => {
    setIssueType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add grievance to Firestore
      await addDoc(collection(db, 'grievances'), {
        issueType,
        category,
        title,
        description,
        status: 'Pending',  // Default status when submitting
        date: new Date().toISOString(),
        // Store name and email only if Non-Anonymous
        name: issueType === 'Non-Anonymous' ? name : null,
        email: issueType === 'Non-Anonymous' ? email : null,
      });

      // Clear form after submission
      setTitle('');
      setDescription('');
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error submitting grievance: ', error);
    }
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        fontSize: '2rem',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#495057',
      }}>
        Submit a Grievance
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="issueType" style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#343a40' }}>
            Issue Type
          </label>
          <select
            id="issueType"
            value={issueType}
            onChange={handleIssueTypeChange}
            required
            style={{
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: '#fff',
              transition: 'border-color 0.3s',
            }}
          >
            <option value="Non-Anonymous">Non-Anonymous</option>
            <option value="Anonymous">Anonymous</option>
          </select>
        </div>

        {issueType === 'Non-Anonymous' && (
          <>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="name" style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#343a40' }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                style={{
                  padding: '10px',
                  fontSize: '1rem',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s',
                  width: '100%',
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="email" style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#343a40' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  padding: '10px',
                  fontSize: '1rem',
                  border: '1px solid #ced4da',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  transition: 'border-color 0.3s',
                  width: '100%',
                }}
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="category" style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#343a40' }}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            required
            style={{
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: '#fff',
              transition: 'border-color 0.3s',
            }}
          >
            <option value="Academics">Academics</option>
            <option value="Mess">Mess</option>
            <option value="Special Lab">Special Lab</option>
            <option value="Transport">Transport</option>
            <option value="Skill/Reward Points">Skill/Reward Points</option>
            <option value="TAC">TAC</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="title" style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#343a40' }}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            required
            style={{
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: '#fff',
              transition: 'border-color 0.3s',
              width: '100%',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description" style={{ fontSize: '1.1rem', marginBottom: '5px', color: '#343a40' }}>
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the details"
            rows="4"
            required
            style={{
              padding: '10px',
              fontSize: '1rem',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              backgroundColor: '#fff',
              transition: 'border-color 0.3s',
              width: '100%',
              resize: 'vertical',
            }}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            padding: '12px 20px',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            alignSelf: 'center',
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default GrievanceFormPage;
