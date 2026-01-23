import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';
import { findRouteByPath } from '@utils/routes.utills';
import { routeConfig } from '../config/routes.config';
import { RouteConfig } from '@models/routes.types';
import appRoutes from '@routes/routePaths';
import { Permission } from '@models/Permission.types';

export const useRouteGuard = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const permissions = useSelector((state: RootState) => state.auth.permissions);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    const location = useLocation();

    const hasResourcePermission = (resourceName: string, permissionType: 'view' | 'edit' | 'delete' = 'view'): boolean => {
        if (!resourceName) return true;
        const permission = permissions?.find((p: Permission) => p.name === resourceName);
        if (!permission) return false;

        return permission[permissionType];
    };

    const checkPermissions = (route: RouteConfig): boolean => {
        // console.log(route.permission)
        if (!route.permission && !route.resourceName) return true;

        // Check resource-based permissions first (if resourceName exists)
        if (route.resourceName) {
            const hasViewPermission = hasResourcePermission(route.resourceName, 'view');
            if (!hasViewPermission) {
                console.warn(`Access denied: No view permission for resource '${route.resourceName}'`);
                return false;
            }
        }

        // Check role-based permissions
        if (route.permission?.roles && !route.permission.roles.includes(user?.role)) {
            console.warn(`Access denied: User role '${user?.role}' not in allowed roles`, route.permission.roles);
            return false;
        }

        // Check custom conditions
        if (route.permission?.customCheck) {
            const customResult = route.permission.customCheck(user);
            if (!customResult) {
                console.warn(`Access denied: Custom check failed for route '${route.id}'`);
                return false;
            }
        }

        return true;
    };

    const canActivateRoute = (route: RouteConfig): boolean => {
        if (!isAuthenticated && !isPublicRoute(location.pathname)) {
            return false;
        }

        if (isAuthenticated && !checkPermissions(route)) {
            return false;
        }

        return true;
    };

    useEffect(() => {
        // const currentRoute = findRouteByPath(routeConfig, location.pathname);

        // if (!currentRoute) {
        //     navigate(appRoutes.NOT_FOUND);
        //     return;
        // }

        // Check authentication
        if (!isAuthenticated && !isPublicRoute(location.pathname)) {
            navigate(appRoutes.LOGIN, { state: { from: location } });
            return;
        }

    }, [location.pathname, isAuthenticated, user, navigate]);

    const isPublicRoute = (path: string): boolean => {
        const publicRoutes = [appRoutes.AUTH_LAYOUT, appRoutes.LOGIN, appRoutes.FORGOT_PASSWORD, appRoutes.REGISTER,];
        return publicRoutes.includes(path);
    };

    return { checkPermissions, isPublicRoute, canActivateRoute };
};
