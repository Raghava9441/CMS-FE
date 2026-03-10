import { ApiResponse } from "./pagination.modals";

export interface Schedule {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

export interface Class {
    _id: string;
    name: string;
    description: string;
    courseId: string;
    classTeacherId: string;
    studentIds: string[];
    organizationId: string;
    schedule: Schedule[];
    classroom: string;
    credits: number;
    maxCapacity: number;
    currentEnrollment: number;
    supervisorId: string;
    academicYear: string;
    departmentId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface ClassesApiResponseData {
    classes: Class[];
    total: number;
    page: number;
    limit: number;
}

export interface ClassesApiResponse<T = any> extends ApiResponse<T> {
    data?: T;
}

export interface CreateClassRequest {
    name: string;
    description: string;
    courseId: string;
    classTeacherId: string;
    studentIds: string[];
    organizationId: string;
    schedule: Schedule[];
    classroom: string;
    credits: number;
    maxCapacity: number;
    currentEnrollment: number;
    supervisorId: string;
    academicYear: string;
    departmentId: string;
}

export interface UpdateClassRequest extends Partial<CreateClassRequest> {
    _id: string;
}

export interface BulkDeleteClassesRequest {
    classIds: string[];
}

export interface BulkDeleteClassesResponse {
    deletedCount: number;
}

export interface TransferStudentRequest {
    studentId: string;
    fromClassId: string;
    toClassId: string;
}
