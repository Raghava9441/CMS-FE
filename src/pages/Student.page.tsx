import GenericModal from "@components/GenericModal"
import {ReusableDataGrid} from "@components/ReusableDataGrid"
import {Box} from "@mui/material"
import {GridColDef, GridRowModesModel} from "@mui/x-data-grid"
import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "@redux/store"
import {useEffect, useMemo, useState} from "react"
import {StudentActions} from "@redux/actions/student.actions"
import StudentForm from "@components/Forms/Student.Form"


function StudentPage() {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.student.data);
    console.log(students)
    const columns: GridColDef[] = useMemo(() => [
        {field: 'name', headerName: 'Student Name', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'phone', headerName: 'Contact Phone', flex: 1, editable: true, headerClassName: 'theme--header'},
        {
            field: 'organizationId',
            headerName: 'Organization',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        {
            field: 'enrolledCoursesIds',
            headerName: 'Enrolled Courses',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        {
            field: 'currentClassId',
            headerName: 'Current Class',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        {field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'address', headerName: 'Address', flex: 1, editable: true, headerClassName: 'theme--header'},
        {field: 'email', headerName: 'Email', flex: 1, editable: true, headerClassName: 'theme--header'},
        {
            field: 'emergencyContacts',
            headerName: 'Emergency Contacts',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        {
            field: 'enrollmentDate',
            headerName: 'Enrollment Date',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        {
            field: 'graduationDate',
            headerName: 'Graduation Date',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        {field: 'createdAt', headerName: 'Created At', flex: 1, editable: false, headerClassName: 'theme--header'},
        {field: 'updatedAt', headerName: 'Updated At', flex: 1, editable: false, headerClassName: 'theme--header'},
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [modalTitle, setModalTitle] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const {loading} = useSelector((state: RootState) => state.student);


    useEffect(() => {
        // if (students?.students.length === 0) {
        dispatch(StudentActions.fetchStudents());
        // }
    }, [dispatch]);

    const handleAdd = () => {
        setSelectedRow(null);
        setModalTitle('Add Student');
        handleOpen();
    };

    const handleEdit = (id: string) => {
        const selectedStudent = students?.students.find((student: any) => student._id === id);
        setSelectedRow(selectedStudent || null);
        setModalTitle('Edit Student');
        handleOpen();
    };

    const handleDelete = async (id: string) => {
        dispatch(StudentActions.deleteStudents(id));
    };

    const handleSave = async (data: any) => {
        if (selectedRow) {
            dispatch(StudentActions.updateStudents({...data, _id: selectedRow._id}));
        } else {
            dispatch(StudentActions.createStudents(data));
        }
        handleClose();
    };

    const handleReloadData = () => {
        dispatch(StudentActions.fetchStudents());
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    return (
        <Box sx={{width: '100%', height: '100%'}}>
            <ReusableDataGrid
                columns={columns}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onEdit={handleEdit}
                rows={students?.students ?? []}
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
                <StudentForm
                    initialValues={selectedRow}
                    onSubmit={handleSave}
                    onClose={handleClose}
                />
            </GenericModal>
        </Box>
    )
}

export default StudentPage