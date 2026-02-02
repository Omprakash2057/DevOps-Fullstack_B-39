import React from 'react';
import './StudentCard.css';

/**
 * Child Component: StudentCard
 * Receives student data via props and displays information
 * Calculates total marks, percentage, and grade
 */
const StudentCard = (props) => {
  // Destructure props to access student data
  const { name, rollNumber, marks, subjects } = props;

  /**
   * Calculate total marks from the marks array
   * Uses reduce to sum all marks
   */
  const calculateTotal = () => {
    return marks.reduce((sum, mark) => sum + mark, 0);
  };

  /**
   * Calculate percentage based on total marks
   * Assumes each subject is out of 100 marks
   */
  const calculatePercentage = () => {
    const total = calculateTotal();
    const maxMarks = marks.length * 100;
    return ((total / maxMarks) * 100).toFixed(2);
  };

  /**
   * Calculate grade based on percentage
   * Grading criteria:
   * - 90% and above: A+
   * - 80% – 89%: A
   * - 70% – 79%: B
   * - 60% – 69%: C
   * - Below 60%: Fail
   */
  const calculateGrade = () => {
    const percentage = parseFloat(calculatePercentage());
    
    if (percentage >= 90) {
      return 'A+';
    } else if (percentage >= 80) {
      return 'A';
    } else if (percentage >= 70) {
      return 'B';
    } else if (percentage >= 60) {
      return 'C';
    } else {
      return 'Fail';
    }
  };

  // Calculate values
  const totalMarks = calculateTotal();
  const percentage = calculatePercentage();
  const grade = calculateGrade();

  // Determine grade color based on grade value
  const getGradeColor = () => {
    if (grade === 'A+' || grade === 'A') return 'excellent';
    if (grade === 'B') return 'good';
    if (grade === 'C') return 'average';
    return 'fail';
  };

  return (
    <div className="student-card">
      <div className="card-header">
        <h2>{name}</h2>
        <span className="roll-number">Roll No: {rollNumber}</span>
      </div>
      
      <div className="card-body">
        <div className="section">
          <h3>Subject Marks</h3>
          <div className="marks-list">
            {marks.map((mark, index) => (
              <div key={index} className="mark-item">
                <span className="subject-label">{subjects && subjects[index] ? subjects[index] : `Subject ${index + 1}`}:</span>
                <span className="mark-value">{mark}/100</span>
              </div>
            ))}
          </div>
        </div>

        <div className="section results">
          <h3>Results</h3>
          <div className="result-item">
            <span className="result-label">Total Marks:</span>
            <span className="result-value">{totalMarks}/{marks.length * 100}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Percentage:</span>
            <span className="result-value">{percentage}%</span>
          </div>
          <div className="result-item">
            <span className="result-label">Grade:</span>
            <span className={`result-value grade ${getGradeColor()}`}>{grade}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
