import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Switch,
    FormControlLabel,
    Button,
    Grid,
    Divider,
    Alert,
    Snackbar,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Card,
    CardContent,
    Slider,
    ToggleButton,
    ToggleButtonGroup,
    Chip,
    RadioGroup,
    Radio
} from '@mui/material';
import {
    Save as SaveIcon,
    Person as PersonIcon,
    Notifications as NotificationsIcon,
    Palette as PaletteIcon,
    Dashboard as DashboardIcon,
    School as SchoolIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    Language as LanguageIcon,
    DarkMode as DarkModeIcon,
    LightMode as LightModeIcon,
    SettingsBrightness as AutoIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const SectionCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(3),
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[8]
    }
}));

const ThemeToggleButton = styled(ToggleButton)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        }
    }
}));

const WidgetChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    '&.MuiChip-outlined': {
        borderColor: theme.palette.primary.light,
        color: theme.palette.primary.main,
    },
    '&.MuiChip-filled': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }
}));

function UserSettingsPage() {
    const [settings, setSettings] = useState({
        profile: {
            showEmail: true,
            showPhone: true,
            showAddress: false,
            privacy: 'public'
        },
        notifications: {
            email: true,
            sms: false,
            push: true,
            desktop: false,
            weeklyReport: true,
            assignmentReminders: true,
            attendanceReminders: false,
            examNotifications: true
        },
        preferences: {
            language: 'en',
            timezone: 'UTC',
            theme: 'light',
            fontSize: 16
        },
        academics: {
            gradeReleaseMethod: 'manual',
            assignmentDeadlineReminder: 24,
            studyMode: false,
            showGrades: true,
            childUpdates: true,
            attendanceAlerts: 3
        },
        dashboard: {
            widgets: {
                recentAssignments: true,
                upcomingExams: true,
                attendanceStats: true,
                gradesOverview: true,
                announcements: true,
                calendar: true,
                performanceMetrics: false
            },
            layout: 'grid',
            defaultView: 'overview'
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
                message: 'User settings saved successfully!',
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

    const toggleWidget = (widget: string) => {
        handleChange(`dashboard.widgets.${widget}`, !settings.dashboard.widgets[widget as keyof typeof settings.dashboard.widgets]);
    };

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'zh', name: '中文' },
        { code: 'ja', name: '日本語' }
    ];

    const timezones = [
        'UTC',
        'America/New_York',
        'America/Los_Angeles',
        'Europe/London',
        'Europe/Paris',
        'Asia/Tokyo',
        'Asia/Shanghai',
        'Australia/Sydney'
    ];

    const widgets = [
        { id: 'recentAssignments', label: 'Recent Assignments', icon: '📝' },
        { id: 'upcomingExams', label: 'Upcoming Exams', icon: '📚' },
        { id: 'attendanceStats', label: 'Attendance Stats', icon: '📊' },
        { id: 'gradesOverview', label: 'Grades Overview', icon: '🏆' },
        { id: 'announcements', label: 'Announcements', icon: '📢' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'performanceMetrics', label: 'Performance Metrics', icon: '📈' }
    ];

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="primary" />
                    Personal Settings
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
                        fontWeight: 600,
                        background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #FF5252 30%, #FF7043 90%)',
                        }
                    }}
                >
                    {isSaving ? 'Saving...' : 'Save Personal Settings'}
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Profile & Privacy */}
                <Grid item xs={12} md={4}>
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <PersonIcon color="primary" />
                                Profile & Privacy
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Privacy Settings
                                </Typography>
                                <RadioGroup
                                    value={settings.profile.privacy}
                                    onChange={(e) => handleChange('profile.privacy', e.target.value)}
                                >
                                    <FormControlLabel value="public" control={<Radio />} label="Public" />
                                    <FormControlLabel value="private" control={<Radio />} label="Private" />
                                    <FormControlLabel value="contacts" control={<Radio />} label="Contacts Only" />
                                </RadioGroup>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Visibility Settings
                                </Typography>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.profile.showEmail}
                                            onChange={(e) => handleChange('profile.showEmail', e.target.checked)}
                                        />
                                    }
                                    label="Show Email"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.profile.showPhone}
                                            onChange={(e) => handleChange('profile.showPhone', e.target.checked)}
                                        />
                                    }
                                    label="Show Phone"
                                />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.profile.showAddress}
                                            onChange={(e) => handleChange('profile.showAddress', e.target.checked)}
                                        />
                                    }
                                    label="Show Address"
                                />
                            </Box>
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
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.academics.studyMode}
                                                onChange={(e) => handleChange('academics.studyMode', e.target.checked)}
                                            />
                                        }
                                        label="Study Mode"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.academics.showGrades}
                                                onChange={(e) => handleChange('academics.showGrades', e.target.checked)}
                                            />
                                        }
                                        label="Show Grades"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Assignment Reminder
                                    </Typography>
                                    <Slider
                                        value={settings.academics.assignmentDeadlineReminder}
                                        onChange={(_, value) => handleChange('academics.assignmentDeadlineReminder', value)}
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
                                        valueLabelFormat={(value) => `${value}h before`}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>
                </Grid>

                {/* Preferences */}
                <Grid item xs={12} md={4}>
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <PaletteIcon color="primary" />
                                Preferences
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Theme
                                </Typography>
                                <ToggleButtonGroup
                                    value={settings.preferences.theme}
                                    exclusive
                                    onChange={(e, value) => handleChange('preferences.theme', value)}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                >
                                    <ThemeToggleButton value="light" sx={{ flex: 1 }}>
                                        <LightModeIcon sx={{ mr: 1 }} />
                                        Light
                                    </ThemeToggleButton>
                                    <ThemeToggleButton value="dark" sx={{ flex: 1 }}>
                                        <DarkModeIcon sx={{ mr: 1 }} />
                                        Dark
                                    </ThemeToggleButton>
                                    <ThemeToggleButton value="auto" sx={{ flex: 1 }}>
                                        <AutoIcon sx={{ mr: 1 }} />
                                        Auto
                                    </ThemeToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Language
                                </Typography>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Language</InputLabel>
                                    <Select
                                        value={settings.preferences.language}
                                        label="Language"
                                        onChange={(e) => handleChange('preferences.language', e.target.value)}
                                        startAdornment={<LanguageIcon sx={{ mr: 1, color: 'action.active' }} />}
                                    >
                                        {languages.map((lang) => (
                                            <MenuItem key={lang.code} value={lang.code}>
                                                {lang.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Timezone
                                </Typography>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Timezone</InputLabel>
                                    <Select
                                        value={settings.preferences.timezone}
                                        label="Timezone"
                                        onChange={(e) => handleChange('preferences.timezone', e.target.value)}
                                    >
                                        {timezones.map((tz) => (
                                            <MenuItem key={tz} value={tz}>{tz}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Font Size: {settings.preferences.fontSize}px
                                </Typography>
                                <Slider
                                    value={settings.preferences.fontSize}
                                    onChange={(_, value) => handleChange('preferences.fontSize', value)}
                                    min={12}
                                    max={24}
                                    step={1}
                                    marks={[
                                        { value: 12, label: 'Small' },
                                        { value: 16, label: 'Medium' },
                                        { value: 20, label: 'Large' },
                                        { value: 24, label: 'XL' }
                                    ]}
                                    valueLabelDisplay="auto"
                                />
                            </Box>
                        </CardContent>
                    </SectionCard>

                    {/* Dashboard Settings */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <DashboardIcon color="primary" />
                                Dashboard Layout
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Layout Style
                                </Typography>
                                <ToggleButtonGroup
                                    value={settings.dashboard.layout}
                                    exclusive
                                    onChange={(e, value) => handleChange('dashboard.layout', value)}
                                    fullWidth
                                >
                                    <ToggleButton value="grid">Grid View</ToggleButton>
                                    <ToggleButton value="list">List View</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Default View
                                </Typography>
                                <ToggleButtonGroup
                                    value={settings.dashboard.defaultView}
                                    exclusive
                                    onChange={(e, value) => handleChange('dashboard.defaultView', value)}
                                    fullWidth
                                >
                                    <ToggleButton value="overview">Overview</ToggleButton>
                                    <ToggleButton value="academics">Academics</ToggleButton>
                                    <ToggleButton value="schedule">Schedule</ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </CardContent>
                    </SectionCard>
                </Grid>

                {/* Notifications & Dashboard Widgets */}
                <Grid item xs={12} md={4}>
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <NotificationsIcon color="primary" />
                                Notifications
                            </Typography>

                            <Grid container spacing={1}>
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
                                                checked={settings.notifications.push}
                                                onChange={(e) => handleChange('notifications.push', e.target.checked)}
                                            />
                                        }
                                        label="Push Notifications"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.notifications.weeklyReport}
                                                onChange={(e) => handleChange('notifications.weeklyReport', e.target.checked)}
                                            />
                                        }
                                        label="Weekly Reports"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.notifications.assignmentReminders}
                                                onChange={(e) => handleChange('notifications.assignmentReminders', e.target.checked)}
                                            />
                                        }
                                        label="Assignment Reminders"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={settings.notifications.examNotifications}
                                                onChange={(e) => handleChange('notifications.examNotifications', e.target.checked)}
                                            />
                                        }
                                        label="Exam Notifications"
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </SectionCard>

                    {/* Dashboard Widgets */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                <DashboardIcon color="primary" />
                                Dashboard Widgets
                            </Typography>

                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Select widgets to display on your dashboard:
                            </Typography>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                {widgets.map((widget) => (
                                    <WidgetChip
                                        key={widget.id}
                                        label={`${widget.icon} ${widget.label}`}
                                        variant={settings.dashboard.widgets[widget.id as keyof typeof settings.dashboard.widgets] ? 'filled' : 'outlined'}
                                        onClick={() => toggleWidget(widget.id)}
                                        clickable
                                        sx={{ fontSize: '0.875rem' }}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </SectionCard>

                    {/* Quick Actions */}
                    <SectionCard>
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                Quick Actions
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        sx={{ py: 1 }}
                                    >
                                        Export Settings
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        fullWidth
                                        size="small"
                                        sx={{ py: 1 }}
                                    >
                                        Reset to Defaults
                                    </Button>
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

export default UserSettingsPage;