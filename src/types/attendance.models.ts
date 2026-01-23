export interface Attendance {
    _id?: string;
    classId: string;
    studentId: string;
    date: Date;
    status: 'present' | 'absent' | 'excused';
    remarks?: string;
    markedBy: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface AttendanceApiResponseData<T> {
    attendances: T[];
    totalAttendances: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface AttendanceApiResponse<T> {
    status: number;
    success: boolean;
    data: AttendanceApiResponseData<T>;
}

export interface AttendanceStats {
    totalClasses: number;
    present: number;
    absent: number;
    excused: number;
    percentage: number;
}

export interface AttendanceStatsApiResponse {
    statusCode: number;
    data: AttendanceStats;
    message: string;
    success: boolean;
}

export interface BulkMarkAttendanceData {
    classId: string;
    date: string;
    attendance: Array<{
        studentId: string;
        status: 'present' | 'absent' | 'excused';
        remarks?: string;
    }>;
}

export interface BulkDeleteAttendanceData {
    attendanceIds: string[];
}
