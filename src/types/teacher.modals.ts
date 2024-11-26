// Define the Publication interface
interface Publication {
    title: string;
    authors: string;
    journal: string;
    year: number;
}

// Define the ProfessionalMembership interface
interface ProfessionalMembership {
    organization: string;
    membershipId: string;
}

// Define the CourseTaught interface
interface CourseTaught {
    courseId: string; // Use string for ObjectId
    semester: string;
    year: number;
}

// Define the PerformanceReview interface
interface PerformanceReview {
    studentId: string; // Use string for ObjectId
    review: string;
    rating: number; // min: 1, max: 5
}

// Define the Teacher interface
export interface Teacher {
    _id?: string; // Use string for ObjectId, _id is optional when creating a new teacher
    userId: string; // Use string for ObjectId
    name: string;
    phone: string;
    email: string;
    organizationId: string; // Use string for ObjectId
    departments?: string[]; // Use string[] for ObjectId array
    subjects?: string[]; // Use string[] for ObjectId array
    qualifications?: string;
    experience?: number; // in years
    officeHours?: string; // e.g., "Monday 10:00 AM - 12:00 PM"
    researchInterests?: string;
    publications?: Publication[];
    professionalMemberships?: ProfessionalMembership[];
    coursesTaught?: CourseTaught[];
    performanceReviews?: PerformanceReview[];
    specialResponsibilities?: string;
    teachingPhilosophy?: string;
    createdAt?: Date; // timestamps
    updatedAt?: Date; // timestamps
}

export interface TeacherApiResponseData<T> {
    teachers: T;
    totalTeachers: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface TeacherApiResponse<T> {
    statusCode: number;
    data: TeacherApiResponseData<T>;
    message: string;
    success: boolean;
}
