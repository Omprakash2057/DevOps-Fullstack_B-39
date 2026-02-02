# Student Marks Card Application

A React application demonstrating parent-child component communication using props, along with component reusability and data processing logic.

## 🎯 Project Overview

This application displays student marks cards with automatic calculation of:
- **Total Marks**: Sum of all subject marks
- **Percentage**: Calculated based on total marks
- **Grade**: Assigned based on percentage criteria

## 📋 Features

✅ **Parent-to-Child Communication**: Data flows from App (parent) to StudentCard (child) using props  
✅ **Component Reusability**: Single StudentCard component renders multiple student records  
✅ **Automatic Calculations**: Total marks, percentage, and grade computed dynamically  
✅ **Responsive Design**: Works on desktop, tablet, and mobile devices  
✅ **Modern UI**: Beautiful gradient designs with smooth animations

## 🧱 Component Structure

```
App (Parent Component)
   ↓ props (name, rollNumber, marks)
StudentCard (Child Component)
```

## 📊 Grading Criteria

| Percentage Range | Grade |
|-----------------|-------|
| 90% and above   | A+    |
| 80% – 89%       | A     |
| 70% – 79%       | B     |
| 60% – 69%       | C     |
| Below 60%       | Fail  |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
Devops_2_1_2026/
├── public/
│   └── index.html
├── src/
│   ├── App.js              # Parent component with student data
│   ├── App.css             # Styling for App component
│   ├── StudentCard.js      # Child component for displaying student info
│   ├── StudentCard.css     # Styling for StudentCard component
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## 🛠️ Implementation Details

### Parent Component (App.js)
- Maintains an array of student objects
- Each student object contains: name, rollNumber, marks[]
- Passes data to StudentCard component via props
- Reuses StudentCard for multiple students

### Child Component (StudentCard.js)
- Receives props: name, rollNumber, marks
- Displays student information in a card format
- **Calculations**:
  - `calculateTotal()`: Sums all marks using reduce
  - `calculatePercentage()`: (total / maxMarks) × 100
  - `calculateGrade()`: Assigns grade based on percentage
- Renders color-coded grades for visual feedback

## 💡 Key Concepts Demonstrated

1. **Props**: Unidirectional data flow from parent to child
2. **Component Reusability**: Single component handles multiple data sets
3. **JavaScript Logic**: Array methods (map, reduce) for data processing
4. **Conditional Rendering**: Dynamic grade colors based on performance
5. **State Management**: Data maintained in parent component

## 🎨 Customization

### Adding More Students

Edit the `students` array in [src/App.js](src/App.js):

```javascript
const students = [
  {
    name: 'Your Name',
    rollNumber: 'YOUR123',
    marks: [85, 90, 78, 92, 88]  // Add 5 subject marks
  },
  // Add more students...
];
```

### Changing Grading Criteria

Modify the `calculateGrade()` function in [src/StudentCard.js](src/StudentCard.js):

```javascript
const calculateGrade = () => {
  const percentage = parseFloat(calculatePercentage());
  
  if (percentage >= 95) {
    return 'A++';
  }
  // Add your custom criteria...
};
```

## 📱 Responsive Design

The application is fully responsive and adapts to:
- Desktop screens (1400px+)
- Tablets (768px - 1400px)
- Mobile devices (< 768px)

## 🧪 Testing

The application includes 5 sample students with different grade levels to demonstrate all features:
- Student with A+ grade (90%+)
- Student with A grade (80-89%)
- Student with B grade (70-79%)
- Student with C grade (60-69%)
- Student with Fail grade (<60%)

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using React**
