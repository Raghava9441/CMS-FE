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
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Icon icon="mdi-light:alert" width={50} height={50} style={{ color: theme.palette.primary.main }} rotate={4} data-flip="vertical" />
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
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
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
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
                    <Grid container>
                        <Grid item xs>
                            <Link to="#">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={appRoutes.REGISTER}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;