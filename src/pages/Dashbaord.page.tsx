import React, { useEffect, useState, useContext } from 'react';
import { ROLES } from '../constants/roles';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
import StudentDashboardPage from './StudentDashboard.page';
import ParentDashboardPage from './ParentDashboard.page';
import TeacherDashboardPage from './TeacherDashboard.page';
import OrgAdminDashboardPage from './OrgAdminDashboard.page';
import { useSelector } from 'react-redux';

const DashboardPage: React.FC = () => {
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext);

    // Determine the user's role from either context
    // In a real app, you would get this from your backend API
    // const userRole = "STUDENT"
    const {role:userRole} = useSelector((state: any) => state.auth.user);


    // Render role-specific dashboard
    switch (userRole) {
        case ROLES.STUDENT:
            return <StudentDashboardPage />;
        case ROLES.PARENT:
            return <ParentDashboardPage />;
        case ROLES.TEACHER:
            return <TeacherDashboardPage />;
        case ROLES.ORGADMIN:
        case ROLES.ADMIN:
        default:
            return <OrgAdminDashboardPage />;
    }
};

export default DashboardPage;
