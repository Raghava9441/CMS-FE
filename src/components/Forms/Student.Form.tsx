import React, { useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Grid, Button, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { DatePicker } from '@mui/x-date-pickers';

interface Address {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}

export interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}

interface StudentFormValues {
    _id: string;
    userId: string;
    name: string;
    phone: string;
    email?: string;
    organizationId: string;
    enrolledCoursesIds?: string[];
    currentClassId?: string;
    dateOfBirth: Dayjs | null;
    address: Address;
    emergencyContacts: EmergencyContact[];
    enrollmentDate: Dayjs | null;
    graduationDate?: Dayjs | null;
    createdAt?: Dayjs | null;
    updatedAt?: Dayjs | null;
}

interface StudentFormProps {
    initialValues?: Partial<StudentFormValues>;
    onSubmit: SubmitHandler<StudentFormValues>;
    onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const { data } = useSelector((state: RootState) => state.user);
    const { data: orgdata } = useSelector((state: RootState) => state.organization);
    const users = data?.users?.filter(x => x.role === 'STUDENT');
    const organizations = orgdata?.organizations;
    const defaultValues: StudentFormValues = {
        _id: '',
        userId: '',
        name: '',
        phone: '',
        email: '',
        organizationId: '',
        enrolledCoursesIds: [],
        currentClassId: '',
        dateOfBirth: null,
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        },
        emergencyContacts: [],
        enrollmentDate: null,
        graduationDate: null,
        createdAt: null,
        updatedAt: null,
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<StudentFormValues>({
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

    const onSubmitForm: SubmitHandler<StudentFormValues> = (data) => {
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
                <Grid item xs={12} md={6}>
                    <Controller
                        name="currentClassId"
                        control={control}
                        rules={{ required: 'Current Class is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Current Class"
                                fullWidth
                                margin="normal"
                                error={!!errors.currentClassId}
                                helperText={errors.currentClassId?.message}
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
                        name="address"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                label="Address"
                                fullWidth
                                margin="normal"
                                value={value}
                                onChange={onChange}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                value={value}
                                onChange={onChange}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Controller
                        name="emergencyContacts"
                        control={control}
                        rules={{ required: 'Emergency Contacts is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.emergencyContacts}>
                                <InputLabel>Emergency Contacts</InputLabel>
                                <Select
                                    {...field}
                                    label="Emergency Contacts"
                                    multiple
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Typography key={value} component="span" variant="body2">
                                                    {emergencyContacts?.find(contact => contact.id === value)?.name}
                                                </Typography>
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {emergencyContacts?.map((contact) => (
                                        <MenuItem key={contact.id} value={contact.id}>
                                            {contact.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.emergencyContacts?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid> */}
                <Grid item xs={12} md={6}>
                    <Controller
                        name="enrollmentDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Enrollment Date"
                                value={field.value}
                                onChange={(date: Dayjs | null) => field.onChange(date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.enrollmentDate,
                                        helperText: errors.enrollmentDate?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="graduationDate"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                label="Graduation Date"
                                value={field.value}
                                onChange={(date: Dayjs | null) => field.onChange(date)}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.graduationDate,
                                        helperText: errors.graduationDate?.message,
                                    },
                                }}
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

export default StudentForm;