import { ApiResponse, Organization } from "../models/organization.modal";
import axiosInstance from "../utils/axiosInstance";
import { User } from "../types/user.modals";
import { Teacher, TeacherApiResponse } from "../types/teacher.modals";
import { Student, StudentApiResponse } from "../types/student.models";
import { Parent, ParentApiResponse } from "../types/parent.models";

export const AsyncorganizationApi = {
    getOrganizations: () => axiosInstance.get<ApiResponse<Organization[]>>('/organizations'),
    getOrganizationById: (id: string) => axiosInstance.get<ApiResponse<Organization>>(`/organizations/${id}`),
    createOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => axiosInstance.post<ApiResponse<Organization>>('/organizations', organization),
    updateOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => axiosInstance.put<ApiResponse<Organization>>('/organizations', organization),
    deleteOrganization: (id: string) => axiosInstance.delete<ApiResponse<Organization>>(`/organizations/${id}`)
}

export const userApi = {
    getusers: () => axiosInstance.get<ApiResponse<User[]>>('/user'),
    getUserById: (id: string) => axiosInstance.get<ApiResponse<User>>(`/user/${id}`),
    createUser: (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => axiosInstance.post<ApiResponse<User>>('/organizations', user),
    updateUser: (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => axiosInstance.put<ApiResponse<User>>(`/user/${user._id}`, user),
    deleteUser: (id: string) => axiosInstance.delete<ApiResponse<User>>(`/organizations/${id}`),
    login: (credentials: { email: string, password: string }) => axiosInstance.post<ApiResponse<User>>('user/auth/login', credentials),
    logout: () => axiosInstance.post<ApiResponse<any>>('user/auth/logout'),
    register: (user: { email: string, password: string }) => axiosInstance.post<ApiResponse<User>>('user/auth/register', user),
    refreshAccessToken: (refreshToken: string) => axiosInstance.post<ApiResponse<{ accessToken: string, newRefreshToken: string }>>('user/auth/refresh', { refreshToken }),
}

export const teacherApi = {
    getTeachers: () => axiosInstance.get<TeacherApiResponse<Teacher[]>>('/teachers'),
    getTeacherById: (id: string) => axiosInstance.get<TeacherApiResponse<Teacher>>(`/teachers/${id}`),
    createTeacher: (teacher: Teacher) => axiosInstance.post<TeacherApiResponse<Teacher>>('/teachers', teacher),
    updateTeacher: (teacher: Teacher) => axiosInstance.put<TeacherApiResponse<Teacher>>('/teachers', teacher),
    deleteTeacher: (id: string) => axiosInstance.delete<TeacherApiResponse<Teacher>>(`/teachers/${id}`),
}

export const studentApi = {
    getStudents: () => axiosInstance.get<StudentApiResponse<Student[]>>('/students'),
    getStudentById: (id: string) => axiosInstance.get<StudentApiResponse<Student>>(`/students/${id}`),
    createStudent: (student: Student) => axiosInstance.post<StudentApiResponse<Student>>('/students', student),
    updateStudent: (student: Student) => axiosInstance.put<StudentApiResponse<Student>>('/students', student),
    deleteStudent: (id: string) => axiosInstance.delete<StudentApiResponse<Student>>(`/students/${id}`),
}

export const parentApi = {
    getParents: () => axiosInstance.get<ParentApiResponse<Parent[]>>('/parents'),
    getParentById: (id: string) => axiosInstance.get<ParentApiResponse<Parent>>(`/parents/${id}`),
    createParent: (parent: Parent) => axiosInstance.post<ParentApiResponse<Parent>>('/parents', parent),
    updateParent: (parent: Parent) => axiosInstance.put<ParentApiResponse<Parent>>('/parents', parent),
    deleteParent: (id: string) => axiosInstance.delete<ParentApiResponse<Parent>>(`/parents/${id}`),
}