import React, { useState, useMemo } from 'react';
import StudentCard from './StudentCard';
import './App.css';

/**
 * Parent Component: App
 * Maintains student data and passes it to child component (StudentCard) via props
 * Demonstrates component reusability by rendering multiple StudentCard components
 */
function App() {
  // Subject names for all students
  const subjects = [
    'AI Assistant Coding',
    'DevOps & Full Stack',
    'Competitive Programming',
    'High Performance Computing',
    '3D Printing'
  ];

  // Student data maintained in parent component
  const students = [
    {
      name: 'Mukesh',
      rollNumber: 'CS2024001',
      marks: [85, 92, 78, 88, 95]
    },
    {
      name: 'Radha Krishna',
      rollNumber: 'CS2024002',
      marks: [95, 98, 96, 94, 97]
    },
    {
      name: 'Nikhil',
      rollNumber: 'CS2024003',
      marks: [98, 99, 97, 96, 100]
    },
    {
      name: 'Kruthik',
      rollNumber: 'CS2024004',
      marks: [92, 94, 96, 93, 95]
    },
    {
      name: 'Mahesh',
      rollNumber: 'CS2024005',
      marks: [89, 91, 93, 90, 92]
    },
    {
      name: 'Tharun',
      rollNumber: 'CS2024006',
      marks: [95, 97, 94, 96, 98]
    },
    {
      name: 'Nikil',
      rollNumber: 'CS2024007',
      marks: [97, 96, 98, 99, 95]
    },
    {
      name: 'Siddharth',
      rollNumber: 'CS2024008',
      marks: [72, 68, 75, 70, 73]
    },
    {
      name: 'Vikram Singh',
      rollNumber: 'CS2024009',
      marks: [55, 58, 52, 60, 57]
    }
  ];

  // State for search and sort functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Calculate percentage for a student
  const calculatePercentage = (marks) => {
    const total = marks.reduce((sum, mark) => sum + mark, 0);
    const maxMarks = marks.length * 100;
    return ((total / maxMarks) * 100).toFixed(2);
  };

  // Calculate grade for percentage
  const calculateGrade = (percentage) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'Fail';
  };

  // Calculate class statistics
  const classStats = useMemo(() => {
    const percentages = students.map(student => parseFloat(calculatePercentage(student.marks)));
    const average = (percentages.reduce((sum, p) => sum + p, 0) / percentages.length).toFixed(2);
    const highest = Math.max(...percentages).toFixed(2);
    const lowest = Math.min(...percentages).toFixed(2);
    const topStudent = students.find(s => parseFloat(calculatePercentage(s.marks)) === parseFloat(highest));
    
    // Grade distribution
    const gradeDistribution = {
      'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'Fail': 0
    };
    
    students.forEach(student => {
      const percentage = parseFloat(calculatePercentage(student.marks));
      const grade = calculateGrade(percentage);
      gradeDistribution[grade]++;
    });

    const passCount = students.filter(s => parseFloat(calculatePercentage(s.marks)) >= 60).length;
    const failCount = students.length - passCount;
    
    return {
      average,
      highest,
      lowest,
      topStudent: topStudent?.name || '',
      totalStudents: students.length,
      gradeDistribution,
      passCount,
      failCount,
      passPercentage: ((passCount / students.length) * 100).toFixed(1)
    };
  }, [students]);

  // Export data as CSV
  const exportToCSV = () => {
    const headers = ['Name', 'Roll Number', ...subjects, 'Total', 'Percentage', 'Grade'];
    const rows = students.map(student => {
      const total = student.marks.reduce((sum, mark) => sum + mark, 0);
      const percentage = calculatePercentage(student.marks);
      const grade = calculateGrade(parseFloat(percentage));
      return [
        student.name,
        student.rollNumber,
        ...student.marks,
        total,
        percentage + '%',
        grade
      ];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_marks_report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Print report
  const printReport = () => {
    window.print();
  };

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'percentage') {
      filtered.sort((a, b) => parseFloat(calculatePercentage(b.marks)) - parseFloat(calculatePercentage(a.marks)));
    } else if (sortBy === 'rollNumber') {
      filtered.sort((a, b) => a.rollNumber.localeCompare(b.rollNumber));
    }

    return filtered;
  }, [students, searchTerm, sortBy]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 Student Marks Card Application</h1>
        <p className="subtitle">Demonstrating Parent-Child Component Communication Using Props</p>
      </header>

      <main className="app-main">
        {/* Class Statistics Section */}
        <div className="statistics-section">
          <div className="stats-header">
            <h2>📈 Class Performance Statistics</h2>
            <div className="action-buttons">
              <button className="export-btn" onClick={exportToCSV} title="Export to CSV">
                📥 Export CSV
              </button>
              <button className="print-btn" onClick={printReport} title="Print Report">
                🖨️ Print
              </button>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">{classStats.totalStudents}</div>
              <div className="stat-label">Total Students</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value">{classStats.average}%</div>
              <div className="stat-label">Class Average</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🏆</div>
              <div className="stat-value">{classStats.highest}%</div>
              <div className="stat-label">Highest Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{classStats.topStudent}</div>
              <div className="stat-label">Top Performer</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-value">{classStats.passCount}</div>
              <div className="stat-label">Passed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">❌</div>
              <div className="stat-value">{classStats.failCount}</div>
              <div className="stat-label">Failed</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">{classStats.passPercentage}%</div>
              <div className="stat-label">Pass Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📉</div>
              <div className="stat-value">{classStats.lowest}%</div>
              <div className="stat-label">Lowest Score</div>
            </div>
          </div>
        </div>

        {/* Grade Distribution Section */}
        <div className="grade-distribution-section">
          <h2>🎯 Grade Distribution</h2>
          <div className="grade-bars">
            {Object.entries(classStats.gradeDistribution).map(([grade, count]) => {
              const percentage = ((count / classStats.totalStudents) * 100).toFixed(0);
              const gradeClass = grade === 'A+' || grade === 'A' ? 'excellent' : 
                                grade === 'B' ? 'good' : 
                                grade === 'C' ? 'average' : 'fail';
              return (
                <div key={grade} className="grade-bar-container">
                  <div className="grade-bar-label">
                    <span className={`grade-badge ${gradeClass}`}>{grade}</span>
                    <span className="grade-count">{count} students ({percentage}%)</span>
                  </div>
                  <div className="grade-bar-track">
                    <div 
                      className={`grade-bar-fill ${gradeClass}`}
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="grade-bar-value">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Sort Controls */}
        <div className="controls-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          
          <div className="sort-container">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="rollNumber">Roll Number</option>
              <option value="percentage">Percentage (High to Low)</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="results-info">
            Found {filteredAndSortedStudents.length} student(s) matching "{searchTerm}"
          </div>
        )}

        <div className="cards-container">
          {/* 
            Reusing StudentCard component for multiple students
            Data is passed from parent to child using props
            Each StudentCard receives: name, rollNumber, and marks
          */}
          {filteredAndSortedStudents.length > 0 ? (
            filteredAndSortedStudents.map((student, index) => (
              <StudentCard
                key={index}
                name={student.name}
                rollNumber={student.rollNumber}
                marks={student.marks}
                subjects={subjects}
              />
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No students found</h3>
              <p>Try adjusting your search criteria</p>
            </div>
          )}
        </div>

        <div className="grading-criteria">
          <h2>📊 Grading Criteria</h2>
          <table>
            <thead>
              <tr>
                <th>Percentage Range</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>90% and above</td>
                <td className="grade excellent">A+</td>
              </tr>
              <tr>
                <td>80% – 89%</td>
                <td className="grade good">A</td>
              </tr>
              <tr>
                <td>70% – 79%</td>
                <td className="grade good">B</td>
              </tr>
              <tr>
                <td>60% – 69%</td>
                <td className="grade average">C</td>
              </tr>
              <tr>
                <td>Below 60%</td>
                <td className="grade fail">Fail</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      <footer className="app-footer">
        <p>💡 This application demonstrates React component communication and reusability</p>
      </footer>
    </div>
  );
}

export default App;
