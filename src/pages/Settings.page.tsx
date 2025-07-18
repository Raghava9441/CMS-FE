import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
import { findRouteByPath } from "@utils/routes.utills"; // Assuming this utility exists and works as expected
import { routeConfig } from "../config/routes.config";
import { RouteConfig } from "@models/routes.types";
import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { useCallback, useMemo } from "react"; // Use useMemo for computed values
import appRoutes from "@routes/routePaths";

// Import icons for your settings sub-pages (make sure these are installed, e.g., @mui/icons-material)
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PaletteIcon from '@mui/icons-material/Palette';
import WarningIcon from '@mui/icons-material/Warning';


function SettingsPage() {
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location object

    // Find the main 'Settings' route object from your config
    // We need to reliably get the parent 'Settings' route to access its children
    const settingsParentRoute = useMemo(() => {
        // You'll need to adapt findRouteByPath or create a new utility
        // that specifically finds a parent route by its base path.
        // For now, let's assume 'routeConfig' is an array of top-level routes
        // and we can iterate to find the 'Settings' route.
        const appMainRoute = routeConfig.find(route => route.id === 'app');
        if (appMainRoute && appMainRoute.children) {
            return appMainRoute.children.find(route => route.id === 'Settings');
        }
        return undefined;
    }, []); // This memoizes the result, so it only runs once

    // Get the children of the Settings route that should be displayed in the sidebar/navigation
    const navigableSettingsChildren = useMemo(() => {
        if (!settingsParentRoute || !settingsParentRoute.children) {
            return [];
        }
        // Filter out children that should not be shown in the sidebar
        // (e.g., the `index: true` default route if you don't want it explicitly listed)
        return settingsParentRoute.children.filter(child =>
            child.showInSidebar && !child.index
        );
    }, [settingsParentRoute]);


    const handleNavigationClick = useCallback((relativePath: string) => {
        // Construct the full absolute path
        const fullPath = `${appRoutes.SETTINGS}/${relativePath}`;
        navigate(fullPath);
    }, [navigate]);

    // Determine the currently active tab for styling the ListItemButton
    const getIsActive = useCallback((childRoutePath: string) => {
        // location.pathname will be '/settings/profile', '/settings/notifications', etc.
        // childRoutePath will be 'profile', 'notifications', etc.
        // We need to compare the full path, or check if location.pathname ends with the child's relative path
        const fullChildPath = childRoutePath;
        return location.pathname === fullChildPath;
    }, [location.pathname]);

    // Function to get the icon component based on metadata.icon
    const getIconComponent = (icon: any) => {
        if (typeof icon === 'function') { // Assuming Material-UI icons are components
            const IconComponent = icon;
            return <IconComponent />;
        }
        // Handle string icons or other cases if needed
        return null;
    };


    if (!settingsParentRoute) {
        // Handle case where settings parent route is not found (shouldn't happen if config is correct)
        return <Box>Error: Settings route configuration not found.</Box>;
    }


    return (
        <Stack direction={"row"} spacing={2} sx={{ height: "100%", width: '100%' }}>
            <Box sx={{ width: 240, borderRight: 1, borderColor: 'divider', p: 2 }}>
                {
                    navigableSettingsChildren.map((childRoute: RouteConfig) => {
                        // Ensure childRoute.path exists for relative navigation
                        if (!childRoute.path) return null;

                        return (
                            <ListItem key={childRoute.id} disablePadding>
                                <ListItemButton
                                    onClick={() => handleNavigationClick(childRoute.path as string)}
                                    selected={getIsActive(childRoute.path as string)} // Highlight active button
                                >
                                    {childRoute.metadata?.icon && (
                                        <ListItemIcon>
                                            {getIconComponent(childRoute.metadata.icon)}
                                        </ListItemIcon>
                                    )}
                                    <ListItemText
                                        primary={childRoute.metadata?.title || childRoute.id}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })
                }
            </Box>
            {/* Right Box for Content */}
            <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
                <Outlet />
            </Box>
        </Stack>
    );
}

export default SettingsPage;