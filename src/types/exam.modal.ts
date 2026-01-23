export interface Exam {
    _id: string;
    name: string;
    description?: string;
    subjectId?: string;
    courseId?: string;
    classId?: string;
    teacherId?: string;
    duration: number;
    totalMarks: number;
    examType: 'quiz' | 'midterm' | 'final';
    startDate: string;
    endDate: string;
    schedule?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ApiResponseData<T> {
    exams: T;
    totalExams: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface ApiResponse<T> {
    statusCode: number;
    data: ApiResponseData<T> | any[];
    message: string;
    success: boolean;
}

export interface ApiResponseError {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    error: any[];
}
