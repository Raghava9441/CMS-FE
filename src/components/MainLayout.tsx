/**
 * MainLayout module.
 *
 * This file contains the MainLayout React component, which provides the main application layout for ScholarSync.
 * It includes the AppBar, side navigation drawer, and main content area, and manages authentication, socket initialization, and user menu interactions.
 *
 * @module MainLayout
 */
import * as React from 'react';
import { useEffect, useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Menu, MenuItem, Theme, useTheme, Tooltip, Badge } from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import appRoutes from '../routes/routePaths';
import { authActions } from '../redux/actions/auth.actions';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { setIsOptimistic } from '@redux/slices/chat.slice';
import { GetConversations } from '@redux/actions/chat.actions'; // GetMessages removed as it was unused
import { GetOnlineFriends } from '@redux/actions/userActions';
import { useSocketManager } from '@hooks/usesocket';
import { getSidebarRoutes } from '@utils/routes.utills';
import { useRouteGuard } from '@hooks/useRouteGuard';
import { useSidebarItems } from '@hooks/useSidebarItems';
import { socketManager } from '../services/socketManager';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DashboardHeader from './DashboardHeader';
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";


// Define drawer widths as constants for better readability and maintainability
const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 64;

// Icon mapping for sidebar items
const routeIcons: { [key: string]: React.ElementType } = {
    // You should map specific routes to specific icons for clarity
    // Example:
    // [appRoutes.DASHBOARD]: DashboardIcon,
    // [appRoutes.MESSAGES]: MessageIcon,
    // For now, using generic InboxIcon and MailIcon as in original code
    defaultEven: InboxIcon,
    defaultOdd: MailIcon,
};

/**
 * MainLayout component provides the main application layout, including the AppBar, side navigation drawer, and main content area.
 * It manages authentication checks, socket initialization, and user menu interactions.
 *
 * @component
 * @returns {JSX.Element} The rendered main layout of the application.
 */
export default function MainLayout() {
    useRouteGuard();
    useSocketManager();


    const styles = {
        layoutWrapper: {
            display: 'flex',
            height: '100vh',
            flexFlow: "row nowrap",
            position: "relative",
        },
        layoutContainer: {
            height: "100%",
            width: "-webkit-fill-available",
            flexGrow: 1,
            minWidth: 0,
        },
        layoutHeader: {
            width: "100%",
            height: '8%',
            paddingX: "25px",
            paddingY: "5px",
            boxShadow: " -10px 0 5px -10px rgba(31, 30, 30, 0.5)",
            // backgroundColor:"red"
        },
        headerRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        headerLeft: {
            // display: 'flex',
            // alignItems: 'center',
        },
        headerRight: {
            display: 'flex',
            alignItems: 'center',
        },
        notificationIcon: {
            paddingRight: '2rem',
        },
        avatarIcon: {
            padding: '0px',
        },
        menuPaper: {
            width: '200px',
            maxWidth: 'calc(100% - 48px)',
        },
        pageWrapper: {
            boxShadow: " -10px 0 5px -10px rgba(31, 30, 30, 0.5)",
            height: '92%',
            paddingX: "25px",
            // backgroundColor: theme."#fafafb",
        },
        drawerBox: {
            height: '100%',
            position: "relative",
        },
        drawerToolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            px: 2,
        },
        drawerTitleBox: (collapsed: boolean) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            flex: 1,
        }),
        drawerTitleText: (theme: Theme) => ({
            color: theme.palette.primary.main,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            mr: 1,
        }),
        drawerIcon: (theme: Theme, collapsed: boolean) => ({
            fontSize: 40,
            color: theme.palette.primary.main,
            ...(collapsed && { ml: 0 }),
        }),
        expandCollapseButton: {
            minHeight: 48,
            justifyContent: 'center',
            px: 2.5,
        },
        listItemIconCollapsed: {
            minWidth: 0,
            mr: 'auto',
            justifyContent: 'center',
        },
        listItemButton: (collapsed: boolean, selected: boolean, theme: Theme) => ({
            minHeight: 10,
            height: 40,
            justifyContent: collapsed ? 'center' : 'initial',
            px: 2.5,
            color: selected ? theme.palette.primary.contrastText : theme.palette.text.primary,
            '& .MuiListItemIcon-root': {
                color: selected ? theme.palette.primary.contrastText : theme.palette.action.active,
            },
        }),
        listItemIcon: (collapsed: boolean) => ({
            minWidth: 0,
            mr: collapsed ? 'auto' : 3,
            justifyContent: 'center',
        }),
        listItemText: (collapsed: boolean) => ({
            opacity: collapsed ? 0 : 1,
            display: collapsed ? 'none' : 'block',
        }),
    };

    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [drawerCollapsed, setDrawerCollapsed] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);

    const isUserMenuOpen = Boolean(anchorEl);
    const isNotificationMenuOpen = Boolean(notificationAnchorEl);

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const activeConversation = useSelector((state: RootState) => state.chat.activeConversation);

    const currentDrawerWidth = useMemo(() => drawerCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH, [drawerCollapsed]);

    useEffect(() => {
        dispatch(setIsOptimistic({ isOptimistic: true }));
    }, [dispatch, accessToken, user?._id, activeConversation]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(appRoutes.LOGIN);
        } else {
            // dispatch(GetConversations());
            // dispatch(GetOnlineFriends());
        }
        // if (isAuthenticated) {
        //     socketManager.connect(accessToken);
        // }
        // return () => {
        //     socketManager.disconnect();
        // }
    }, [isAuthenticated, dispatch, navigate]);

    const handleDrawerClose = useCallback(() => {
        setIsClosing(true);
        setMobileOpen(false);
    }, []);

    const handleDrawerTransitionEnd = useCallback(() => {
        setIsClosing(false);
    }, []);

    const handleDrawerToggle = useCallback(() => {
        if (!isClosing) {
            setMobileOpen((prev) => !prev);
        }
    }, [isClosing]);

    const handleDrawerCollapse = useCallback(() => {
        setDrawerCollapsed((prev) => !prev);
    }, []);

    const handleAvatarClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleNotificationsClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    }, []);

    const handleNotificationsClose = useCallback(() => {
        setNotificationAnchorEl(null);
    }, []);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleLogout = useCallback(() => {
        dispatch(authActions.logoutUser(navigate));
    }, [dispatch, navigate]);


    return (
        <>
            <Box sx={styles.layoutWrapper}>
                <CssBaseline />
                <CustomDrawer
                    location={location.pathname}
                    collapsed={drawerCollapsed}
                    handleDrawerCollapse={handleDrawerCollapse}
                />
                <Box id="layout-container" sx={styles.layoutContainer}>
                    <Box sx={styles.layoutHeader}>
                        <Box sx={styles.headerRow}>
                            <Box sx={styles.headerLeft}>
                                <Typography variant="h6" noWrap component="div">
                                    Welcome {user?.fullname || 'Guest'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {"Manage and monitor teacher performance and profiles."}
                                </Typography>
                            </Box>


                            <Box display="flex" alignItems="center" gap={2} >
                                <IconButton>
                                    <Badge color="error" variant="dot">
                                        <NotificationsNoneIcon />
                                    </Badge>
                                </IconButton>

                                <Box display="flex" alignItems="center" gap={1}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "#2ecc71",
                                            width: 36,
                                            height: 36,
                                            fontSize: 14,
                                        }}
                                        onClick={handleAvatarClick}
                                    >

                                    </Avatar>
                                    <Typography variant="body2" fontWeight={500}>
                                        {/* {name} */}
                                    </Typography>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={isUserMenuOpen}
                                        onClose={handleMenuClose}
                                        PaperProps={{
                                            sx: {
                                                width: '200px',
                                                maxWidth: 'calc(100% - 48px)',
                                            },
                                        }}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            navigate(appRoutes.PROFILE);
                                        }}>Profile</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            navigate(appRoutes.SETTINGS);
                                        }}>Settings</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            navigate(appRoutes.FEATURE_FLAGS);
                                        }}>Feature control</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleMenuClose();
                                            handleLogout();
                                        }}>Logout</MenuItem>
                                    </Menu>
                                    <Menu
                                        anchorEl={notificationAnchorEl}
                                        open={isNotificationMenuOpen}
                                        onClose={handleNotificationsClose}
                                        PaperProps={{
                                            sx: {
                                                width: '200px',
                                                maxWidth: 'calc(100% - 48px)',
                                            },
                                        }}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                    >
                                        <MenuItem onClick={() => {
                                            handleNotificationsClose();
                                            navigate(appRoutes.NOTIFICATIONS);
                                        }}>Notifications</MenuItem>
                                        <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box component="main" sx={styles.pageWrapper}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    );
}

interface CustomDrawerProps {
    location: string;
    collapsed: boolean;
    handleDrawerCollapse: () => void;
    handleDrawerClose?: () => void;
}

enum SideBarState {
    EXPANDED = 1,
    COLLAPSED,
}

/**
 * CustomDrawer component renders the side navigation drawer with application routes based on the user's role.
 *
 * @param {CustomDrawerProps} props - The props object containing the current location pathname, collapsed state, and toggle function.
 * @returns {JSX.Element} The rendered drawer with navigation links.
 */
const CustomDrawer = React.memo(({ location, collapsed, handleDrawerCollapse, handleDrawerClose }: CustomDrawerProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const Permissions = useSelector((state: RootState) => state.auth.permissions);

    const [sideBarState, setSideBarState] = React.useState<SideBarState>(SideBarState.EXPANDED);

    const { sidebarItems, activeItem, activeItemPath, isItemActive } = useSidebarItems();



    const menuRoutes = useMemo(() => {
        return getSidebarRoutes(user?.role, Permissions);
    }, [user?.role, Permissions]);


    const toggleSideBar = () => {
        setTimeout(() => {
            if (sideBarState === SideBarState.EXPANDED) {
                setSideBarState(SideBarState.COLLAPSED)
                document.getElementById("layout-container")?.removeAttribute("style")
            }
            else if (sideBarState === SideBarState.COLLAPSED) {
                setSideBarState(SideBarState.EXPANDED)
                document.getElementById("layout-container")?.removeAttribute("style")
            }
        }, 150)
    }

    const handleNavigationClick = useCallback((path: string) => {
        if (path !== appRoutes.ROOT) {
            navigate(path);
        }
        if (handleDrawerClose) {
            handleDrawerClose();
        }
    }, [navigate, handleDrawerClose]);

    return (
        <>
            <Box sx={{ height: '100%', position: "relative", }} id="side-nav" className={`side-nav-bar ${SideBarState[sideBarState].toLowerCase()}`}>
                <Toolbar sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    px: 2,
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: collapsed ? 'center' : 'flex-start',
                        flex: 1,
                    }}>
                        <SchoolIcon
                            sx={{
                                fontSize: 40,
                                color: theme.palette.primary.main,
                                ...(collapsed && { ml: 0 })
                            }}
                        />
                        {
                            sideBarState !== SideBarState.COLLAPSED &&
                            <Typography
                                variant="h5"
                                sx={{
                                    color: theme.palette.primary.main,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    mr: 1,
                                }}
                            >
                                Scholar Sync
                            </Typography>
                        }


                    </Box>
                </Toolbar>
                <Divider />
                <List sx={{ flexGrow: 1, gap: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {menuRoutes.map((route) => {
                        const IconComponent = route.metadata?.icon
                        return (
                            <ListItem
                                key={route.id}
                                disablePadding
                                sx={{
                                    width: '80%',
                                    backgroundColor: location === route.path ? theme.palette.action.selected : 'inherit',
                                    // paddingX: '10px',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        borderRadius: '10px',
                                        backgroundColor: location === route.path ? theme.palette.action.selected : theme.palette.action.hover,
                                    },
                                }}
                            >
                                <Tooltip
                                    title={collapsed ? route.label : ''}
                                    placement="right"
                                    arrow
                                    disableHoverListener={!collapsed}
                                >
                                    <ListItemButton
                                        onClick={() => handleNavigationClick(route.path)}
                                        sx={{
                                            minHeight: 10,
                                            height: 40,
                                            justifyContent: sideBarState === SideBarState.COLLAPSED ? 'center' : 'initial',
                                            px: 2.5,
                                            color: location === route.path ? theme.palette.primary.contrastText : theme.palette.text.primary,
                                            '& .MuiListItemIcon-root': {
                                                color: location === route.path ? theme.palette.primary.contrastText : theme.palette.action.active,
                                            },
                                        }}
                                        selected={location === route.path}
                                        aria-current={location === route.path ? 'page' : undefined}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {
                                                IconComponent && <IconComponent fontSize="medium" sx={{ color: theme.palette.primary.main, mr: 1 }} />
                                            }
                                        </ListItemIcon>
                                        {
                                            sideBarState !== SideBarState.COLLAPSED && <ListItemText
                                                primary={route.label}
                                                sx={{
                                                    color: theme.palette.primary.main,
                                                }}
                                            />
                                        }

                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        );
                    })}
                </List>
                <Box className={`sidebar-icon ${sideBarState === SideBarState.COLLAPSED ? "collapse" : "expand"}`} onClick={toggleSideBar}>
                    {sideBarState === SideBarState.COLLAPSED ? (
                        <ArrowForwardIosIcon />
                    ) : (
                        <ArrowBackIosIcon />
                    )}
                </Box>
            </Box>
        </>
    );
});