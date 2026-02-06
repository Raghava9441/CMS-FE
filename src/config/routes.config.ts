import { lazy } from 'react';
import { PERMISSIONS, ROLES } from '../constants/roles';
import { RouteConfig } from '@models/routes.types';
import appRoutes from '@routes/routePaths';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SmsIcon from '@mui/icons-material/Sms';
import ClassIcon from '@mui/icons-material/Class';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { courseApi, teacherApi } from '@api/api';
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
                    lazy(() => import('../pages/Dashbaord.page')),
                index: true,
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                    permissions: [PERMISSIONS.VIEW, PERMISSIONS.EDIT],
                    //custom check 
                    // customCheck: (user) => {
                    //     return user.role === ROLES.ADMIN;
                    // }
                },
                metadata: {
                    title: 'Dashboard',
                    breadcrumb: 'Dashboard',
                    icon: DashboardIcon,
                    description: 'Here you can find all details like student count, male female attendance, and upcoming events',
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
                    title: 'Organizations',
                    breadcrumb: 'Organizations',
                    icon: CorporateFareIcon,
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
                            icon: DashboardIcon,
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
                    icon: CastForEducationIcon,
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
                            icon: DashboardIcon,
                            dynamicTitle: (params) => `Teacher: ${params.id}`,
                            dynamicBreadcrumb: (params) => `Teacher #${params.id}`,

                        },
                        showInSidebar: false,
                        guards: {
                            resolve: {
                                //you can pass the function to get the api data in the component 
                                getTeacherById: (context) => teacherApi.getTeacherById(context.params.id),

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
                    title: 'Students',
                    breadcrumb: 'Students',
                    icon: SupervisorAccountIcon,
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
                    icon: EscalatorWarningIcon,
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
                    icon: MenuBookIcon,
                },
                showInSidebar: true,
                children: [
                    {
                        id: 'course-details',
                        resourceName: 'courses',
                        path: appRoutes.COURSE_DETAILS,
                        component: lazy(() => import('../pages/CourseDetails.page')),
                        isDynamic: true,
                        paramKeys: ['id'],
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                        },
                        metadata: {
                            title: 'Course Details',
                            breadcrumb: 'Course Details',
                            icon: MenuBookIcon,
                            dynamicTitle: (params) => `Course: ${params.id}`,
                            dynamicBreadcrumb: (params) => `Course #${params.id}`,
                        },
                        showInSidebar: false,
                        guards: {
                            resolve: {
                                //you can pass the function to get the api data in the component 
                                getCourseById: (context) => courseApi.getCourseById(context.params.id),

                            }
                        },
                    },
                ]
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
                    icon: ClassIcon,
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
                    title: 'Attendance',
                    breadcrumb: 'Attendance',
                    icon: AccountBalanceWalletIcon,
                },
                showInSidebar: true,
                children: [

                ],
            },
            {
                id: 'assignments',
                resourceName: 'assignments',
                path: appRoutes.ASSIGNMENT,
                component: lazy(() => import('../pages/Assignment.page')),
                permission: {
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER],
                },
                metadata: {
                    title: 'Assignment',
                    breadcrumb: 'Assignment',
                    icon: AssignmentIcon,
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
                    icon: ContentPasteSearchIcon,
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
                    icon: SmsIcon,
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
                    icon: Diversity2Icon,
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
                    icon: DashboardIcon,
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
                    icon: DashboardIcon,
                },
                showInSidebar: false,
                children: [
                    {
                        id: 'settings-profile',
                        path: appRoutes.SETTINGS_PROFILE,
                        index: true,
                        component: lazy(() => import('../components/settings/ProfileSettings')),
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                        },
                        metadata: {
                            title: 'Profile Settings',
                            breadcrumb: 'Profile',
                            // icon: AccountCircleIcon, 
                        },
                        showInSidebar: false, // Show this sub-setting in a potential nested sidebar or tab menu
                    },
                    {
                        id: 'settings-notifications',
                        path: appRoutes.SETTINGS_NOTIFICATIONS,
                        component: lazy(() => import('../components/settings/NotificationSettings')),
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                        },
                        metadata: {
                            title: 'Notification Settings',
                            breadcrumb: 'Notifications',
                            // icon: NotificationsActiveIcon,
                        },
                        showInSidebar: false,
                    },
                    {
                        id: 'settings-theme',
                        path: appRoutes.SETTINGS_THEME,
                        component: lazy(() => import('../components/settings/ThemeDisplaySettings')),
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN, ROLES.TEACHER, ROLES.STUDENT, ROLES.PARENT],
                        },
                        metadata: {
                            title: 'Theme & Display',
                            breadcrumb: 'Theme',
                            // icon: PaletteIcon,
                        },
                        showInSidebar: false,
                    },
                    {
                        id: 'settings-danger-zone',
                        path: appRoutes.SETTINGS_DANGER_ZONE,
                        component: lazy(() => import('../components/settings/DangerZoneSettings')),
                        permission: {
                            roles: [ROLES.ADMIN, ROLES.ORGADMIN], // Example: Only admins can access danger zone
                        },
                        metadata: {
                            title: 'Danger Zone',
                            breadcrumb: 'Danger Zone',
                            // icon: WarningIcon,
                        },
                        showInSidebar: true,
                    },
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
                    roles: [ROLES.ADMIN, ROLES.ORGADMIN],
                    permissions: [PERMISSIONS.VIEW, PERMISSIONS.EDIT],
                },
                metadata: {
                    title: 'Feature Flags',
                    breadcrumb: 'Feature Flags',
                    icon: '🚩',
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
