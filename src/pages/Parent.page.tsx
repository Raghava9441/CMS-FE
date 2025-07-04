import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@redux/store"
import { ReusableDataGrid } from "@components/ReusableDataGrid";
import { Box } from "@mui/material";
import { ParentActions } from "@redux/actions/parent.actions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GridColDef, GridRowModesModel } from "@mui/x-data-grid";
import GenericModal from "@components/GenericModal";
import ParentForm from "@components/Forms/Parent.Form";
import { usePaginationParams } from "@hooks/usePaginationParams";


function ParentPage() {

    const dispatch = useDispatch<AppDispatch>();
    const parents = useSelector((state: RootState) => state.parent.data);
    const columns: GridColDef[] = useMemo(() => [
        { field: 'name', headerName: 'Parent Name', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'phone', headerName: 'Contact Phone', flex: 1, editable: true, headerClassName: 'theme--header' },
        // {field: 'userId', headerName: 'User', flex: 1, editable: true, headerClassName: 'theme--header'},
        // {field: 'childrenIds', headerName: 'Children', flex: 1, editable: true, headerClassName: 'theme--header'},
        // {
        //     field: 'organizationId',
        //     headerName: 'Organization',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header'
        // },
        // {field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1, editable: true, headerClassName: 'theme--header'},
        // {field: 'address', headerName: 'Address', flex: 1, editable: true, headerClassName: 'theme--header'},
        { field: 'email', headerName: 'Email', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'occupation', headerName: 'Occupation', flex: 1, editable: true, headerClassName: 'theme--header' },
        {
            field: 'relationshipToStudent',
            headerName: 'Relationship to Student',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        // {
        //     field: 'emergencyContacts',
        //     headerName: 'Emergency Contacts',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header'
        // },
        { field: 'createdAt', headerName: 'Created At', flex: 1, editable: false, headerClassName: 'theme--header' },
        { field: 'updatedAt', headerName: 'Updated At', flex: 1, editable: false, headerClassName: 'theme--header' },
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [modalTitle, setModalTitle] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const { loading } = useSelector((state: RootState) => state.parent);

    const fetchParentsCallback = useCallback(
        (params: any) => {
            dispatch(ParentActions.fetchParents(params));
        },
        [dispatch]
    );

    const { params, setParams } = usePaginationParams(
        {
            page: 1,
            limit: 10,
            sortBy: undefined,
            sortOrder: undefined,
            searchTerm: undefined,
            filters: {},
        },
        fetchParentsCallback
    )


    const onParamasChange = (params: any) => {
        setParams(params);
    };

    const handleAdd = () => {
        setSelectedRow(null);
        setModalTitle('Add Parent');
        handleOpen();
    };

    const handleEdit = (id: string) => {
        const selectedParent = parents?.parents.find((parent: any) => parent._id === id);
        setSelectedRow(selectedParent || null);
        setModalTitle('Edit Parent');
        handleOpen();
    };

    const handleDelete = async (id: string) => {
        dispatch(ParentActions.deleteParents(id));
    };

    const handleSave = async (data: any) => {
        if (selectedRow) {
            dispatch(ParentActions.updateParents({ ...data, _id: selectedRow._id }));
        } else {
            dispatch(ParentActions.createParents(data));
        }
        handleClose();
    };

    const handleReloadData = () => {
        dispatch(ParentActions.fetchParents(params));
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    const totalRows = parents?.totalParents || 0;
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <ReusableDataGrid
                columns={columns}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onEdit={handleEdit}
                rows={parents?.parents ?? []}
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel}
                loading={loading}
                reloadData={handleReloadData}
                totalRows={totalRows}
                paginationModel={{
                    page: params.page - 1, // if DataGrid is 0-based
                    pageSize: params.limit,
                }}
                onParamsChange={(params) => onParamasChange(params)}
            />
            <GenericModal
                open={open}
                onClose={handleClose}
                title={modalTitle}
            >
                <ParentForm
                    initialValues={selectedRow}
                    onSubmit={handleSave}
                    onClose={handleClose}
                />
            </GenericModal>
        </Box>
    )
}

export default ParentPage