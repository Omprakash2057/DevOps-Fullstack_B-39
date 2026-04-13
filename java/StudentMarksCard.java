import java.util.Arrays;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * StudentMarksCard — Java equivalent of the React Student Marks Card Application
 *
 * Demonstrates OOP concepts (classes, arrays, methods) while producing the same
 * student-marks report as the React frontend. Outputs a formatted console report
 * covering:
 *   • Individual student cards (subject marks, total, percentage, grade)
 *   • Class-level performance statistics
 *   • Grade distribution
 *   • Grading criteria table
 */
public class StudentMarksCard {

    // Subject names — identical to the React app
    private static final String[] SUBJECTS = {
        "AI Assistant Coding",
        "DevOps & Full Stack",
        "Competitive Programming",
        "High Performance Computing",
        "3D Printing"
    };

    // Student data — identical to the React app
    private static final Student[] STUDENTS = {
        new Student("Mukesh",        "CS2024001", new int[]{85, 92, 78, 88, 95}),
        new Student("Radha Krishna", "CS2024002", new int[]{95, 98, 96, 94, 97}),
        new Student("Nikhil",        "CS2024003", new int[]{98, 99, 97, 96, 100}),
        new Student("Kruthik",       "CS2024004", new int[]{92, 94, 96, 93, 95}),
        new Student("Mahesh",        "CS2024005", new int[]{89, 91, 93, 90, 92}),
        new Student("Tharun",        "CS2024006", new int[]{95, 97, 94, 96, 98}),
        new Student("Nikil",         "CS2024007", new int[]{97, 96, 98, 99, 95}),
        new Student("Siddharth",     "CS2024008", new int[]{72, 68, 75, 70, 73}),
        new Student("Vikram Singh",  "CS2024009", new int[]{55, 58, 52, 60, 57})
    };

    // ── Entry point ────────────────────────────────────────────────────────────

    public static void main(String[] args) {
        printHeader();
        printClassStatistics();
        printGradeDistribution();
        printSeparator('=', 60);
        System.out.println("  STUDENT MARKS CARDS");
        printSeparator('=', 60);
        for (Student student : STUDENTS) {
            printStudentCard(student);
        }
        printGradingCriteria();
        System.out.println("\n  This application demonstrates OOP concepts and Java fundamentals.");
    }

    // ── Printing helpers ───────────────────────────────────────────────────────

    private static void printHeader() {
        printSeparator('=', 60);
        System.out.println("   Student Marks Card Application");
        System.out.println("   Parent-Child OOP: Student + StudentMarksCard");
        printSeparator('=', 60);
        System.out.println();
    }

    private static void printStudentCard(Student student) {
        printSeparator('-', 60);
        System.out.printf("  Name       : %s%n", student.getName());
        System.out.printf("  Roll No    : %s%n", student.getRollNumber());
        printSeparator('-', 60);

        // Subject marks
        int[] marks = student.getMarks();
        System.out.println("  Subject Marks:");
        for (int i = 0; i < SUBJECTS.length; i++) {
            System.out.printf("    %-36s : %d/100%n", SUBJECTS[i], marks[i]);
        }
        printSeparator('-', 60);

        // Results
        System.out.printf("  Total Marks : %d/%d%n", student.calculateTotal(), marks.length * 100);
        System.out.printf("  Percentage  : %.2f%%%n", student.calculatePercentage());
        System.out.printf("  Grade       : %s%n", student.calculateGrade());
        System.out.printf("  Result      : %s%n", student.hasPassed() ? "PASS" : "FAIL");
        System.out.println();
    }

    private static void printClassStatistics() {
        double highest = Double.MIN_VALUE;
        double lowest  = Double.MAX_VALUE;
        double sum     = 0;
        int    passCount = 0;
        String topStudent = "";

        for (Student s : STUDENTS) {
            double pct = s.calculatePercentage();
            sum += pct;
            if (pct > highest) { highest = pct; topStudent = s.getName(); }
            if (pct < lowest)  { lowest  = pct; }
            if (s.hasPassed()) { passCount++; }
        }

        double average     = sum / STUDENTS.length;
        int    failCount   = STUDENTS.length - passCount;
        double passPercent = (passCount / (double) STUDENTS.length) * 100.0;

        System.out.println("  CLASS PERFORMANCE STATISTICS");
        printSeparator('-', 60);
        System.out.printf("  Total Students : %d%n",          STUDENTS.length);
        System.out.printf("  Class Average  : %.2f%%%n",      average);
        System.out.printf("  Highest Score  : %.2f%%%n",      highest);
        System.out.printf("  Lowest Score   : %.2f%%%n",      lowest);
        System.out.printf("  Top Performer  : %s%n",          topStudent);
        System.out.printf("  Passed         : %d%n",          passCount);
        System.out.printf("  Failed         : %d%n",          failCount);
        System.out.printf("  Pass Rate      : %.1f%%%n",      passPercent);
        System.out.println();
    }

    private static void printGradeDistribution() {
        Map<String, Integer> distribution = new LinkedHashMap<>();
        distribution.put("A+",   0);
        distribution.put("A",    0);
        distribution.put("B",    0);
        distribution.put("C",    0);
        distribution.put("Fail", 0);

        for (Student s : STUDENTS) {
            String grade = s.calculateGrade();
            distribution.put(grade, distribution.get(grade) + 1);
        }

        System.out.println("  GRADE DISTRIBUTION");
        printSeparator('-', 60);
        for (Map.Entry<String, Integer> entry : distribution.entrySet()) {
            int count   = entry.getValue();
            int barLen  = count * 4;
            String bar  = "#".repeat(barLen);
            System.out.printf("  %-4s : %s (%d students)%n", entry.getKey(), bar, count);
        }
        System.out.println();
    }

    private static void printGradingCriteria() {
        printSeparator('=', 60);
        System.out.println("  GRADING CRITERIA");
        printSeparator('-', 60);
        System.out.printf("  %-22s  %s%n", "Percentage Range", "Grade");
        printSeparator('-', 60);
        System.out.printf("  %-22s  %s%n", "90% and above",  "A+");
        System.out.printf("  %-22s  %s%n", "80% - 89%",      "A");
        System.out.printf("  %-22s  %s%n", "70% - 79%",      "B");
        System.out.printf("  %-22s  %s%n", "60% - 69%",      "C");
        System.out.printf("  %-22s  %s%n", "Below 60%",      "Fail");
        printSeparator('=', 60);
        System.out.println();
    }

    private static void printSeparator(char ch, int length) {
        System.out.println("  " + String.valueOf(ch).repeat(length));
    }
}
