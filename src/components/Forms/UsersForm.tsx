import React, { useEffect } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Grid, Button, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText, Switch, FormControlLabel, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

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
    instagram?: string;
}

interface Preferences {
    notifications?: boolean;
    language?: string;
    theme?: string;
    timezone?: string;
    currency?: string;
    dateFormat?: string;
}

interface Organization {
    id: string;
    name: string;
}

interface UserFormValues {
    _id: string;
    organizations: Organization | Organization[];
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    coverImage?: string;
    age?: string;
    role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
    gender: 'male' | 'female' | 'other';
    phone?: string;
    address?: Address;
    status?: 'active' | 'inactive';
    dateOfBirth?: Dayjs | null;
    biography?: string;
    permissions?: string[];
    socialLinks?: SocialLinks;
    preferences?: Preferences;
    createdAt?: Dayjs | null;
    updatedAt?: Dayjs | null;
}

interface UserFormProps {
    initialValues?: Partial<UserFormValues>;
    onSubmit: SubmitHandler<UserFormValues>;
    onClose: () => void;
}

const UsersForm: React.FC<UserFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const { data } = useSelector((state: RootState) => state.organization);
    const organizations = data?.organizations?.map(org => ({ id: org._id, name: org.name }));

    const defaultValues: UserFormValues = {
        _id: '',
        organizations: organizations || [],
        username: '',
        email: '',
        fullname: '',
        avatar: '',
        coverImage: '',
        age: '',
        role: 'STUDENT',
        gender: 'male',
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
            instagram: '',
        },
        preferences: {
            notifications: true,
            language: 'en',
            theme: 'light',
            timezone: 'Asia/Kolkata',
            currency: 'INR',
            dateFormat: 'DD/MM/YYYY',
        },
        createdAt: null,
        updatedAt: null,
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<UserFormValues>({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                ...initialValues,
                dateOfBirth: initialValues.dateOfBirth ? dayjs(initialValues.dateOfBirth) : null,
                createdAt: initialValues.createdAt ? dayjs(initialValues.createdAt) : null,
                updatedAt: initialValues.updatedAt ? dayjs(initialValues.updatedAt) : null,
            });
        }
    }, [initialValues, reset]);

    const onSubmitForm: SubmitHandler<UserFormValues> = (data) => {
        const formattedData = {
            ...data,
            dateOfBirth: data.dateOfBirth ? data.dateOfBirth.format('YYYY-MM-DD') : null,
            createdAt: data.createdAt ? data.createdAt.format('YYYY-MM-DD') : null,
            updatedAt: data.updatedAt ? data.updatedAt.format('YYYY-MM-DD') : null,
        };
        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: 'Username is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Username"
                                fullWidth
                                margin="normal"
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="fullname"
                        control={control}
                        rules={{ required: 'Full name is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Full Name"
                                fullWidth
                                margin="normal"
                                error={!!errors.fullname}
                                helperText={errors.fullname?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="organizations"
                        control={control}
                        rules={{ required: 'At least one organization is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.organizations}>
                                <InputLabel>Organizations</InputLabel>
                                <Select
                                    {...field}
                                    multiple
                                    label="Organizations"
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Typography key={value} component="span" variant="body2">
                                                    {organizations?.find(org => org.id === value)?.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {organizations?.map((org) => (
                                        <MenuItem key={org.id} value={org.id}>
                                            {org.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.organizations?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="age"
                        control={control}
                        rules={{
                            required: 'Age is required',
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Age must be a number"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Age"
                                fullWidth
                                margin="normal"
                                error={!!errors.age}
                                helperText={errors.age?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="role"
                        control={control}
                        rules={{ required: 'Role is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.role}>
                                <InputLabel>Role</InputLabel>
                                <Select {...field} label="Role">
                                    <MenuItem value="ADMIN">Admin</MenuItem>
                                    <MenuItem value="TEACHER">Teacher</MenuItem>
                                    <MenuItem value="STUDENT">Student</MenuItem>
                                    <MenuItem value="PARENT">Parent</MenuItem>
                                </Select>
                                <FormHelperText>{errors.role?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: 'Gender is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.gender}>
                                <InputLabel>Gender</InputLabel>
                                <Select {...field} label="Gender">
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                                <FormHelperText>{errors.gender?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid phone number"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone"
                                fullWidth
                                margin="normal"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Avatar URL"
                                fullWidth
                                margin="normal"
                                error={!!errors.avatar}
                                helperText={errors.avatar?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="coverImage"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Cover Image URL"
                                fullWidth
                                margin="normal"
                                error={!!errors.coverImage}
                                helperText={errors.coverImage?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="dateOfBirth"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Date of Birth"
                                value={field.value}
                                onChange={(date: Dayjs | null) => field.onChange(date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.dateOfBirth,
                                        helperText: errors.dateOfBirth?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.status}>
                                <InputLabel>Status</InputLabel>
                                <Select {...field} label="Status">
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                </Select>
                                <FormHelperText>{errors.status?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="biography"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Biography"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                error={!!errors.biography}
                                helperText={errors.biography?.message}
                            />
                        )}
                    />
                </Grid>
                {/* Address fields */}
                <Grid item xs={12}>
                    <Typography variant="h6">Address</Typography>
                </Grid>
                {['street', 'city', 'state', 'zip', 'country'].map((field) => (
                    <Grid item xs={12} md={6} key={field}>
                        <Controller
                            name={`address.${field}` as keyof Address}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    fullWidth
                                    margin="normal"
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.address?.[field as keyof Address]}
                                    helperText={errors.address?.[field as keyof Address]?.message}
                                />
                            )}
                        />
                    </Grid>
                ))}
                {/* Social Links */}
                <Grid item xs={12}>
                    <Typography variant="h6">Social Links</Typography>
                </Grid>
                {['facebook', 'twitter', 'linkedin', 'instagram'].map((field) => (
                    <Grid item xs={12} md={6} key={field}>
                        <Controller
                            name={`socialLinks.${field}` as keyof SocialLinks}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    fullWidth
                                    margin="normal"
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.socialLinks?.[field as keyof SocialLinks]}
                                    helperText={errors.socialLinks?.[field as keyof SocialLinks]?.message}
                                />
                            )}
                        />
                    </Grid>
                ))}
                {/* Preferences */}
                <Grid item xs={12}>
                    <Typography variant="h6">Preferences</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="preferences.notifications"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={value}
                                        onChange={onChange}
                                        color="primary"
                                    />
                                }
                                label="Notifications"
                            />
                        )}
                    />
                </Grid>
                {['language', 'theme', 'timezone', 'currency', 'dateFormat'].map((field) => (
                    <Grid item xs={12} md={6} key={field}>
                        <Controller
                            name={`preferences.${field}` as keyof Preferences}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    fullWidth
                                    margin="normal"
                                    value={value}
                                    onChange={onChange}
                                    error={!!errors.preferences?.[field as keyof Preferences]}
                                    helperText={errors.preferences?.[field as keyof Preferences]?.message}
                                />
                            )}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                        <Button variant="outlined" color="primary" onClick={() => { reset(defaultValues); onClose(); }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
};

export default UsersForm;