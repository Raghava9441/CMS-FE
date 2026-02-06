
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
} from '@mui/material';
import {
    People as PeopleIcon,
    School as SchoolIcon,
    Person as PersonIcon,
    Class as ClassIcon,
    MenuBook as MenuBookIcon,
    Business as BusinessIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    EventAvailable as EventAvailableIcon,
    TrendingUp as TrendingUpIcon,
    CalendarMonth as CalendarIcon,
    Assignment as AssignmentIcon,
    Event as EventIcon,
    Male as MaleIcon,
    Female as FemaleIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { orgAdminApi } from '@api/api';

// Types
interface Organization {
    id: string;
    name: string;
    category: string;
    contactEmail: string;
    logo: string;
}

interface Summary {
    totalUsers: number;
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    totalCourses: number;
    totalDepartments: number;
    activeUsers: number;
    inactiveUsers: number;
}

interface Attendance {
    present: number;
    absent: number;
    excused: number;
}

interface Exam {
    _id: string;
    startDate: string;
    classId: { name: string };
    courseId: { name: string };
    teacherId: { firstName: string; lastName: string };
}

interface Event {
    _id: string;
    title: string;
    date: string;
    organizer: { fullname: string };
}

interface DashboardData {
    role: string;
    organization: Organization;
    summary: Summary;
    genderDistribution: { [key: string]: number };
    todayAttendance: Attendance;
    upcomingExams: Exam[];
    recentEvents: Event[];
    lastUpdated: string;
}

const DashboardPage: React.FC = () => {
    const theme = useTheme();
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData()
    }, []);

    const fetchDashboardData = () => {
        orgAdminApi.getDashboardData().then((res) => {
            console.log("🚀 ~ res:", res.data)
            setDashboardData(res.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setDashboardData(sampleData);
        });
    }

    const sampleData: DashboardData = {
        role: "ORGADMIN",
        organization: {
            id: "683014eba57fcbd9a0eba79b",
            name: "Leffler LLC",
            category: "Education",
            contactEmail: "contact_leffler29@frizzy-flood.info",
            logo: "https://picsum.photos/seed/bkxdvddQB/128/128?blur=1"
        },
        summary: {
            totalUsers: 51,
            totalStudents: 20,
            totalTeachers: 10,
            totalClasses: 20,
            totalCourses: 10,
            totalDepartments: 4,
            activeUsers: 45,
            inactiveUsers: 6
        },
        genderDistribution: { male: 28, female: 23 },
        todayAttendance: {
            present: 156,
            absent: 12,
            excused: 8
        },
        upcomingExams: [],
        recentEvents: [],
        lastUpdated: "2026-02-05T16:20:44.441Z"
    };

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (!dashboardData) {
        return null;
    }

    const { organization, summary, genderDistribution, todayAttendance } = dashboardData;

    // Prepare chart data
    const attendanceData = [
        { name: 'Present', value: todayAttendance.present, color: '#4caf50' },
        { name: 'Absent', value: todayAttendance.absent, color: '#f44336' },
        { name: 'Excused', value: todayAttendance.excused, color: '#ff9800' },
    ];

    const genderData = Object.entries(genderDistribution).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        value: value as number,
        color: key === 'male' ? '#2196f3' : key === 'female' ? '#e91e63' : '#9e9e9e'
    }));

    const userActivityData = [
        { name: 'Active', value: summary.activeUsers, color: '#4caf50' },
        { name: 'Inactive', value: summary.inactiveUsers, color: '#9e9e9e' },
    ];

    const statsData = [
        { label: 'Total Users', value: summary.totalUsers, icon: PeopleIcon, color: '#1976d2', trend: '+12%' },
        { label: 'Students', value: summary.totalStudents, icon: SchoolIcon, color: '#9c27b0', trend: '+8%' },
        { label: 'Teachers', value: summary.totalTeachers, icon: PersonIcon, color: '#f57c00', trend: '+5%' },
        { label: 'Classes', value: summary.totalClasses, icon: ClassIcon, color: '#0288d1', trend: '+15%' },
        { label: 'Courses', value: summary.totalCourses, icon: MenuBookIcon, color: '#388e3c', trend: '+10%' },
        { label: 'Departments', value: summary.totalDepartments, icon: BusinessIcon, color: '#d32f2f', trend: '0%' },
    ];

    const totalAttendance = todayAttendance.present + todayAttendance.absent + todayAttendance.excused;
    const attendanceRate = totalAttendance > 0 ? (todayAttendance.present / totalAttendance) * 100 : 0;

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
                                src={organization.logo}
                                alt={organization.name}
                                sx={{ width: 80, height: 80, border: '4px solid rgba(255,255,255,0.3)' }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {organization.name}
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip
                                    label={organization.category}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                                />
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    {organization.contactEmail}
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

                {/* Stats Grid */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statsData.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
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
                                        <Box
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                bgcolor: alpha(stat.color, 0.1),
                                            }}
                                        >
                                            <stat.icon sx={{ color: stat.color, fontSize: 24 }} />
                                        </Box>
                                        <Chip
                                            label={stat.trend}
                                            size="small"
                                            sx={{
                                                bgcolor: stat.trend.startsWith('+') ? alpha('#4caf50', 0.1) : alpha('#9e9e9e', 0.1),
                                                color: stat.trend.startsWith('+') ? '#4caf50' : '#9e9e9e',
                                                fontWeight: 'bold',
                                                fontSize: '0.7rem',
                                            }}
                                        />
                                    </Box>
                                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {/* Today's Attendance */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Today's Attendance
                                    </Typography>
                                    <CalendarIcon color="primary" />
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Attendance Rate
                                        </Typography>
                                        <Typography variant="body2" fontWeight="bold" color="primary">
                                            {attendanceRate.toFixed(1)}%
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={attendanceRate}
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
                                            <Typography variant="body2">Present</Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {todayAttendance.present}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CancelIcon sx={{ color: '#f44336', fontSize: 20 }} />
                                            <Typography variant="body2">Absent</Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {todayAttendance.absent}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <EventAvailableIcon sx={{ color: '#ff9800', fontSize: 20 }} />
                                            <Typography variant="body2">Excused</Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {todayAttendance.excused}
                                        </Typography>
                                    </Box>
                                </Stack>

                                {totalAttendance > 0 && (
                                    <Box sx={{ mt: 3, height: 200 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={attendanceData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {attendanceData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* User Activity & Gender Distribution */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        User Statistics
                                    </Typography>
                                    <TrendingUpIcon color="primary" />
                                </Box>

                                {/* User Activity */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                        User Activity Status
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    bgcolor: alpha('#4caf50', 0.1),
                                                    borderRadius: 2,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography variant="h4" fontWeight="bold" color="#4caf50">
                                                    {summary.activeUsers}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Active Users
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Paper
                                                sx={{
                                                    p: 2,
                                                    bgcolor: alpha('#9e9e9e', 0.1),
                                                    borderRadius: 2,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <Typography variant="h4" fontWeight="bold" color="#9e9e9e">
                                                    {summary.inactiveUsers}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Inactive Users
                                                </Typography>
                                            </Paper>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                {/* Gender Distribution */}
                                {genderData.length > 0 && (
                                    <Box>
                                        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                            Gender Distribution
                                        </Typography>
                                        <Stack spacing={2}>
                                            {genderData.map((item, index) => {
                                                const total = genderData.reduce((sum, g) => sum + g.value, 0);
                                                const percentage = ((item.value / total) * 100).toFixed(1);
                                                return (
                                                    <Box key={index}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                {item.name === 'Male' ? (
                                                                    <MaleIcon sx={{ color: item.color, fontSize: 20 }} />
                                                                ) : (
                                                                    <FemaleIcon sx={{ color: item.color, fontSize: 20 }} />
                                                                )}
                                                                <Typography variant="body2">{item.name}</Typography>
                                                            </Box>
                                                            <Typography variant="body2" fontWeight="bold">
                                                                {item.value} ({percentage}%)
                                                            </Typography>
                                                        </Box>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={parseFloat(percentage)}
                                                            sx={{
                                                                height: 6,
                                                                borderRadius: 3,
                                                                bgcolor: alpha(item.color, 0.1),
                                                                '& .MuiLinearProgress-bar': {
                                                                    bgcolor: item.color,
                                                                    borderRadius: 3,
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                );
                                            })}
                                        </Stack>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Overview Chart */}
                    <Grid item xs={12} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Overview
                                    </Typography>
                                    <BusinessIcon color="primary" />
                                </Box>

                                <Box sx={{ height: 300 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { name: 'Students', value: summary.totalStudents },
                                                { name: 'Teachers', value: summary.totalTeachers },
                                                { name: 'Classes', value: summary.totalClasses },
                                                { name: 'Courses', value: summary.totalCourses },
                                                { name: 'Departments', value: summary.totalDepartments },
                                            ]}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Bar dataKey="value" fill={theme.palette.primary.main} radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Upcoming Exams */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Upcoming Exams
                                    </Typography>
                                    <AssignmentIcon color="primary" />
                                </Box>

                                {dashboardData.upcomingExams.length > 0 ? (
                                    <Stack spacing={2}>
                                        {dashboardData.upcomingExams.map((exam) => (
                                            <Paper
                                                key={exam._id}
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                                    '&:hover': {
                                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                    },
                                                }}
                                            >
                                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                    {exam.courseId.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                    Class: {exam.classId.name}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        By: {exam.teacherId.firstName} {exam.teacherId.lastName}
                                                    </Typography>
                                                    <Chip
                                                        label={new Date(exam.startDate).toLocaleDateString()}
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Box
                                        sx={{
                                            py: 6,
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        <AssignmentIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
                                        <Typography variant="body2">No upcoming exams in the next 7 days</Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Recent Events */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Recent Events
                                    </Typography>
                                    <EventIcon color="primary" />
                                </Box>

                                {dashboardData.recentEvents.length > 0 ? (
                                    <Stack spacing={2}>
                                        {dashboardData.recentEvents.map((event) => (
                                            <Paper
                                                key={event._id}
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                                                    '&:hover': {
                                                        bgcolor: alpha(theme.palette.secondary.main, 0.05),
                                                    },
                                                }}
                                            >
                                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                    {event.title}
                                                </Typography>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                                    <Typography variant="caption" color="text.secondary">
                                                        Organized by: {event.organizer.fullname}
                                                    </Typography>
                                                    <Chip
                                                        label={new Date(event.date).toLocaleDateString()}
                                                        size="small"
                                                        color="secondary"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Stack>
                                ) : (
                                    <Box
                                        sx={{
                                            py: 6,
                                            textAlign: 'center',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        <EventIcon sx={{ fontSize: 48, opacity: 0.3, mb: 2 }} />
                                        <Typography variant="body2">No recent events scheduled</Typography>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Last Updated */}
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

// Loading Skeleton Component
const DashboardSkeleton: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Skeleton variant="rectangular" height={120} sx={{ mb: 4, borderRadius: 3 }} />
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={item}>
                            <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DashboardPage;