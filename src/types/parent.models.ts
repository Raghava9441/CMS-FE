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

// Define the Parent interface
export interface Parent {
    _id?: string; // Optional _id for ObjectId
    userId: string; // Use string for ObjectId reference to User
    childrenIds?: string[]; // Use string[] for ObjectId references to Student
    organizationId: string; // Use string for ObjectId reference to Organization
    dateOfBirth: Date;
    address: Address;
    phoneNumber: string;
    email: string;
    occupation?: string; // Optional field
    relationshipToStudent: string;
    emergencyContacts: EmergencyContact[];
    createdAt?: Date; // Timestamp for when the parent was created
    updatedAt?: Date; // Timestamp for when the parent was last updated
}

// Define the ParentApiResponseData interface
interface ParentApiResponseData<T> {
    parents: T;
    totalParents: number;
    limit: number;
    page: number;
    totalPages: number;
    serialNumberStartFrom: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

// Define the ParentApiResponse interface
export interface ParentApiResponse<T> {
    statusCode: number;
    data: ParentApiResponseData<T>;
    message: string;
    success: boolean;
}