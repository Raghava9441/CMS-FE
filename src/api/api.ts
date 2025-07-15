import { ApiResponse, Organization } from "../types/organization.modal";
import axiosInstance from "../utils/axiosInstance";
import { User } from "../types/user.modals";
import { Teacher, TeacherApiResponse } from "../types/teacher.modals";
import { Student, StudentApiResponse } from "../types/student.models";
import { Parent, ParentApiResponse } from "../types/parent.models";
import { Course, CourseApiResponse } from "@models/course.modals";
import { IDepartment, IDepartmentApiResponse, IDepartmentApiResponseData } from "@models/department.modals";

export const AsyncorganizationApi = {
    /**
     * Fetches a list of organizations.
     * @param {any} params - Query parameters for filtering or pagination (e.g., `?limit=10&page=1`).
     * @returns {Promise<ApiResponse<Organization[]>>} A promise that resolves to an API response containing an array of organizations.
     */
    getOrganizations: (params: any) => axiosInstance.get<ApiResponse<Organization[]>>(`/organizations?${params}`),

    /**
     * Fetches a single organization by its ID.
     * @param {string} id - The unique identifier of the organization.
     * @returns {Promise<ApiResponse<Organization>>} A promise that resolves to an API response containing a single organization.
     */
    getOrganizationById: (id: string) => axiosInstance.get<ApiResponse<Organization>>(`/organizations/${id}`),

    /**
     * Creates a new organization.
     * @param {Omit<Organization, 'createdAt' | 'updatedAt'>} organization - The organization data to create, excluding `createdAt` and `updatedAt` fields.
     * @returns {Promise<ApiResponse<Organization>>} A promise that resolves to an API response containing the newly created organization.
     */
    createOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => axiosInstance.post<ApiResponse<Organization>>(`/organizations`, organization),

    /**
     * Updates an existing organization.
     * @param {Omit<Organization, 'createdAt' | 'updatedAt'>} organization - The updated organization data, excluding `createdAt` and `updatedAt` fields.
     * @param {string} _id - The unique identifier of the organization to update.
     * @returns {Promise<ApiResponse<Organization>>} A promise that resolves to an API response containing the updated organization.
     */
    updateOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>, _id: string) => axiosInstance.put<ApiResponse<Organization>>(`/organizations/${_id}`, organization),

    /**
     * Deletes an organization by its ID.
     * @param {string} id - The unique identifier of the organization to delete.
     * @returns {Promise<ApiResponse<Organization>>} A promise that resolves to an API response indicating success or failure.
     */
    deleteOrganization: (id: string) => axiosInstance.delete<ApiResponse<Organization>>(`/organizations/${id}`)
}


export const userApi = {
    /**
     * Fetches a list of users.
     * @param {any} params - Query parameters for filtering or pagination (e.g., `?role=student`).
     * @returns {Promise<ApiResponse<User[]>>} A promise that resolves to an API response containing an array of users.
     */
    getusers: (params: any) => axiosInstance.get<ApiResponse<User[]>>(`/user?${params}`),

    /**
     * Fetches a single user by their ID.
     * @param {string} id - The unique identifier of the user.
     * @returns {Promise<ApiResponse<User>>} A promise that resolves to an API response containing a single user.
     */
    getUserById: (id: string) => axiosInstance.get<ApiResponse<User>>(`/user/${id}`),

    /**
     * Creates a new user.
     * @param {Omit<User, 'password' | 'accessToken' | 'refreshToken'>} user - The user data to create, excluding sensitive fields like password and tokens.
     * @returns {Promise<ApiResponse<User>>} A promise that resolves to an API response containing the newly created user.
     */
    createUser: (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => axiosInstance.post<ApiResponse<User>>('/user', user),

    /**
     * Updates an existing user.
     * @param {Omit<User, 'password' | 'accessToken' | 'refreshToken'>} user - The updated user data, excluding sensitive fields. The `_id` field within the user object is used for identification.
     * @returns {Promise<ApiResponse<User>>} A promise that resolves to an API response containing the updated user.
     */
    updateUser: (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => axiosInstance.put<ApiResponse<User>>(`/user/${user._id}`, user),

    /**
     * Deletes a user by their ID.
     * @param {string} id - The unique identifier of the user to delete.
     * @returns {Promise<ApiResponse<User>>} A promise that resolves to an API response indicating success or failure.
     */
    deleteUser: (id: string) => axiosInstance.delete<ApiResponse<User>>(`/organizations/${id}`), // Note: Path seems incorrect, should likely be `/user/${id}`

    /**
     * Authenticates a user and provides access tokens.
     * @param {{ email: string, password: string }} credentials - User's email and password.
     * @returns {Promise<ApiResponse<User>>} A promise that resolves to an API response containing user data, including access and refresh tokens.
     */
    login: (credentials: { email: string, password: string }) => axiosInstance.post<ApiResponse<User>>('user/auth/login', credentials),

    /**
     * Logs out the current user, invalidating their session.
     * @returns {Promise<ApiResponse<any>>} A promise that resolves to an API response indicating successful logout.
     */
    logout: () => axiosInstance.post<ApiResponse<any>>('user/auth/logout'),

    /**
     * Registers a new user.
     * @param {{ email: string, password: string }} user - The email and password for the new user.
     * @returns {Promise<ApiResponse<User>>} A promise that resolves to an API response containing the newly registered user data.
     */
    register: (user: { email: string, password: string }) => axiosInstance.post<ApiResponse<User>>('user/auth/register', user),

    /**
     * Refreshes the access token using a provided refresh token.
     * @param {string} refreshToken - The refresh token obtained during login.
     * @returns {Promise<ApiResponse<{ accessToken: string, newRefreshToken: string }>>} A promise that resolves to an API response containing a new access token and potentially a new refresh token.
     */
    refreshAccessToken: (refreshToken: string) => axiosInstance.post<ApiResponse<{ accessToken: string, newRefreshToken: string }>>('user/auth/refresh', { refreshToken }),

    permissions: (id: string) => axiosInstance.get<ApiResponse<any>>(`/permissions/${id}`),

    modifyPermissions: (permissions: any) => axiosInstance.patch<ApiResponse<any>>('user/permissions', permissions),
}

export const teacherApi = {
    getTeachers: (params: string) => axiosInstance.get<TeacherApiResponse<Teacher[]>>(`/teachers?${params}`),
    getTeacherById: (id: string) => axiosInstance.get<TeacherApiResponse<Teacher>>(`/teachers/${id}`),
    createTeacher: (teacher: Teacher) => axiosInstance.post<TeacherApiResponse<Teacher>>('/teachers', teacher),
    updateTeacher: (teacher: Omit<Teacher, 'createdAt' | 'updatedAt'>, _id: string) => axiosInstance.put<TeacherApiResponse<Teacher>>(`/teachers/${_id}`, teacher),
    deleteTeacher: (id: string) => axiosInstance.delete<TeacherApiResponse<Teacher>>(`/teachers/${id}`),
}

export const studentApi = {
    getStudents: (queryParams: string) => axiosInstance.get<StudentApiResponse<Student[]>>(`/students?${queryParams}`),
    getStudentById: (id: string) => axiosInstance.get<StudentApiResponse<Student>>(`/students/${id}`),
    createStudent: (student: Student) => axiosInstance.post<StudentApiResponse<Student>>('/students', student),
    updateStudent: (student: Student) => axiosInstance.put<StudentApiResponse<Student>>('/students', student),
    deleteStudent: (id: string) => axiosInstance.delete<StudentApiResponse<Student>>(`/students/${id}`),
}

export const parentApi = {
    getParents: (queryParams: string) => axiosInstance.get<ParentApiResponse<Parent[]>>(`/parents?${queryParams}`),
    getParentById: (id: string) => axiosInstance.get<ParentApiResponse<Parent>>(`/parents/${id}`),
    createParent: (parent: Parent) => axiosInstance.post<ParentApiResponse<Parent>>('/parents', parent),
    updateParent: (parent: Parent) => axiosInstance.put<ParentApiResponse<Parent>>('/parents', parent),
    deleteParent: (id: string) => axiosInstance.delete<ParentApiResponse<Parent>>(`/parents/${id}`),
}

export const courseApi = {
    getCourses: () => axiosInstance.get<CourseApiResponse<Course[]>>('/courses'),
    getCourseById: (id: string) => axiosInstance.get<CourseApiResponse<Course>>(`/courses/${id}`),
    createCourse: (course: Course) => axiosInstance.post<CourseApiResponse<Course>>('/courses', course),
    updateCourse: (course: Course) => axiosInstance.put<CourseApiResponse<Course>>('/courses', course),
    deleteCourse: (id: string) => axiosInstance.delete<CourseApiResponse<Course>>(`/courses/${id}`),
}

export const MessageApi = {
    sendMessage: (payload) => axiosInstance.post('/message/send-message', payload),
    getMessages: (convo_id: string) => axiosInstance.get(`/message/get-messages/${convo_id}`),
}

export const ConversationApi = {
    createOrOpenConversation: (payload: any) => axiosInstance.post('/conversation/create-open-conversation', payload),
    getConversation: () => axiosInstance.get(`/conversation/get-conversations`),
}

export const FriendRequest = {
    sendRequest: (payload: any) => axiosInstance.post('/friends/send-request', payload),
    getConversation: () => axiosInstance.post(`/friends/cancel-request`),
    acceptRejectRequest: (data) => axiosInstance.post(`/friends/accept-reject-request`, data),
    cancelRequest: (data: any) => axiosInstance.post(`/friends/cancel-request`, data),
    getFriends: () => axiosInstance.get(`/friends/get-friends`),
    getOnlineFriends: () => axiosInstance.get(`/friends/online-friends`),
    getSentRequests: () => axiosInstance.get(`/friends/get-sent-requests`),
    removeFriend: () => axiosInstance.get(`/friends/search`),
    searchFriends: (query: string) => axiosInstance.get(`/friends/get-requests${query}`),
    GetFriendRequests: () => axiosInstance.get(`/friends/get-requests`),
    GetOrganizationUsers: () => axiosInstance.get(`/friends/get-orgusers`),
}

export const DashboardApi = {
    getDashboardData: () => axiosInstance.get(`/dashboard`),
}

export const departmentApi = {
    getDepartments: () => axiosInstance.get<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment[]>>>(`/departments`),
    getDepartmentById: (id: string) => axiosInstance.get<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment>>>(`/departments/${id}`),
    createDepartment: (department: IDepartment) => axiosInstance.post<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment>>>('/departments', department),
    updateDepartment: (department: Omit<IDepartment, 'createdAt' | 'updatedAt'>) => axiosInstance.put<IDepartmentApiResponse<IDepartmentApiResponseData<IDepartment>>>(`/departments/${department._id}`, department),
    deleteDepartment: (id: string) => axiosInstance.delete<IDepartmentApiResponse<IDepartmentApiResponseData<any>>>(`/departments/${id}`),
}

// TODO:types need to implimnet for each api call to be able to use them
// export const classApi = {
//     getClasses: () => axiosInstance.get<ClassApiResponse<Class[]>>('/classes'),
//     getClassById: (id: string) => axiosInstance.get<ClassApiResponse<Class>>(`/classes/${id}`),
//     createClass: (classData: Class) => axiosInstance.post<ClassApiResponse<Class>>('/classes', classData),
//     updateClass: (classData: Class) => axiosInstance.put<ClassApiResponse<Class>>('/classes', classData),
//     deleteClass: (id: string) => axiosInstance.delete<ClassApiResponse<Class>>(`/classes/${id}`),
// }

// export const attendanceApi = {
//     getAttendance: () => axiosInstance.get<AttendanceApiResponse<Attendance[]>>('/attendance'),
//     getAttendanceById: (id: string) => axiosInstance.get<AttendanceApiResponse<Attendance>>(`/attendance/${id}`),
//     createAttendance: (attendance: Attendance) => axiosInstance.post<AttendanceApiResponse<Attendance>>('/attendance', attendance),
//     updateAttendance: (attendance: Attendance) => axiosInstance.put<AttendanceApiResponse<Attendance>>('/attendance', attendance),
//     deleteAttendance: (id: string) => axiosInstance.delete<AttendanceApiResponse<Attendance>>(`/attendance/${id}`),
// }

// export const examApi = {
//     getExams: () => axiosInstance.get<ExamApiResponse<Exam[]>>('/exams'),
//     getExamById: (id: string) => axiosInstance.get<ExamApiResponse<Exam>>(`/exams/${id}`),
//     createExam: (exam: Exam) => axiosInstance.post<ExamApiResponse<Exam>>('/exams', exam),
//     updateExam: (exam: Exam) => axiosInstance.put<ExamApiResponse<Exam>>('/exams', exam),
//     deleteExam: (id: string) => axiosInstance.delete<ExamApiResponse<Exam>>(`/exams/${id}`),
// }

// export const assignmentApi = {
//     getAssignments: () => axiosInstance.get<AssignmentApiResponse<Assignment[]>>('/assignments'),
//     getAssignmentById: (id: string) => axiosInstance.get<AssignmentApiResponse<Assignment>>(`/assignments/${id}`),
//     createAssignment: (assignment: Assignment) => axiosInstance.post<AssignmentApiResponse<Assignment>>('/assignments', assignment),
//     updateAssignment: (assignment: Assignment) => axiosInstance.put<AssignmentApiResponse<Assignment>>('/assignments', assignment),
//     deleteAssignment: (id: string) => axiosInstance.delete<AssignmentApiResponse<Assignment>>(`/assignments/${id}`),
// }

// export const eventApi = {
//     getEvents: () => axiosInstance.get<EventApiResponse<Event[]>>('/events'),
//     getEventById: (id: string) => axiosInstance.get<EventApiResponse<Event>>(`/events/${id}`),
//     createEvent: (event: Event) => axiosInstance.post<EventApiResponse<Event>>('/events', event),
//     updateEvent: (event: Event) => axiosInstance.put<EventApiResponse<Event>>('/events', event),
//     deleteEvent: (id: string) => axiosInstance.delete<EventApiResponse<Event>>(`/events/${id}`),
// }

// export const courseScheduleApi = {
//     getCourseSchedule: () => axiosInstance.get<CourseScheduleApiResponse<CourseSchedule[]>>('/course-schedule'),
//     getCourseScheduleById: (id: string) => axiosInstance.get<CourseScheduleApiResponse<CourseSchedule>>(`/course-schedule/${id}`),
//     createCourseSchedule: (courseSchedule: CourseSchedule) => axiosInstance.post<CourseScheduleApiResponse<CourseSchedule>>('/course-schedule', courseSchedule),
//     updateCourseSchedule: (courseSchedule: CourseSchedule) => axiosInstance.put<CourseScheduleApiResponse<CourseSchedule>>('/course-schedule', courseSchedule),
//     deleteCourseSchedule: (id: string) => axiosInstance.delete<CourseScheduleApiResponse<CourseSchedule>>(`/course-schedule/${id}`),
// }

// export const courseScheduleClassApi = {
//     getCourseScheduleClasses: () => axiosInstance.get<CourseScheduleClassApiResponse<CourseScheduleClass[]>>('/course-schedule-classes'),
//     getCourseScheduleClassById: (id: string) => axiosInstance.get<CourseScheduleClassApiResponse<CourseScheduleClass>>(`/course-schedule-classes/${id}`),
//     createCourseScheduleClass: (courseScheduleClass: CourseScheduleClass) => axiosInstance.post<CourseScheduleClassApiResponse<CourseScheduleClass>>('/course-schedule-classes', courseScheduleClass),
//     updateCourseScheduleClass: (courseScheduleClass: CourseScheduleClass) => axiosInstance.put<CourseScheduleClassApiResponse<CourseScheduleClass>>('/course-schedule-classes', courseScheduleClass),
//     deleteCourseScheduleClass: (id: string) => axiosInstance.delete<CourseScheduleClassApiResponse<CourseScheduleClass>>(`/course-schedule-classes/${id}`),
// }

// export const courseScheduleAttendanceApi = {
//     getCourseScheduleAttendance: () => axiosInstance.get<CourseScheduleAttendanceApiResponse<CourseScheduleAttendance[]>>('/course-schedule-attendance'),
//     getCourseScheduleAttendanceById: (id: string) => axiosInstance.get<CourseScheduleAttendanceApiResponse<CourseScheduleAttendance>>(`/course-schedule-attendance/${id}`),
//     createCourseScheduleAttendance: (courseScheduleAttendance: CourseScheduleAttendance) => axiosInstance.post<CourseScheduleAttendanceApiResponse<CourseScheduleAttendance>>('/course-schedule-attendance', courseScheduleAttendance),
//     updateCourseScheduleAttendance: (courseScheduleAttendance: CourseScheduleAttendance) => axiosInstance.put<CourseScheduleAttendanceApiResponse<CourseScheduleAttendance>>('/course-schedule-attendance', courseScheduleAttendance),
//     deleteCourseScheduleAttendance: (id: string) => axiosInstance.delete<CourseScheduleAttendanceApiResponse<CourseScheduleAttendance>>(`/course-schedule-attendance/${id}`),
// }

//i want to impliment video chat implementation