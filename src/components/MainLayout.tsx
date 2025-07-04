import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Avatar, Menu, MenuItem, Theme, useTheme } from '@mui/material';
import { routesWithSideMenu } from '../routes';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import appRoutes from '../routes/routePaths';
import { authActions } from '../redux/actions/auth.actions';
import SchoolIcon from '@mui/icons-material/School';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { connectSocket, socket } from '@utils/socket';
import { setIsOptimistic, updateMsgConvo, updateTypingConvo } from '@redux/slices/chat.slice';
import { ShowSnackbar, updateOnlineUsers } from '@redux/slices/authSlice';
import { GetConversations, GetMessages } from '@redux/actions/chat.actions';
import { GetOnlineFriends } from '@redux/actions/userActions';
import { useSocketManager } from '@hooks/useSocket';

const drawerWidth = 240;


export default function MainLayout() {
    const theme = useTheme();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isauthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const {
        activeConversation,

    } = useSelector((state: RootState) => state.chat);
    useSocketManager();

    useEffect(() => {
        // Set optimistic approach
        dispatch(setIsOptimistic({ isOptimistic: true }));
        // // Initialize socket connection
        // if (!socket || !socket.connected) {
        //     console.log("Initializing socket connection...");
        //     connectSocket(accessToken);
        // }

        // // Socket event listeners
        // if (socket) {
        //     // Connection established
        //     socket.on("connect", () => {
        //         console.log("Socket connected successfully");

        //         // Emit user online status
        //         socket.emit("user_online", { user_id: user?._id });

        //         // Sync messages for active conversation after reconnect
        //         if (activeConversation) {
        //             console.log("Syncing messages for active conversation:", activeConversation._id);
        //             dispatch(GetMessages(activeConversation._id));
        //         }
        //     });

        //     // Test server communication
        //     socket.on("connection_established", (data) => {
        //         console.log("Received response from server:", data);
        //         dispatch(
        //             ShowSnackbar({
        //                 severity:  "success",
        //                 message: `connection_established`,
        //             })
        //         );
        //     });

        //     // Handle connection errors
        //     socket.on("connect_error", (error) => {
        //         console.error("Socket connection error:", error);
        //         dispatch(
        //             ShowSnackbar({
        //                 severity: "error",
        //                 message: `Connection failed: ${error.message}`,
        //             })
        //         );
        //     });

        //     // Handle general socket errors
        //     socket.on("error", (error) => {
        //         console.error("Socket error:", error);
        //         dispatch(
        //             ShowSnackbar({
        //                 severity: error.status || "error",
        //                 message: `Socket error: ${error.message}`,
        //             })
        //         );
        //     });

        //     // CRITICAL: Handle incoming messages
        //     socket.on("message_received", (message) => {
        //         console.log("📨 New message received:", message);

        //         // Update the conversation with the new message
        //         dispatch(updateMsgConvo(message));

        //         // Optional: Show notification for new messages
        //         if (message.sender._id !== user?._id) {
        //             // This is a message from someone else
        //             dispatch(
        //                 ShowSnackbar({
        //                     severity: "info",
        //                     message: `New message from ${message.sender.firstName}`,
        //                 })
        //             );
        //         }
        //     });

            

        //     // Handle message errors
        //     socket.on("message_error", (error) => {
        //         console.error("❌ Message error:", error);
        //         dispatch(
        //             ShowSnackbar({
        //                 severity: "error",
        //                 message: `Failed to send message: ${error.error}`,
        //             })
        //         );
        //         // You can update UI to show message as failed
        //         // dispatch(updateMessageStatus({ tempId: error.tempId, status: 'failed' }));
        //     });

        //     // Handle online friends updates
        //     socket.on("online_friends", (friend) => {
        //         console.log("👥 Online friends update:", friend);
        //         dispatch(updateOnlineUsers(friend));
        //     });

        //     // Handle typing indicators
        //     socket.on("start_typing", (typingData) => {
        //         console.log("✏️ User started typing:", typingData);
        //         dispatch(updateTypingConvo({
        //             ...typingData,
        //             isTyping: true
        //         }));
        //     });

        //     socket.on("stop_typing", (typingData) => {
        //         console.log("✏️ User stopped typing:", typingData);
        //         dispatch(updateTypingConvo({
        //             ...typingData,
        //             isTyping: false
        //         }));
        //     });

        //     // Handle message synchronization (for offline messages)
        //     socket.on("message_sync", (messages) => {
        //         console.log("🔄 Syncing messages:", messages);
        //         if (Array.isArray(messages)) {
        //             messages.forEach(message => {
        //                 dispatch(updateMsgConvo(message));
        //             });
        //         } else {
        //             dispatch(updateMsgConvo(messages));
        //         }
        //     });

        //     // Cleanup function
        //     return () => {
        //         console.log("Cleaning up socket listeners");
        //         if (socket) {
        //             socket.off("connect");
        //             socket.off("connection_established");
        //             socket.off("connect_error");
        //             socket.off("error");
        //             socket.off("message_received");
        //             socket.off("message_error");
        //             socket.off("online_friends");
        //             socket.off("start_typing");
        //             socket.off("stop_typing");
        //             socket.off("message_sync");
        //         }
        //     };
        // }
    }, [accessToken, socket, user?._id, activeConversation]);




    useEffect(() => {
        const checkAuthentication = () => {
            if (!isauthenticated) {
                navigate(appRoutes.LOGIN);
            } else {
                dispatch(GetConversations());

                // get online friends
                dispatch(GetOnlineFriends());
            }
        };
        checkAuthentication();
    }, [isauthenticated]);


    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setNotificationAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getSlideDirection = (theme: Theme) => {
        return theme.direction === 'rtl' ? 'right' : 'left';
    };
    const handleLogout = () => {
        dispatch(authActions.logoutUser(navigate));
    };




    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar
                position="absolute"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            welcome {user?.fullname}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <IconButton
                                color="inherit"
                                aria-label="user menu"
                                edge="start"
                                onClick={handleNotificationsClick}
                                sx={{ paddingRight: '2rem' }}
                            >
                                <NotificationsIcon />
                            </IconButton>
                            <IconButton
                                color="inherit"
                                aria-label="user menu"
                                edge="start"
                                onClick={handleAvatarClick}
                                sx={{ padding: '0px' }}
                            >
                                <Avatar />
                            </IconButton>
                        </Box>
                        {/* Avatar dropdown menu */}
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            PaperProps={{
                                sx: {
                                    width: '200px',
                                    maxWidth: 'calc(100% - 48px)',
                                },
                            }}
                        >
                            <MenuItem onClick={() => {
                                handleMenuClose();
                                navigate('/profile');
                            }}>Profile</MenuItem>
                            <MenuItem onClick={() => {
                                handleMenuClose();
                                navigate('/settings');
                            }}>Settings</MenuItem>
                            <MenuItem onClick={() => {
                                handleMenuClose();
                                handleLogout()
                            }}>Logout</MenuItem>
                        </Menu>
                        {/* Notification menu */}
                        <Menu
                            anchorEl={notificationAnchorEl}
                            open={Boolean(notificationAnchorEl)}
                            onClose={handleNotificationsClose}
                            PaperProps={{
                                sx: {
                                    width: '200px',
                                    maxWidth: 'calc(100% - 48px)',
                                },
                            }}
                        >
                            <MenuItem onClick={() => {
                                handleNotificationsClose();
                                navigate('/notifications');
                            }}>Notifications</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    anchor={theme.direction === 'rtl' ? 'left' : 'right'}
                    SlideProps={{ direction: getSlideDirection(theme) }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <CustomDrawer location={location.pathname} />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        zIndex: -1,
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <CustomDrawer location={location.pathname} />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, height: '90vh', flexGrow: 1 }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}



const CustomDrawer = ({ location }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                    <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>ScholarSync</Typography>
                    <SchoolIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {routesWithSideMenu(user?.role).filter(route => route.authenticationRequired && route.isSideMenu).map((route) => (
                    <ListItem
                        key={route.id}
                        disablePadding
                        sx={{
                            backgroundColor: route.path === location ? theme.palette.primary.main : 'inherit',
                        }}
                    >
                        <ListItemButton onClick={() => route.path !== '/' && navigate(route.path)}>
                            <ListItemIcon>
                                {route.id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={route.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </>
    );
}