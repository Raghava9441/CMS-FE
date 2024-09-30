import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { userActions } from "../redux/actions/userActions";
import { useEffect, useState } from "react";
import { User } from "../api/auth.api";
import { Box } from "@mui/material";
import { ReusableDataGrid } from "../components/ReusableDataGrid";
import { GridColDef, GridRowModesModel } from "@mui/x-data-grid";

type Props = {}

function UsersPage({ }: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [open, setOpen] = useState(false);


  const columns: GridColDef[] = [
    { field: 'username', headerName: 'Username', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'email', headerName: 'Email', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'fullname', headerName: 'Full Name', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'role', headerName: 'Role', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'gender', headerName: 'Gender', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'status', headerName: 'Status', flex: 1, editable: true, headerClassName: 'theme--header' },
  ];

  const { loading, data: { users } } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (users.lenght === 0) {
      dispatch(userActions.fetchUsers());
    }
  }, [])

  const handleAdd = () => {
    setSelectedRow(null);
    setModalTitle('Add Organization');
    handleOpen();
  };

  const handleCreateUser = (user: Omit<User, 'password' | 'accessToken' | 'refreshToken'>) => {
    dispatch(userActions.createUser(user));
  };

  const handleEditUser = (id: string) => {
    const selecteduser = users?.find((user: any) => user._id === id);
    console.log(selecteduser)
    handleOpen()
  };

  const handleDeleteUser = (userId: string) => {
    dispatch(userActions.deleteUser(userId));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Box sx={{ width: '100%', height: '100%' }}>
        <ReusableDataGrid
          columns={columns}
          onAdd={handleAdd}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          rows={users}
          rowModesModel={rowModesModel}
          setRowModesModel={setRowModesModel}
          loading={loading}
        />
      </Box>
    </>
  )
}

export default UsersPage