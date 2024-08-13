import React, { useState } from 'react';
import styles from './GrievanceFormPage.module.css';

const GrievanceFormPage = () => {
  const [issueType, setIssueType] = useState('Non-Anonymous');
  const [category, setCategory] = useState('Academics');

  const handleIssueTypeChange = (e) => {
    setIssueType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Submit a Grievance</h1>
      <form className={styles.grievanceForm}>
        <div className={styles.formGroup}>
          <label htmlFor="issueType" className={styles.formLabel}>Issue Type</label>
          <select
            id="issueType"
            value={issueType}
            onChange={handleIssueTypeChange}
            className={styles.formSelect}
            required
          >
            <option value="Non-Anonymous">Non-Anonymous</option>
            <option value="Anonymous">Anonymous</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="grievanceCategory" className={styles.formLabel}>Category</label>
          <select
            id="grievanceCategory"
            value={category}
            onChange={handleCategoryChange}
            className={styles.formSelect}
            required
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
        <div className={styles.formGroup}>
          <label htmlFor="grievanceTitle" className={styles.formLabel}>Title</label>
          <input
            type="text"
            id="grievanceTitle"
            className={styles.formInput}
            placeholder="Enter the title"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="grievanceDescription" className={styles.formLabel}>Description</label>
          <textarea
            id="grievanceDescription"
            className={styles.formTextarea}
            placeholder="Enter the details"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default GrievanceFormPage;
