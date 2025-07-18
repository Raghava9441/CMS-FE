import { RouteConfig } from "@models/routes.types";
import { routeConfig } from "../config/routes.config";
import { Permission } from "@models/Permission.types";

export const findRouteByPath = (routes: RouteConfig[], path: string): RouteConfig | null => {
    for (const route of routes) {
        // Exact match
        if (route.path === path) return route;

        // Dynamic route match
        if (route.isDynamic && matchDynamicRoute(route.path, path)) {
            return route;
        }

        // Check children recursively
        if (route.children) {
            const found = findRouteByPath(route.children, path);
            if (found) return found;
        }
    }
    return null;
};

export const matchDynamicRoute = (pattern: string, path: string): boolean => {
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    if (patternParts.length !== pathParts.length) return false;

    return patternParts.every((part, index) => {
        if (part.startsWith(':')) return true; // Dynamic segment
        return part === pathParts[index];
    });
};

export const extractRouteParams = (pattern: string, path: string): Record<string, string> => {
    const params: Record<string, string> = {};
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);

    patternParts.forEach((part, index) => {
        if (part.startsWith(':')) {
            const paramName = part.substring(1);
            params[paramName] = pathParts[index];
        }
    });

    return params;
};

export const generateBreadcrumbs = (
    routes: RouteConfig[],
    path: string
): Array<{ label: string; path: string; params?: Record<string, string> }> => {
    const breadcrumbs: Array<{ label: string; path: string; params?: Record<string, string> }> = [];
    const pathSegments = path.split('/').filter(Boolean);

    let currentPath = '';
    for (let i = 0; i < pathSegments.length; i++) {
        currentPath += `/${pathSegments[i]}`;

        // Try to find exact match first
        let route = findRouteByPath(routes, currentPath);

        // If not found, try to find dynamic route match
        if (!route) {
            route = findRouteByPathPattern(routes, currentPath);
        }

        if (route?.metadata?.breadcrumb && !route.metadata.hideInBreadcrumb) {
            const params = route.isDynamic ? extractRouteParams(route.path, currentPath) : {};

            let breadcrumbLabel = route.metadata.breadcrumb;
            if (route.metadata.dynamicBreadcrumb) {
                breadcrumbLabel = route.metadata.dynamicBreadcrumb(params);
            }

            breadcrumbs.push({
                label: breadcrumbLabel,
                path: currentPath,
                params
            });
        }
    }

    return breadcrumbs;
};

export const findRouteByPathPattern = (routes: RouteConfig[], path: string): RouteConfig | null => {
    for (const route of routes) {
        if (route.isDynamic && matchDynamicRoute(route.path, path)) {
            return route;
        }
        if (route.children) {
            const found = findRouteByPathPattern(route.children, path);
            if (found) return found;
        }
    }
    return null;
};

export const isRouteActive = (itemPath: string, currentPath: string, matchPattern?: string, exactMatch = false): boolean => {
    // Use custom match pattern if provided
    if (matchPattern) {
        const regex = new RegExp(matchPattern);
        return regex.test(currentPath);
    }

    // Exact match
    if (exactMatch) {
        return itemPath === currentPath;
    }

    // Prefix match for nested routes
    if (itemPath === '/') {
        return currentPath === '/';
    }

    return currentPath.startsWith(itemPath);
};


export interface SidebarRoute {
    id: string;
    path: string;
    label: string;
    metadata?: any;
    resourceName?: string
}

// Updated getSidebarRoutes function to work with the guard
export const getSidebarRoutes = (role: string, permissions: Permission[]): SidebarRoute[] => {
    const result: SidebarRoute[] = [];

    const hasResourcePermission = (resourceName: string): boolean => {
        if (!resourceName) return true;
        const permission = permissions.find(p => p.name === resourceName);
        return permission ? permission.view : false;
    };

    const traverse = (routes: RouteConfig[]) => {
        for (const route of routes) {
            // Role-based permission check
            const roleAllowed = !route.permission?.roles || route.permission.roles.includes(role);

            // Resource-based permission check
            const resourceAllowed = hasResourcePermission(route.resourceName || '');

            // Custom permission check
            let customAllowed = true;
            if (route.permission?.customCheck) {
                // You might need to pass user object here
                // customAllowed = route.permission.customCheck(user);
            }

            const allowed = roleAllowed && resourceAllowed && customAllowed;

            if (route.showInSidebar && allowed) {
                result.push({
                    id: route.id,
                    path: route.path,
                    label: route.metadata?.title ? route.metadata.title : route.id,
                    metadata: route.metadata,
                    resourceName: route.resourceName,
                });
            }

            if (route.children) {
                traverse(route.children);
            }
        }
    };

    traverse(routeConfig);
    return result;
};
