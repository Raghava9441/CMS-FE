export interface AdminDashboardResponse {
    statusCode: number;
    data: AdminDashboardData;
    message: string;
    success: boolean;
}

export interface AdminDashboardData {
    role: 'admin';
    counts: UserCounts;
    studentStats: StudentStats;
    attendanceStats: AttendanceStats;
    events: Event[];
}

export interface UserCounts {
    adminCount: number;
    teacherCount: number;
    studentCount: number;
    parentCount: number;
}

export interface StudentStats {
    maleCount: number;
    femaleCount: number;
}

export interface AttendanceStats {
    presentCount: number;
    absentCount: number;
    year: number;
}

export interface Event {
    // Define structure if known; using an empty object for now
    [key: string]: any;
}
