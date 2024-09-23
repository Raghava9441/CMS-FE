// Define the Address interface
interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
}

// Define the EmergencyContact interface
interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

// Define the Student interface
export interface Student {
    _id?: string; // Optional _id for ObjectId
    userId: string; // Use string for ObjectId
    teacherIds?: string[]; // Use string[] for ObjectId references to Teacher
    organizationId: string; // Use string for ObjectId
    parentId?: string; // Use string for ObjectId (optional)
    enrolledCoursesIds?: string[]; // Use string[] for ObjectId references to Course
    currentClassId?: string; // Use string for ObjectId (optional)
    dateOfBirth: Date;
    address: Address;
    phoneNumber: string;
    email: string;
    emergencyContacts: EmergencyContact[];
    enrollmentDate: Date;
    graduationDate?: Date; // Optional graduation date
    createdAt?: Date; // Timestamp for when the student was created
    updatedAt?: Date; // Timestamp for when the student was last updated
}


// Define the StudentApiResponseData interface
interface StudentApiResponseData<T> {
    students: T;
    totalStudents: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

// Define the StudentApiResponse interface
export interface StudentApiResponse<T> {
    statusCode: number;
    data: StudentApiResponseData<T>;
    message: string;
    success: boolean;
}