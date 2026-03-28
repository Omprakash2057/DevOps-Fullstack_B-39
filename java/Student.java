/**
 * Student model class
 *
 * Represents a student with their name, roll number, and marks across subjects.
 * Provides methods to calculate total marks, percentage, and grade —
 * mirroring the logic in the React StudentCard component.
 *
 * Grading Criteria:
 *   90% and above → A+
 *   80% – 89%     → A
 *   70% – 79%     → B
 *   60% – 69%     → C
 *   Below 60%     → Fail
 */
public class Student {

    private String name;
    private String rollNumber;
    private int[] marks;

    public Student(String name, String rollNumber, int[] marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }

    // ── Getters ────────────────────────────────────────────────────────────────

    public String getName() {
        return name;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public int[] getMarks() {
        return marks;
    }

    // ── Calculations ───────────────────────────────────────────────────────────

    /**
     * Returns the sum of all subject marks.
     */
    public int calculateTotal() {
        int total = 0;
        for (int mark : marks) {
            total += mark;
        }
        return total;
    }

    /**
     * Returns the percentage score rounded to two decimal places.
     * Each subject is out of 100 marks.
     */
    public double calculatePercentage() {
        double total = calculateTotal();
        double maxMarks = marks.length * 100.0;
        return Math.round((total / maxMarks) * 10000.0) / 100.0;
    }

    /**
     * Returns the letter grade based on percentage.
     */
    public String calculateGrade() {
        double percentage = calculatePercentage();
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B";
        if (percentage >= 60) return "C";
        return "Fail";
    }

    /**
     * Returns true when the student has passed (percentage >= 60%).
     */
    public boolean hasPassed() {
        return calculatePercentage() >= 60.0;
    }
}
