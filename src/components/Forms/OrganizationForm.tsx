import React from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Grid, Button } from '@mui/material';

interface OrganizationFormValues {
    name: string;
    category: string;
    number: string;
    contactEmail: string;
    contactPhone: string;
    website: string;
    logo: string;
    establishedDate: string;
    description: string;
}

interface OrganizationFormProps {
    initialValues?: Partial<OrganizationFormValues>;
    onSubmit: SubmitHandler<OrganizationFormValues>;
}

const OrganizationForm: React.FC<OrganizationFormProps> = ({ initialValues, onSubmit }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<OrganizationFormValues>({
        defaultValues: {
            name: '',
            category: '',
            number: '',
            contactEmail: '',
            contactPhone: '',
            website: '',
            logo: '',
            establishedDate: '',
            description: '',
            ...initialValues,
        },
    });

    const onSubmitForm: SubmitHandler<OrganizationFormValues> = (data) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: 'Category is required' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Category"
                                fullWidth
                                margin="normal"
                                error={!!errors.category}
                                helperText={errors.category?.message}
                            />
                        )}
                    />
                </Grid>
                {/* Add other fields similarly */}
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default OrganizationForm;