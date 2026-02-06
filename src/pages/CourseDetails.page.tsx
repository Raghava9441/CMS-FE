import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useEffect } from "react";
import { courseActions } from "@redux/actions/course.actions";
import { Box, Typography, Card, CardContent, Chip, Divider, Stack, Grid } from "@mui/material";
import { Course } from "@models/course.modals";

function CourseDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const course = useSelector((state: RootState) => state.course.courses.find((c: Course) => c._id === id));
    const { isLoading } = useSelector((state: RootState) => state.course);

    useEffect(() => {
        if (id) {
            dispatch(courseActions.fetchCourseById(id));
        }
    }, [dispatch, id]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Typography>Loading course details...</Typography>
            </Box>
        );
    }

    if (!course) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <Typography>Course not found</Typography>
            </Box>
        );
    }

    // Parse JSON fields
    const syllabus = JSON.parse(course.syllabus || '[]');
    const gradingScheme = JSON.parse(course.gradingScheme || '[]');

    return (
        <Box sx={{ maxWidth: 1200, margin: '0 auto', padding: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    {course.name}
                </Typography>
                <Chip label={course.code} color="primary" size="medium" />
            </Box>

            {/* Course Info Card */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
                        {course.description}
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">Schedule:</Typography>
                            <Typography variant="body2">{course.schedule}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">Location:</Typography>
                            <Typography variant="body2">{course.location}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">Credits:</Typography>
                            <Typography variant="body2">{course.credits}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">Fee:</Typography>
                            <Typography variant="body2">${course.fee.toFixed(2)}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">Start Date:</Typography>
                            <Typography variant="body2">{new Date(course.startDate).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2" color="text.secondary">End Date:</Typography>
                            <Typography variant="body2">{new Date(course.endDate).toLocaleDateString()}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Prerequisites</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {course.prerequisites.map((prereq: string, index: number) => (
                                <Chip key={index} label={prereq} variant="outlined" />
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {/* Syllabus */}
            {syllabus.length > 0 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Syllabus</Typography>
                        {syllabus.map((section: any, index: number) => (
                            <Box key={index} sx={{ mb: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {section.title}
                                </Typography>
                                <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>
                                    {section.content}
                                </Typography>
                                {index < syllabus.length - 1 && <Divider sx={{ my: 2 }} />}
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            )}

            {/* Grading Scheme */}
            {gradingScheme.length > 0 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Grading Scheme</Typography>
                        <Grid container spacing={2}>
                            {gradingScheme.map((component: any, index: number) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2">{component.component}</Typography>
                                        <Typography variant="body2" fontWeight="bold">{component.weight}%</Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            )}

            {/* Resources */}
            {course.resources && course.resources.length > 0 && (
                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Resources</Typography>
                        <Stack spacing={1}>
                            {course.resources.map((resource: any, index: number) => (
                                <a
                                    key={index}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 1,
                                        borderRadius: 1,
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                    }}>
                                        <Typography variant="body2">{resource.title}</Typography>
                                    </Box>
                                </a>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
            )}

            {/* Statistics */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>Course Statistics</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" color="text.secondary">Teachers:</Typography>
                            <Typography variant="body2">{course.teacherIds.length}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" color="text.secondary">Students:</Typography>
                            <Typography variant="body2">{course.studentIds.length}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2" color="text.secondary">Assignments:</Typography>
                            <Typography variant="body2">{course.assignmentIds.length}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}

export default CourseDetailsPage;
