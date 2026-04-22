// Realistic student progression across semesters
// Students persist and evolve over time with realistic performance changes

export interface StudentData {
  id: string
  name: string
  studentId: string
  engagementScore: number
  attendanceRate: number
  participationPoints: number
  totalPoints: number
  semester: string
  previousSemesterScore?: number // For calculating trends
}

export interface AttendanceData {
  id: string
  studentName: string
  studentId: string
  checkIn: string
  checkOut: string | null
  status: 'present' | 'absent' | 'late'
  duration: string
  sessionName: string
  date: string
  semester: string
}

// Core student roster - these students persist across semesters
// Fall 2024 - Initial cohort (10 students starting their journey)
export const fall2024Students: StudentData[] = [
  { id: '1', name: 'Emma Wilson', studentId: 'STU001', engagementScore: 85, attendanceRate: 88, participationPoints: 340, totalPoints: 1313, semester: 'fall-2024' },
  { id: '2', name: 'John Doe', studentId: 'STU002', engagementScore: 82, attendanceRate: 85, participationPoints: 320, totalPoints: 1287, semester: 'fall-2024' },
  { id: '3', name: 'Sarah Smith', studentId: 'STU003', engagementScore: 88, attendanceRate: 90, participationPoints: 350, totalPoints: 1428, semester: 'fall-2024' },
  { id: '4', name: 'Tom Brown', studentId: 'STU004', engagementScore: 78, attendanceRate: 82, participationPoints: 300, totalPoints: 1260, semester: 'fall-2024' },
  { id: '5', name: 'Lisa Anderson', studentId: 'STU005', engagementScore: 90, attendanceRate: 92, participationPoints: 360, totalPoints: 1442, semester: 'fall-2024' },
  { id: '6', name: 'Mike Johnson', studentId: 'STU006', engagementScore: 75, attendanceRate: 78, participationPoints: 280, totalPoints: 1233, semester: 'fall-2024' },
  { id: '7', name: 'Alex Chen', studentId: 'STU007', engagementScore: 92, attendanceRate: 95, participationPoints: 380, totalPoints: 1467, semester: 'fall-2024' },
  { id: '8', name: 'Jessica Lee', studentId: 'STU008', engagementScore: 80, attendanceRate: 83, participationPoints: 310, totalPoints: 1273, semester: 'fall-2024' },
  { id: '9', name: 'David Martinez', studentId: 'STU009', engagementScore: 86, attendanceRate: 89, participationPoints: 345, totalPoints: 1420, semester: 'fall-2024' },
  { id: '10', name: 'Rachel Kim', studentId: 'STU010', engagementScore: 84, attendanceRate: 87, participationPoints: 335, totalPoints: 1406, semester: 'fall-2024' },
]

// Spring 2025 - Same students showing improvement/decline
export const spring2025Students: StudentData[] = [
  { id: '1', name: 'Emma Wilson', studentId: 'STU001', engagementScore: 92, attendanceRate: 94, participationPoints: 390, totalPoints: 1476, semester: 'spring-2025', previousSemesterScore: 85 }, // Improving ↑
  { id: '2', name: 'John Doe', studentId: 'STU002', engagementScore: 88, attendanceRate: 90, participationPoints: 360, totalPoints: 1438, semester: 'spring-2025', previousSemesterScore: 82 }, // Improving ↑
  { id: '3', name: 'Sarah Smith', studentId: 'STU003', engagementScore: 90, attendanceRate: 92, participationPoints: 370, totalPoints: 1452, semester: 'spring-2025', previousSemesterScore: 88 }, // Improving ↑
  { id: '4', name: 'Tom Brown', studentId: 'STU004', engagementScore: 76, attendanceRate: 80, participationPoints: 290, totalPoints: 1246, semester: 'spring-2025', previousSemesterScore: 78 }, // Declining ↓
  { id: '5', name: 'Lisa Anderson', studentId: 'STU005', engagementScore: 91, attendanceRate: 93, participationPoints: 365, totalPoints: 1449, semester: 'spring-2025', previousSemesterScore: 90 }, // Stable →
  { id: '6', name: 'Mike Johnson', studentId: 'STU006', engagementScore: 80, attendanceRate: 84, participationPoints: 310, totalPoints: 1374, semester: 'spring-2025', previousSemesterScore: 75 }, // Improving ↑
  { id: '7', name: 'Alex Chen', studentId: 'STU007', engagementScore: 94, attendanceRate: 97, participationPoints: 400, totalPoints: 1491, semester: 'spring-2025', previousSemesterScore: 92 }, // Improving ↑
  { id: '8', name: 'Jessica Lee', studentId: 'STU008', engagementScore: 82, attendanceRate: 85, participationPoints: 320, totalPoints: 1387, semester: 'spring-2025', previousSemesterScore: 80 }, // Improving ↑
  { id: '9', name: 'David Martinez', studentId: 'STU009', engagementScore: 87, attendanceRate: 90, participationPoints: 350, totalPoints: 1427, semester: 'spring-2025', previousSemesterScore: 86 }, // Stable →
  { id: '10', name: 'Rachel Kim', studentId: 'STU010', engagementScore: 85, attendanceRate: 88, participationPoints: 340, totalPoints: 1413, semester: 'spring-2025', previousSemesterScore: 84 }, // Stable →
  // New student joins
  { id: '11', name: 'Chris Taylor', studentId: 'STU011', engagementScore: 79, attendanceRate: 82, participationPoints: 305, totalPoints: 1366, semester: 'spring-2025' }, // New student
]

// Summer 2025 - Smaller cohort (some students take break)
export const summer2025Students: StudentData[] = [
  { id: '1', name: 'Emma Wilson', studentId: 'STU001', engagementScore: 95, attendanceRate: 97, participationPoints: 410, totalPoints: 1502, semester: 'summer-2025', previousSemesterScore: 92 }, // Improving ↑
  { id: '3', name: 'Sarah Smith', studentId: 'STU003', engagementScore: 91, attendanceRate: 93, participationPoints: 375, totalPoints: 1459, semester: 'summer-2025', previousSemesterScore: 90 }, // Stable →
  { id: '5', name: 'Lisa Anderson', studentId: 'STU005', engagementScore: 92, attendanceRate: 94, participationPoints: 370, totalPoints: 1456, semester: 'summer-2025', previousSemesterScore: 91 }, // Stable →
  { id: '6', name: 'Mike Johnson', studentId: 'STU006', engagementScore: 83, attendanceRate: 87, participationPoints: 325, totalPoints: 1395, semester: 'summer-2025', previousSemesterScore: 80 }, // Improving ↑
  { id: '7', name: 'Alex Chen', studentId: 'STU007', engagementScore: 96, attendanceRate: 98, participationPoints: 420, totalPoints: 1514, semester: 'summer-2025', previousSemesterScore: 94 }, // Improving ↑
  { id: '9', name: 'David Martinez', studentId: 'STU009', engagementScore: 88, attendanceRate: 91, participationPoints: 355, totalPoints: 1434, semester: 'summer-2025', previousSemesterScore: 87 }, // Stable →
  { id: '11', name: 'Chris Taylor', studentId: 'STU011', engagementScore: 82, attendanceRate: 85, participationPoints: 315, totalPoints: 1382, semester: 'summer-2025', previousSemesterScore: 79 }, // Improving ↑
]

// Fall 2025 - Full cohort returns + new students
export const fall2025Students: StudentData[] = [
  { id: '1', name: 'Emma Wilson', studentId: 'STU001', engagementScore: 97, attendanceRate: 99, participationPoints: 430, totalPoints: 1526, semester: 'fall-2025', previousSemesterScore: 95 }, // Improving ↑
  { id: '2', name: 'John Doe', studentId: 'STU002', engagementScore: 90, attendanceRate: 93, participationPoints: 375, totalPoints: 1458, semester: 'fall-2025', previousSemesterScore: 88 }, // Improving ↑
  { id: '3', name: 'Sarah Smith', studentId: 'STU003', engagementScore: 92, attendanceRate: 94, participationPoints: 380, totalPoints: 1466, semester: 'fall-2025', previousSemesterScore: 91 }, // Stable →
  { id: '4', name: 'Tom Brown', studentId: 'STU004', engagementScore: 78, attendanceRate: 82, participationPoints: 295, totalPoints: 1255, semester: 'fall-2025', previousSemesterScore: 76 }, // Improving ↑
  { id: '5', name: 'Lisa Anderson', studentId: 'STU005', engagementScore: 93, attendanceRate: 95, participationPoints: 375, totalPoints: 1463, semester: 'fall-2025', previousSemesterScore: 92 }, // Stable →
  { id: '6', name: 'Mike Johnson', studentId: 'STU006', engagementScore: 85, attendanceRate: 89, participationPoints: 335, totalPoints: 1409, semester: 'fall-2025', previousSemesterScore: 83 }, // Improving ↑
  { id: '7', name: 'Alex Chen', studentId: 'STU007', engagementScore: 98, attendanceRate: 100, participationPoints: 440, totalPoints: 1538, semester: 'fall-2025', previousSemesterScore: 96 }, // Improving ↑
  { id: '8', name: 'Jessica Lee', studentId: 'STU008', engagementScore: 84, attendanceRate: 87, participationPoints: 330, totalPoints: 1401, semester: 'fall-2025', previousSemesterScore: 82 }, // Improving ↑
  { id: '9', name: 'David Martinez', studentId: 'STU009', engagementScore: 89, attendanceRate: 92, participationPoints: 360, totalPoints: 1441, semester: 'fall-2025', previousSemesterScore: 88 }, // Stable →
  { id: '10', name: 'Rachel Kim', studentId: 'STU010', engagementScore: 86, attendanceRate: 89, participationPoints: 345, totalPoints: 1420, semester: 'fall-2025', previousSemesterScore: 85 }, // Stable →
  { id: '11', name: 'Chris Taylor', studentId: 'STU011', engagementScore: 84, attendanceRate: 87, participationPoints: 325, totalPoints: 1396, semester: 'fall-2025', previousSemesterScore: 82 }, // Improving ↑
  // New students join
  { id: '12', name: 'Nina Patel', studentId: 'STU012', engagementScore: 81, attendanceRate: 84, participationPoints: 310, totalPoints: 1375, semester: 'fall-2025' },
]

// Spring 2026 - Current semester (most recent data)
export const spring2026Students: StudentData[] = [
  { id: '1', name: 'Emma Wilson', studentId: 'STU001', engagementScore: 98, attendanceRate: 100, participationPoints: 450, totalPoints: 1548, semester: 'spring-2026', previousSemesterScore: 97 }, // Improving ↑
  { id: '2', name: 'John Doe', studentId: 'STU002', engagementScore: 92, attendanceRate: 95, participationPoints: 390, totalPoints: 1477, semester: 'spring-2026', previousSemesterScore: 90 }, // Improving ↑
  { id: '3', name: 'Sarah Smith', studentId: 'STU003', engagementScore: 93, attendanceRate: 95, participationPoints: 385, totalPoints: 1473, semester: 'spring-2026', previousSemesterScore: 92 }, // Stable →
  { id: '4', name: 'Tom Brown', studentId: 'STU004', engagementScore: 80, attendanceRate: 84, participationPoints: 305, totalPoints: 1269, semester: 'spring-2026', previousSemesterScore: 78 }, // Improving ↑
  { id: '5', name: 'Lisa Anderson', studentId: 'STU005', engagementScore: 94, attendanceRate: 96, participationPoints: 380, totalPoints: 1470, semester: 'spring-2026', previousSemesterScore: 93 }, // Stable →
  { id: '6', name: 'Mike Johnson', studentId: 'STU006', engagementScore: 87, attendanceRate: 90, participationPoints: 345, totalPoints: 1422, semester: 'spring-2026', previousSemesterScore: 85 }, // Improving ↑
  { id: '7', name: 'Alex Chen', studentId: 'STU007', engagementScore: 99, attendanceRate: 100, participationPoints: 460, totalPoints: 1559, semester: 'spring-2026', previousSemesterScore: 98 }, // Stable →
  { id: '8', name: 'Jessica Lee', studentId: 'STU008', engagementScore: 86, attendanceRate: 89, participationPoints: 340, totalPoints: 1415, semester: 'spring-2026', previousSemesterScore: 84 }, // Improving ↑
  { id: '9', name: 'David Martinez', studentId: 'STU009', engagementScore: 90, attendanceRate: 93, participationPoints: 365, totalPoints: 1448, semester: 'spring-2026', previousSemesterScore: 89 }, // Stable →
  { id: '10', name: 'Rachel Kim', studentId: 'STU010', engagementScore: 87, attendanceRate: 90, participationPoints: 350, totalPoints: 1427, semester: 'spring-2026', previousSemesterScore: 86 }, // Stable →
  { id: '11', name: 'Chris Taylor', studentId: 'STU011', engagementScore: 85, attendanceRate: 88, participationPoints: 330, totalPoints: 1403, semester: 'spring-2026', previousSemesterScore: 84 }, // Stable →
  { id: '12', name: 'Nina Patel', studentId: 'STU012', engagementScore: 83, attendanceRate: 86, participationPoints: 320, totalPoints: 1389, semester: 'spring-2026', previousSemesterScore: 81 }, // Improving ↑
]

// Summer 2026 - Projected data (smaller summer cohort)
export const summer2026Students: StudentData[] = [
  { id: '1', name: 'Emma Wilson', studentId: 'STU001', engagementScore: 99, attendanceRate: 100, participationPoints: 470, totalPoints: 1569, semester: 'summer-2026', previousSemesterScore: 98 }, // Stable →
  { id: '2', name: 'John Doe', studentId: 'STU002', engagementScore: 93, attendanceRate: 96, participationPoints: 395, totalPoints: 1484, semester: 'summer-2026', previousSemesterScore: 92 }, // Stable →
  { id: '5', name: 'Lisa Anderson', studentId: 'STU005', engagementScore: 95, attendanceRate: 97, participationPoints: 385, totalPoints: 1477, semester: 'summer-2026', previousSemesterScore: 94 }, // Stable →
  { id: '7', name: 'Alex Chen', studentId: 'STU007', engagementScore: 99, attendanceRate: 100, participationPoints: 465, totalPoints: 1564, semester: 'summer-2026', previousSemesterScore: 99 }, // Stable →
  { id: '9', name: 'David Martinez', studentId: 'STU009', engagementScore: 91, attendanceRate: 94, participationPoints: 370, totalPoints: 1455, semester: 'summer-2026', previousSemesterScore: 90 }, // Stable →
  { id: '12', name: 'Nina Patel', studentId: 'STU012', engagementScore: 84, attendanceRate: 87, participationPoints: 325, totalPoints: 1396, semester: 'summer-2026', previousSemesterScore: 83 }, // Stable →
]

// Attendance Data - Realistic attendance for each semester
export const fall2024Attendance: AttendanceData[] = [
  { id: '1', studentName: 'Emma Wilson', studentId: 'STU001', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '2', studentName: 'John Doe', studentId: 'STU002', checkIn: '09:10 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 50m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '3', studentName: 'Sarah Smith', studentId: 'STU003', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '4', studentName: 'Tom Brown', studentId: 'STU004', checkIn: '-', checkOut: '-', status: 'absent', duration: '-', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '5', studentName: 'Lisa Anderson', studentId: 'STU005', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '6', studentName: 'Mike Johnson', studentId: 'STU006', checkIn: '09:15 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 45m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '7', studentName: 'Alex Chen', studentId: 'STU007', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '8', studentName: 'Jessica Lee', studentId: 'STU008', checkIn: '09:05 AM', checkOut: '11:00 AM', status: 'present', duration: '1h 55m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '9', studentName: 'David Martinez', studentId: 'STU009', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
  { id: '10', studentName: 'Rachel Kim', studentId: 'STU010', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Mathematics 101', date: '2024-09-15', semester: 'fall-2024' },
]

export const spring2025Attendance: AttendanceData[] = [
  { id: '1', studentName: 'Emma Wilson', studentId: 'STU001', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '2', studentName: 'John Doe', studentId: 'STU002', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '3', studentName: 'Sarah Smith', studentId: 'STU003', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '4', studentName: 'Tom Brown', studentId: 'STU004', checkIn: '-', checkOut: '-', status: 'absent', duration: '-', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '5', studentName: 'Lisa Anderson', studentId: 'STU005', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '6', studentName: 'Mike Johnson', studentId: 'STU006', checkIn: '09:10 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 50m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '7', studentName: 'Alex Chen', studentId: 'STU007', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '8', studentName: 'Jessica Lee', studentId: 'STU008', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '9', studentName: 'David Martinez', studentId: 'STU009', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '10', studentName: 'Rachel Kim', studentId: 'STU010', checkIn: '09:05 AM', checkOut: '11:00 AM', status: 'present', duration: '1h 55m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
  { id: '11', studentName: 'Chris Taylor', studentId: 'STU011', checkIn: '09:15 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 45m', sessionName: 'Physics 202', date: '2025-02-10', semester: 'spring-2025' },
]

export const summer2025Attendance: AttendanceData[] = [
  { id: '1', studentName: 'Emma Wilson', studentId: 'STU001', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Chemistry 201', date: '2025-06-15', semester: 'summer-2025' },
  { id: '3', studentName: 'Sarah Smith', studentId: 'STU003', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Chemistry 201', date: '2025-06-15', semester: 'summer-2025' },
  { id: '5', studentName: 'Lisa Anderson', studentId: 'STU005', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Chemistry 201', date: '2025-06-15', semester: 'summer-2025' },
  { id: '6', studentName: 'Mike Johnson', studentId: 'STU006', checkIn: '09:10 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 50m', sessionName: 'Chemistry 201', date: '2025-06-15', semester: 'summer-2025' },
  { id: '7', studentName: 'Alex Chen', studentId: 'STU007', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Chemistry 201', date: '2025-06-15', semester: 'summer-2025' },
  { id: '9', studentName: 'David Martinez', studentId: 'STU009', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Chemistry 201', date: '2025-06-15', semester: 'summer-2025' },
  { id: '11', studentName: 'Chris Taylor', studentId: 'STU011', checkIn: '09:05 AM', checkOut: '11:00 AM', status: 'present', duration: '1h 55m', sessionName: 'Chemistry 201', date: '2025-06-15', semester: 'summer-2025' },
]

export const fall2025Attendance: AttendanceData[] = [
  { id: '1', studentName: 'Emma Wilson', studentId: 'STU001', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '2', studentName: 'John Doe', studentId: 'STU002', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '3', studentName: 'Sarah Smith', studentId: 'STU003', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '4', studentName: 'Tom Brown', studentId: 'STU004', checkIn: '09:15 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 45m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '5', studentName: 'Lisa Anderson', studentId: 'STU005', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '6', studentName: 'Mike Johnson', studentId: 'STU006', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '7', studentName: 'Alex Chen', studentId: 'STU007', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '8', studentName: 'Jessica Lee', studentId: 'STU008', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '9', studentName: 'David Martinez', studentId: 'STU009', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '10', studentName: 'Rachel Kim', studentId: 'STU010', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '11', studentName: 'Chris Taylor', studentId: 'STU011', checkIn: '09:05 AM', checkOut: '11:00 AM', status: 'present', duration: '1h 55m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
  { id: '12', studentName: 'Nina Patel', studentId: 'STU012', checkIn: '09:10 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 50m', sessionName: 'Biology 301', date: '2025-09-20', semester: 'fall-2025' },
]

export const spring2026Attendance: AttendanceData[] = [
  { id: '1', studentName: 'Emma Wilson', studentId: 'STU001', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '2', studentName: 'John Doe', studentId: 'STU002', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '3', studentName: 'Sarah Smith', studentId: 'STU003', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '4', studentName: 'Tom Brown', studentId: 'STU004', checkIn: '09:15 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 45m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '5', studentName: 'Lisa Anderson', studentId: 'STU005', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '6', studentName: 'Mike Johnson', studentId: 'STU006', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '7', studentName: 'Alex Chen', studentId: 'STU007', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '8', studentName: 'Jessica Lee', studentId: 'STU008', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '9', studentName: 'David Martinez', studentId: 'STU009', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '10', studentName: 'Rachel Kim', studentId: 'STU010', checkIn: '09:05 AM', checkOut: '11:00 AM', status: 'present', duration: '1h 55m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '11', studentName: 'Chris Taylor', studentId: 'STU011', checkIn: '09:10 AM', checkOut: '11:00 AM', status: 'late', duration: '1h 50m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
  { id: '12', studentName: 'Nina Patel', studentId: 'STU012', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Advanced Mathematics', date: '2026-04-09', semester: 'spring-2026' },
]

export const summer2026Attendance: AttendanceData[] = [
  { id: '1', studentName: 'Emma Wilson', studentId: 'STU001', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Computer Science 401', date: '2026-06-20', semester: 'summer-2026' },
  { id: '2', studentName: 'John Doe', studentId: 'STU002', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Computer Science 401', date: '2026-06-20', semester: 'summer-2026' },
  { id: '5', studentName: 'Lisa Anderson', studentId: 'STU005', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Computer Science 401', date: '2026-06-20', semester: 'summer-2026' },
  { id: '7', studentName: 'Alex Chen', studentId: 'STU007', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Computer Science 401', date: '2026-06-20', semester: 'summer-2026' },
  { id: '9', studentName: 'David Martinez', studentId: 'STU009', checkIn: '09:00 AM', checkOut: '11:00 AM', status: 'present', duration: '2h 0m', sessionName: 'Computer Science 401', date: '2026-06-20', semester: 'summer-2026' },
  { id: '12', studentName: 'Nina Patel', studentId: 'STU012', checkIn: '09:05 AM', checkOut: '11:00 AM', status: 'present', duration: '1h 55m', sessionName: 'Computer Science 401', date: '2026-06-20', semester: 'summer-2026' },
]

// Helper function to get students by semester
export function getStudentsBySemester(semesterId: string): StudentData[] {
  switch (semesterId) {
    case 'fall-2024': return fall2024Students
    case 'spring-2025': return spring2025Students
    case 'summer-2025': return summer2025Students
    case 'fall-2025': return fall2025Students
    case 'spring-2026': return spring2026Students
    case 'summer-2026': return summer2026Students
    default: return spring2026Students
  }
}

// Helper function to get attendance by semester
export function getAttendanceBySemester(semesterId: string): AttendanceData[] {
  switch (semesterId) {
    case 'fall-2024': return fall2024Attendance
    case 'spring-2025': return spring2025Attendance
    case 'summer-2025': return summer2025Attendance
    case 'fall-2025': return fall2025Attendance
    case 'spring-2026': return spring2026Attendance
    case 'summer-2026': return summer2026Attendance
    default: return spring2026Attendance
  }
}

// Helper function to get stats by semester
export function getStatsBySemester(semesterId: string) {
  const students = getStudentsBySemester(semesterId)
  const totalStudents = students.length
  const avgEngagement = Math.round(students.reduce((sum, s) => sum + s.engagementScore, 0) / totalStudents)
  const avgAttendance = Math.round(students.reduce((sum, s) => sum + s.attendanceRate, 0) / totalStudents)
  
  return {
    totalStudents,
    avgEngagement,
    avgAttendance,
    activeSessions: Math.floor(totalStudents / 5) + 3,
    topPerformers: students.filter(s => s.engagementScore >= 90).length
  }
}

// Helper function to get student history across semesters
export function getStudentHistory(studentId: string): StudentData[] {
  const allSemesters = [
    ...fall2024Students,
    ...spring2025Students,
    ...summer2025Students,
    ...fall2025Students,
    ...spring2026Students,
    ...summer2026Students
  ]
  return allSemesters.filter(s => s.studentId === studentId).sort((a, b) => {
    const semesterOrder = ['fall-2024', 'spring-2025', 'summer-2025', 'fall-2025', 'spring-2026', 'summer-2026']
    return semesterOrder.indexOf(a.semester) - semesterOrder.indexOf(b.semester)
  })
}

// Helper function to calculate trend based on previous semester
export function calculateTrend(student: StudentData): 'up' | 'down' | 'same' {
  if (!student.previousSemesterScore) return 'same'
  const diff = student.engagementScore - student.previousSemesterScore
  if (diff > 2) return 'up'
  if (diff < -2) return 'down'
  return 'same'
}
