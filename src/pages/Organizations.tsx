import {GridColDef, GridRowId, GridRowModesModel} from '@mui/x-data-grid'
import {useEffect, useMemo, useState} from 'react'
import {Box} from '@mui/material'
import {AppDispatch, RootState} from '@redux/store'
import {useDispatch, useSelector} from 'react-redux'
import {hasPermission} from "@utils/auth.ts";
import OrganizationForm from "@components/Forms/OrganizationForm.tsx";
import GenericModal from "@components/GenericModal.tsx";
import {organizationActions} from "@redux/actions/organization.actions.ts";
import {ReusableDataGrid} from "@components/ReusableDataGrid.tsx";

/**
 * Organizations component displays a data grid of organizations with CRUD operations.
 * 
 * @returns The Organizations component.
 */
function Organizations() {

    const dispatch = useDispatch<AppDispatch>()

    /**
     * Defines the columns for the data grid.
     * 
     * @returns An array of column definitions.
     */
    const columns: GridColDef[] = useMemo(() => [
        {field: 'name', headerName: 'Name', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'category', headerName: 'Category', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'number', headerName: 'Number', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'contactEmail', headerName: 'Contact Email', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'contactPhone', headerName: 'Contact Phone', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'website', headerName: 'Website', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'logo', headerName: 'Logo', flex: 1, editable: true, headerClassName: 'theme--header'},
        {
            field: 'establishedDate',
            headerName: 'Established Date',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        {field: 'description', headerName: 'Description', flex: 1, editable: true, headerClassName: 'theme--header'},
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const {data: organizations, loading} = useSelector((state: RootState) => state.organization);
    const user = useSelector((state: RootState) => state.auth.user);

    /**
     * Filters organizations based on user permissions.
     * 
     * @returns An array of accessible organizations.
     */
    const accessibleOrganizations = useMemo(() => {
        if (!user || !organizations?.organizations) return [];
        return organizations.organizations.filter((org) =>
            hasPermission(user, "organizations", "view", org)
        );
    }, [user, organizations]);

    useEffect(() => {
        organizations?.organizations?.length === undefined && dispatch(organizationActions.fetchOrganizations());
    }, [dispatch]);

    /**
     * Handles the add organization action.
     */
    const handleAdd = () => {
        setSelectedRow(null);
        setModalTitle('Add Organization');
        handleOpen();
    };

    /**
     * Handles the edit organization action.
     * 
     * @param {GridRowId} id - The ID of the organization to edit.
     */
    const handleEdit = (id: GridRowId) => {
        const selectedOrganization = organizations?.organizations.find((org: any) => org._id === id); // Find the row by ID
        console.log("selectedOrganization", selectedOrganization)
        setSelectedRow(selectedOrganization);
        setModalTitle('Edit Organization');
        handleOpen()
    };

    /**
     * Handles the delete organization action.
     * 
     * @param {string} id - The ID of the organization to delete.
     */
    const handleDelete = async (id: string) => {
        dispatch(organizationActions.deleteOrganization(id));
    };

    /**
     * Handles the save organization action.
     * 
     * @param {any} data - The data to save.
     */
    const handleSave = async (data: any) => {
        if (selectedRow) {
            dispatch(organizationActions.updateOrganization({id: selectedRow._id, ...data}));
        } else {
            dispatch(organizationActions.createOrganization(data));
        }
        handleClose();
    };

    /**
     * Handles the reload data action.
     */
    const handleReloadData = () => {
        dispatch(organizationActions.fetchOrganizations());
    };

    /**
     * Opens the modal.
     */
    const handleOpen = () => setOpen(true);
    /**
     * Closes the modal.
     */
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <ReusableDataGrid
                columns={columns}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onEdit={handleEdit}
                rows={accessibleOrganizations ?? []}
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel}
                loading={loading}
                reloadData={handleReloadData}
            />
            <GenericModal
                open={open}
                onClose={handleClose}
                title={modalTitle}
            >
                <OrganizationForm
                    initialValues={selectedRow}
                    onSubmit={handleSave}
                    onClose={handleClose}
                />
            </GenericModal>
        </Box>
    );
}

export default Organizations;