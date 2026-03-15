// Student Dashboard Types
export interface StudentInfo {
    id: string;
    name: string;
    image: string;
    email: string;
    rollNumber: string;
    class: string;
    section: string;
    bloodGroup: string;
    phoneNumber: string;
    emergencyContact: string;
}

export interface StudentAttendance {
    presentCount: number;
    absentCount: number;
    lateCount: number;
    month: number;
    year: number;
    attendanceRate: string;
}

export interface AcademicStats {
    totalCourses: number;
    completedCourses: number;
    ongoingCourses: number;
    averageGrade: string;
    totalAssignments: number;
    pendingAssignments: number;
    completedAssignments: number;
}

export interface UpcomingExam {
    examId: string;
    subject: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    totalMarks: number;
}

export interface RecentGrade {
    examId: string;
    subject: string;
    date: string;
    marksObtained: number;
    totalMarks: number;
    grade: string;
    percentage: string;
}

export interface ClassSchedule {
    classId: string;
    courseId: string;
    courseName: string;
    startTime: string;
    endTime: string;
    classroom: string;
    subject: string;
    teacher: string;
}

export interface DaySchedule {
    dayOfWeek: string;
    classes: ClassSchedule[];
}

export interface StudentDashboardData {
    role: string;
    studentInfo: StudentInfo;
    attendance: StudentAttendance;
    academicStats: AcademicStats;
    upcomingExams: UpcomingExam[];
    recentGrades: RecentGrade[];
    schedule: DaySchedule[];
}

// Parent Dashboard Types
export interface ParentInfo {
    id: string;
    name: string;
    image: string;
    email: string;
    phoneNumber: string;
    relationship: string;
    address: string;
}

export interface Child {
    studentId: string;
    name: string;
    image: string;
    rollNumber: string;
    class: string;
    section: string;
}

export interface RecentPerformance {
    subject: string;
    grade: string;
    date: string;
}

export interface ChildStats {
    studentId: string;
    name: string;
    attendanceRate: string;
    averageGrade: string;
    totalAbsents: number;
    recentPerformances: RecentPerformance[];
}

export interface UpcomingEvent {
    eventId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    eventType: string;
}

export interface Announcement {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    author: string;
}

export interface ParentDashboardData {
    role: string;
    parentInfo: ParentInfo;
    children: Child[];
    childrenStats: ChildStats[];
    upcomingEvents: UpcomingEvent[];
    announcements: Announcement[];
}

// Teacher Dashboard Types
export interface TeacherInfo {
    id: string;
    name: string;
    image: string;
    email: string;
    department: string;
    designation: string;
    qualifications: string;
    experience: number;
    officeHours: string;
}

export interface TeacherAttendance {
    presentCount: number;
    absentCount: number;
    month: number;
    year: number;
}

export interface TeachingStats {
    totalLessons: number;
    totalClasses: number;
    coursesTaught: number;
    totalStudents: number;
}

export interface TeacherClass {
    classId: string;
    courseId: string;
    courseName: string;
    startTime: string;
    endTime: string;
    classroom: string;
    subject: string;
    studentCount: number;
    maxCapacity: number;
    academicYear: string;
}

export interface TeacherDaySchedule {
    dayOfWeek: string;
    classes: TeacherClass[];
}

export interface Course {
    courseId: string;
    name: string;
    code: string;
    description: string;
    credits: number;
    startDate: string;
    endDate: string;
    schedule: string;
    currentEnrollment: number;
    maxCapacity: number;
}

export interface TeacherDashboardData {
    role: string;
    teacherInfo: TeacherInfo;
    attendance: TeacherAttendance;
    teachingStats: TeachingStats;
    schedule: TeacherDaySchedule[];
    courses: Course[];
}
