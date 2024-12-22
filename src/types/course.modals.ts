
// Define the Course interface
export interface Course {
    _id?: string; // Optional _id for ObjectId
    name: string;
    description: string;
    courseType: string;
    organizationId: string; // Use string for ObjectId reference to Organization
    createdAt?: Date; // Timestamp for when the course was created
    updatedAt?: Date; // Timestamp for when the course was last updated
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