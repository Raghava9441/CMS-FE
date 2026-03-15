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
    School as SchoolIcon,
    Person as PersonIcon,
    Assignment as AssignmentIcon,
    CalendarToday as CalendarIcon,
    Event as EventIcon,
    Schedule as ScheduleIcon,
    CheckCircle as CheckCircleIcon,
    Cancel as CancelIcon,
    TrendingUp as TrendingUpIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { teacherApi } from '@api/api';
import {
    TeacherDashboardData,
    TeacherInfo,
    TeacherAttendance,
    TeachingStats,
    Course,
    TeacherDaySchedule,
} from '../types/dashboard.types';
import teacherDashboardMock from '../Mock Data/teacher-dashboard.json';

const TeacherDashboardPage: React.FC = () => {
    const theme = useTheme();
    const [dashboardData, setDashboardData] = useState<TeacherDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = () => {
        teacherApi.getDashboardData().then((res) => {
            console.log("🚀 ~ Teacher Dashboard Data:", res.data);
            setDashboardData(res.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setDashboardData(teacherDashboardMock.data);
        });
    };

    if (loading) {
        return <TeacherDashboardSkeleton />;
    }

    if (!dashboardData) {
        return null;
    }

    const { teacherInfo, attendance, teachingStats, schedule, courses } = dashboardData;

    // Prepare chart data
    const attendanceData = [
        { name: 'Present', value: attendance.presentCount, color: '#4caf50' },
        { name: 'Absent', value: attendance.absentCount, color: '#f44336' },
    ];

    const teachingData = [
        { name: 'Total Lessons', value: teachingStats.totalLessons, color: '#1976d2' },
        { name: 'Total Classes', value: teachingStats.totalClasses, color: '#9c27b0' },
        { name: 'Courses Taught', value: teachingStats.coursesTaught, color: '#f57c00' },
        { name: 'Total Students', value: teachingStats.totalStudents, color: '#0288d1' },
    ];

    const statsData = [
        { label: 'Total Lessons', value: teachingStats.totalLessons, icon: SchoolIcon, color: '#1976d2' },
        { label: 'Total Classes', value: teachingStats.totalClasses, icon: PersonIcon, color: '#9c27b0' },
        { label: 'Courses Taught', value: teachingStats.coursesTaught, icon: AssignmentIcon, color: '#f57c00' },
        { label: 'Total Students', value: teachingStats.totalStudents, icon: TrendingUpIcon, color: '#0288d1' },
    ];

    const totalAttendance = attendance.presentCount + attendance.absentCount;
    const attendanceRate = totalAttendance > 0 ? (attendance.presentCount / totalAttendance) * 100 : 0;

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
                                src={teacherInfo.image}
                                alt={teacherInfo.name}
                                sx={{ width: 80, height: 80, border: '4px solid rgba(255,255,255,0.3)' }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {teacherInfo.name}
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip
                                    label={teacherInfo.designation}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                                />
                                <Chip
                                    label={teacherInfo.department}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                                />
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    {teacherInfo.email}
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
                    {/* Attendance */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Attendance
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
                                            {attendance.presentCount}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CancelIcon sx={{ color: '#f44336', fontSize: 20 }} />
                                            <Typography variant="body2">Absent</Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {attendance.absentCount}
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

                    {/* Teaching Stats */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Teaching Statistics
                                    </Typography>
                                    <TrendingUpIcon color="primary" />
                                </Box>

                                <Box sx={{ height: 250 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={teachingData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="value">
                                                {teachingData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Course Info */}
                    <Grid item xs={12} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Course Details
                                    </Typography>
                                    <SchoolIcon color="primary" />
                                </Box>

                                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    {courses.map((course, index) => (
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
                                                <SchoolIcon sx={{ color: theme.palette.primary.main }} />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={course.name}
                                                secondary={
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {course.code} - {course.credits} credits
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {course.schedule}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {course.currentEnrollment}/{course.maxCapacity} students
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

                    {/* Schedule */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Weekly Schedule
                                    </Typography>
                                    <ScheduleIcon color="primary" />
                                </Box>

                                <Stack spacing={3}>
                                    {schedule.map((day, index) => (
                                        <Box key={index}>
                                            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                                {day.dayOfWeek}
                                            </Typography>
                                            <Stack spacing={1.5}>
                                                {day.classes.map((cls, clsIndex) => (
                                                    <Paper
                                                        key={clsIndex}
                                                        sx={{
                                                            p: 2,
                                                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                                                            borderRadius: 2,
                                                        }}
                                                    >
                                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                                                            <Typography variant="body1" fontWeight="bold">
                                                                {cls.courseName}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {cls.startTime} - {cls.endTime}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                            <Chip
                                                                label={cls.classroom}
                                                                size="small"
                                                                sx={{ fontSize: '0.7rem' }}
                                                            />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {cls.studentCount}/{cls.maxCapacity} students
                                                            </Typography>
                                                        </Box>
                                                    </Paper>
                                                ))}
                                            </Stack>
                                        </Box>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Office Hours */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Office Hours
                                    </Typography>
                                    <CalendarIcon color="primary" />
                                </Box>

                                <Paper
                                    sx={{
                                        p: 3,
                                        bgcolor: alpha(theme.palette.secondary.main, 0.1),
                                        borderRadius: 2,
                                        textAlign: 'center',
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
                                        {teacherInfo.officeHours}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Available for consultation
                                    </Typography>
                                </Paper>

                                <Divider sx={{ my: 3 }} />

                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                        Qualifications
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                        {teacherInfo.qualifications}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        {teacherInfo.experience} years of experience
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

const TeacherDashboardSkeleton: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Skeleton variant="rectangular" height={150} sx={{ mb: 4, borderRadius: 3 }} />
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[...Array(4)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                            <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={3}>
                    {[...Array(5)].map((_, index) => (
                        <Grid item xs={12} md={6} lg={index === 4 ? 12 : 4} key={index}>
                            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TeacherDashboardPage;
