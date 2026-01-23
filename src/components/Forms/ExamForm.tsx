import React, { useEffect } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Grid, Button, Box, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Exam } from '../../types/exam.modal';

interface ExamFormValues extends Omit<Exam, 'createdAt' | 'updatedAt' | '__v'> {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    startTime: Dayjs | null;
    endTime: Dayjs | null;
}

interface ExamFormProps {
    initialValues?: Partial<ExamFormValues>;
    onSubmit: SubmitHandler<ExamFormValues>;
    onClose: () => void;
}

const ExamForm: React.FC<ExamFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const defaultValues: ExamFormValues = {
        _id: '',
        name: '',
        description: '',
        subjectId: '',
        courseId: '',
        classId: '',
        teacherId: '',
        duration: 60,
        totalMarks: 100,
        examType: 'quiz',
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        schedule: '',
    };

    const { control, handleSubmit, formState: { errors }, reset } = useForm<ExamFormValues>({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                ...initialValues,
                startDate: initialValues.startDate ? dayjs(initialValues.startDate) : null,
                endDate: initialValues.endDate ? dayjs(initialValues.endDate) : null,
                startTime: initialValues.startDate ? dayjs(initialValues.startDate) : null,
                endTime: initialValues.endDate ? dayjs(initialValues.endDate) : null,
            });
        }
    }, [initialValues, reset]);

    const onSubmitForm: SubmitHandler<ExamFormValues> = (data) => {
        const formattedData = {
            ...data,
            startDate: data.startDate?.format('YYYY-MM-DD') || '',
            endDate: data.endDate?.format('YYYY-MM-DD') || '',
            schedule: `${data.startDate?.format('YYYY-MM-DD')} ${data.startTime?.format('HH:mm')} - ${data.endTime?.format('HH:mm')}`,
        };
        onSubmit(formattedData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Exam name is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Exam Name"
                                size="small"
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
                        name="examType"
                        control={control}
                        rules={{ required: 'Exam type is required' }}
                        render={({ field }) => (
                            <FormControl fullWidth size="small" margin="normal" error={!!errors.examType}>
                                <InputLabel>Exam Type</InputLabel>
                                <Select
                                    {...field}
                                    label="Exam Type"
                                >
                                    <MenuItem value="quiz">Quiz</MenuItem>
                                    <MenuItem value="midterm">Midterm</MenuItem>
                                    <MenuItem value="final">Final</MenuItem>
                                </Select>
                                {errors.examType && <FormHelperText>{errors.examType.message}</FormHelperText>}
                            </FormControl>
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="duration"
                        control={control}
                        rules={{
                            required: 'Duration is required',
                            min: { value: 1, message: 'Duration must be at least 1 minute' }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Duration (minutes)"
                                type="number"
                                size="small"
                                fullWidth
                                margin="normal"
                                error={!!errors.duration}
                                helperText={errors.duration?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="totalMarks"
                        control={control}
                        rules={{
                            required: 'Total marks is required',
                            min: { value: 1, message: 'Total marks must be at least 1' }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Total Marks"
                                type="number"
                                size="small"
                                fullWidth
                                margin="normal"
                                error={!!errors.totalMarks}
                                helperText={errors.totalMarks?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="subjectId"
                        control={control}
                        rules={{ required: 'Subject is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Subject ID"
                                size="small"
                                fullWidth
                                margin="normal"
                                error={!!errors.subjectId}
                                helperText={errors.subjectId?.message}
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
                            <TextField
                                {...field}
                                label="Course ID"
                                size="small"
                                fullWidth
                                margin="normal"
                                error={!!errors.courseId}
                                helperText={errors.courseId?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="classId"
                        control={control}
                        rules={{ required: 'Class is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Class ID"
                                size="small"
                                fullWidth
                                margin="normal"
                                error={!!errors.classId}
                                helperText={errors.classId?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="teacherId"
                        control={control}
                        rules={{ required: 'Teacher is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Teacher ID"
                                size="small"
                                fullWidth
                                margin="normal"
                                error={!!errors.teacherId}
                                helperText={errors.teacherId?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: 'Start date is required' }}
                        render={({ field }) => (
                            <DatePicker
                                label="Start Date"
                                value={field.value}
                                onChange={(date: Dayjs | null) => field.onChange(date)}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.startDate,
                                        helperText: errors.startDate?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: 'End date is required' }}
                        render={({ field }) => (
                            <DatePicker
                                label="End Date"
                                value={field.value}
                                onChange={(date: Dayjs | null) => field.onChange(date)}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.endDate,
                                        helperText: errors.endDate?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="startTime"
                        control={control}
                        rules={{ required: 'Start time is required' }}
                        render={({ field }) => (
                            <TimePicker
                                label="Start Time"
                                value={field.value}
                                onChange={(time: Dayjs | null) => field.onChange(time)}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.startTime,
                                        helperText: errors.startTime?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="endTime"
                        control={control}
                        rules={{ required: 'End time is required' }}
                        render={({ field }) => (
                            <TimePicker
                                label="End Time"
                                value={field.value}
                                onChange={(time: Dayjs | null) => field.onChange(time)}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.endTime,
                                        helperText: errors.endTime?.message,
                                    },
                                }}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size="small"
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                margin="normal"
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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

export default ExamForm;
