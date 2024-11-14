import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    // Link,
    Grid,
    CircularProgress,
    useTheme,
} from '@mui/material';
import { useNotifications } from '@toolpad/core/useNotifications';
import appRoutes from '../routes/routePaths';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { authservice } from '../api/auth.api';
import { authActions } from '../redux/actions/auth.actions';
import { Icon } from '@iconify-icon/react';
import SchoolIcon from '@mui/icons-material/School';
import { LoginIcon } from '@assets/icons';

/**
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 */
interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * 
 * hook to display a notification after form submission.
 * 
 * @returns The LoginPage component.
 */
const LoginPage: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.auth);

    const [credentials, setCredentials] = useState<LoginCredentials>({
        email: '',
        password: '',
    });
    const notifications = useNotifications();

    /**
     * 
     * This function updates the state of the credentials based on the input field that triggered the event.
     * 
     * @param {ChangeEvent<HTMLInputElement>} event - The event triggered by the input field change.
     */
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    /**
     * 
     * and displays a notification after submission.
     * 
     * @param {FormEvent<HTMLFormElement>} event - The event triggered by the form submission.
     */
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(authActions.loginUser(credentials, navigate));
            // notifications.show('Consider yourself notified!', {
            //     autoHideDuration: 3000,
            //     severity: 'warning',
            // });
        } catch (error: unknown) {
        }
    };

    return (
        <Container component="main" maxWidth="xl" sx={{ maxWidth: { xs: '90%', sm: '80%', md: 'md' }, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', position: 'relative' }}>
            <SchoolIcon sx={{ fontSize: 496, color: theme.palette.primary.main, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            <Paper elevation={3} sx={{ p: { xs: 2, sm: 3, md: 4 }, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: { xs: 'column', sm: 'row' }, width: '100%', zIndex: 10, opacity: 0.95, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Box sx={{ width: { xs: '100%', sm: '50%' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LoginIcon width="100%" height="auto" fill={theme.palette.primary.main} />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: '50%' }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
                            <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>ScholarSync</Typography>  <SchoolIcon sx={{ fontSize: 48, color: theme.palette.primary.main }} />
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                margin="normal"
                                required
                                size='small'
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={credentials.email}
                                onChange={handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                size='small'
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={credentials.password}
                                onChange={handleChange}
                            />
                            <Grid item sx={{ fontSize: 'small', width: '100%', textAlign: "right", }}>
                                <Link to={appRoutes.FORGOT_PASSWORD}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <><CircularProgress size={24} sx={{ mr: 1 }} /> Sign In</>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                            <Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Grid item sx={{ fontSize: 'small' }}>
                                    <Link to={appRoutes.REGISTER}>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;