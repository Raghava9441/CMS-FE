import GenericModal from "@components/GenericModal"
import { ReusableDataGrid } from "@components/ReusableDataGrid"
import { Box } from "@mui/material"
import { GridColDef, GridRowModesModel } from "@mui/x-data-grid"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@redux/store"
import { useCallback, useEffect, useMemo, useState } from "react"
import { TeacherActions } from "@redux/actions/teacherActions"
import TeacherForm from "@components/Forms/Teacher.Form"
import { usePaginationParams } from "@hooks/usePaginationParams"
import { Params } from "@models/pagination.modals"



function TeacherPage() {
    const dispatch = useDispatch<AppDispatch>();
    const teachers = useSelector((state: RootState) => state.teacher.data);

    const columns: GridColDef[] = useMemo(() => [
        { field: 'name', headerName: 'Teacher Name', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'phone', headerName: 'Contact Phone', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'subjects', headerName: 'Subjects', flex: 1, editable: true, headerClassName: 'theme--header' },
        {
            field: 'qualifications',
            headerName: 'Qualifications',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        // { field: 'experience', headerName: 'Experience', flex: 1, editable: true, headerClassName: 'theme--header' },
        // { field: 'officeHours', headerName: 'Office Hours', flex: 1, editable: true, headerClassName: 'theme--header' },
        {
            field: 'coursesTaught',
            headerName: 'Courses Taught',
            flex: 1,
            editable: true,
            headerClassName: 'theme--header'
        },
        // {
        //     field: 'performanceReviews',
        //     headerName: 'Performance Reviews',
        //     flex: 1,
        //     editable: true,
        //     headerClassName: 'theme--header'
        // },
        // { field: 'specialResponsibilities', headerName: 'Special Responsibilities', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'createdAt', headerName: 'Created At', flex: 1, editable: false, headerClassName: 'theme--header' },
        { field: 'updatedAt', headerName: 'Updated At', flex: 1, editable: false, headerClassName: 'theme--header' },
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [modalTitle, setModalTitle] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const { loading } = useSelector((state: RootState) => state.teacher);

    const fetchTeachersCallback = useCallback(
        (params: any) => {
            dispatch(TeacherActions.fetchTeachers(params));
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
        fetchTeachersCallback
    );

    const onParamasChange = (params: Params) => {
        setParams(params);
    };

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
        dispatch(TeacherActions.fetchTeachers(params));
    };

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);
    const totalRows = teachers?.totalTeachers || 0;
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
                <TeacherForm
                    initialValues={selectedRow}
                    onSubmit={handleSave}
                    onClose={handleClose}
                />
            </GenericModal>
        </Box>
    )
}

export default TeacherPage