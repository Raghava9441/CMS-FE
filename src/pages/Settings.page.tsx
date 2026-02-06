// import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack } from "@mui/material";
// import { findRouteByPath } from "@utils/routes.utills"; // Assuming this utility exists and works as expected
// import { routeConfig } from "../config/routes.config";
// import { RouteConfig } from "@models/routes.types";
// import { Outlet, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
// import { useCallback, useMemo } from "react"; // Use useMemo for computed values
// import appRoutes from "@routes/routePaths";

// // Import icons for your settings sub-pages (make sure these are installed, e.g., @mui/icons-material)
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import PaletteIcon from '@mui/icons-material/Palette';
// import WarningIcon from '@mui/icons-material/Warning';


// function SettingsPage() {
//     const navigate = useNavigate();
//     const location = useLocation(); // Get the current location object

//     // Find the main 'Settings' route object from your config
//     // We need to reliably get the parent 'Settings' route to access its children
//     const settingsParentRoute = useMemo(() => {
//         // You'll need to adapt findRouteByPath or create a new utility
//         // that specifically finds a parent route by its base path.
//         // For now, let's assume 'routeConfig' is an array of top-level routes
//         // and we can iterate to find the 'Settings' route.
//         const appMainRoute = routeConfig.find(route => route.id === 'app');
//         if (appMainRoute && appMainRoute.children) {
//             return appMainRoute.children.find(route => route.id === 'Settings');
//         }
//         return undefined;
//     }, []); // This memoizes the result, so it only runs once

//     // Get the children of the Settings route that should be displayed in the sidebar/navigation
//     const navigableSettingsChildren = useMemo(() => {
//         if (!settingsParentRoute || !settingsParentRoute.children) {
//             return [];
//         }
//         // Filter out children that should not be shown in the sidebar
//         // (e.g., the `index: true` default route if you don't want it explicitly listed)
//         return settingsParentRoute.children.filter(child =>
//             child.showInSidebar && !child.index
//         );
//     }, [settingsParentRoute]);


//     const handleNavigationClick = useCallback((relativePath: string) => {
//         // Construct the full absolute path
//         const fullPath = `${appRoutes.SETTINGS}/${relativePath}`;
//         navigate(fullPath);
//     }, [navigate]);

//     // Determine the currently active tab for styling the ListItemButton
//     const getIsActive = useCallback((childRoutePath: string) => {
//         // location.pathname will be '/settings/profile', '/settings/notifications', etc.
//         // childRoutePath will be 'profile', 'notifications', etc.
//         // We need to compare the full path, or check if location.pathname ends with the child's relative path
//         const fullChildPath = childRoutePath;
//         return location.pathname === fullChildPath;
//     }, [location.pathname]);

//     // Function to get the icon component based on metadata.icon
//     const getIconComponent = (icon: any) => {
//         if (typeof icon === 'function') { // Assuming Material-UI icons are components
//             const IconComponent = icon;
//             return <IconComponent />;
//         }
//         // Handle string icons or other cases if needed
//         return null;
//     };


//     if (!settingsParentRoute) {
//         // Handle case where settings parent route is not found (shouldn't happen if config is correct)
//         return <Box>Error: Settings route configuration not found.</Box>;
//     }


//     return (
//         <Stack direction={"row"} spacing={2} sx={{ height: "100%", width: '100%' }}>
//             <Box sx={{ width: 240, borderRight: 1, borderColor: 'divider', p: 2 }}>
//                 {
//                     navigableSettingsChildren.map((childRoute: RouteConfig) => {
//                         // Ensure childRoute.path exists for relative navigation
//                         if (!childRoute.path) return null;

//                         return (
//                             <ListItem key={childRoute.id} disablePadding>
//                                 <ListItemButton
//                                     onClick={() => handleNavigationClick(childRoute.path as string)}
//                                     selected={getIsActive(childRoute.path as string)} // Highlight active button
//                                 >
//                                     {childRoute.metadata?.icon && (
//                                         <ListItemIcon>
//                                             {getIconComponent(childRoute.metadata.icon)}
//                                         </ListItemIcon>
//                                     )}
//                                     <ListItemText
//                                         primary={childRoute.metadata?.title || childRoute.id}
//                                     />
//                                 </ListItemButton>
//                             </ListItem>
//                         );
//                     })
//                 }
//             </Box>
//             {/* Right Box for Content */}
//             <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto' }}>
//                 <Outlet />
//             </Box>
//         </Stack>
//     );
// }

// export default SettingsPage;









// SettingsPage.tsx (Main wrapper)
import React, { useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Container,
    Paper,
    Typography,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { Settings as SettingsIcon, Business, Person } from '@mui/icons-material';
import AdminSettingsPage from '@components/settings/AdminSettingsPage';
import UserSettingsPage from '@components/settings/UserSettingsPage';
import OrgAdminSettingsPage from '@components/settings/OrgAdminSettingsPage';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`settings-tabpanel-${index}`}
            aria-labelledby={`settings-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
        </div>
    );
}

function SettingsPage() {
    const [value, setValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const userRole = 'ADMIN'; // This should come from your auth context/redux

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // Determine available tabs based on user role
    const getTabs = () => {
        switch (userRole) {
            case 'ADMIN':
                return [
                    { label: 'System Settings', icon: <SettingsIcon />, component: <AdminSettingsPage /> },
                    { label: 'Organization Settings', icon: <Business />, component: <OrgAdminSettingsPage /> },
                    { label: 'User Settings', icon: <Person />, component: <UserSettingsPage /> }
                ];
            case 'ORGADMIN':
                return [
                    { label: 'Organization Settings', icon: <Business />, component: <OrgAdminSettingsPage /> },
                    { label: 'User Settings', icon: <Person />, component: <UserSettingsPage /> }
                ];
            default:
                return [
                    { label: 'User Settings', icon: <Person />, component: <UserSettingsPage /> }
                ];
        }
    };

    const tabs = getTabs();

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    mb: 4,
                    p: 4
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Settings
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Configure system, organization, and personal preferences
                </Typography>
            </Paper>

            <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant={isMobile ? "scrollable" : "fullWidth"}
                    scrollButtons="auto"
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        '& .MuiTab-root': {
                            py: 2,
                            fontSize: '1rem',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&.Mui-selected': {
                                color: theme.palette.primary.main,
                            }
                        }
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={tab.label}
                            icon={tab.icon}
                            iconPosition="start"
                            label={tab.label}
                            id={`settings-tab-${index}`}
                            aria-controls={`settings-tabpanel-${index}`}
                        />
                    ))}
                </Tabs>

                {tabs.map((tab, index) => (
                    <TabPanel key={tab.label} value={value} index={index}>
                        {tab.component}
                    </TabPanel>
                ))}
            </Paper>
        </Container>
    );
}

export default SettingsPage;