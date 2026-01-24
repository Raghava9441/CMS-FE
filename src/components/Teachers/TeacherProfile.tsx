import { RouteConfig } from "@models/routes.types";
import { Teacher, Publication, ProfessionalMembership } from "@types/teacher.modals";
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    Avatar,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    Stack,
} from "@mui/material";
import {
    Person as PersonIcon,
    School as SchoolIcon,
    Book as BookIcon,
    // Briefcase as BriefcaseIcon,
    CalendarToday as CalendarIcon,
    LocationOn as LocationIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Language as LanguageIcon,
    Work as WorkIcon,
    Star as StarIcon,
    Article as ArticleIcon,
} from "@mui/icons-material";

type Props = {
    id?: string; // URL param
    routeData?: {
        getTeacherById?: Teacher; // Teacher data from your API
    };
    route?: RouteConfig;
    canActivate?: boolean;
};

function TeacherProfile({ routeData }: Props) {
    const teacherData = routeData?.getTeacherById;
    console.log("🚀 ~ teacherData:", teacherData);

    if (!teacherData) {
        return <div>Loading teacher data...</div>;
    }

    const { userDetails, qualifications, experience, officeHours, researchInterests, publications, professionalMemberships, teachingPhilosophy, subjects, departments } = teacherData.data.data;
    console.log("🚀 ~ userDetails:", userDetails)

    return (
        <Container maxWidth="lg" sx={{ py: 4, width: '100%', height: '100%', overflowY: 'scroll' }}>
            {/* Header Section */}
            <Paper sx={{ p: 4, mb: 3, bgcolor: "background.paper" }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={4} md={3}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Avatar
                                src={userDetails?.avatar}
                                sx={{
                                    width: 180,
                                    height: 180,
                                    border: 4,
                                    borderColor: "primary.main",
                                    boxShadow: 3,
                                }}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                                {userDetails?.fullname}
                            </Typography>
                            <Typography variant="h5" color="text.secondary" gutterBottom>
                                Teacher
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ justifyContent: { xs: "center", sm: "flex-start" }, mb: 2, flexWrap: "wrap" }}>
                                {subjects?.slice(0, 3)?.map((subject: string, index: number) => (
                                    <Chip
                                        key={index}
                                        label={`Subject ${index + 1}`}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    />
                                ))}
                            </Stack>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {userDetails?.biography}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3}>
                {/* Left Column - Personal Information */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                            <PersonIcon sx={{ mr: 1 }} /> Personal Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            <ListItem sx={{ py: 1 }}>
                                <ListItemIcon><EmailIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                                <ListItemText primary={userDetails?.email} />
                            </ListItem>
                            <ListItem sx={{ py: 1 }}>
                                <ListItemIcon><PhoneIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                                <ListItemText primary={userDetails?.phone} />
                            </ListItem>
                            <ListItem sx={{ py: 1 }}>
                                <ListItemIcon><LocationIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                                <ListItemText primary={`${userDetails?.address?.street}, ${userDetails?.address?.city}, ${userDetails?.address.state} ${userDetails?.address.zip}`} />
                            </ListItem>
                            <ListItem sx={{ py: 1 }}>
                                <ListItemIcon><LanguageIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                                <ListItemText primary={userDetails?.preferences?.language.toUpperCase()} />
                            </ListItem>
                            <ListItem sx={{ py: 1 }}>
                                <ListItemIcon><CalendarIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                                <ListItemText primary={new Date(userDetails?.dateOfBirth).toLocaleDateString()} />
                            </ListItem>
                        </List>
                    </Paper>

                    {/* Teaching Information */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                            <SchoolIcon sx={{ mr: 1 }} /> Teaching Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            <ListItem sx={{ py: 1 }}>
                                {/* <ListItemIcon><BriefcaseIcon sx={{ color: "text.secondary" }} /></ListItemIcon> */}
                                <ListItemText primary={`${experience} Years Experience`} />
                            </ListItem>
                            <ListItem sx={{ py: 1 }}>
                                <ListItemIcon><CalendarIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                                <ListItemText primary={officeHours} />
                            </ListItem>
                            <ListItem sx={{ py: 1 }}>
                                <ListItemIcon><WorkIcon sx={{ color: "text.secondary" }} /></ListItemIcon>
                                <ListItemText primary="Departments" secondary={departments?.length > 0 ? "Multiple Departments" : "No departments assigned"} />
                            </ListItem>
                        </List>
                    </Paper>

                    {/* Qualifications */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                            <BookIcon sx={{ mr: 1 }} /> Qualifications
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <List>
                            {qualifications?.map((qualification: string, index: number) => (
                                <ListItem key={index} sx={{ py: 1 }}>
                                    <ListItemIcon><StarIcon sx={{ color: "warning.main", fontSize: 20 }} /></ListItemIcon>
                                    <ListItemText primary={qualification} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                {/* Right Column - Professional Details */}
                <Grid item xs={12} md={8}>
                    {/* Teaching Philosophy */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                            <StarIcon sx={{ mr: 1 }} /> Teaching Philosophy
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body1" paragraph>
                            {teachingPhilosophy}
                        </Typography>
                    </Paper>

                    {/* Research Interests */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                            <BookIcon sx={{ mr: 1 }} /> Research Interests
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                            {researchInterests?.map((interest: string, index: number) => (
                                <Chip key={index} label={interest} color="secondary" variant="filled" />
                            ))}
                        </Stack>
                    </Paper>

                    {/* Publications */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                            <ArticleIcon sx={{ mr: 1 }} /> Publications
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {publications?.length > 0 ? (
                            publications?.map((publication: Publication, index: number) => (
                                <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {publication.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            <strong>Authors:</strong> {publication.authors}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            <strong>Journal:</strong> {publication.journal}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Year:</strong> {publication.year}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No publications available
                            </Typography>
                        )}
                    </Paper>

                    {/* Professional Memberships */}
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                            <WorkIcon sx={{ mr: 1 }} /> Professional Memberships
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {professionalMemberships?.length > 0 ? (
                            professionalMemberships?.map((membership: ProfessionalMembership, index: number) => (
                                <Card key={index} sx={{ mb: 2, borderRadius: 2 }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {membership.organization}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Membership ID:</strong> {membership.membershipId}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                No professional memberships available
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default TeacherProfile;