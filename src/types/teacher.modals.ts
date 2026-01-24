// Define the Publication interface
export interface Publication {
    title: string;
    authors: string;
    journal: string;
    year: number;
    _id?: string;
}

// Define the ProfessionalMembership interface
export interface ProfessionalMembership {
    organization: string;
    membershipId: string;
    _id?: string;
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

// Define the UserDetails interface
export interface UserDetails {
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    preferences: {
        notifications: boolean;
        language: string;
    };
    _id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    age: string;
    role: string;
    gender: string;
    organizationId: string;
    phone: string;
    status: string;
    activityStatus: string;
    onlineStatus: string;
    friends: string[];
    dateOfBirth: string;
    biography: string;
    permissions: any[];
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    teacherId: string;
    refreshToken: string;
    lastSeen: string;
    socketId: string;
}

// Define the Teacher interface
export interface Teacher {
    _id?: string; // Use string for ObjectId, _id is optional when creating a new teacher
    userId: string; // Use string for ObjectId
    organizationId: string; // Use string for ObjectId
    departments?: string[]; // Use string[] for ObjectId array
    subjects?: string[]; // Use string[] for ObjectId array
    qualifications?: string[]; // Changed to array
    experience?: number; // in years
    officeHours?: string; // e.g., "Monday 10:00 AM - 12:00 PM"
    researchInterests?: string[]; // Changed to array
    publications?: Publication[];
    professionalMemberships?: ProfessionalMembership[];
    coursesTaught?: CourseTaught[];
    performanceReviews?: PerformanceReview[];
    specialResponsibilities?: string;
    teachingPhilosophy?: string;
    createdAt?: string; // timestamps
    updatedAt?: string; // timestamps
    __v?: number;
    userDetails?: UserDetails;
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
