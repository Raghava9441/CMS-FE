// AdminSettingsPage.tsx
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
    InputAdornment,
    IconButton,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    Card,
    CardContent,
    Tooltip
} from '@mui/material';
import {
    Save as SaveIcon,
    CloudUpload as CloudUploadIcon,
    Security as SecurityIcon,
    Email as EmailIcon,
    Notifications as NotificationsIcon,
    ViewList as ViewListIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon
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

function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        site: {
            name: 'College Management System',
            logo: '',
            favicon: '',
            description: 'A comprehensive college management platform',
            contactEmail: 'contact@college.edu',
            contactPhone: '+1234567890'
        },
        security: {
            password: {
                minLength: 8,
                requireUppercase: true,
                requireLowercase: true,
                requireNumbers: true,
                requireSpecialChars: true
            },
            session: {
                timeout: 86400,
                maxSessions: 5
            }
        },
        email: {
            fromName: 'College Management System',
            fromEmail: 'noreply@college.edu',
            smtp: {
                host: 'smtp.gmail.com',
                port: 587,
                secure: true,
                auth: {
                    user: '',
                    pass: ''
                }
            }
        },
        notifications: {
            email: true,
            sms: false,
            push: true
        },
        pagination: {
            defaultPageSize: 10,
            maxPageSize: 100
        }
    });

    const [showPassword, setShowPassword] = useState(false);
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setSnackbar({
                open: true,
                message: 'Settings saved successfully!',
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

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                handleChange(`site.${type}`, e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SecurityIcon color="primary" />
                    System Settings
                </Typography>
                <Button
                    variant="contained"
                    startIcon={isSaving ? null : <SaveIcon />}
                    onClick={handleSave}
                    disabled={isSaving}
                    sx={{
                        px: 4,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 600
                    }}
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Site Settings */}
                <Grid item xs={12} md={6}>
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <ViewListIcon color="primary" />
                                Site Configuration
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Site Name"
                                        value={settings.site.name}
                                        onChange={(e) => handleChange('site.name', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        value={settings.site.description}
                                        onChange={(e) => handleChange('site.description', e.target.value)}
                                        fullWidth
                                        size="small"
                                        multiline
                                        rows={2}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Avatar
                                            src={settings.site.logo}
                                            sx={{ width: 80, height: 80, mb: 1 }}
                                            variant="square"
                                        >
                                            Logo
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
                                                onChange={(e) => handleFileUpload(e, 'logo')}
                                            />
                                        </Button>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                        <Avatar
                                            src={settings.site.favicon}
                                            sx={{ width: 64, height: 64, mb: 1 }}
                                        >
                                            F
                                        </Avatar>
                                        <Button
                                            component="label"
                                            variant="outlined"
                                            startIcon={<CloudUploadIcon />}
                                            size="small"
                                        >
                                            Upload Favicon
                                            <VisuallyHiddenInput
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileUpload(e, 'favicon')}
                                            />
                                        </Button>
                                    </Box>
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

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Password Requirements
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Minimum Length</InputLabel>
                                            <Select
                                                value={settings.security.password.minLength}
                                                label="Minimum Length"
                                                onChange={(e) => handleChange('security.password.minLength', e.target.value)}
                                            >
                                                {[6, 8, 10, 12, 16].map((num) => (
                                                    <MenuItem key={num} value={num}>{num} characters</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={settings.security.password.requireUppercase}
                                                    onChange={(e) => handleChange('security.password.requireUppercase', e.target.checked)}
                                                />
                                            }
                                            label="Require uppercase"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={settings.security.password.requireLowercase}
                                                    onChange={(e) => handleChange('security.password.requireLowercase', e.target.checked)}
                                                />
                                            }
                                            label="Require lowercase"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={settings.security.password.requireNumbers}
                                                    onChange={(e) => handleChange('security.password.requireNumbers', e.target.checked)}
                                                />
                                            }
                                            label="Require numbers"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={settings.security.password.requireSpecialChars}
                                                    onChange={(e) => handleChange('security.password.requireSpecialChars', e.target.checked)}
                                                />
                                            }
                                            label="Require special characters"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Session Settings
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom>
                                            Session Timeout: {formatDuration(settings.security.session.timeout)}
                                        </Typography>
                                        <Slider
                                            value={settings.security.session.timeout / 3600}
                                            onChange={(_, value) => handleChange('security.session.timeout', (value as number) * 3600)}
                                            min={1}
                                            max={72}
                                            step={1}
                                            marks={[
                                                { value: 1, label: '1h' },
                                                { value: 24, label: '24h' },
                                                { value: 48, label: '48h' },
                                                { value: 72, label: '72h' }
                                            ]}
                                            valueLabelDisplay="auto"
                                            valueLabelFormat={(value) => `${value}h`}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Max Concurrent Sessions</InputLabel>
                                            <Select
                                                value={settings.security.session.maxSessions}
                                                label="Max Concurrent Sessions"
                                                onChange={(e) => handleChange('security.session.maxSessions', e.target.value)}
                                            >
                                                {[1, 3, 5, 10, 20].map((num) => (
                                                    <MenuItem key={num} value={num}>{num}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </SectionCard>
                </Grid>

                {/* Email & Notification Settings */}
                <Grid item xs={12} md={6}>
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <EmailIcon color="primary" />
                                Email Configuration
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="From Name"
                                        value={settings.email.fromName}
                                        onChange={(e) => handleChange('email.fromName', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="From Email"
                                        value={settings.email.fromEmail}
                                        onChange={(e) => handleChange('email.fromEmail', e.target.value)}
                                        fullWidth
                                        size="small"
                                        type="email"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="SMTP Host"
                                        value={settings.email.smtp.host}
                                        onChange={(e) => handleChange('email.smtp.host', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="SMTP Port"
                                        value={settings.email.smtp.port}
                                        onChange={(e) => handleChange('email.smtp.port', parseInt(e.target.value) || 587)}
                                        fullWidth
                                        size="small"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="SMTP Username"
                                        value={settings.email.smtp.auth.user}
                                        onChange={(e) => handleChange('email.smtp.auth.user', e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="SMTP Password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={settings.email.smtp.auth.pass}
                                        onChange={(e) => handleChange('email.smtp.auth.pass', e.target.value)}
                                        fullWidth
                                        size="small"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.email.smtp.secure}
                                                onChange={(e) => handleChange('email.smtp.secure', e.target.checked)}
                                            />
                                        }
                                        label="Use SSL/TLS"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>

                    {/* Notification Settings */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <NotificationsIcon color="primary" />
                                Notification Settings
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

                    {/* Pagination Settings */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                                Pagination Settings
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography gutterBottom>
                                        Default Page Size: {settings.pagination.defaultPageSize} items
                                    </Typography>
                                    <Slider
                                        value={settings.pagination.defaultPageSize}
                                        onChange={(_, value) => handleChange('pagination.defaultPageSize', value)}
                                        min={5}
                                        max={50}
                                        step={5}
                                        marks={[
                                            { value: 5, label: '5' },
                                            { value: 25, label: '25' },
                                            { value: 50, label: '50' }
                                        ]}
                                        valueLabelDisplay="auto"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Maximum Page Size"
                                        value={settings.pagination.maxPageSize}
                                        onChange={(e) => handleChange('pagination.maxPageSize', parseInt(e.target.value) || 100)}
                                        fullWidth
                                        size="small"
                                        type="number"
                                        helperText="Maximum number of items per page"
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

export default AdminSettingsPage;