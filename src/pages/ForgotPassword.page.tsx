import { Button, Grid, Divider, TextField, Typography } from "@mui/material";
// import Grid from '@mui/material/Grid2';
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { authActions } from "@redux/actions/auth.actions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import forgotPassword from "@assets/forgot_password.svg";

import { ForgotPassword } from "@assets/icons"

type Props = {}

const useStyles = {
    container: {
        minHeight: '100vh',
        padding: { xs: '1rem', sm: '2rem' },
    },
    formContainer: {
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: { xs: '1.5rem', sm: '2rem', md: '3rem' },
        margin: 'auto',
        maxWidth: '1200px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '1rem',
    },
    divider: {
        width: '100%',
        height: '1px',
        backgroundColor: 'primary.main',
        marginBottom: '2rem',
    },
    image: {
        width: '100%',
        maxWidth: '400px',
        height: 'auto',
        display: 'block',
        margin: { xs: '1rem auto', md: '0 auto', width: '60%', height: '250px' },
    },
    title: {
        color: 'primary.main',
        marginBottom: '1rem',
        fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
        lineHeight: '1.2',
    },
    description: {
        marginBottom: '1.5rem',
    },
    form: {
        width: '100%',
    },
    emailInput: {
        marginBottom: '1.5rem',
    },
    submitButton: {
        padding: '0.75rem',
    },
};

function ForgotPasswordPage({ }: Props) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState<{ email: string }>({
        email: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(credentials);
        try {
            // TODO: Send email with reset password link
            // dispatch(authActions.loginUser(credentials, navigate));
            // localStorage.setItem('refreshToken', result.data.refreshToken);
            // navigate(appRoutes.DASHBOARD);
        } catch (error: unknown) {
            console.log(error);
        }
    };

    return (
        <Grid container sx={useStyles.container} alignItems="center" justifyContent="center">
            <Grid item xs={12} sm={10} md={8}>
                <Grid container sx={useStyles.formContainer}>
                    {/* Header */}
                    <Grid item xs={12} sx={useStyles.header}>
                        <Typography variant="h5">Forgot Password</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={useStyles.divider} />
                    </Grid>

                    {/* Content */}
                    <Grid container spacing={4}>
                        {/* Image Section */}
                        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center">
                            {/* <img
                                src={forgotPassword}
                                alt="forgot-password"
                            // style={useStyles.image}4
                            /> */}
                            <ForgotPassword width="100%" height="auto" />
                        </Grid>

                        {/* Form Section */}
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" sx={useStyles.title}>
                                Forgot<br /> Password?
                            </Typography>

                            <Typography variant="body1" sx={useStyles.description}>
                                Enter your email address and we will send you a link to reset your password.
                            </Typography>

                            <form onSubmit={handleSubmit} style={useStyles.form}>
                                <TextField
                                    sx={useStyles.emailInput}
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={credentials.email}
                                    onChange={handleChange}
                                />

                                <Button
                                    sx={useStyles.submitButton}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                >
                                    Send Reset Link
                                </Button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default ForgotPasswordPage;