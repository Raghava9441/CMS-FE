import { GridColDef, GridRowId, GridRowModesModel } from '@mui/x-data-grid';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { AppDispatch, RootState } from '@redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { hasPermission } from "@utils/auth.ts";
import { examActions } from "@redux/actions/exam.actions.ts";
import { ReusableDataGrid } from "@components/ReusableDataGrid.tsx";
import { Params } from '@models/pagination.modals';
import { usePaginationParams } from '@hooks/usePaginationParams';

const ExamForm = lazy(() => import("@components/Forms/ExamForm"));
const GenericModal = lazy(() => import("@components/GenericModal"));

/**
 * ExamPage component displays a data grid of exams with CRUD operations.
 * 
 * @returns The ExamPage component.
 */
function ExamPage() {
    const dispatch = useDispatch<AppDispatch>();

    /**
     * Defines the columns for the data grid.
     * 
     * @returns An array of column definitions.
     */
    const columns: GridColDef[] = useMemo(() => [
        { field: 'name', headerName: 'Exam Name', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'examType', headerName: 'Exam Type', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'duration', headerName: 'Duration (min)', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'totalMarks', headerName: 'Total Marks', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'startDate', headerName: 'Start Date', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'endDate', headerName: 'End Date', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'schedule', headerName: 'Schedule', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'description', headerName: 'Description', flex: 1, editable: true, headerClassName: 'theme--header' },
    ], []);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [open, setOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const { data: exams, loading } = useSelector((state: RootState) => state.exam);
    const user = useSelector((state: RootState) => state.auth.user);

    /**
     * Filters exams based on user permissions.
     * 
     * @returns An array of accessible exams.
     */
    const accessibleExams = useMemo(() => {
        if (!user || !exams?.exams) return [];
        return exams.exams.filter((exam) =>
            hasPermission(user, "exams", "view", exam)
        );
    }, [user, exams]);

    const fetchExamsCallback = useCallback(
        (params: Params) => {
            dispatch(examActions.fetchExams(params));
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
        fetchExamsCallback
    );

    const onParamasChange = (params: Params) => {
        setParams(params);
    };

    /**
     * Handles the add exam action.
     */
    const handleAdd = () => {
        setSelectedRow(null);
        setModalTitle('Add Exam');
        handleOpen();
    };

    /**
     * Handles the edit exam action.
     * 
     * @param {GridRowId} id - The ID of the exam to edit.
     */
    const handleEdit = (id: GridRowId) => {
        const selectedExam = exams?.exams.find((exam: any) => exam._id === id);
        setSelectedRow(selectedExam);
        setModalTitle('Edit Exam');
        handleOpen();
    };

    /**
     * Handles the delete exam action.
     * 
     * @param {string} id - The ID of the exam to delete.
     */
    const handleDelete = async (id: string) => {
        dispatch(examActions.deleteExam(id));
    };

    /**
     * Handles the save exam action.
     * 
     * @param {any} data - The data to save.
     */
    const handleSave = async (data: any) => {
        if (selectedRow) {
            dispatch(examActions.updateExam({ id: selectedRow._id, ...data }));
        } else {
            dispatch(examActions.createExam(data));
        }
        handleClose();
    };

    /**
     * Handles the reload data action.
     */
    const handleReloadData = () => {
        dispatch(examActions.fetchExams(params));
    };

    /**
     * Opens the modal.
     */
    const handleOpen = () => setOpen(true);
    /**
     * Closes the modal.
     */
    const handleClose = () => setOpen(false);

    const totalRows = exams?.totalExams || 0;

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            minWidth: 0,
            overflow: 'hidden',
        }}>
            <ReusableDataGrid
                columns={columns}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onEdit={handleEdit}
                rows={accessibleExams ?? []}
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel}
                loading={loading}
                reloadData={handleReloadData}
                totalRows={totalRows}
                paginationModel={{
                    page: params.page - 1,
                    pageSize: params.limit,
                }}
                onParamsChange={(params) => onParamasChange(params)}
            />
            {open && (
                <Suspense fallback={<div>Loading modal...</div>}>
                    <GenericModal
                        open={open}
                        onClose={handleClose}
                        title={modalTitle}
                    >
                        <Suspense fallback={<div>Loading form...</div>}>
                            <ExamForm
                                initialValues={selectedRow}
                                onSubmit={handleSave}
                                onClose={handleClose}
                            />
                        </Suspense>
                    </GenericModal>
                </Suspense>
            )}
        </Box>
    );
}

export default ExamPage;