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

interface TeacherFormValues {
    _id: string;
    userId: string;
    name: string;
    phone: string;
    email: string;
    organizationId: string;
    departments?: string[];
    subjects?: string[];
    qualifications?: string;
    experience?: number;
    officeHours?: string;
    coursesTaught?: string[];
    performanceReviews?: string[];
    specialResponsibilities?: string;
    createdAt?: Dayjs | null;
    updatedAt?: Dayjs | null;
}

interface TeacherFormProps {
    initialValues?: Partial<TeacherFormValues>;
    onSubmit: SubmitHandler<TeacherFormValues>;
    onClose: () => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const { data } = useSelector((state: RootState) => state.user);
    const organizations = data?.organizations?.map(org => ({ id: org._id, name: org.name }));
    const users = data?.users
    console.log(users)
    const defaultValues: TeacherFormValues = {
        _id: '',
        userId: '',
        name: '',
        phone: '',
        email: '',
        organizationId: '',
        departments: [],
        subjects: [],
        qualifications: '',
        experience: 0,
        officeHours: '',
        coursesTaught: [],
        performanceReviews: [],
        specialResponsibilities: '',
        createdAt: null,
        updatedAt: null,
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<TeacherFormValues>({
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

    const onSubmitForm: SubmitHandler<TeacherFormValues> = (data) => {
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
                        name="userId"
                        control={control}
                        rules={{ required: 'User ID is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.userId}>
                                <InputLabel>User ID</InputLabel>
                                <Select
                                    {...field}
                                    label="User ID"
                                    renderValue={(selected) => (
                                        <Typography variant="body2">
                                            {users?.find(user => user._id === selected)?.username}
                                        </Typography>
                                    )}
                                >
                                    {users?.map((user) => (
                                        <MenuItem key={user._id} value={user._id}>
                                            {user.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.userId?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                fullWidth
                                margin="normal"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="phone"
                        control={control}
                        rules={{
                            required: 'Phone is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid phone number"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone Number"
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
                                label="Phone Number"
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
                        name="organizationId"
                        control={control}
                        rules={{ required: 'Organization is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.organizationId}>
                                <InputLabel>Organization</InputLabel>
                                <Select
                                    {...field}
                                    label="Organization"
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
                                <FormHelperText>{errors.organizationId?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Controller
                        name="departments"
                        control={control}
                        rules={{ required: 'Departments is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.departments}>
                                <InputLabel>Departments</InputLabel>
                                <Select
                                    {...field}
                                    label="Departments"
                                    multiple
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Typography key={value} component="span" variant="body2">
                                                    {departments?.find(dep => dep.id === value)?.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {departments?.map((dep: { id: string; name: string }) => (
                                        <MenuItem key={dep.id} value={dep.id}>
                                            {dep.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.departments?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                    <Controller
                        name="subjects"
                        control={control}
                        rules={{ required: 'Subjects is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.subjects}>
                                <InputLabel>Subjects</InputLabel>
                                <Select
                                    {...field}
                                    label="Subjects"
                                    multiple
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Typography key={value} component="span" variant="body2">
                                                    {subjects?.find(sub => sub.id === value)?.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {subjects?.map((sub) => (
                                        <MenuItem key={sub.id} value={sub.id}>
                                            {sub.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.subjects?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid> */}
                <Grid item xs={12} md={6}>
                    <Controller
                        name="qualifications"
                        control={control}
                        rules={{ required: 'Qualifications is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Qualifications"
                                fullWidth
                                margin="normal"
                                error={!!errors.qualifications}
                                helperText={errors.qualifications?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="experience"
                        control={control}
                        rules={{ required: 'Experience is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Experience"
                                fullWidth
                                margin="normal"
                                error={!!errors.experience}
                                helperText={errors.experience?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="officeHours"
                        control={control}
                        rules={{ required: 'Office Hours is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Office Hours"
                                fullWidth
                                margin="normal"
                                error={!!errors.officeHours}
                                helperText={errors.officeHours?.message}
                            />
                        )}
                    />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Controller
                        name="coursesTaught"
                        control={control}
                        rules={{ required: 'Courses Taught is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.coursesTaught}>
                                <InputLabel>Courses Taught</InputLabel>
                                <Select
                                    {...field}
                                    label="Courses Taught"
                                    multiple
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Typography key={value} component="span" variant="body2">
                                                    {coursesTaught?.find(course => course.id === value)?.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {coursesTaught?.map((course) => (
                                        <MenuItem key={course.id} value={course.id}>
                                            {course.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.coursesTaught?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                    <Controller
                        name="performanceReviews"
                        control={control}
                        rules={{ required: 'Performance Reviews is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.performanceReviews}>
                                <InputLabel>Performance Reviews</InputLabel>
                                <Select
                                    {...field}
                                    label="Performance Reviews"
                                    multiple
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Typography key={value} component="span" variant="body2">
                                                    {performanceReviews?.find(review => review.id === value)?.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {performanceReviews?.map((review) => (
                                        <MenuItem key={review.id} value={review.id}>
                                            {review.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.performanceReviews?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid> */}
                <Grid item xs={12} md={6}>
                    <Controller
                        name="specialResponsibilities"
                        control={control}
                        rules={{ required: 'Special Responsibilities is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Special Responsibilities"
                                fullWidth
                                margin="normal"
                                error={!!errors.specialResponsibilities}
                                helperText={errors.specialResponsibilities?.message}
                            />
                        )}
                    />
                </Grid>
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

export default TeacherForm;