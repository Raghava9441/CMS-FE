import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Box,
    Stepper,
    Step,
    StepLabel,
    SelectChangeEvent,
    Input,
} from '@mui/material';
import { userApi } from '@api/api';

// Define types for the User interface
type Role = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT'|'ORGADMIN';
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

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => setUser((prevUser) => ({
                ...prevUser,
                avatar: e.target.result as string,
            }));
            reader.readAsDataURL(file);
        }
    };

    const handleCoverImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => setUser((prevUser) => ({
                ...prevUser,
                coverImage: e.target.result as string,
            }));
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { avatar, coverImage, ...userDataWithoutImages } = user;
        console.log(userDataWithoutImages);
        userApi.register(userDataWithoutImages).then((res) => {
            console.log(res);
        });
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
                            size='small'
                            value={user.username}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="email"
                            label="Email"
                            size='small'
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="fullname"
                            label="Full Name"
                            size='small'
                            value={user.fullname}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Password"
                            type="password"
                            size='small'
                            value={user.password}
                            onChange={handleChange}
                        />
                        <FormControl fullWidth margin="normal">
                            <Select
                                name="role"
                                size='small'
                                value={user.role}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="ADMIN">Admin</MenuItem>
                                <MenuItem value="ORGADMIN">Organization Admin</MenuItem>
                                <MenuItem value="TEACHER">Teacher</MenuItem>
                                <MenuItem value="STUDENT">Student</MenuItem>
                                <MenuItem value="PARENT">Parent</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <Select
                                name="gender"
                                size='small'
                                value={user.gender}
                                variant='outlined'
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
                        <Input
                            fullWidth
                            margin="normal"
                            name="avatar"
                            label="Avatar URL"
                            size='small'
                            type="file"
                            onChange={handleAvatarChange}
                        />
                        <Input
                            fullWidth
                            margin="normal"
                            name="coverImage"
                            label="Cover Image URL"
                            size='small'
                            type="file"
                            onChange={handleCoverImageChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="age"
                            label="Age"
                            size='small'
                            value={user.age}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="organizationId"
                            label="Organization ID"
                            size='small'
                            value={user.organizationId}
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="phone"
                            label="Phone"
                            size='small'
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
                            size='small'
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
                            size='small'
                            value={user.address?.street}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="city"
                            label="City"
                            size='small'
                            value={user.address?.city}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="state"
                            label="State"
                            size='small'
                            value={user.address?.state}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="zip"
                            label="ZIP Code"
                            size='small'
                            value={user.address?.zip}
                            onChange={handleAddressChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="country"
                            label="Country"
                            size='small'
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
                            size='small'
                            value={user.socialLinks?.facebook}
                            onChange={handleSocialLinksChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="twitter"
                            label="Twitter"
                            size='small'
                            value={user.socialLinks?.twitter}
                            onChange={handleSocialLinksChange}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            name="linkedin"
                            label="LinkedIn"
                            size='small'
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
                            <Select
                                name="language"
                                size='small'
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
        <Container component="main" sx={{ display: "flex", alignItems: "center", justifyContent: "center", overflow: 'auto', height: '100%', width: '50%' }} >
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