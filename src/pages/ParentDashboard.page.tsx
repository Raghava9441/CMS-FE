import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Avatar,
    Card,
    CardContent,
    Chip,
    LinearProgress,
    IconButton,
    useTheme,
    alpha,
    Divider,
    Stack,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import {
    Person as PersonIcon,
    School as SchoolIcon,
    Assignment as AssignmentIcon,
    CalendarToday as CalendarIcon,
    Event as EventIcon,
    Announcement as AnnouncementIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    TrendingUp as TrendingUpIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { parentApi } from '@api/api';
import {
    ParentDashboardData,
    ParentInfo,
    Child,
    ChildStats,
    UpcomingEvent,
    Announcement,
} from '../types/dashboard.types';
import parentDashboardMock from '../Mock Data/parent-dashboard.json';

const ParentDashboardPage: React.FC = () => {
    const theme = useTheme();
    const [dashboardData, setDashboardData] = useState<ParentDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = () => {
        parentApi.getDashboardData().then((res) => {
            console.log("🚀 ~ Parent Dashboard Data:", res.data);
            setDashboardData(res.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setDashboardData(parentDashboardMock.data);
        });
    };

    if (loading) {
        return <ParentDashboardSkeleton />;
    }

    if (!dashboardData) {
        return null;
    }

    const { parentInfo, children, childrenStats, upcomingEvents, announcements } = dashboardData;

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                {/* Header Section */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: 'white',
                        borderRadius: 3,
                    }}
                >
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Avatar
                                src={parentInfo.image}
                                alt={parentInfo.name}
                                sx={{ width: 80, height: 80, border: '4px solid rgba(255,255,255,0.3)' }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {parentInfo.name}
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip
                                    label={parentInfo.relationship}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                                />
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    {parentInfo.email}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>
                            <IconButton
                                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                                onClick={fetchDashboardData}
                            >
                                <RefreshIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Children Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {childrenStats.map((child, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Card
                                elevation={0}
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    background: 'white',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[8],
                                    },
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Avatar
                                                src={children.find(c => c.studentId === child.studentId)?.image}
                                                alt={child.name}
                                                sx={{ width: 60, height: 60 }}
                                            />
                                            <Box>
                                                <Typography variant="h6" fontWeight="bold">
                                                    {child.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {children.find(c => c.studentId === child.studentId)?.class}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Chip
                                            label={child.averageGrade}
                                            sx={{
                                                bgcolor: child.averageGrade.startsWith('A') ? alpha('#4caf50', 0.1) :
                                                    child.averageGrade.startsWith('B') ? alpha('#2196f3', 0.1) :
                                                        child.averageGrade.startsWith('C') ? alpha('#ff9800', 0.1) :
                                                            alpha('#f44336', 0.1),
                                                color: child.averageGrade.startsWith('A') ? '#4caf50' :
                                                    child.averageGrade.startsWith('B') ? '#2196f3' :
                                                        child.averageGrade.startsWith('C') ? '#ff9800' :
                                                            '#f44336',
                                            }}
                                        />
                                    </Box>

                                    <Box sx={{ mb: 3 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Attendance Rate
                                            </Typography>
                                            <Typography variant="body2" fontWeight="bold" color="primary">
                                                {child.attendanceRate}
                                            </Typography>
                                        </Box>
                                        <LinearProgress
                                            variant="determinate"
                                            value={parseFloat(child.attendanceRate)}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: alpha('#4caf50', 0.1),
                                                '& .MuiLinearProgress-bar': {
                                                    bgcolor: '#4caf50',
                                                    borderRadius: 4,
                                                },
                                            }}
                                        />
                                    </Box>

                                    <Stack spacing={2}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 20 }} />
                                                <Typography variant="body2">Total Absents</Typography>
                                            </Box>
                                            <Typography variant="h6" fontWeight="bold">
                                                {child.totalAbsents}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider sx={{ my: 3 }} />

                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                            Recent Performances
                                        </Typography>
                                        <List dense>
                                            {child.recentPerformances.map((performance, perfIndex) => (
                                                <ListItem key={perfIndex}>
                                                    <ListItemIcon>
                                                        <AssignmentIcon sx={{ fontSize: 18 }} />
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={performance.subject}
                                                        secondary={
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                                <Chip
                                                                    label={performance.grade}
                                                                    size="small"
                                                                    sx={{
                                                                        bgcolor: performance.grade.startsWith('A') ? alpha('#4caf50', 0.1) :
                                                                            performance.grade.startsWith('B') ? alpha('#2196f3', 0.1) :
                                                                                performance.grade.startsWith('C') ? alpha('#ff9800', 0.1) :
                                                                                    alpha('#f44336', 0.1),
                                                                        color: performance.grade.startsWith('A') ? '#4caf50' :
                                                                            performance.grade.startsWith('B') ? '#2196f3' :
                                                                                performance.grade.startsWith('C') ? '#ff9800' :
                                                                                    '#f44336',
                                                                    }}
                                                                />
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {new Date(performance.date).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                    })}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {/* Upcoming Events */}
                    <Grid item xs={12} lg={6}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Upcoming Events
                                    </Typography>
                                    <EventIcon color="primary" />
                                </Box>

                                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    {upcomingEvents.map((event, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                borderRadius: 2,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                                    transform: 'translateX(4px)',
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                <EventIcon sx={{ color: theme.palette.primary.main }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={event.title}
                                                secondary={
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {new Date(event.date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {event.time}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {event.location}
                                                        </Typography>
                                                        {event.description && (
                                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                                {event.description}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Announcements */}
                    <Grid item xs={12} lg={6}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Announcements
                                    </Typography>
                                    <AnnouncementIcon color="primary" />
                                </Box>

                                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    {announcements.map((announcement, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                mb: 2,
                                                p: 2,
                                                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                                                borderRadius: 2,
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                                    transform: 'translateX(4px)',
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                <AnnouncementIcon sx={{ color: theme.palette.secondary.main }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={announcement.title}
                                                secondary={
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {announcement.content}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                                            by {announcement.author} on{' '}
                                                            {new Date(announcement.createdAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                            })}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const ParentDashboardSkeleton: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Skeleton variant="rectangular" height={150} sx={{ mb: 4, borderRadius: 3 }} />
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[...Array(2)].map((_, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={3}>
                    {[...Array(2)].map((_, index) => (
                        <Grid item xs={12} lg={6} key={index}>
                            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ParentDashboardPage;
