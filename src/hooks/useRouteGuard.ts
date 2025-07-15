import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';
import { findRouteByPath } from '@utils/routes.utills';
import { routeConfig } from '../config/routes.config';
import { RouteConfig } from '@models/routes.types';
import appRoutes from '@routes/routePaths';

export const useRouteGuard = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    // const permissions = useSelector((state: RootState) => state.auth.permissions);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();

    const checkPermissions = (route: RouteConfig): boolean => {
        if (!route.permission) return true;

        // Check roles
        if (route.permission.roles && !route.permission.roles.includes(user?.role)) {
            return false;
        }

        // Check permissions
        // if (route.permission.permissions) {
        //     const hasPermission = route.permission.permissions.some(permission =>
        //         permissions?.includes(permission)
        //     );
        //     if (!hasPermission) return false;
        // }

        // Check custom conditions
        if (route.permission.customCheck) {
            return route.permission.customCheck(user);
        }

        return true;
    };

    useEffect(() => {
        const currentRoute = findRouteByPath(routeConfig, location.pathname);

        if (!currentRoute) {
            navigate(appRoutes.NOT_FOUND);
            return;
        }

        // Check authentication
        if (!isAuthenticated && !isPublicRoute(location.pathname)) {
            navigate(appRoutes.LOGIN, { state: { from: location } });
            return;
        }

        // Check permissions
        if (isAuthenticated && !checkPermissions(currentRoute)) {
            navigate('/401');
            return;
        }

    }, [location.pathname, isAuthenticated, user, navigate]);

    const isPublicRoute = (path: string): boolean => {
        return false
        // const publicRoutes = [appRoutes.AUTH_LAYOUT, appRoutes.LOGIN, appRoutes.FORGOT_PASSWORD, appRoutes.REGISTER,];
        // return publicRoutes.includes(path);
    };

    return { checkPermissions, isPublicRoute };
};
