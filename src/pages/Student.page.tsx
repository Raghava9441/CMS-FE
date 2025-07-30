import GenericModal from "@components/GenericModal"
import { ReusableDataGrid } from "@components/ReusableDataGrid"
import { Box } from "@mui/material"
import { GridColDef, GridRowModesModel } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@redux/store"
import { useCallback, useEffect, useMemo, useState } from "react"
import { StudentActions } from "@redux/actions/student.actions"
import StudentForm from "@components/Forms/Student.Form"
import { Params } from "@models/pagination.modals"
import { usePaginationParams } from "@hooks/usePaginationParams"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import appRoutes from "@routes/routePaths"


function StudentPage() {
    const dispatch = useDispatch<AppDispatch>();
    const students = useSelector((state: RootState) => state.student.data);
    const navigate = useNavigate()
    const isViewingProfile = useParams().id !== undefined;
    // console.log(students)
    const columns: GridColDef[] = useMemo(() => [
        { field: 'name', headerName: 'Student Name', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'email', headerName: 'Email', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'phone', headerName: 'Contact Phone', flex: 1, editable: true, headerClassName: 'theme--header' },
        // {
        //     field: 'organizationId',
        //     headerName: 'Organization',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header'
        // },
        {
            field: 'enrolledCoursesIds',
            headerName: 'Enrolled Courses Count',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header',
            renderCell: (params) => {
                // params.value is the emergencyContacts array
                if (!Array.isArray(params.value)) return '';
                // Join all phone numbers with a comma
                return params.value.length
            }
        },
        {
            field: 'dateOfBirth',
            headerName: 'Date Of Birth',
            flex: 1,
            editable: false,
            headerClassName: 'theme--header',
            renderCell: (params) => {
                if (!params.value) return '';
                const date = new Date(params.value);
                // Format as DD/MM/YYYY
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
        },
        // {
        //     field: 'currentClassId',
        //     headerName: 'Current Class',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header'
        // },
        // {field: 'dateOfBirth', headerName: 'Date of Birth', flex: 1, editable: true, headerClassName: 'theme--header'},
        // {field: 'address', headerName: 'Address', flex: 1, editable: true, headerClassName: 'theme--header'},
        // {
        //     field: 'emergencyContacts',
        //     headerName: 'Emergency Contacts',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header',
        //     renderCell: (params) => {
        //         // params.value is the emergencyContacts array
        //         if (!Array.isArray(params.value)) return '';
        //         // Join all phone numbers with a comma
        //         return params.value.map(contact => contact.phone).filter(Boolean).join(', ');
        //     }
        // },
        // {
        //     field: 'enrollmentDate',
        //     headerName: 'Enrollment Date',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header'
        // },
        // {
        //     field: 'graduationDate',
        //     headerName: 'Graduation Date',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header'
        // },
        // { field: 'createdAt', headerName: 'Created At', flex: 1, editable: false, headerClassName: 'theme--header' },
        // { field: 'updatedAt', headerName: 'Updated At', flex: 1, editable: false, headerClassName: 'theme--header' },
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [modalTitle, setModalTitle] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const { loading } = useSelector((state: RootState) => state.student);

    const fetchStudentsCallback = useCallback(
        (params: any) => {
            dispatch(StudentActions.fetchStudents(params));
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
        fetchStudentsCallback
    );

    const onParamasChange = (params: Params) => {
        setParams(params);
    };

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
            dispatch(StudentActions.updateStudents({ ...data, _id: selectedRow._id }));
        } else {
            dispatch(StudentActions.createStudents(data));
        }
        handleClose();
    };

    const handleReloadData = () => {
        dispatch(StudentActions.fetchStudents(params));
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    const onView = (id: string) => {
        navigate(appRoutes.STUDENT_PROFILE.replace(":id", id))
    }

    const totalRows = students?.totalStudents || 0;

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            {isViewingProfile ? (
                <Outlet />
            ) : (
                <>
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
                        totalRows={totalRows}
                        paginationModel={{
                            page: params.page - 1, // if DataGrid is 0-based
                            pageSize: params.limit,
                        }}
                        onParamsChange={(params) => onParamasChange(params)}
                        onView={onView}
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
                </>
            )}
        </Box>
    )
}

export default StudentPage