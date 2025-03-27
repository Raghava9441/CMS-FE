import { ApiResponse, Organization } from "../types/organization.modal";
import axiosInstance from "../utils/axiosInstance";
import { User } from "../types/user.modals";
import { Teacher, TeacherApiResponse } from "../types/teacher.modals";
import { Student, StudentApiResponse } from "../types/student.models";
import { Parent, ParentApiResponse } from "../types/parent.models";
import { Course, CourseApiResponse } from "@models/course.modals";

export const AsyncorganizationApi = {
    getOrganizations: () => axiosInstance.get<ApiResponse<Organization[]>>('/organizations'),
    getOrganizationById: (id: string) => axiosInstance.get<ApiResponse<Organization>>(`/organizations/${id}`),
    createOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>) => axiosInstance.post<ApiResponse<Organization>>(`/organizations`, organization),
    updateOrganization: (organization: Omit<Organization, 'createdAt' | 'updatedAt'>, _id: string) => axiosInstance.put<ApiResponse<Organization>>(`/organizations/${_id}`, organization),
    deleteOrganization: (id: string) => axiosInstance.delete<ApiResponse<Organization>>(`/organizations/${id}`)
}

export const userApi = {
    getusers: () => axiosInstance.get<ApiResponse<User[]>>('/user'),
    getUserById: (id: string) => axiosInstance.get<ApiResponse<User>>(`/user/${id}`),
    createUser: (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => axiosInstance.post<ApiResponse<User>>('/user', user),
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
    updateTeacher: (teacher: Omit<Teacher, 'createdAt' | 'updatedAt'>, _id: string) => axiosInstance.put<TeacherApiResponse<Teacher>>(`/teachers/${_id}`, teacher),
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

export const courseApi = {
    getCourses: () => axiosInstance.get<CourseApiResponse<Course[]>>('/courses'),
    getCourseById: (id: string) => axiosInstance.get<CourseApiResponse<Course>>(`/courses/${id}`),
    createCourse: (course: Course) => axiosInstance.post<CourseApiResponse<Course>>('/courses', course),
    updateCourse: (course: Course) => axiosInstance.put<CourseApiResponse<Course>>('/courses', course),
    deleteCourse: (id: string) => axiosInstance.delete<CourseApiResponse<Course>>(`/courses/${id}`),
}

export const MessageApi = {
    sendMessage: (payload) => axiosInstance.post('/message/send-message', payload),
    getMessages: (convo_id: string) => axiosInstance.get(`/conversation/get-messages/${convo_id}`),
}

export const ConversationApi = {
    createOrOpenConversation: (payload: any) => axiosInstance.post('/conversation/create-open-conversation', payload),
    getConversation: () => axiosInstance.get(`/conversation/get-conversations`),
}

export const FriendRequest = {
    sendRequest: (payload: any) => axiosInstance.post('/friend-request/send-request', payload),
    getConversation: () => axiosInstance.post(`/friend-request/cancel-request`),
    acceptRejectRequest: () => axiosInstance.post(`/friend-request/accept-reject-request`),
    cancelRequest: () => axiosInstance.post(`/friend-request/remove-friend`),
    getFriends: () => axiosInstance.get(`/friend-request/get-friends`),
    getOnlineFriends: () => axiosInstance.get(`/friend-request/online-friends`),
    getSentRequests: () => axiosInstance.get(`/friend-request/get-sent-requests`),
    removeFriend: () => axiosInstance.get(`/friend-request/search`),
    searchFriends: (query: string) => axiosInstance.get(`/friend-request/get-requests${query}`),
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