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
    Chip as MuiChip,
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
    WatchLater as WatchLaterIcon,
    TrendingUp as TrendingUpIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { studentApi } from '@api/api';
import {
    StudentDashboardData,
    StudentInfo,
    StudentAttendance,
    AcademicStats,
    UpcomingExam,
    RecentGrade,
    DaySchedule,
} from '../types/dashboard.types';
import studentDashboardMock from '../Mock Data/student-dashboard.json';

const StudentDashboardPage: React.FC = () => {
    const theme = useTheme();
    const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = () => {
        studentApi.getDashboardData().then((res) => {
            console.log("🚀 ~ Student Dashboard Data:", res.data);
            setDashboardData(res.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setDashboardData(studentDashboardMock.data);
        });
    };

    if (loading) {
        return <StudentDashboardSkeleton />;
    }

    if (!dashboardData) {
        return null;
    }

    const { studentInfo, attendance, academicStats, upcomingExams, recentGrades, schedule } = dashboardData;

    // Prepare chart data
    const attendanceData = [
        { name: 'Present', value: attendance.presentCount, color: '#4caf50' },
        { name: 'Absent', value: attendance.absentCount, color: '#f44336' },
        { name: 'Late', value: attendance.lateCount, color: '#ff9800' },
    ];

    const assignmentData = [
        { name: 'Completed', value: academicStats.completedAssignments, color: '#4caf50' },
        { name: 'Pending', value: academicStats.pendingAssignments, color: '#ff9800' },
    ];

    const coursesData = [
        { name: 'Completed', value: academicStats.completedCourses, color: '#4caf50' },
        { name: 'Ongoing', value: academicStats.ongoingCourses, color: '#2196f3' },
    ];

    const statsData = [
        { label: 'Total Courses', value: academicStats.totalCourses, icon: SchoolIcon, color: '#1976d2' },
        { label: 'Completed Courses', value: academicStats.completedCourses, icon: CheckCircleIcon, color: '#4caf50' },
        { label: 'Ongoing Courses', value: academicStats.ongoingCourses, icon: TrendingUpIcon, color: '#2196f3' },
        { label: 'Total Assignments', value: academicStats.totalAssignments, icon: AssignmentIcon, color: '#9c27b0' },
        { label: 'Completed Assignments', value: academicStats.completedAssignments, icon: CheckCircleIcon, color: '#388e3c' },
        { label: 'Pending Assignments', value: academicStats.pendingAssignments, icon: WatchLaterIcon, color: '#ff9800' },
    ];

    const totalAttendance = attendance.presentCount + attendance.absentCount + attendance.lateCount;
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
                                src={studentInfo.image}
                                alt={studentInfo.name}
                                sx={{ width: 80, height: 80, border: '4px solid rgba(255,255,255,0.3)' }}
                            />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {studentInfo.name}
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip
                                    label={studentInfo.class}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                                />
                                <Chip
                                    label={`Roll No: ${studentInfo.rollNumber}`}
                                    size="small"
                                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }}
                                />
                                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                    {studentInfo.email}
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
                                            {attendance.attendanceRate}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={parseFloat(attendance.attendanceRate)}
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
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <WatchLaterIcon sx={{ color: '#ff9800', fontSize: 20 }} />
                                            <Typography variant="body2">Late</Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="bold">
                                            {attendance.lateCount}
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

                    {/* Academic Stats */}
                    <Grid item xs={12} md={6} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Academic Performance
                                    </Typography>
                                    <TrendingUpIcon color="primary" />
                                </Box>

                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                        Average Grade
                                    </Typography>
                                    <Chip
                                        label={academicStats.averageGrade}
                                        sx={{
                                            bgcolor: '#2196f3',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: '1.2rem',
                                            padding: '8px 16px',
                                        }}
                                    />
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                {/* Courses */}
                                <Box sx={{ mb: 4 }}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                        Courses
                                    </Typography>
                                    <Box sx={{ height: 150 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={coursesData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Bar dataKey="value" fill="#2196f3" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </Box>

                                {/* Assignments */}
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                                        Assignments
                                    </Typography>
                                    <Box sx={{ height: 150 }}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={assignmentData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={40}
                                                    outerRadius={60}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {assignmentData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Upcoming Exams */}
                    <Grid item xs={12} lg={4}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Upcoming Exams
                                    </Typography>
                                    <EventIcon color="primary" />
                                </Box>

                                <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                                    {upcomingExams.map((exam, index) => (
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
                                                primary={exam.subject}
                                                secondary={
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {new Date(exam.date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                month: 'short',
                                                                day: 'numeric',
                                                            })}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {exam.startTime} - {exam.endTime}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {exam.location}
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

                    {/* Recent Grades */}
                    <Grid item xs={12} md={6}>
                        <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        Recent Grades
                                    </Typography>
                                    <AssignmentIcon color="primary" />
                                </Box>

                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Subject</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell align="right">Marks</TableCell>
                                                <TableCell align="right">Grade</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {recentGrades.map((grade, index) => (
                                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        {grade.subject}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(grade.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </TableCell>
                                                    <TableCell align="right">{`${grade.marksObtained}/${grade.totalMarks}`}</TableCell>
                                                    <TableCell align="right">
                                                        <Chip
                                                            label={grade.grade}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: grade.grade.startsWith('A') ? alpha('#4caf50', 0.1) :
                                                                    grade.grade.startsWith('B') ? alpha('#2196f3', 0.1) :
                                                                        grade.grade.startsWith('C') ? alpha('#ff9800', 0.1) :
                                                                            alpha('#f44336', 0.1),
                                                                color: grade.grade.startsWith('A') ? '#4caf50' :
                                                                    grade.grade.startsWith('B') ? '#2196f3' :
                                                                        grade.grade.startsWith('C') ? '#ff9800' :
                                                                            '#f44336',
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
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
                                                            <Typography variant="body2" color="text.secondary">
                                                                {cls.teacher}
                                                            </Typography>
                                                            <Chip
                                                                label={cls.classroom}
                                                                size="small"
                                                                sx={{ fontSize: '0.7rem' }}
                                                            />
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
                </Grid>
            </Container>
        </Box>
    );
};

const StudentDashboardSkeleton: React.FC = () => {
    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="xl">
                <Skeleton variant="rectangular" height={150} sx={{ mb: 4, borderRadius: 3 }} />
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[...Array(6)].map((_, index) => (
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

export default StudentDashboardPage;
