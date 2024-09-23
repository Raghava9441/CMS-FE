export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export interface SocialLinks {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
}

export interface Organization {
    _id: string;
    name: string;
    category: string;
    number: string;
    address: Address;
    logo: string;
    website: string;
    contactEmail: string;
    contactPhone: string;
    establishedDate: string;
    description: string;
    socialLinks: SocialLinks;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ApiResponseData<T> {
    organizations: T;
    totalOrganizations: number;
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