import { Organization } from "../types/organization.modal";
import axiosInstance from "../utils/axiosInstance";
import { User } from "../types/user.modals";
import { Teacher, TeacherApiResponse } from "../types/teacher.modals";
import { Student, StudentApiResponse } from "../types/student.models";
import { Parent, ParentApiResponse } from "../types/parent.models";
import { Course, CourseApiResponse } from "@models/course.modals";
import { IDepartment, IDepartmentApiResponse, IDepartmentApiResponseData } from "@models/department.modals";
import { Attendance, AttendanceApiResponse, AttendanceStatsApiResponse, BulkMarkAttendanceData, BulkDeleteAttendanceData } from "../types/attendance.models";
import { abortManager } from "../utils/abortControllerManager";

export const AsyncorganizationApi = {

    getOrganizations: (params: any, signal?: AbortSignal) => axiosInstance.get<ApiResponse<Organization[]>>(`/organizations?${params}`, { signal: abortManager.getSignal('getOrganizations') }),

    getOrganizationById: (id: string, signal?: AbortSignal) => axiosInstance.get<ApiResponse<Organization>>(`/organizations/${id}`, { signal: abortManager.getSignal(`getOrganizationById-${id}`) }),


    createOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>, signal?: AbortSignal) => axiosInstance.post<ApiResponse<Organization>>(`/organizations`, organization, { signal: abortManager.getSignal('createOrganization') }),


    updateOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>, _id: string, signal?: AbortSignal) => axiosInstance.put<ApiResponse<Organization>>(`/organizations/${_id}`, organization, { signal: abortManager.getSignal('updateOrganization') }),

    deleteOrganization: (id: string, signal?: AbortSignal) => axiosInstance.delete<ApiResponse<Organization>>(`/organizations/${id}`, { signal: abortManager.getSignal('deleteOrganization') })
}


export const userApi = {

    getusers: (params: any, signal?: AbortSignal) => axiosInstance.get<ApiResponse<User[]>>(`/user?${params}`, { signal: abortManager.getSignal('getusers') }),

    getUserById: (id: string, signal?: AbortSignal) => axiosInstance.get<ApiResponse<User>>(`/user/${id}`, { signal: abortManager.getSignal(`getUserById-${id}`) }),

    createUser: (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>, signal?: AbortSignal) => axiosInstance.post<ApiResponse<User>>('/user', user, { signal: abortManager.getSignal('createUser') }),

    updateUser: (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>, signal?: AbortSignal) => axiosInstance.put<ApiResponse<User>>(`/user/${user._id}`, user, { signal: abortManager.getSignal(`updateUser-${user._id}`) }),

    deleteUser: (id: string, signal?: AbortSignal) => axiosInstance.delete<ApiResponse<User>>(`/organizations/${id}`, { signal: abortManager.getSignal(`deleteUser-${id}`) }), // Note: Path seems incorrect, should likely be `/user/${id}`

    login: (credentials: { email: string, password: string }, signal?: AbortSignal) => axiosInstance.post<ApiResponse<User>>('user/auth/login', credentials, { signal: abortManager.getSignal('login') }),

    logout: (signal?: AbortSignal) => axiosInstance.post<ApiResponse<any>>('user/auth/logout', {}, { signal: abortManager.getSignal('logout') }),

    register: (user: { email: string, password: string }, signal?: AbortSignal) => axiosInstance.post<ApiResponse<User>>('user/auth/register', user, { signal: abortManager.getSignal('register') }),

    refreshAccessToken: (refreshToken: string, signal?: AbortSignal) => axiosInstance.post<ApiResponse<{ accessToken: string, newRefreshToken: string }>>('user/auth/refresh', { refreshToken }, { signal: abortManager.getSignal('refreshAccessToken') }),

    permissions: (id: string, signal?: AbortSignal) => axiosInstance.get<ApiResponse<any>>(`/permissions/${id}`, { signal: abortManager.getSignal(`permissions-${id}`) }),

    modifyPermissions: (permissions: any, id: string, signal?: AbortSignal) => axiosInstance.patch<ApiResponse<any>>(`/permissions/${id}`, permissions, { signal: abortManager.getSignal(`modifyPermissions-${id}`) }),
}

export const teacherApi = {
    getTeachers: (params: string, signal?: AbortSignal) => axiosInstance.get<TeacherApiResponse<Teacher[]>>(`/teachers?${params}`, {
        signal: abortManager.getSignal('getTeachers')
    }),
    getTeacherById: (id: string, signal?: AbortSignal) => axiosInstance.get<TeacherApiResponse<Teacher>>(`/teachers/${id}`, { signal }),
    createTeacher: (teacher: Teacher, signal?: AbortSignal) => axiosInstance.post<TeacherApiResponse<Teacher>>('/teachers', teacher, { signal }),
    updateTeacher: (teacher: Omit<Teacher, 'createdAt' | 'updatedAt'>, _id: string, signal?: AbortSignal) => axiosInstance.put<TeacherApiResponse<Teacher>>(`/teachers/${_id}`, teacher, { signal }),
    deleteTeacher: (id: string, signal?: AbortSignal) => axiosInstance.delete<TeacherApiResponse<Teacher>>(`/teachers/${id}`, { signal }),
}

export const studentApi = {
    getStudents: (queryParams: string, signal?: AbortSignal) => axiosInstance.get<StudentApiResponse<Student[]>>(`/students?${queryParams}`, { signal: abortManager.getSignal('getStudents') }),
    getStudentById: (id: string, signal?: AbortSignal) => axiosInstance.get<StudentApiResponse<Student>>(`/students/${id}`, { signal: abortManager.getSignal(`getStudentById-${id}`)  }),
    createStudent: (student: Student, signal?: AbortSignal) => axiosInstance.post<StudentApiResponse<Student>>('/students', student, { signal: abortManager.getSignal('createStudent') }),
    updateStudent: (student: Student, signal?: AbortSignal) => axiosInstance.put<StudentApiResponse<Student>>('/students', student, { signal: abortManager.getSignal(`updateStudent-${student._id}`) }),
    deleteStudent: (id: string, signal?: AbortSignal) => axiosInstance.delete<StudentApiResponse<Student>>(`/students/${id}`, { signal: abortManager.getSignal(`deleteStudent-${id}`) }),
}

export const parentApi = {
    getParents: (queryParams: string, signal?: AbortSignal) => axiosInstance.get<ParentApiResponse<Parent[]>>(`/parents?${queryParams}`, { signal }),
    getParentById: (id: string, signal?: AbortSignal) => axiosInstance.get<ParentApiResponse<Parent>>(`/parents/${id}`, { signal }),
    createParent: (parent: Parent, signal?: AbortSignal) => axiosInstance.post<ParentApiResponse<Parent>>('/parents', parent, { signal }),
    updateParent: (parent: Parent, signal?: AbortSignal) => axiosInstance.put<ParentApiResponse<Parent>>('/parents', parent, { signal }),
    deleteParent: (id: string, signal?: AbortSignal) => axiosInstance.delete<ParentApiResponse<Parent>>(`/parents/${id}`, { signal }),
}

export const courseApi = {
    getCourses: (signal?: AbortSignal) => axiosInstance.get<CourseApiResponse<Course[]>>('/courses', { signal }),
    getCourseById: (id: string, signal?: AbortSignal) => axiosInstance.get<CourseApiResponse<Course>>(`/courses/${id}`, { signal }),
    createCourse: (course: Course, signal?: AbortSignal) => axiosInstance.post<CourseApiResponse<Course>>('/courses', course, { signal }),
    updateCourse: (course: Course, signal?: AbortSignal) => axiosInstance.put<CourseApiResponse<Course>>('/courses', course, { signal }),
    deleteCourse: (id: string, signal?: AbortSignal) => axiosInstance.delete<CourseApiResponse<Course>>(`/courses/${id}`, { signal }),
}

export const MessageApi = {
    sendMessage: (payload, signal?: AbortSignal) => axiosInstance.post('/message/send-message', payload, { signal }),
    getMessages: (convo_id: string, signal?: AbortSignal) => axiosInstance.get(`/message/get-messages/${convo_id}`, { signal }),
}

export const ConversationApi = {
    createOrOpenConversation: (payload: any, signal?: AbortSignal) => axiosInstance.post('/conversation/create-open-conversation', payload, { signal }),
    getConversation: (signal?: AbortSignal) => axiosInstance.get(`/conversation/get-conversations`, { signal }),
}

export const FriendRequest = {
    sendRequest: (payload: any, signal?: AbortSignal) => axiosInstance.post('/friends/send-request', payload, { signal }),
    getConversation: (signal?: AbortSignal) => axiosInstance.post(`/friends/cancel-request`, {}, { signal }),
    acceptRejectRequest: (data, signal?: AbortSignal) => axiosInstance.post(`/friends/accept-reject-request`, data, { signal }),
    cancelRequest: (data: any, signal?: AbortSignal) => axiosInstance.post(`/friends/cancel-request`, data, { signal }),
    getFriends: (signal?: AbortSignal) => axiosInstance.get(`/friends/get-friends`, { signal }),
    getOnlineFriends: (signal?: AbortSignal) => axiosInstance.get(`/friends/online-friends`, { signal }),
    getSentRequests: (signal?: AbortSignal) => axiosInstance.get(`/friends/get-sent-requests`, { signal }),
    removeFriend: (signal?: AbortSignal) => axiosInstance.get(`/friends/search`, { signal }),
    searchFriends: (query: string, signal?: AbortSignal) => axiosInstance.get(`/friends/get-requests${query}`, { signal }),
    GetFriendRequests: (signal?: AbortSignal) => axiosInstance.get(`/friends/get-requests`, { signal }),
    GetOrganizationUsers: (signal?: AbortSignal) => axiosInstance.get(`/friends/get-orgusers`, { signal }),
}

export const DashboardApi = {
    getDashboardData: (signal?: AbortSignal) => axiosInstance.get(`/dashboard`, { signal }),
}

export const departmentApi = {
    getDepartments: (signal?: AbortSignal) => axiosInstance.get<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment[]>>>(`/departments`, { signal }),
    getDepartmentById: (id: string, signal?: AbortSignal) => axiosInstance.get<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment>>>(`/departments/${id}`, { signal }),
    createDepartment: (department: IDepartment, signal?: AbortSignal) => axiosInstance.post<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment>>>('/departments', department, { signal }),
    updateDepartment: (department: Omit<IDepartment, 'createdAt' | 'updatedAt'>, signal?: AbortSignal) => axiosInstance.put<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment>>>(`/departments/${department._id}`, department, { signal }),
    deleteDepartment: (id: string, signal?: AbortSignal) => axiosInstance.delete<IDepartmentApiResponse<IDepartmentApiResponseData<any>>>(`/departments/${id}`, { signal }),
}

import { ApiResponse, Exam } from "../types/exam.modal";

export const examApi = {
    getExams: (params: string, signal?: AbortSignal) => axiosInstance.get<ApiResponse<Exam[]>>(`/exams?${params}`, { signal }),
    getExamById: (id: string, signal?: AbortSignal) => axiosInstance.get<ApiResponse<Exam>>(`/exams/${id}`, { signal }),
    createExam: (exam: Exam, signal?: AbortSignal) => axiosInstance.post<ApiResponse<Exam>>('/exams', exam, { signal }),
    updateExam: (exam: Omit<Exam, 'createdAt' | 'updatedAt'>, _id: string, signal?: AbortSignal) => axiosInstance.put<ApiResponse<Exam>>(`/exams/${_id}`, exam, { signal }),
    deleteExam: (id: string, signal?: AbortSignal) => axiosInstance.delete<ApiResponse<Exam>>(`/exams/${id}`, { signal }),
}

export const attendanceApi = {
    getAttendances: (params: string, signal?: AbortSignal) => axiosInstance.get<AttendanceApiResponse<Attendance[]>>(`/attendance?${params}`, { signal: abortManager.getSignal('getAttendances')  }),
    getAttendanceById: (id: string, signal?: AbortSignal) => axiosInstance.get<AttendanceApiResponse<Attendance>>(`/attendance/${id}`, { signal: abortManager.getSignal(`getAttendanceById-${id}`) }),
    createAttendance: (attendance: Attendance, signal?: AbortSignal) => axiosInstance.post<AttendanceApiResponse<Attendance>>('/attendance', attendance, { signal: abortManager.getSignal('createAttendance') }),
    updateAttendance: (attendance: Omit<Attendance, 'createdAt' | 'updatedAt'>, _id: string, signal?: AbortSignal) => axiosInstance.put<AttendanceApiResponse<Attendance>>(`/attendance/${_id}`, attendance, { signal: abortManager.getSignal(`updateAttendance-${_id}`) }),
    deleteAttendance: (id: string, signal?: AbortSignal) => axiosInstance.delete<AttendanceApiResponse<Attendance>>(`/attendance/${id}`, { signal: abortManager.getSignal(`deleteAttendance-${id}`) }),
    getAttendanceByStudent: (studentId: string, params: string, signal?: AbortSignal) => axiosInstance.get<AttendanceApiResponse<Attendance[]>>(`/attendance/student/${studentId}?${params}`, { signal: abortManager.getSignal(`getAttendanceByStudent-${studentId}`) }),
    getAttendanceByClass: (classId: string, params: string, signal?: AbortSignal) => axiosInstance.get<AttendanceApiResponse<Attendance[]>>(`/attendance/class/${classId}?${params}`, { signal: abortManager.getSignal(`getAttendanceByClass-${classId}`) }),
    getAttendanceByDate: (date: string, params: string, signal?: AbortSignal) => axiosInstance.get<AttendanceApiResponse<Attendance[]>>(`/attendance/date/${date}?${params}`, { signal: abortManager.getSignal(`getAttendanceByDate-${date}`) }),
    getStudentAttendanceStats: (studentId: string, params: string, signal?: AbortSignal) => axiosInstance.get<AttendanceStatsApiResponse>(`/attendance/stats/student/${studentId}?${params}`, { signal: abortManager.getSignal(`getStudentAttendanceStats-${studentId}`) }),
    getClassAttendanceStats: (classId: string, params: string, signal?: AbortSignal) => axiosInstance.get<AttendanceStatsApiResponse>(`/attendance/stats/class/${classId}?${params}`, { signal: abortManager.getSignal(`getClassAttendanceStats-${classId}`) }),
    markBulkAttendance: (data: BulkMarkAttendanceData, signal?: AbortSignal) => axiosInstance.post<AttendanceApiResponse<Attendance[]>>('/attendance/bulk/mark', data, { signal: abortManager.getSignal('markBulkAttendance') }),
    createBulkAttendances: (formData: FormData, signal?: AbortSignal) => axiosInstance.post<AttendanceApiResponse<Attendance[]>>('/attendance/bulk/create', formData, {
        signal: abortManager.getSignal('createBulkAttendances'),
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    deleteBulkAttendances: (data: BulkDeleteAttendanceData, signal?: AbortSignal) => axiosInstance.delete<AttendanceApiResponse<any>>('/attendance/bulk/delete', {
        signal: abortManager.getSignal('deleteBulkAttendances'),
        data
    }),
}
