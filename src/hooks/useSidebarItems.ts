import { RouteConfig, SidebarItem } from "@models/routes.types";
import { useFeatureFlags } from "./useFeatureFlags";
import { RootState } from "@redux/store";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { isRouteActive } from "@utils/routes.utills";
import { useMemo } from "react";
import { routeConfig } from "../config/routes.config";


// NOTE: not using currently


export const useSidebarItems = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const location = useLocation();
    const { isFeatureEnabled } = useFeatureFlags();

    const convertRouteToSidebarItem = (route: RouteConfig, level = 0): SidebarItem | null => {
        // Skip routes that shouldn't show in sidebar
        if (!route.showInSidebar) return null;

        // Check permissions - ensure user exists and has a role
        if (route.permission?.roles && user?.role && !route.permission.roles.includes(user.role)) {
            return null;
        }

        // Check feature flags
        if (route.metadata?.feature && !isFeatureEnabled(route.metadata.feature)) {
            return null;
        }

        // Process children recursively
        const children = route.children
            ?.map(child => convertRouteToSidebarItem(child, level + 1))
            .filter((item): item is SidebarItem => item !== null); 
            // Type guard to filter out nulls
            return route
        return {
            id: route.id,
            label: route.metadata?.breadcrumb || route.metadata?.title || route.id, // Use breadcrumb first, then title
            path: route.path,
            icon: route.metadata?.icon || '📄',
            order: route.metadata?.order || 0,
            roles: route.permission?.roles || [],
            featureFlag: route.metadata?.feature,
            children: children && children.length > 0 ? children : undefined,
            matchPattern: route.sidebarMatcher,
            exactMatch: route.exact,
        };
    };

    const filterSidebarItems = (items: SidebarItem[]): SidebarItem[] => {
        return items
            .filter(item => {
                // Skip dividers in filtering
                if (item?.divider) return true;

                // Check role permissions - ensure user exists
                if (item?.roles.length > 0 && user?.role && !item.roles.includes(user.role)) {
                    return false;
                }

                // Check feature flags
                if (item?.featureFlag && !isFeatureEnabled(item.featureFlag)) {
                    return false;
                }

                // Check custom conditions
                if (item?.customCheck && !item.customCheck(user)) {
                    return false;
                }

                return true;
            })
            .map(item => ({
                ...item,
                children: item.children ? filterSidebarItems(item.children) : undefined,
            }))
            .filter(item => {
                // Remove parent items with no visible children (but keep items without children)
                if (item.children !== undefined) {
                    return item.children.length > 0;
                }
                return true;
            });
    };

    const isItemActive = (item: SidebarItem): boolean => {
        return isRouteActive(item.path, location.pathname, item.matchPattern, item.exactMatch);
    };

    const findActiveItem = (items: SidebarItem[]): SidebarItem | null => {
        for (const item of items) {
            if (isItemActive(item)) {
                return item;
            }
            if (item.children) {
                const activeChild = findActiveItem(item.children);
                if (activeChild) return activeChild;
            }
        }
        return null;
    };

    const getActiveItemPath = (items: SidebarItem[]): string[] => {
        const findPath = (items: SidebarItem[], currentPath: string[] = []): string[] | null => {
            for (const item of items) {
                const newPath = [...currentPath, item.id];

                if (isItemActive(item)) {
                    return newPath;
                }

                if (item.children) {
                    const childPath = findPath(item.children, newPath);
                    if (childPath) return childPath;
                }
            }
            return null;
        };

        return findPath(items) || [];
    };

    // Generate sidebar items from route config
    const sidebarItems = useMemo(() => {
        const items = routeConfig
            .map(route => convertRouteToSidebarItem(route))
            .filter((item): item is SidebarItem => item !== null); // Type guard to filter out nulls

        return filterSidebarItems(items).sort((a, b) => a.order - b.order);
    }, [user, isFeatureEnabled, location.pathname]);

    const activeItem = useMemo(() => findActiveItem(sidebarItems), [sidebarItems, location.pathname]);
    const activeItemPath = useMemo(() => getActiveItemPath(sidebarItems), [sidebarItems, location.pathname]);

    return {
        sidebarItems,
        activeItem,
        activeItemPath,
        isItemActive,
        findActiveItem,
    };
};