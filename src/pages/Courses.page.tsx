import { ReusableDataGrid } from "@components/ReusableDataGrid";
import { Box } from "@mui/material";
import { GridColDef, GridRowModesModel } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useCallback, useMemo, useState } from "react";
import { courseActions } from "@redux/actions/course.actions";
import { Params } from "@models/pagination.modals";
import { usePaginationParams } from "@hooks/usePaginationParams";
import { Course } from "@models/course.modals";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

function CoursesPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();
    const isViewingCourseDetails = location.pathname.includes('/courses/');
    const coursesData = useSelector((state: RootState) => state.course.courses);
    console.log("🚀 ~ coursesData:", coursesData)
    const { isLoading } = useSelector((state: RootState) => state.course);

    const columns: GridColDef[] = useMemo(() => [
        { field: 'name', headerName: 'Course Name', flex: 1.5, editable: true, headerClassName: 'theme--header' },
        { field: 'code', headerName: 'Course Code', flex: 0.8, editable: true, headerClassName: 'theme--header' },
        { field: 'description', headerName: 'Description', flex: 2, editable: true, headerClassName: 'theme--header' },
        { field: 'schedule', headerName: 'Schedule', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'credits', headerName: 'Credits', flex: 0.5, editable: true, headerClassName: 'theme--header', type: 'number' },
        { field: 'fee', headerName: 'Fee', flex: 0.8, editable: true, headerClassName: 'theme--header', type: 'number', valueFormatter: (params) => `$${params.value?.toFixed(2)}` },
        { field: 'location', headerName: 'Location', flex: 1, editable: true, headerClassName: 'theme--header' },
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const fetchCoursesCallback = useCallback(
        (params: any) => {
            dispatch(courseActions.fetchCourses());
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
        fetchCoursesCallback
    );

    const onParamsChange = (params: Params) => {
        setParams(params);
    };

    const handleAdd = () => {
        console.log('Add course');
    };

    const handleEdit = (id: string) => {
        const selectedCourse = coursesData.find((course: Course) => course._id === id);
        console.log('Edit course:', selectedCourse);
    };

    const handleDelete = async (id: string) => {
        dispatch(courseActions.deleteCourse(id));
    };

    const handleView = (id: string) => {
        navigate(`/CMS-FE/courses/${id}`);
    };

    const reloadData = () => {
        dispatch(courseActions.fetchCourses());
    };

    return (
        <Box sx={{  width: '100%', height: '100%' }}>
            {isViewingCourseDetails ? (
                <Outlet />
            ) : (
                <ReusableDataGrid
                    columns={columns}
                    rows={coursesData?.courses || []}
                    loading={isLoading}
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onView={handleView}
                    onDelete={handleDelete}
                    rowModesModel={rowModesModel}
                    setRowModesModel={setRowModesModel}
                    totalRows={coursesData?.length || 0}
                    paginationModel={{ page: params.page - 1, pageSize: params.limit }}
                    onParamsChange={onParamsChange}
                    reloadData={reloadData}
                />
            )}
        </Box>
    );
}

export default CoursesPage;

