
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
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 3,
        path: appRoutes.PARENTS,
        component: ParentPage,
        exact: true,
        label: 'ParentPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 4,
        path: appRoutes.STUDENTS,
        component: StudentPage,
        exact: true,
        label: 'StudentPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 5,
        path: appRoutes.PROFILE,
        component: ProfilePage,
        exact: true,
        label: 'ProfilePage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: false,
    },
    {
        id: 6,
        path: appRoutes.USERS,
        component: UsersPage,
        exact: true,
        label: 'Users',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: true,
    },
    {
        id: 7,
        path: appRoutes.LOGIN,
        component: LoginPage,
        exact: true,
        label: 'LoginPage',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: false,
        isSideMenu: false,
    },
    {
        id: 8,
        path: appRoutes.REGISTER,
        component: SignUpPage,
        exact: true,
        label: 'SignUp Page',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: false,
        isSideMenu: false,
    },
    {
        id: 9,
        path: appRoutes.SETTINGS,
        component: SettingsPage,
        exact: true,
        label: 'SignUp Page',
        roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'],
        authenticationRequired: true,
        isSideMenu: false,
    },
]

export const routesWithoutAuth = routes.filter(route => !route.authenticationRequired)
export const routesWithAuth = routes.filter(route => route.authenticationRequired)
export const routesWithSideMenu = routes.filter(route => route.isSideMenu)

export default routes