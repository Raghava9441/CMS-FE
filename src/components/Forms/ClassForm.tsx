import React, { useEffect } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Grid, Button, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText, Typography } from '@mui/material';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

interface Schedule {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
}

interface ClassFormValues {
    _id: string;
    name: string;
    description: string;
    courseId: string;
    classTeacherId: string;
    studentIds: string[];
    organizationId: string;
    schedule: Schedule[];
    classroom: string;
    credits: number;
    maxCapacity: number;
    currentEnrollment: number;
    supervisorId: string;
    academicYear: string;
    departmentId: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

interface ClassFormProps {
    initialValues?: Partial<ClassFormValues>;
    onSubmit: SubmitHandler<ClassFormValues>;
    onClose: () => void;
}

const ClassForm: React.FC<ClassFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const { courses } = useSelector((state: RootState) => state.course);
    const { data: teachersData } = useSelector((state: RootState) => state.teacher);
    const { data: studentsData } = useSelector((state: RootState) => state.student);
    // const { departments } = useSelector((state: RootState) => state.department);
    const { data: organizationsData } = useSelector((state: RootState) => state.organization);

    const teachers = teachersData?.teachers || [];
    const students = studentsData?.students || [];
    const organizations = organizationsData?.organizations || [];

    const defaultValues: ClassFormValues = {
        _id: '',
        name: '',
        description: '',
        courseId: '',
        classTeacherId: '',
        studentIds: [],
        organizationId: '',
        schedule: [],
        classroom: '',
        credits: 3,
        maxCapacity: 30,
        currentEnrollment: 0,
        supervisorId: '',
        academicYear: '',
        departmentId: '',
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ClassFormValues>({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                ...initialValues,
            });
        }
    }, [initialValues, reset]);

    const onSubmitForm: SubmitHandler<ClassFormValues> = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Class name is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Class Name"
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
                        name="description"
                        control={control}
                        rules={{ required: 'Description is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="courseId"
                        control={control}
                        rules={{ required: 'Course is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.courseId}>
                                <InputLabel>Course</InputLabel>
                                <Select
                                    {...field}
                                    label="Course"
                                    renderValue={(selected) => (
                                        <Typography variant="body2">
                                            {courses.find(course => course._id === selected)?._id}
                                        </Typography>
                                    )}
                                >
                                    {/* {courses.map((course) => (
                                        <MenuItem key={course._id} value={course._id}>
                                            {course._id}
                                        </MenuItem>
                                    ))} */}
                                </Select>
                                <FormHelperText>{errors.courseId?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="classTeacherId"
                        control={control}
                        rules={{ required: 'Class Teacher is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.classTeacherId}>
                                <InputLabel>Class Teacher</InputLabel>
                                <Select
                                    {...field}
                                    label="Class Teacher"
                                    renderValue={(selected) => (
                                        <Typography variant="body2">
                                            {teachers.find(teacher => teacher._id === selected)?._id}
                                        </Typography>
                                    )}
                                >
                                    {teachers.map((teacher) => (
                                        <MenuItem key={teacher._id} value={teacher._id}>
                                            {teacher._id}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.classTeacherId?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                    <Controller
                        name="departmentId"
                        control={control}
                        rules={{ required: 'Department is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.departmentId}>
                                <InputLabel>Department</InputLabel>
                                <Select
                                    {...field}
                                    label="Department"
                                    renderValue={(selected) => (
                                        <Typography variant="body2">
                                            {departments.find(dept => dept._id === selected)?._id}
                                        </Typography>
                                    )}
                                >
                                    {departments.map((dept) => (
                                        <MenuItem key={dept._id} value={dept._id}>
                                            {dept._id}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.departmentId?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid> */}
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
                                        <Typography variant="body2">
                                            {organizations.find(org => org._id === selected)?._id}
                                        </Typography>
                                    )}
                                >
                                    {organizations.map((org) => (
                                        <MenuItem key={org._id} value={org._id}>
                                            {org._id}
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
                        name="classroom"
                        control={control}
                        rules={{ required: 'Classroom is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Classroom"
                                fullWidth
                                margin="normal"
                                error={!!errors.classroom}
                                helperText={errors.classroom?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="academicYear"
                        control={control}
                        rules={{ required: 'Academic Year is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Academic Year"
                                fullWidth
                                margin="normal"
                                error={!!errors.academicYear}
                                helperText={errors.academicYear?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="credits"
                        control={control}
                        rules={{ required: 'Credits are required', min: 1 }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Credits"
                                type="number"
                                fullWidth
                                margin="normal"
                                error={!!errors.credits}
                                helperText={errors.credits?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="maxCapacity"
                        control={control}
                        rules={{ required: 'Max Capacity is required', min: 1 }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Max Capacity"
                                type="number"
                                fullWidth
                                margin="normal"
                                error={!!errors.maxCapacity}
                                helperText={errors.maxCapacity?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="currentEnrollment"
                        control={control}
                        rules={{ required: 'Current Enrollment is required', min: 0 }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Current Enrollment"
                                type="number"
                                fullWidth
                                margin="normal"
                                error={!!errors.currentEnrollment}
                                helperText={errors.currentEnrollment?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="supervisorId"
                        control={control}
                        rules={{ required: 'Supervisor is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal" error={!!errors.supervisorId}>
                                <InputLabel>Supervisor</InputLabel>
                                <Select
                                    {...field}
                                    label="Supervisor"
                                    renderValue={(selected) => (
                                        <Typography variant="body2">
                                            {teachers.find(teacher => teacher._id === selected)?._id}
                                        </Typography>
                                    )}
                                >
                                    {teachers.map((teacher) => (
                                        <MenuItem key={teacher._id} value={teacher._id}>
                                            {teacher._id}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{errors.supervisorId?.message}</FormHelperText>
                            </FormControl>
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

export default ClassForm;
