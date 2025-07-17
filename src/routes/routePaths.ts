
const appRoutes = {
    MAIN_LAYOUT: '/CMS-FE',
    DASHBOARD: '/CMS-FE/dashboard',
    ORGANIZATIONS: '/CMS-FE/organizations',
    ORGANIZATION_PROFILE: '/CMS-FE/organizations/profile/:id',
    TEACHERS: "/CMS-FE/teachers",
    TEACHER_PROFILE: '/CMS-FE/teachers/profile/:id',
    STUDENTS: '/CMS-FE/students',
    STUDENT_PROFILE: '/CMS-FE/students/profile/:id',
    PARENTS: '/CMS-FE/parents',
    PROFILE: '/CMS-FE/profile',
    TEACHER: '/CMS-FE/teacher',
    USERS: '/CMS-FE/users',
    ASSIGNMENT: '/CMS-FE/assignment',
    ATTENDANCE: '/CMS-FE/attendance',
    CLASSES: '/CMS-FE/classes',
    COURSES: '/CMS-FE/courses',
    EVENTS: '/CMS-FE/events',
    EXAM: '/CMS-FE/exam',
    NOTIFICATIONS: '/CMS-FE/notifications',
    SETTINGS: '/CMS-FE/settings',
    LOGOUT: '/CMS-FE/logout',
    REGISTER_USER: '/CMS-FE/register-user',
    CONVERSATIONS: '/CMS-FE/conversations',
    FRIENDS: '/CMS-FE/friends',
    DEPARTMENT: '/CMS-FE/department',
    FEATURE_FLAGS: '/CMS-FE/feature-flags',


    NOT_FOUND: "/CMS-FE/_404",
    UNAUTHORIZED: "/CMS-FE/unauthorized",


    AUTH_LAYOUT: '/CMS-FE/user/auth',

    LOGIN: '/CMS-FE/user/auth/login',
    LOGIN_SESSION: '/CMS-FE/user/auth/session',
    LOGIN_UNPROTECTED: '/CMS-FE/user/auth/login-unprotected',
    REGISTER: '/CMS-FE/user/auth/register',
    REGISTER_UNPROTECTED: '/CMS-FE/user/auth/register-unprotected',
    RESET_PASSWORD: '/CMS-FE/user/auth/reset-password',
    VERIFY_SIGNUP: '/CMS-FE/user/auth/verify-signup',
    FORGOT_PASSWORD: '/CMS-FE/user/auth/forgot-password',
}

export default appRoutes