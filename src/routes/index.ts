import appRoutes from "./routePaths";
import {lazy} from "react";

interface RouteModel {
    id: number;
    path: string;
    component: React.LazyExoticComponent<React.ComponentType> | React.ComponentType;
    exact?: boolean;
    label?: string;
    icon?: React.ReactNode;
    roles: string[];
    authenticationRequired: boolean;
    isSideMenu?: boolean;
}

const routes: RouteModel[] = [
    {
        id: 1,
        path: appRoutes.DASHBOARD,
        component: lazy(() => import("../pages/Dashbaord.page")),
        exact: true,
        label: 'Dashboard',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 2,
        path: appRoutes.ORGANIZATIONS,
        component: lazy(() => import('../pages/Organizations')),
        exact: true,
        label: 'Organizations',
        roles: ['ADMIN','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 3,
        path: appRoutes.USERS,
        component: lazy(() => import("../pages/Users.page")),
        exact: true,
        label: 'Users',
        roles: ['ADMIN','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 4,
        path: appRoutes.TEACHER,
        component: lazy(() => import('../pages/Teacher.page')),
        exact: true,
        label: 'Teachers',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 5,
        path: appRoutes.STUDENTS,
        component: lazy(() => import('../pages/Student.page')),
        exact: true,
        label: 'StudentPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 6,
        path: appRoutes.PARENTS,
        component: lazy(() => import('../pages/Parent.page')),
        exact: true,
        label: 'ParentPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 7,
        path: appRoutes.PROFILE,
        component: lazy(() => import('../pages/Profile.page')),
        exact: true,
        label: 'ProfilePage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: false,
    },
    {
        id: 8,
        path: appRoutes.LOGIN,
        component: lazy(() => import('../pages/Login.page')),
        exact: true,
        label: 'LoginPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: false,
        isSideMenu: false,
    },
    {
        id: 9,
        path: appRoutes.REGISTER,
        component: lazy(() => import('../pages/SignUp.page')),
        exact: true,
        label: 'SignUp Page',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: false,
        isSideMenu: false,
    },
    {
        id: 10,
        path: appRoutes.SETTINGS,
        component: lazy(() => import('../pages/Settings.page')),
        exact: true,
        label: 'SignUp Page',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: false,
    },
    {
        id: 11,
        path: appRoutes.NOTIFICATIONS,
        component: lazy(() => import('../pages/Notifications.page')),
        exact: true,
        label: 'Notifications',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: false,
    },
    {
        id: 12,
        path: appRoutes.EXAM,
        component: lazy(() => import('../pages/Exam.page')),
        exact: true,
        label: 'Exam',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 13,
        path: appRoutes.ATTENDANCE,
        component: lazy(()=>import('../pages/Attendance.page')),
        exact: true,
        label: 'Attendance',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 14,
        path: appRoutes.COURSES,
        component: lazy(() => import('../pages/Courses.page')),
        exact: true,
        label: 'Courses',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 15,
        path: appRoutes.CLASSES,
        component: lazy(() => import('../pages/Classes.page')),
        exact: true,
        label: 'Classes',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 16,
        path: appRoutes.ASSIGNMENT,
        component: lazy(() => import('../pages/Assignment.page')),
        exact: true,
        label: 'Assignment',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 17,
        path: appRoutes.EVENTS,
        component: lazy(() => import('../pages/Events.page')),
        exact: true,
        label: 'Events',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 18,
        path: appRoutes.FORGOT_PASSWORD,
        component: lazy(() => import('../pages/ForgotPassword.page')),
        exact: true,
        label: 'Forgot Password',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT','ORGADMIN'],
        authenticationRequired: false,
        isSideMenu: false,
    },
    {
        id: 19,
        path: appRoutes.REGISTER_USER,
        component: lazy(() => import('../pages/Users.page')),
        exact: true,
        label: 'Add User',
        roles: ['ADMIN','ORGADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
]

export const routesWithoutAuth = routes.filter(route => !route.authenticationRequired)

export const routesWithAuth = (role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT') => {
    return routes.filter(route => route.authenticationRequired && route?.roles.includes(role))
}

export const routesWithSideMenu = (role: 'ADMIN' | 'TEACHER' | 'STUDENT' | "PARENT") => {
    return routes.filter(route => route.authenticationRequired && route?.roles.includes(role))
}

export default routes