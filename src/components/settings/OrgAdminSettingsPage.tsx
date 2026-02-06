// OrgAdminSettingsPage.tsx
import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Switch,
    FormControlLabel,
    Button,
    Grid,
    Divider,
    Avatar,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Chip
} from '@mui/material';
import {
    Save as SaveIcon,
    CloudUpload as CloudUploadIcon,
    Business as BusinessIcon,
    School as SchoolIcon,
    Security as SecurityIcon,
    Notifications as NotificationsIcon,
    LocationOn as LocationIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const SectionCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(3),
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
    }
}));

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.spacing(2),
    fontWeight: 600,
    '&:hover': {
        background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
    }
}));

function OrgAdminSettingsPage() {
    const [settings, setSettings] = useState({
        general: {
            name: 'University of Technology',
            address: {
                street: '123 College Ave',
                city: 'San Francisco',
                state: 'CA',
                zip: '94107',
                country: 'USA'
            },
            contact: {
                email: 'info@university.edu',
                phone: '+1-555-123-4567'
            },
            logo: '',
            website: 'https://university.edu'
        },
        academic: {
            academicYear: '2024-2025',
            semester: 'Spring',
            gradingSystem: {
                type: 'percentage',
                scale: 100
            },
            attendance: {
                requiredPercentage: 75,
                markingPeriod: 30
            }
        },
        departments: {
            requireApproval: true,
            maxCoursesPerDepartment: 50
        },
        notifications: {
            email: true,
            sms: false,
            push: true
        },
        security: {
            allowExternalUsers: false,
            requireTwoFactor: false,
            sessionTimeout: 86400
        }
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (path: string, value: any) => {
        const keys = path.split('.');
        setSettings(prev => {
            const newSettings = { ...prev };
            let current: any = newSettings;

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return newSettings;
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSnackbar({
                open: true,
                message: 'Organization settings saved!',
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to save settings',
                severity: 'error'
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleChange('general.logo', e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BusinessIcon color="primary" />
                    Organization Settings
                </Typography>
                <GradientButton
                    startIcon={isSaving ? null : <SaveIcon />}
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save Organization Settings'}
                </GradientButton>
            </Box>

            <Grid container spacing={3}>
                {/* General Settings */}
                <Grid item xs={12} md={6}>
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <BusinessIcon color="primary" />
                                General Information
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                                        <Avatar
                                            src={settings.general.logo}
                                            sx={{ width: 120, height: 120, mb: 2, border: '4px solid', borderColor: 'primary.light' }}
                                        >
                                            <BusinessIcon sx={{ fontSize: 60 }} />
                                        </Avatar>
                                        <Button
                                            component="label"
                                            variant="outlined"
                                            startIcon={<CloudUploadIcon />}
                                            size="small"
                                        >
                                            Upload Logo
                                            <VisuallyHiddenInput
                                                type="file"
                                                accept="image/*"
                                                onChange={handleLogoUpload}
                                            />
                                        </Button>
                                    </Box>
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Organization Name"
                                        value={settings.general.name}
                                        onChange={(e) => handleChange('general.name', e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            startAdornment: (
                                                <BusinessIcon sx={{ color: 'action.active', mr: 1 }} fontSize="small" />
                                            ),
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Website"
                                        value={settings.general.website}
                                        onChange={(e) => handleChange('general.website', e.target.value)}
                                        fullWidth
                                        size="small"
                                        type="url"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Contact Email"
                                        value={settings.general.contact.email}
                                        onChange={(e) => handleChange('general.contact.email', e.target.value)}
                                        fullWidth
                                        size="small"
                                        type="email"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Contact Phone"
                                        value={settings.general.contact.phone}
                                        onChange={(e) => handleChange('general.contact.phone', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>

                                {/* Address Fields */}
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 1, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationIcon fontSize="small" />
                                        Address
                                    </Typography>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Street"
                                                value={settings.general.address.street}
                                                onChange={(e) => handleChange('general.address.street', e.target.value)}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="City"
                                                value={settings.general.address.city}
                                                onChange={(e) => handleChange('general.address.city', e.target.value)}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="State"
                                                value={settings.general.address.state}
                                                onChange={(e) => handleChange('general.address.state', e.target.value)}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="ZIP Code"
                                                value={settings.general.address.zip}
                                                onChange={(e) => handleChange('general.address.zip', e.target.value)}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label="Country"
                                                value={settings.general.address.country}
                                                onChange={(e) => handleChange('general.address.country', e.target.value)}
                                                fullWidth
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>

                    {/* Academic Settings */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <SchoolIcon color="primary" />
                                Academic Settings
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Academic Year"
                                        value={settings.academic.academicYear}
                                        onChange={(e) => handleChange('academic.academicYear', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Semester</InputLabel>
                                        <Select
                                            value={settings.academic.semester}
                                            label="Semester"
                                            onChange={(e) => handleChange('academic.semester', e.target.value)}
                                        >
                                            <MenuItem value="Fall">Fall</MenuItem>
                                            <MenuItem value="Spring">Spring</MenuItem>
                                            <MenuItem value="Summer">Summer</MenuItem>
                                            <MenuItem value="Winter">Winter</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Grading System</InputLabel>
                                        <Select
                                            value={settings.academic.gradingSystem.type}
                                            label="Grading System"
                                            onChange={(e) => handleChange('academic.gradingSystem.type', e.target.value)}
                                        >
                                            <MenuItem value="percentage">Percentage</MenuItem>
                                            <MenuItem value="cgpa">CGPA (4.0 scale)</MenuItem>
                                            <MenuItem value="grade">Letter Grade</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Attendance Requirements
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Chip
                                            label={`${settings.academic.attendance.requiredPercentage}% Required`}
                                            color="primary"
                                            variant="outlined"
                                        />
                                        <Chip
                                            label={`${settings.academic.attendance.markingPeriod} Days Period`}
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>
                </Grid>

                {/* Department & Security Settings */}
                <Grid item xs={12} md={6}>
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <SchoolIcon color="primary" />
                                Department Settings
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.departments.requireApproval}
                                                onChange={(e) => handleChange('departments.requireApproval', e.target.checked)}
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box>
                                                <Typography variant="body2">Require Department Approval</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    New departments require administrator approval
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Maximum Courses per Department"
                                        value={settings.departments.maxCoursesPerDepartment}
                                        onChange={(e) => handleChange('departments.maxCoursesPerDepartment', parseInt(e.target.value) || 50)}
                                        fullWidth
                                        size="small"
                                        type="number"
                                        helperText="Maximum number of courses allowed in a single department"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>

                    {/* Security Settings */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <SecurityIcon color="primary" />
                                Security Settings
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.security.allowExternalUsers}
                                                onChange={(e) => handleChange('security.allowExternalUsers', e.target.checked)}
                                            />
                                        }
                                        label="Allow External Users"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.security.requireTwoFactor}
                                                onChange={(e) => handleChange('security.requireTwoFactor', e.target.checked)}
                                            />
                                        }
                                        label={
                                            <Box>
                                                <Typography variant="body2">Require Two-Factor Authentication</Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    All users must enable 2FA for enhanced security
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Session Timeout</InputLabel>
                                        <Select
                                            value={settings.security.sessionTimeout / 3600}
                                            label="Session Timeout"
                                            onChange={(e) => handleChange('security.sessionTimeout', (e.target.value as number) * 3600)}
                                        >
                                            <MenuItem value={1}>1 Hour</MenuItem>
                                            <MenuItem value={4}>4 Hours</MenuItem>
                                            <MenuItem value={8}>8 Hours</MenuItem>
                                            <MenuItem value={24}>24 Hours</MenuItem>
                                            <MenuItem value={48}>48 Hours</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>

                    {/* Notification Settings */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <NotificationsIcon color="primary" />
                                Organization Notifications
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.notifications.email}
                                                onChange={(e) => handleChange('notifications.email', e.target.checked)}
                                            />
                                        }
                                        label="Email Notifications"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.notifications.sms}
                                                onChange={(e) => handleChange('notifications.sms', e.target.checked)}
                                            />
                                        }
                                        label="SMS Notifications"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.notifications.push}
                                                onChange={(e) => handleChange('notifications.push', e.target.checked)}
                                            />
                                        }
                                        label="Push Notifications"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity as any} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default OrgAdminSettingsPage;