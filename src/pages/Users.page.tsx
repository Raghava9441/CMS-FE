import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { userActions } from "../redux/actions/userActions";
import { User } from "../api/auth.api";
import { Box } from "@mui/material";
import { GridColDef, GridPaginationModel, GridRowId, GridRowModesModel } from "@mui/x-data-grid";
import GenericModal from "@components/GenericModal.tsx";
import UsersForm from "@components/Forms/UsersForm.tsx";
import { ReusableDataGrid } from "@components/ReusableDataGrid.tsx";
import { usePaginationParams } from "@hooks/usePaginationParams";
import { Params } from "@models/pagination.modals";


function UsersPage() {

    const dispatch = useDispatch<AppDispatch>();
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [modalTitle, setModalTitle] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<Partial<User> | null>(null);
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = useMemo(() => [
        { field: 'username', headerName: 'Username', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'email', headerName: 'Email', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'fullname', headerName: 'Full Name', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'role', headerName: 'Role', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'gender', headerName: 'Gender', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'status', headerName: 'Status', flex: 1, editable: true, headerClassName: 'theme--header' },
    ], []);

    const { loading, data } = useSelector((state: RootState) => state.user);

    const fetchUsersCallback = useCallback(
        (params: Params) => {
            dispatch(userActions.fetchUsers(params));
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
        fetchUsersCallback
    );

    const onParamasChange = (params: Params) => {
        setParams(params);
        // The useEffect above will trigger the API call
        console.log(params)
    };

    const handleAdd = () => {
        setSelectedRow(null);
        setModalTitle('Add User');
        handleOpen();
    };

    const handleEditUser = (id: GridRowId) => {
        const selectedUser = data?.users.find((user: User) => user._id === id);
        setSelectedRow(selectedUser || null);
        setModalTitle('Edit User');
        handleOpen();
    };

    const handleDeleteUser = (userId: string) => {
        dispatch(userActions.deleteUser(userId));
    };

    const handleSave = async (formData: Partial<User>) => {
        if (selectedRow?._id) {
            // Update existing user
            dispatch(userActions.updateUser({ ...formData, _id: selectedRow._id }));
        } else {
            // Create new user
            dispatch(userActions.createUser(formData as Omit<User, 'password' | 'accessToken' | 'refreshToken'>));
        }
        handleClose();
    };

    const handleReloadData = () => {
        dispatch(userActions.fetchUsers(params));
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    // Calculate total rows for pagination
    const totalRows = data?.totalUsers || 0;
    const rows = data?.users || [];

    return (
        <Box sx={{ height: '100%' }}>
            <ReusableDataGrid
                columns={columns}
                onAdd={handleAdd}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
                rows={data?.users || []}
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
                enableSearch={true}
                enableFilters={true}
                enableSorting={true}
                searchPlaceholder="Search users..."
                pageSizeOptions={[5, 10, 25, 50, 100]}
            />
            <GenericModal
                open={open}
                onClose={handleClose}
                title={modalTitle}
            >
                <UsersForm
                    initialValues={selectedRow}
                    onSubmit={handleSave}
                    onClose={handleClose}
                />
            </GenericModal>
        </Box>
    );
}

export default UsersPage;