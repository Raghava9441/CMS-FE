import React, { useEffect } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Grid, Button, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs'; // Import Dayjs

interface OrganizationFormValues {
    _id: string;
    name: string;
    category: string;
    number: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
    logo: string;
    establishedDate: Dayjs | null;
    description: string;
}

interface OrganizationFormProps {
    initialValues?: Partial<OrganizationFormValues>;
    onSubmit: SubmitHandler<OrganizationFormValues>;
    onClose: () => void;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ initialValues, onSubmit, onClose }) => {
    const defaultValues = {
        _id: '',
        name: '',
        category: '',
        number: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        logo: '',
        establishedDate: null,
        description: '',
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm<OrganizationFormValues>({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        if (initialValues) {
            reset({
                ...initialValues,
                establishedDate: initialValues.establishedDate ? dayjs(initialValues.establishedDate) : null,
            });
        }
    }, [initialValues, reset]);


    const onSubmitForm: SubmitHandler<OrganizationFormValues> = (data) => {
        // console.log(data)
        const formattedData = {
            ...data,
            establishedDate: data.establishedDate ? data.establishedDate.format('YYYY-MM-DD') : null,
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
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Name"
                                size='small'
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
                        name="category"
                        control={control}
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Category"
                                size='small'
                                fullWidth
                                margin="normal"
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="number"
                        control={control}
                        rules={{ required: 'Number is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Number"
                                size='small'
                                fullWidth
                                margin="normal"
                                error={!!errors.number}
                                helperText={errors.number?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="contactEmail"
                        control={control}
                        rules={{
                            required: 'Contact email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Contact Email"
                                size='small'
                                fullWidth
                                margin="normal"
                                error={!!errors.contactEmail}
                                helperText={errors.contactEmail?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="contactPhone"
                        control={control}
                        rules={{
                            required: 'Contact phone is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid phone number"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Contact Phone"
                                size='small'
                                fullWidth
                                margin="normal"
                                error={!!errors.contactPhone}
                                helperText={errors.contactPhone?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="website"
                        control={control}
                        rules={{
                            required: 'Website is required',
                            pattern: {
                                value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                                message: "Invalid website URL"
                            }
                        }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Website"
                                size='small'
                                fullWidth
                                margin="normal"
                                error={!!errors.website}
                                helperText={errors.website?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="logo"
                        control={control}
                        rules={{ required: 'Logo URL is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Logo URL"
                                size='small'
                                fullWidth
                                margin="normal"
                                error={!!errors.logo}
                                helperText={errors.logo?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Controller
                        name="establishedDate"
                        control={control}
                        rules={{ required: 'Established date is required' }}
                        render={({ field }) => (
                            <DatePicker
                                label="Established Date"
                                value={field.value} // Use value from react-hook-form (Dayjs object)
                                onChange={(date: Dayjs | null) => field.onChange(date)} // Update value as Dayjs object
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        margin: "normal",
                                        error: !!errors.establishedDate,
                                        helperText: errors.establishedDate?.message,
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
                        rules={{ required: 'Description is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                size='small'
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

export default OrganizationForm;
