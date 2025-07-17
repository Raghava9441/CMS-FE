import { lazy } from 'react';
import { PERMISSIONS, ROLES } from '../constants/roles';
import { RouteConfig } from '@models/routes.types';
import appRoutes from '@routes/routePaths';
import DefaultLoadingComponent from '@components/routing components/DefaultLoadingComponent';
const Users = lazy(() => import('../pages/Users.page'));
const Teachers = lazy(() => import('../pages/Teacher.page'));
const Login = lazy(() => import('../pages/Login.page'));
const NotFound = lazy(() => import('../pages/_404'));

export const routeConfig: RouteConfig[] = [
    // Auth routes
    {
        id: 'auth',
        path: appRoutes.AUTH_LAYOUT,
        component: lazy(() => import('../layout/UnAuthLayout')),
        showInSidebar: false,
        children: [
            {
                id: 'login',
                path: appRoutes.LOGIN,
                component: Login,
                metadata: {
                    title: 'Login - MyApp',
                    description: 'Login to your account',
                },
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                    permissions: [PERMISSIONS.VIEW, PERMISSIONS.EDIT],
                    customCheck: (user) => {
                        return user.role === ROLES.ADMIN;
                    }
                }
            },
            {
                id: 'forgot-password',
                path: appRoutes.FORGOT_PASSWORD,
                component: lazy(() => import('../pages/ForgotPassword.page')),
                metadata: {
                    title: 'Forgot Password - MyApp',
                    description: 'forgo password',
                },
            },
            {
                id: 'register',
                path: appRoutes.REGISTER,
                component: lazy(() => import('../pages/SignUp.page')),
                metadata: {
                    title: '    Register - MyApp',
                    description: 'register',
                },
            },
        ],
    },

    // Main app routes
    {
        id: 'app',
        path: appRoutes.MAIN_LAYOUT,
        component: lazy(() => import('../components/MainLayout')),
        permission: {
            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
        },
        showInSidebar: false,
        children: [
            {
                id: 'dashboard',
                path: appRoutes.DASHBOARD,
                resourceName: 'dashboard',
                component:
                    // lazy(() => import('../components/routing components/DefaultLoadingComponent')),
                    lazy(() => import('../pages/Dashbaord.page')),
                index: true,
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                    permissions: [PERMISSIONS.VIEW, PERMISSIONS.EDIT],
                },
                metadata: {
                    title: 'Dashboard - MyApp',
                    breadcrumb: 'Dashboard',
                    icon: '🏠',
                    description: ' here you cna find the all detials like studnet count ,male female attendance and upcomming events ',
                },
                showInSidebar: true,
            },
            {
                id: 'Organizations',
                resourceName: 'organizations',
                path: appRoutes.ORGANIZATIONS,
                component: lazy(() => import('../pages/Organizations')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                },
                metadata: {
                    title: 'Organizations - MyApp',
                    breadcrumb: 'Organizations',
                    icon: '🏠',
                },
                icon: '🏠',
                children: [
                    {
                        id: 'organization-profile',
                        path: appRoutes.ORGANIZATION_PROFILE,
                        component: lazy(() => import('../components/organizations/OrganizationProfile')),
                        isDynamic: true,
                        paramKeys: ['id'],
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                        },
                        metadata: {
                            title: 'Organization Profile',
                            breadcrumb: 'Profile',
                            dynamicTitle: (params) => `Organization: ${params.id}`,
                            dynamicBreadcrumb: (params) => `Organization #${params.id}`,
                        },
                        showInSidebar: false,
                    }
                ],
                showInSidebar: true,
            },
            {
                id: 'teachers',
                resourceName: 'teachers',
                path: appRoutes.TEACHERS,
                component: Teachers,
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Teachers',
                    breadcrumb: 'Teachers',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                guards: {

                },
                children: [
                    {
                        id: 'teacher-profile',
                        path: appRoutes.TEACHER_PROFILE,
                        component: lazy(() => import('../components/Teachers/TeacherProfile')),
                        isDynamic: true,
                        paramKeys: ['id'],
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                        },
                        metadata: {
                            title: 'Teacher Profile',
                            breadcrumb: 'Profile',
                            dynamicTitle: (params) => `Teacher: ${params.id}`,
                            dynamicBreadcrumb: (params) => `Teacher #${params.id}`,
                        },
                        showInSidebar: false,
                        guards: {
                            resolve: {
                                //you can pass the function to get the api data in the component 
                            }
                        },
                    },
                ],
            },
            {
                id: 'students',
                resourceName: 'students',
                path: appRoutes.STUDENTS,
                component: lazy(() => import('../pages/Student.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'StudentPage',
                    breadcrumb: 'Studnets',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [
                    {
                        id: 'student-profile',
                        path: appRoutes.STUDENT_PROFILE,
                        component: lazy(() => import('../components/student/StudentProfile')),
                        isDynamic: true,
                        paramKeys: ['id'],
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                        },
                        metadata: {
                            title: 'Student Profile',
                            breadcrumb: 'Profile',
                            dynamicTitle: (params) => `Student: ${params.id}`,
                            dynamicBreadcrumb: (params) => `Student #${params.id}`,
                        },
                        showInSidebar: false,
                    },
                ],
            },
            {
                id: 'parents',
                resourceName: 'parents',
                path: appRoutes.PARENTS,
                component: lazy(() => import('../pages/Parent.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'ParentPage',
                    breadcrumb: 'parents',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'Exams',
                resourceName: 'exams',
                path: appRoutes.EXAM,
                component: lazy(() => import('../pages/Exam.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'ExamPage',
                    breadcrumb: 'Exams',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'Attendance',
                resourceName: 'attendance',
                path: appRoutes.ATTENDANCE,
                component: lazy(() => import('../pages/Attendance.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'AttendancePage',
                    breadcrumb: 'Attendance',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'Courses',
                resourceName: 'courses',
                path: appRoutes.COURSES,
                component: lazy(() => import('../pages/Courses.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Courses',
                    breadcrumb: 'Courses',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'Classes',
                resourceName: 'classes',
                path: appRoutes.CLASSES,
                component: lazy(() => import('../pages/Classes.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Classes',
                    breadcrumb: 'Classes',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'assignment',
                resourceName: 'assignment',
                path: appRoutes.ASSIGNMENT,
                component: lazy(() => import('../pages/Assignment.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Assignment',
                    breadcrumb: 'Assignment',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'conversations',
                resourceName: 'conversations',
                path: appRoutes.CONVERSATIONS,
                component: lazy(() => import('../pages/Conversations.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Conversations',
                    breadcrumb: 'conversations',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'Friends',
                resourceName: 'friends',
                path: appRoutes.FRIENDS,
                component: lazy(() => import('../pages/Friends.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Friends',
                    breadcrumb: 'Friends',
                    icon: '👨‍🏫',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'users',
                resourceName: 'users',
                path: appRoutes.USERS,
                component: Users,
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN],
                },
                metadata: {
                    title: 'Users',
                    breadcrumb: 'Users',
                    icon: '👥',
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'Settings',
                resourceName: 'settings',
                path: appRoutes.SETTINGS,
                component: lazy(() => import('../pages/Settings.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Settings',
                    breadcrumb: 'Settings',
                    icon: '👨‍🏫',
                },
                showInSidebar: false,
                children: [

                ],
            },
            {
                id: 'Profile',
                path: appRoutes.PROFILE,
                resourceName: 'profile',
                component: lazy(() => import('../pages/Profile.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Profile',
                    breadcrumb: 'profile',
                    icon: '👨‍🏫',
                },
                showInSidebar: false,
                children: [

                ],
            },
            {
                id: 'feature-flags',
                resourceName: 'featureFlags',
                path: appRoutes.FEATURE_FLAGS,
                component: lazy(() => import('../pages/features.page')),
                permission: {
                    roles: [ROLES.ADMIN],
                },
                metadata: {
                    title: 'featuer flags',
                    breadcrumb: 'feaature flags',
                    icon: '👨‍🏫',
                },
                showInSidebar: false,
                children: [

                ],
            },
        ],
    },

    // Error routes
    {
        id: 'not-found',
        path: "*",
        component: NotFound,
        metadata: {
            title: 'Page Not Found',
        },
        showInSidebar: false,
    },
    {
        id: 'unauthorized',
        path: appRoutes.UNAUTHORIZED,
        component: lazy(() => import('../pages/Unauthorized.page')),
        metadata: {
            title: 'Unauthorized',
        },
        showInSidebar: false,
    },
];
