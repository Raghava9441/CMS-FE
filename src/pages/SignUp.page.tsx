import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Box,
    Stepper,
    Step,
    StepLabel,
    SelectChangeEvent,
} from '@mui/material';


// Define types for the User interface
type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
type Gender = 'male' | 'female' | 'other';
type Status = 'active' | 'inactive';

interface Address {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}

interface SocialLinks {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
}

interface Preferences {
    notifications?: boolean;
    language?: string;
}

interface User {
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    coverImage?: string;
    age?: string;
    role: Role;
    gender: Gender;
    organizationId: string;
    phone?: string;
    address?: Address;
    status?: Status;
    dateOfBirth?: Date | null;
    biography?: string;
    permissions?: string[];
    socialLinks?: SocialLinks;
    preferences?: Preferences;
    password?: string;
    refreshToken: string;
}

const steps: string[] = ['Basic Info', 'Additional Info', 'Preferences'];

const SignUpPage: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        fullname: '',
        avatar: '',
        coverImage: '',
        age: '',
        role: 'STUDENT',
        gender: 'male',
        organizationId: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        },
        status: 'active',
        dateOfBirth: null,
        biography: '',
        permissions: [],
        socialLinks: {
            facebook: '',
            twitter: '',
            linkedin: '',
        },
        preferences: {
            notifications: true,
            language: 'en',
        },
        password: '',
        refreshToken: '',
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            address: {
                ...prevUser.address,
                [name]: value,
            },
        }));
    };

    const handleSocialLinksChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            socialLinks: {
                ...prevUser.socialLinks,
                [name]: value,
            },
        }));
    };

    const handlePreferencesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            preferences: {
                ...prevUser.preferences,
                [name]: name === 'notifications' ? checked : value,
            },
        }));
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(user);
        // Here you would typically send the user data to your backend
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="username"
                            label="Username"
                            value={user.username}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="email"
                            label="Email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="fullname"
                            label="Full Name"
                            value={user.fullname}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={user.role}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="TEACHER">Teacher</MenuItem>
                                <MenuItem value="STUDENT">Student</MenuItem>
                                <MenuItem value="PARENT">Parent</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                name="gender"
                                value={user.gender}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                );
            case 1:
                return (
                    <>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="avatar"
                            label="Avatar URL"
                            value={user.avatar}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="coverImage"
                            label="Cover Image URL"
                            value={user.coverImage}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="age"
                            label="Age"
                            value={user.age}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="organizationId"
                            label="Organization ID"
                            value={user.organizationId}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="phone"
                            label="Phone"
                            value={user.phone}
                            onChange={handleChange}
                        />
                        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of Birth"
                                value={user.dateOfBirth}
                                onChange={(newValue: Date | null) => {
                                    setUser((prevUser) => ({
                                        ...prevUser,
                                        dateOfBirth: newValue,
                                    }));
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                            />
                        </LocalizationProvider> */}
                        <TextField
                            fullWidth
                            margin="normal"
                            name="biography"
                            label="Biography"
                            multiline
                            rows={4}
                            value={user.biography}
                            onChange={handleChange}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Address
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="street"
                            label="Street"
                            value={user.address?.street}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="city"
                            label="City"
                            value={user.address?.city}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="state"
                            label="State"
                            value={user.address?.state}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="zip"
                            label="ZIP Code"
                            value={user.address?.zip}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="country"
                            label="Country"
                            value={user.address?.country}
                            onChange={handleAddressChange}
                        />
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Social Links
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            name="facebook"
                            label="Facebook"
                            value={user.socialLinks?.facebook}
                            onChange={handleSocialLinksChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="twitter"
                            label="Twitter"
                            value={user.socialLinks?.twitter}
                            onChange={handleSocialLinksChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="linkedin"
                            label="LinkedIn"
                            value={user.socialLinks?.linkedin}
                            onChange={handleSocialLinksChange}
                        />
                        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                            Preferences
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={user.preferences?.notifications}
                                    onChange={handlePreferencesChange}
                                    name="notifications"
                                />
                            }
                            label="Receive Notifications"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Language</InputLabel>
                            <Select
                                name="language"
                                value={user.preferences?.language}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="es">Spanish</MenuItem>
                                <MenuItem value="fr">French</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <Container component="main" sx={{ overflow: 'auto', height: '100%', width: '50%' }} >
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                <Stepper activeStep={activeStep} sx={{ pt: 2, pb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <form onSubmit={handleSubmit}>
                    {renderStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        {activeStep !== 0 && (
                            <Button onClick={handleBack} sx={{ mr: 1 }}>
                                Back
                            </Button>
                        )}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                        >
                            {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default SignUpPage;