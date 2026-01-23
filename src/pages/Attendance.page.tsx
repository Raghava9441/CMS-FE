// import GenericModal from "@components/GenericModal";
import { ReusableDataGrid } from "@components/ReusableDataGrid";
import { Box } from "@mui/material";
import { GridColDef, GridRowModesModel } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useCallback, useMemo, useState } from "react";
import { AttendanceActions } from "@redux/actions/attendance.actions";
import { Params } from "@models/pagination.modals";
import { usePaginationParams } from "@hooks/usePaginationParams";
import { Attendance } from "@models/attendance.models";

function AttendancePage() {
    const dispatch = useDispatch<AppDispatch>();
    const attendanceData = useSelector((state: RootState) => state.attendance.data);
    const { loading } = useSelector((state: RootState) => state.attendance);

    const columns: GridColDef[] = useMemo(() => [
        { field: 'classId', headerName: 'Class ID', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'studentId', headerName: 'Student ID', flex: 1, editable: true, headerClassName: 'theme--header' },
        { 
            field: 'date', 
            headerName: 'Date', 
            flex: 1, 
            editable: true, 
            headerClassName: 'theme--header',
            renderCell: (params) => {
                if (!params.value) return '';
                const date = new Date(params.value);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            flex: 1, 
            editable: true, 
            headerClassName: 'theme--header',
            type: 'singleSelect',
            valueOptions: ['present', 'absent', 'excused']
        },
        { field: 'remarks', headerName: 'Remarks', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'markedBy', headerName: 'Marked By', flex: 1, editable: true, headerClassName: 'theme--header' },
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const fetchAttendancesCallback = useCallback(
        (params: any) => {
            dispatch(AttendanceActions.fetchAttendances(params));
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
        fetchAttendancesCallback
    );

    const onParamasChange = (params: Params) => {
        setParams(params);
    };

    const handleAdd = () => {
        console.log('Add attendance');
    };

    const handleEdit = (id: string) => {
        const selectedAttendance = attendanceData?.attendances.find((attendance: Attendance) => attendance._id === id);
        console.log('Edit attendance:', selectedAttendance);
    };

    const handleDelete = async (id: string) => {
        dispatch(AttendanceActions.deleteAttendance(id));
    };

    const handleView = (id: string) => {
        const selectedAttendance = attendanceData?.attendances.find((attendance: Attendance) => attendance._id === id);
        console.log('View attendance:', selectedAttendance);
    };

    const reloadData = () => {
        dispatch(AttendanceActions.fetchAttendances(params));
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* <h1 style={{ margin: 0, marginBottom: '1rem' }}>Attendance Management</h1> */}

            <ReusableDataGrid
                columns={columns}
                rows={attendanceData?.attendances || []}
                loading={loading}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel}
                totalRows={attendanceData?.totalAttendances || 0}
                paginationModel={{ page: params.page - 1, pageSize: params.limit }}
                onParamsChange={onParamasChange}
                reloadData={reloadData}
            />
        </Box>
    );
}

export default AttendancePage;