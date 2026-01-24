
// Define the Course interface
export interface Course {
    _id?: string; // Optional _id for ObjectId
    subjectsIds: string[];
    teacherIds: string[];
    studentsEnrolled: string[];
    organizationId: string;
    name: string;
    code: string;
    description: string;
    startDate: string;
    endDate: string;
    schedule: string;
    credits: number;
    prerequisites: string[];
    location: string;
    fee: number;
    textbooks: any[];
    syllabus: string;
    assignments: any[];
    gradingScheme: string;
    resources: { title: string; url: string; _id?: string }[];
    feedback: any[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

// Define the CourseApiResponseData interface
interface CourseApiResponseData<T> {
    courses: T;
    totalCourses: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

// Define the CourseApiResponse interface
export interface CourseApiResponse<T> {
    statusCode: number;
    data: CourseApiResponseData<T>;
    message: string;
    success: boolean;
}   