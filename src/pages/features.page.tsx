// AdminFeatureFlagsPage.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Button, Box, Snackbar, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useFeatureFlag } from '@hooks/useFeatureFlag';
import { Permission } from '@models/Permission.types';
import PermissionsTable from '@components/featureControl/PermissionsTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { authActions } from '@redux/actions/auth.actions';



export default function AdminFeatureFlagsPage() {
    const initialPermissions: Permission[] = useSelector((state: RootState) => state.auth.permissions);
    console.log("initialPermissions", initialPermissions)
    const { _id } = useSelector((state: RootState) => state.auth.user);
    const { permissions, toggle, setPermissions } = useFeatureFlag(initialPermissions);
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        setPermissions(initialPermissions);
    }, [initialPermissions]);

    const handleSave = () => {
        // PUT /api/permissions  permissions
        console.table(permissions);
        console.log(_id)
        dispatch(authActions.updatePermissions(permissions, _id));

        setOpen(true);
    };

    return (
        <Container maxWidth="md" sx={{ overflowY: "auto", height: "100%" }}>
            <Typography variant="h4" gutterBottom>
                Feature Permissions
            </Typography>

            <Box sx={{ mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    disabled={permissions.length === 0}
                >
                    Save changes
                </Button>
            </Box>

            <PermissionsTable permissions={permissions} onToggle={toggle} />

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setOpen(false)}>
                    Permissions saved!
                </Alert>
            </Snackbar>
        </Container>
    );
}