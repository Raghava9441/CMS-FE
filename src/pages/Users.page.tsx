import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { userActions } from "../redux/actions/userActions";
import { User } from "../api/auth.api";
import { Box } from "@mui/material";
import { ReusableDataGrid } from "../components/ReusableDataGrid";
import { GridColDef, GridRowId, GridRowModesModel } from "@mui/x-data-grid";
import GenericModal from "../components/GenericModal";
import UsersForm from "../components/Forms/UsersForm";

type Props = {}

function UsersPage({ }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [modalTitle, setModalTitle] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<Partial<User> | null>(null);
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'email', headerName: 'Email', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'fullname', headerName: 'Full Name', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'role', headerName: 'Role', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'gender', headerName: 'Gender', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'status', headerName: 'Status', flex: 1, editable: true, headerClassName: 'theme--header' },
  ];

  const { loading, data } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(userActions.fetchUsers());
  }, [dispatch]);

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
    dispatch(userActions.fetchUsers());
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
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