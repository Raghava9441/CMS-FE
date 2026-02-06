import {
    Avatar, Box, Button, FormControl, FormControlLabel, FormLabel,
    Radio, RadioGroup, TextField, ToggleButton, ToggleButtonGroup,
    Typography, Card, CardContent, Grid, Divider, Stack, IconButton,
    InputAdornment, Paper, Alert, Snackbar, CircularProgress, Tooltip,
    Chip
} from "@mui/material";
import { User } from "@redux/slices/authSlice";
import { RootState } from "@redux/store";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import muiUtils from "@styles/MuiUtils";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CakeIcon from '@mui/icons-material/Cake';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function ProfilePage() {
    const storeUser: User | null = useSelector((state: RootState) => state.auth.user);
    const [user, setUser] = useState<User | null>(storeUser);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (storeUser) {
            setUser(storeUser);
        }
    }, [storeUser]);

    if (!user) {
        return (
            <Box sx={{ ...muiUtils.flexCenter, height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleEdit = () => {
        if (isEditing) {
            saveProfile();
        } else {
            setIsEditing(true);
        }
    };

    const handleCancel = () => {
        setUser(storeUser);
        setIsEditing(false);
    };

    const saveProfile = async () => {
        setIsSaving(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Here you would dispatch an action to update user in store
            // dispatch(updateUser(user));
            setShowSuccess(true);
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to save profile:", error);
            setShowError(true);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setUser({ ...user, dateOfBirth: date.toISOString() });
        }
    };

    return (
        <Box sx={{
            maxWidth: 1200,
            mx: 'auto',
            p: { xs: 2, md: 4 },
            height: '100%',
            overflow: 'auto'
        }}>
            {/* Header */}
            <Paper
                elevation={0}
                sx={{
                    mb: 4,
                    p: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            Profile Settings
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            Manage your personal information and preferences
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {isEditing && (
                            <Button
                                variant="outlined"
                                startIcon={<CancelIcon />}
                                onClick={handleCancel}
                                disabled={isSaving}
                                sx={{
                                    color: 'white',
                                    borderColor: 'rgba(255,255,255,0.3)',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            startIcon={isEditing ? (isSaving ? <CircularProgress size={20} /> : <SaveIcon />) : <EditIcon />}
                            onClick={handleEdit}
                            disabled={isSaving}
                            sx={{
                                backgroundColor: 'white',
                                color: '#764ba2',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.9)'
                                }
                            }}
                        >
                            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                        </Button>
                    </Box>
                </Box>
            </Paper>

            <Grid container spacing={4}>
                {/* Left Column - Profile Info */}
                <Grid item xs={12} md={8}>
                    <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                        <Box sx={{ position: 'relative', height: 160 }}>
                            <Avatar
                                alt="Cover Image"
                                src={user.coverImage}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 0
                                }}
                                variant="square"
                            />
                            <Avatar
                                alt="Profile Picture"
                                src={user.avatar}
                                sx={{
                                    position: 'absolute',
                                    bottom: -60,
                                    left: 40,
                                    width: 120,
                                    height: 120,
                                    border: '4px solid white',
                                    boxShadow: 3
                                }}
                            />
                            {isEditing && (
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: -60,
                                        left: 40,
                                        width: 120,
                                        height: 120,
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        opacity: 0,
                                        '&:hover': { opacity: 1 },
                                        transition: 'opacity 0.3s'
                                    }}
                                >
                                    <EditIcon sx={{ color: 'white', fontSize: 32 }} />
                                </IconButton>
                            )}
                        </Box>

                        <CardContent sx={{ pt: 8, pl: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Full Name"
                                        value={user.fullname}
                                        size="small"
                                        disabled={!isEditing}
                                        onChange={e => setUser({ ...user, fullname: e.target.value })}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Email"
                                        value={user.email}
                                        size="small"
                                        disabled
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Phone Number"
                                        value={user.phone || ''}
                                        onChange={e => setUser({ ...user, phone: e.target.value })}
                                        size="small"
                                        disabled={!isEditing}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Role"
                                        value={user.role}
                                        size="small"
                                        disabled
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BadgeIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        label="Biography"
                                        value={user.biography || ''}
                                        onChange={e => setUser({ ...user, biography: e.target.value })}
                                        size="small"
                                        disabled={!isEditing}
                                        fullWidth
                                        multiline
                                        rows={3}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Address"
                                        value={user.address || ''}
                                        onChange={e => setUser({ ...user, address: e.target.value })}
                                        size="small"
                                        disabled={!isEditing}
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LocationOnIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Organization"
                                        value={user.organizationId || ''}
                                        size="small"
                                        disabled
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BusinessIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ mb: 2 }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Column - Preferences */}
                <Grid item xs={12} md={4}>
                    <Stack spacing={3}>
                        {/* Preferences Card */}
                        <Card elevation={2} sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Preferences
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Notifications
                                    </Typography>
                                    <ToggleButtonGroup
                                        exclusive
                                        value={user.preferences?.notifications}
                                        disabled={!isEditing}
                                        onChange={(e, value) => setUser({
                                            ...user,
                                            preferences: {
                                                ...user.preferences,
                                                notifications: value
                                            }
                                        })}
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    >
                                        <ToggleButton
                                            value="true"
                                            selected={user.preferences?.notifications === true}
                                            sx={{ py: 1 }}
                                        >
                                            <NotificationsIcon sx={{ mr: 1 }} />
                                            On
                                        </ToggleButton>
                                        <ToggleButton
                                            value="false"
                                            selected={user.preferences?.notifications === false}
                                            sx={{ py: 1 }}
                                        >
                                            <NotificationsOffIcon sx={{ mr: 1 }} />
                                            Off
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Language
                                    </Typography>
                                    <TextField
                                        select
                                        value={user.preferences?.language || 'en'}
                                        onChange={e => setUser({
                                            ...user,
                                            preferences: {
                                                ...user.preferences,
                                                language: e.target.value
                                            }
                                        })}
                                        size="small"
                                        disabled={!isEditing}
                                        fullWidth
                                        SelectProps={{
                                            native: true,
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <LanguageIcon color="action" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                        <option value="de">German</option>
                                    </TextField>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Personal Info Card */}
                        <Card elevation={2} sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Personal Information
                                </Typography>

                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Gender
                                    </Typography>
                                    <FormControl component="fieldset" fullWidth>
                                        <RadioGroup
                                            aria-label="gender"
                                            name="gender"
                                            value={user.gender || ''}
                                            onChange={(e) => setUser({
                                                ...user,
                                                gender: e.target.value as "male" | "female" | "other"
                                            })}
                                            row
                                            sx={{ justifyContent: 'space-between' }}
                                        >
                                            <FormControlLabel
                                                value="female"
                                                control={<Radio disabled={!isEditing} />}
                                                label="Female"
                                            />
                                            <FormControlLabel
                                                value="male"
                                                control={<Radio disabled={!isEditing} />}
                                                label="Male"
                                            />
                                            <FormControlLabel
                                                value="other"
                                                control={<Radio disabled={!isEditing} />}
                                                label="Other"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                        Date of Birth
                                    </Typography>
                                    {isEditing ? (
                                        <DatePicker
                                            selected={user.dateOfBirth ? new Date(user.dateOfBirth) : null}
                                            onChange={handleDateChange}
                                            dateFormat="MMMM d, yyyy"
                                            customInput={
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <CakeIcon color="action" />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            }
                                        />
                                    ) : (
                                        <TextField
                                            value={user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }) : 'Not specified'}
                                            size="small"
                                            disabled
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <CakeIcon color="action" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Status Card */}
                        <Card elevation={2} sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                                    Account Status
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Chip
                                        label={user.status || 'Active'}
                                        color={user.status === 'Active' ? 'success' : 'default'}
                                        variant="filled"
                                        sx={{ fontWeight: 600 }}
                                    />
                                    <Typography variant="body2" color="text.secondary">
                                        Last updated: {new Date().toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>

            {/* Success Snackbar */}
            <Snackbar
                open={showSuccess}
                autoHideDuration={3000}
                onClose={() => setShowSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Profile updated successfully!
                </Alert>
            </Snackbar>

            {/* Error Snackbar */}
            <Snackbar
                open={showError}
                autoHideDuration={3000}
                onClose={() => setShowError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Failed to update profile. Please try again.
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ProfilePage;