import { DashboardApi } from "@api/api";
import { useEffect, useState } from "react";
import { AdminDashboardData } from "../types/dashboard.modals";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Skeleton
} from '@mui/material';
import {
    Person as PersonIcon,
    Group as GroupIcon,
    School as SchoolIcon,
    FamilyRestroom as FamilyIcon
} from '@mui/icons-material';
import { PieChart, BarChart } from '@mui/x-charts';
import { findRouteByPath, findRouteByPathPattern } from "@utils/routes.utills";
import { routeConfig } from "../config/routes.config";
import { useLocation } from "react-router-dom";
import { usePermissions } from '../hooks/usePermissions';
import { ConditionalComponent } from "@components/ConditionalComponent";

const DashboardSkeleton = () => {
    return (
        <Box sx={{ p: 3 }}>
            <Skeleton variant="text" width={200} height={40} sx={{ mb: 4 }} />

            {/* User Counts Section Skeleton */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={12} sm={6} md={3} key={item}>
                        <Card>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
                                    <Skeleton variant="text" width={80} />
                                </Box>
                                <Skeleton variant="text" width={60} height={40} />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Charts Section Skeleton */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Skeleton variant="text" width={150} sx={{ mb: 2 }} />
                            <Skeleton variant="rectangular" height={300} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Skeleton variant="text" width={150} sx={{ mb: 2 }} />
                            <Skeleton variant="rectangular" height={300} />
                            <Skeleton variant="text" width={100} sx={{ mt: 2, mx: 'auto' }} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Events Table Skeleton */}
            <Card>
                <CardContent>
                    <Skeleton variant="text" width={120} sx={{ mb: 2 }} />
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {[1, 2, 3].map((item) => (
                                        <TableCell key={item}>
                                            <Skeleton variant="text" />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[1, 2, 3].map((row) => (
                                    <TableRow key={row}>
                                        {[1, 2, 3].map((cell) => (
                                            <TableCell key={cell}>
                                                <Skeleton variant="text" />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
};

function DashboardPage() {
    const [dashboardData, setDashboardData] = useState<AdminDashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const currentRoute = findRouteByPath(routeConfig, location.pathname);
    const { hasPermission, getResourcePermissions } = usePermissions();
    const dashboardPermissions = getResourcePermissions('dashboard');
    console.log(dashboardPermissions)
    console.log(currentRoute)

    const data = [
        {
            Title: "Admins",
            Icon: <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />,
            Count: dashboardData && dashboardData.counts.adminCount
        },
        {
            Title: "Teachers",
            Icon: <GroupIcon sx={{ mr: 1, color: 'secondary.main' }} />,
            Count: dashboardData && dashboardData.counts.teacherCount
        },
        {
            Title: "Students",
            Icon: <SchoolIcon sx={{ mr: 1, color: 'success.main' }} />,
            Count: dashboardData && dashboardData.counts.studentCount
        },
        {
            Title: "Parents",
            Icon: <FamilyIcon sx={{ mr: 1, color: 'info.main' }} />,
            Count: dashboardData && dashboardData.counts.parentCount
        },
    ]

    useEffect(() => {
        setLoading(true);
        DashboardApi.getDashboardData().then((res) => {
            setDashboardData(res.data.data);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (!dashboardData) {
        return <div>Error loading dashboard data</div>;
    }

    // Prepare data for charts
    const studentDemographicsData = [
        { id: 0, value: dashboardData.studentStats.maleCount, label: 'Male Students' },
        { id: 1, value: dashboardData.studentStats.femaleCount, label: 'Female Students' },
    ];

    const attendanceData = [
        { id: 0, value: dashboardData.attendanceStats.presentCount, label: 'Present' },
        { id: 1, value: dashboardData.attendanceStats.absentCount, label: 'Absent' },
    ];

    return (
        <Box sx={{ p: 3, overflowY: "auto", height: "100%" }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                Admin Dashboard
            </Typography>

            <ConditionalComponent resource="dashboard" action="edit">
                <button>Edit Dashboard Settings</button>
            </ConditionalComponent>

            {/* User Counts Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {
                    data.map((item, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        {item.Icon}
                                        <Typography variant="h6">{item.Title}</Typography>
                                    </Box>
                                    <Typography variant="h4">
                                        {item.Count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

            {/* Student Stats and Attendance Section */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Student Demographics</Typography>
                            <Box sx={{ height: 400, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <PieChart
                                    series={[
                                        {
                                            data: studentDemographicsData,
                                            highlightScope: { fade: 'global', highlight: 'item' },
                                            innerRadius: 80,
                                        },
                                    ]}
                                    height={400}
                                    width={400}
                                    margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 2 }}>Attendance Overview</Typography>
                            <Box sx={{ height: 375, width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <BarChart
                                    series={[
                                        {
                                            data: attendanceData.map(item => item.value),
                                            color: '#52c41a',
                                        },
                                    ]}
                                    xAxis={[
                                        {
                                            data: attendanceData.map(item => item.label),
                                            scaleType: 'band',
                                        },
                                    ]}
                                    // height={400}
                                    // width={400}
                                    margin={{ top: 40, bottom: 40, left: 40, right: 40 }}
                                />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                                Year: {dashboardData.attendanceStats.year}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Events Section */}
            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Recent Events</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Event Name</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dashboardData.events.map((event, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{event.name}</TableCell>
                                        <TableCell>{event.date}</TableCell>
                                        <TableCell>{event.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Box>
    );
}

export default DashboardPage;