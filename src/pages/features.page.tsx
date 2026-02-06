import React, { useEffect, useState } from 'react';
import {
    Container,
    Button,
    Box,
    LinearProgress,
    Chip,
    Paper,
    Tooltip,
    IconButton,
    Fade,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useFeatureFlag } from '@hooks/useFeatureFlag';
import { Permission } from '@models/Permission.types';
import PermissionsTable from '@components/featureControl/PermissionsTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { authActions } from '@redux/actions/auth.actions';
import { ShowSnackbar } from '@redux/slices/authSlice';

export default function AdminFeatureFlagsPage() {
    const initialPermissions: Permission[] = useSelector((state: RootState) => state.auth.permissions);
    const { _id } = useSelector((state: RootState) => state.auth.user);
    const [isLoading, setIsLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const { permissions, toggle, setPermissions } = useFeatureFlag(initialPermissions);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setPermissions(initialPermissions);
    }, [initialPermissions]);

    useEffect(() => {
        const hasChanged = JSON.stringify(permissions) !== JSON.stringify(initialPermissions);
        setHasChanges(hasChanged);
    }, [permissions, initialPermissions]);

    const handleSave = async () => {
        setIsLoading(true);
        try {
            await dispatch(authActions.updatePermissions(permissions, _id));
            dispatch(
                ShowSnackbar({
                    severity: 'success',
                    message: "Permissions saved successfully!",
                })
            );
            setOpen(true);
            setHasChanges(false);
        } catch (error) {
            dispatch(
                ShowSnackbar({
                    severity: 'error',
                    message: "Error saving permissions. Please try again.",
                })
            );
            setOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefresh = () => {
        setPermissions(initialPermissions);
        dispatch(
            ShowSnackbar({
                severity: 'info',
                message: "Changes discarded. Original permissions restored.",
            })
        );
        setOpen(true);
        setHasChanges(false);
    };

    return (
        <Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', p: 0 }} style={{ padding: 0 }}>
            {/* Header with Breadcrumbs */}
            {/* <Box sx={{ mb: 3 }}>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        color="inherit"
                        href="/admin"
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        <AdminPanelSettingsIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Admin
                    </Link>
                    <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <FlagIcon sx={{ mr: 0.5 }} fontSize="small" />
                        Feature Permissions
                    </Typography>
                </Breadcrumbs>

                <Card
                    elevation={0}
                    sx={{
                        background: 'linear-gradient(45deg, #1976d2 0%, #2196f3 100%)',
                        color: 'white',
                        borderRadius: 2,
                        mb: 3
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                                    Feature Permissions
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    Configure user permissions for application features
                                </Typography>
                            </Grid>
                            <Grid item>
                                <FlagIcon sx={{ fontSize: 48, opacity: 0.8 }} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box> */}

            <Paper
                elevation={1}
                sx={{
                    p: 1,
                    mb: 3,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        label={`${permissions.length} Features`}
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                    {hasChanges && (
                        <Fade in={hasChanges}>
                            <Chip
                                label="Unsaved Changes"
                                color="warning"
                                size="small"
                                sx={{ animation: 'pulse 2s infinite' }}
                            />
                        </Fade>
                    )}
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Discard changes">
                        <IconButton
                            onClick={handleRefresh}
                            disabled={!hasChanges || isLoading}
                            size="small"
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1
                            }}
                        >
                            <RefreshIcon />
                        </IconButton>
                    </Tooltip>

                    <Button
                        variant="contained"
                        startIcon={<SaveIcon />}
                        onClick={handleSave}
                        disabled={!hasChanges || permissions.length === 0 || isLoading}
                        sx={{
                            background: 'linear-gradient(45deg, #2e7d32 0%, #4caf50 100%)',
                            color: 'white',
                            px: 3,
                            borderRadius: 2,
                            '&:hover': {
                                background: 'linear-gradient(45deg, #1b5e20 0%, #388e3c 100%)',
                            },
                            '&:disabled': {
                                background: '#e0e0e0',
                            }
                        }}
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Box>
            </Paper>

            {isLoading && (
                <LinearProgress
                    sx={{
                        mb: 2,
                        borderRadius: 1,
                        height: 4
                    }}
                />
            )}

            <Box sx={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
                <Fade in={!isLoading}>
                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <PermissionsTable permissions={permissions} onToggle={toggle} />
                    </Box>
                </Fade>
            </Box>
        </Container>
    );
}