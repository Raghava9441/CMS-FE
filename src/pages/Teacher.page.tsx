import GenericModal from "@components/GenericModal"
import { ReusableDataGrid } from "@components/ReusableDataGrid"
import { Box } from "@mui/material"
import { GridColDef, GridRowModesModel } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@redux/store"
import { useEffect, useState } from "react"
import { TeacherActions } from "@redux/actions/teacherActions"

type Props = {};


function TeacherPage({ }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const teachers = useSelector((state: RootState) => state.teacher.data);
  console.log(teachers)  //TODO: able to get the data form the store but not able to view in the grid check the clumns and the data and also create form for teacher 

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'category', headerName: 'Category', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'number', headerName: 'Number', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'contactEmail', headerName: 'Contact Email', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'contactPhone', headerName: 'Contact Phone', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'website', headerName: 'Website', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'logo', headerName: 'Logo', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'establishedDate', headerName: 'Established Date', flex: 1, editable: true, headerClassName: 'theme--header' },
    { field: 'description', headerName: 'Description', flex: 1, editable: true, headerClassName: 'theme--header' },
  ];

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [modalTitle, setModalTitle] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { loading } = useSelector((state: RootState) => state.teacher);


  useEffect(() => {
    alert("hehe")
    // if (teachers?.teachers.length === 0) {
      dispatch(TeacherActions.fetchTeachers());
    // }
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedRow(null);
    setModalTitle('Add Teacher');
    handleOpen();
  };

  const handleEdit = (id: string) => {
    const selectedTeacher = teachers?.teachers.find((teacher: any) => teacher._id === id);
    setSelectedRow(selectedTeacher || null);
    setModalTitle('Edit Teacher');
    handleOpen();
  };

  const handleDelete = async (id: string) => {
    dispatch(TeacherActions.deleteTeachers(id));
  };

  const handleSave = async (data: any) => {
    if (selectedRow) {
      dispatch(TeacherActions.updateTeachers({ ...data, _id: selectedRow._id }));
    } else {
      dispatch(TeacherActions.createTeachers(data));
    }
    handleClose();
  };

  const handleReloadData = () => {
    dispatch(TeacherActions.fetchTeachers());
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ReusableDataGrid
        columns={columns}
        onAdd={handleAdd}
        onDelete={handleDelete}
        onEdit={handleEdit}
        rows={teachers?.teachers ?? []}
        rowModesModel={rowModesModel}
        setRowModesModel={setRowModesModel}
        loading={loading}
        reloadData={handleReloadData}
      />
      {/* <GenericModal
        open={open}
        onClose={handleClose}
        title={modalTitle}
      >
        <OrganizationForm
          initialValues={selectedRow}
          onSubmit={handleSave}
          onClose={handleClose}
        />
      </GenericModal> */}
    </Box>
  )
}

export default TeacherPage