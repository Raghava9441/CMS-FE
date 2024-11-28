export interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
}

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

export interface Student {
    _id?: string; // Optional _id for ObjectId
    userId: string; // Use string for ObjectId
    name: string;
    phone: string;
    email: string;
    organizationId: string; // Use string for ObjectId
    enrolledCoursesIds?: string[]; // Use string[] for ObjectId references to Course
    currentClassId?: string; // Use string for ObjectId (optional)
    dateOfBirth: Date;
    address: Address;
    emergencyContacts: EmergencyContact[];
    enrollmentDate: Date;
    graduationDate?: Date; // Optional graduation date
    createdAt?: Date; // Timestamp for when the student was created
    updatedAt?: Date; // Timestamp for when the student was last updated
}


export interface StudentApiResponseData<T> {
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

export interface StudentApiResponse<T> {
    statusCode: number;
    data: StudentApiResponseData<T> | any[];
    message: string;
    success: boolean;
}