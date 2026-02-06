/**
 * MainLayout module.
 *
 * This file contains the MainLayout React component, which provides the main application layout for ScholarSync.
 * It includes the AppBar, side navigation drawer, and main content area, and manages authentication, socket initialization, and user menu interactions.
 *
 * @module MainLayout
 */
import Toolbar from '@mui/material/Toolbar';
import { AppDispatch, RootState } from '../redux/store';
import appRoutes from '../routes/routePaths';
import { authActions } from '../redux/actions/auth.actions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { setIsOptimistic } from '@redux/slices/chat.slice';
import { GetConversations } from '@redux/actions/chat.actions'; // GetMessages removed as it was unused
import { GetOnlineFriends } from '@redux/actions/userActions';
import { useSocketManager } from '@hooks/usesocket';
import { getSidebarRoutes } from '@utils/routes.utills';
import { useRouteGuard } from '@hooks/useRouteGuard';
import { useSidebarItems } from '@hooks/useSidebarItems';
import { socketManager } from '../services/socketManager';
import DashboardHeader from './DashboardHeader';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Box,
    CssBaseline,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Badge,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Tooltip,
    alpha,
    useTheme,
    Theme,
    Paper,
    Chip,
    Stack,
} from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Icons
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SchoolIcon from '@mui/icons-material/School';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import FlagIcon from '@mui/icons-material/Flag';

const DRAWER_WIDTH = 260;
const COLLAPSED_DRAWER_WIDTH = 80;

const styles = {
    layoutWrapper: {
        display: 'flex',
        height: '100vh',
        flexFlow: 'row nowrap',
        position: 'relative',
        backgroundColor: (theme: Theme) => alpha(theme.palette.background.default, 0.95),
    },
    layoutContainer: {
        height: '100%',
        width: '-webkit-fill-available',
        flexGrow: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
    },
    layoutHeader: (theme: Theme) => ({
        width: '100%',
        minHeight: '80px',
        paddingX: 4,
        paddingY: 1,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.05)}`,
        zIndex: 1,
    }),
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    pageWrapper: (theme: Theme) => ({
        flexGrow: 1,
        padding: 1.5,
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: alpha(theme.palette.divider, 0.05),
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.primary.main, 0.3),
            borderRadius: '4px',
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.5),
            },
        },
    }),
};

enum SideBarState {
    EXPANDED = 1,
    COLLAPSED,
}

interface CustomDrawerProps {
    location: string;
    collapsed: boolean;
    handleDrawerCollapse: () => void;
    handleDrawerClose?: () => void;
}

const CustomDrawer = React.memo(({ location, collapsed, handleDrawerCollapse }: CustomDrawerProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.auth.user);
    const Permissions = useSelector((state: any) => state.auth.permissions);

    const [sideBarState, setSideBarState] = useState<SideBarState>(SideBarState.EXPANDED);

    // Mock menu routes - replace with your actual routes
    const menuRoutes = useMemo(() => {
        return getSidebarRoutes(user?.role, Permissions);
        // return []; // Replace with actual routes

    }, [user?.role, Permissions]);

    const toggleSideBar = () => {
        setTimeout(() => {
            setSideBarState((prev) =>
                prev === SideBarState.EXPANDED ? SideBarState.COLLAPSED : SideBarState.EXPANDED
            );
            document.getElementById('layout-container')?.removeAttribute('style');
        }, 150);
    };

    const handleNavigationClick = useCallback(
        (path: string) => {
            navigate(path);
        },
        [navigate]
    );

    return (
        <Box
            sx={{
                width: sideBarState === SideBarState.COLLAPSED ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
                height: '100%',
                position: 'relative',
                background: `linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.98)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                backdropFilter: 'blur(20px)',
                borderRight: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: `4px 0 20px ${alpha(theme.palette.common.black, 0.08)}`,
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                zIndex: 10,
            }}
        >
            {/* Logo Section */}
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: sideBarState === SideBarState.COLLAPSED ? 'center' : 'flex-start',
                    px: 3,
                    py: 2.5,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '12px',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                >
                    <SchoolIcon sx={{ fontSize: 28, color: 'white' }} />
                </Box>
                {sideBarState !== SideBarState.COLLAPSED && (
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.primary.main,
                            fontWeight: 700,
                            whiteSpace: 'nowrap',
                            letterSpacing: '-0.5px',
                        }}
                    >
                        Scholar Sync
                    </Typography>
                )}
            </Toolbar>

            <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.1) }} />

            {/* Navigation Items */}
            <List
                sx={{
                    flexGrow: 1,
                    gap: 0.5,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    px: 2,
                    py: 2,
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                        borderRadius: '3px',
                    },
                }}
            >
                {menuRoutes.map((route: any) => {
                    const IconComponent = route.metadata?.icon;
                    const isActive = location === route.path;

                    return (
                        <ListItem key={route.id} disablePadding sx={{ mb: 0.5 }}>
                            <Tooltip
                                title={sideBarState === SideBarState.COLLAPSED ? route.label : ''}
                                placement="right"
                                arrow
                                disableHoverListener={sideBarState !== SideBarState.COLLAPSED}
                            >
                                <ListItemButton
                                    onClick={() => handleNavigationClick(route.path)}
                                    sx={{
                                        minHeight: 48,
                                        borderRadius: '12px',
                                        px: 2,
                                        justifyContent: sideBarState === SideBarState.COLLAPSED ? 'center' : 'flex-start',
                                        backgroundColor: isActive
                                            ? alpha(theme.palette.primary.main, 0.12)
                                            : 'transparent',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&::before': isActive
                                            ? {
                                                content: '""',
                                                position: 'absolute',
                                                left: 0,
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                width: '4px',
                                                height: '60%',
                                                backgroundColor: theme.palette.primary.main,
                                                borderRadius: '0 4px 4px 0',
                                            }
                                            : {},
                                        '&:hover': {
                                            backgroundColor: isActive
                                                ? alpha(theme.palette.primary.main, 0.15)
                                                : alpha(theme.palette.action.hover, 0.8),
                                            transform: 'translateX(4px)',
                                        },
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: sideBarState === SideBarState.COLLAPSED ? 0 : 2.5,
                                            justifyContent: 'center',
                                            color: isActive
                                                ? theme.palette.primary.main
                                                : theme.palette.text.secondary,
                                        }}
                                    >
                                        {IconComponent && <IconComponent fontSize="medium" />}
                                    </ListItemIcon>
                                    {sideBarState !== SideBarState.COLLAPSED && (
                                        <ListItemText
                                            primary={route.label}
                                            primaryTypographyProps={{
                                                fontWeight: isActive ? 600 : 500,
                                                fontSize: '0.9rem',
                                                color: isActive
                                                    ? theme.palette.primary.main
                                                    : theme.palette.text.primary,
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    );
                })}
            </List>

            {/* Collapse Toggle Button */}
            <Box
                sx={{
                    p: 2,
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
            >
                <IconButton
                    onClick={toggleSideBar}
                    sx={{
                        width: '100%',
                        height: 44,
                        borderRadius: '12px',
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.15),
                            transform: 'scale(1.02)',
                        },
                    }}
                >
                    {sideBarState === SideBarState.COLLAPSED ? (
                        <ArrowForwardIosIcon
                            sx={{ fontSize: 18, color: theme.palette.primary.main }}
                        />
                    ) : (
                        <ArrowBackIosIcon
                            sx={{ fontSize: 18, color: theme.palette.primary.main }}
                        />
                    )}
                </IconButton>
            </Box>
        </Box>
    );
});

export default function MainLayout() {

    useRouteGuard();
    useSocketManager();

    const theme = useTheme();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const location = useLocation();

    const [drawerCollapsed, setDrawerCollapsed] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

    const isUserMenuOpen = Boolean(anchorEl);
    const isNotificationMenuOpen = Boolean(notificationAnchorEl);

    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const user = useSelector((state: any) => state.auth.user);

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);
    const activeConversation = useSelector((state: RootState) => state.chat.activeConversation);

    useEffect(() => {
        dispatch(setIsOptimistic({ isOptimistic: true }));
    }, [dispatch, accessToken, user?._id, activeConversation]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(appRoutes.LOGIN);
        } else {
            dispatch(GetConversations());
            dispatch(GetOnlineFriends());
        }
        // if (isAuthenticated) {
        //     socketManager.connect(accessToken);
        // }
        // return () => {
        //     socketManager.disconnect();
        // }
    }, [isAuthenticated, dispatch]);

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
        <Box sx={styles.layoutWrapper}>
            <CssBaseline />
            <CustomDrawer
                location={location.pathname}
                collapsed={drawerCollapsed}
                handleDrawerCollapse={handleDrawerCollapse}
            />
            <Box id="layout-container" sx={styles.layoutContainer}>
                {/* Header */}
                <Box sx={styles.layoutHeader}>
                    <Box sx={styles.headerRow}>
                        {/* Left Section - Welcome Message */}
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 0.5,
                                }}
                            >
                                Welcome back, {user?.fullname || 'Guest'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                Manage and monitor teacher performance and profiles
                            </Typography>
                        </Box>

                        {/* Right Section - Actions */}
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            {/* Notifications */}
                            <Tooltip title="Notifications" arrow>
                                <IconButton
                                    onClick={handleNotificationsClick}
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: '12px',
                                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.palette.background.paper,
                                            borderColor: theme.palette.primary.main,
                                            transform: 'translateY(-2px)',
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                                        },
                                    }}
                                >
                                    <Badge
                                        variant="dot"
                                        color="error"
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                top: 4,
                                                right: 4,
                                            },
                                        }}
                                    >
                                        <NotificationsNoneIcon fontSize="small" />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            <Divider orientation="vertical" flexItem sx={{ my: 1 }} />

                            {/* User Profile */}
                            <Box
                                onClick={handleAvatarClick}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1.5,
                                    padding: '6px 12px 6px 6px',
                                    borderRadius: '12px',
                                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: theme.palette.background.paper,
                                        borderColor: theme.palette.primary.main,
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.2)}`,
                                    },
                                }}
                            >
                                <Avatar
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                        fontSize: 14,
                                        fontWeight: 600,
                                        boxShadow: `0 2px 8px ${alpha(theme.palette.primary.main, 0.3)}`,
                                    }}
                                >
                                    {user?.fullname?.charAt(0) || 'G'}
                                </Avatar>
                                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                                        {user?.fullname || 'Guest User'}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {user?.role || 'User'}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                {/* Main Content Area */}
                <Box component="main" sx={styles.pageWrapper}>
                    <Outlet />
                </Box>
            </Box>

            {/* User Menu */}
            <Menu
                anchorEl={anchorEl}
                open={isUserMenuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        minWidth: 220,
                        mt: 1,
                        borderRadius: '12px',
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        '& .MuiMenuItem-root': {
                            borderRadius: '8px',
                            mx: 1,
                            my: 0.5,
                            px: 2,
                            gap: 1.5,
                            fontSize: '0.9rem',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate(appRoutes.PROFILE);
                }}>
                    <PersonIcon fontSize="small" color="primary" />
                    Profile
                </MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate(appRoutes.SETTINGS);
                }}>
                    <SettingsIcon fontSize="small" color="primary" />
                    Settings
                </MenuItem>
                <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate(appRoutes.FEATURE_FLAGS);
                }}>
                    <FlagIcon fontSize="small" color="primary" />
                    Feature Control
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" color="error" />
                    <Typography color="error.main">Logout</Typography>
                </MenuItem>
            </Menu>

            {/* Notifications Menu */}
            <Menu
                anchorEl={notificationAnchorEl}
                open={isNotificationMenuOpen}
                onClose={handleNotificationsClose}
                PaperProps={{
                    sx: {
                        minWidth: 320,
                        maxWidth: 400,
                        mt: 1,
                        borderRadius: '12px',
                        boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
                    <Typography variant="h6" fontWeight={600}>
                        Notifications
                    </Typography>
                </Box>
                <Box sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        No new notifications
                    </Typography>
                </Box>
            </Menu>
        </Box>
    );
}