
import appRoutes from "./routePaths";
import DashbaordPage from "../pages/Dashbaord.page";
import Organizations from "../pages/Organizations";
import ParentPage from "../pages/Parent.page";
import StudentPage from "../pages/Student.page";
import ProfilePage from "../pages/Profile.page";
import LoginPage from "../pages/Login.page";
import SignUpPage from "../pages/SignUp.page";
import UsersPage from "../pages/Users.page";
import SettingsPage from "../pages/Settings.page";
import TeacherPage from "../pages/Teacher.page";
import NotificationsPage from "../pages/Notifications.page";
import ExamPage from "../pages/Exam.page";
import AttendancePage from "../pages/Attendance.page";
import CoursesPage from "../pages/Courses.page";
import ClassesPage from "../pages/Classes.page";
import AssignmentPage from "../pages/Assignment.page";
import EventsPage from "../pages/Events.page";
import ForgotPasswordPage from "@pages/ForgotPassword.page";

interface RouteModel {
    id: number;
    path: string;
    component: React.FunctionComponent;
    exact?: boolean;
    label?: string;
    icon?: React.ReactNode;
    roles?: string[];
    authenticationRequired: boolean;
    isSideMenu?: boolean;
}

const routes: RouteModel[] = [
    {
        id: 1,
        path: appRoutes.DASHBOARD,
        component: DashbaordPage,
        exact: true,
        label: 'Dashboard',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 2,
        path: appRoutes.ORGANIZATIONS,
        component: Organizations,
        exact: true,
        label: 'Organizations',
        roles: ['ADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 3,
        path: appRoutes.USERS,
        component: UsersPage,
        exact: true,
        label: 'Users',
        roles: ['ADMIN'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 4,
        path: appRoutes.TEACHER,
        component: TeacherPage,
        exact: true,
        label: 'Teachers',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 5,
        path: appRoutes.STUDENTS,
        component: StudentPage,
        exact: true,
        label: 'StudentPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 6,
        path: appRoutes.PARENTS,
        component: ParentPage,
        exact: true,
        label: 'ParentPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 7,
        path: appRoutes.PROFILE,
        component: ProfilePage,
        exact: true,
        label: 'ProfilePage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: false,
    },
    {
        id: 8,
        path: appRoutes.LOGIN,
        component: LoginPage,
        exact: true,
        label: 'LoginPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: false,
        isSideMenu: false,
    },
    {
        id: 9,
        path: appRoutes.REGISTER,
        component: SignUpPage,
        exact: true,
        label: 'SignUp Page',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: false,
        isSideMenu: false,
    },
    {
        id: 10,
        path: appRoutes.SETTINGS,
        component: SettingsPage,
        exact: true,
        label: 'SignUp Page',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: false,
    },
    {
        id: 11,
        path: appRoutes.NOTIFICATIONS,
        component: NotificationsPage,
        exact: true,
        label: 'Notifications',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: false,
    },
    {
        id: 12,
        path: appRoutes.EXAM,
        component: ExamPage,
        exact: true,
        label: 'Exam',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 13,
        path: appRoutes.ATTENDANCE,
        component: AttendancePage,
        exact: true,
        label: 'Attendance',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 14,
        path: appRoutes.COURSES,
        component: CoursesPage,
        exact: true,
        label: 'Courses',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 15,
        path: appRoutes.CLASSES,
        component: ClassesPage,
        exact: true,
        label: 'Classes',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 16,
        path: appRoutes.ASSIGNMENT,
        component: AssignmentPage,
        exact: true,
        label: 'Assignment',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 17,
        path: appRoutes.EVENTS,
        component: EventsPage,
        exact: true,
        label: 'Events',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 18,
        path: appRoutes.FORGOT_PASSWORD,
        component: ForgotPasswordPage,
        exact: true,
        label: 'Forgot Password',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: false,
        isSideMenu: false,
    },
]

export const routesWithoutAuth = routes.filter(route => !route.authenticationRequired)
export const routesWithAuth = routes.filter(route => route.authenticationRequired)
export const routesWithSideMenu = routes.filter(route => route.isSideMenu)

export default routes