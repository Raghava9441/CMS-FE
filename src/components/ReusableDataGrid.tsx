import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridToolbarExport,
    GridToolbarQuickFilter,
    GridToolbarFilterButton,
    GridPaginationModel,
    GridFilterModel,
    GridSortModel,
} from '@mui/x-data-grid';
import { CircularProgress, IconButton, styled, Typography, useTheme, debounce } from '@mui/material';
import { Person } from '@mui/icons-material';

// Enhanced interfaces for server-side operations
interface PaginationParams {
    page: number;
    limit: number;
}

interface FilterParams {
    searchTerm?: string;
    filters?: Record<string, any>;
}

interface SortParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

interface ServerSideParams extends PaginationParams, FilterParams, SortParams { }

interface ReusableDataGridProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    onAdd: () => void;
    onEdit?: (id: string) => void;
    onView: (id: string) => void;
    onDelete: (id: string) => void;
    rowModesModel: GridRowModesModel;
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
    loading: boolean;
    reloadData?: () => void;

    // Server-side pagination props
    totalRows: number;
    paginationModel: GridPaginationModel;
    // onPaginationModelChange: (model: GridPaginationModel) => void;

    // Server-side filtering props
    onFilterChange?: (params: FilterParams) => void;

    // Server-side sorting props
    onSortChange?: (params: SortParams) => void;

    // Combined server-side operations
    onParamsChange?: (params: ServerSideParams) => void;

    // Additional props for enhanced functionality
    enableSearch?: boolean;
    enableFilters?: boolean;
    enableSorting?: boolean;
    searchPlaceholder?: string;
    pageSizeOptions?: number[];
}

const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
}));

function CustomLoadingOverlay() {
    return (
        <StyledGridOverlay>
            <CircularProgress />
            <Typography sx={{}}>Loading rows…</Typography>
        </StyledGridOverlay>
    );
}

interface EditToolbarProps {
    onAdd: () => void;
    reloadData?: () => void;
    onFilterChange?: (params: FilterParams) => void;
    enableSearch?: boolean;
    enableFilters?: boolean;
    searchPlaceholder?: string;
}

function EditToolbar({
    onAdd,
    reloadData,
    onFilterChange,
    enableSearch = true,
    enableFilters = true,
    searchPlaceholder = "Search..."
}: EditToolbarProps) {
    const [isRotating, setIsRotating] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    // Debounced search function
    const debouncedSearch = React.useMemo(
        () => debounce((term: string) => {
            onFilterChange?.({ searchTerm: term });
        }, 500),
        [onFilterChange]
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        debouncedSearch(value);
    };

    const handleIconClick = () => {
        setIsRotating(true);
        reloadData?.();
        setTimeout(() => setIsRotating(false), 1000);
    };

    // Cleanup debounced function on unmount
    React.useEffect(() => {
        return () => {
            debouncedSearch;
        };
    }, [debouncedSearch]);

    return (
        <GridToolbarContainer sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 1,
            gap: 1
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {enableSearch && (
                    <GridToolbarQuickFilter
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                )}
                {enableFilters && <GridToolbarFilterButton />}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton onClick={handleIconClick} title="Refresh Data">
                    <CachedIcon
                        color='primary'
                        sx={{
                            transition: 'transform 1s linear',
                            transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)',
                        }}
                    />
                </IconButton>

                <GridToolbarExport
                    slotProps={{
                        tooltip: { title: 'Export data' },
                        button: { variant: 'outlined' },
                    }}
                />

                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={onAdd}
                    variant='outlined'
                >
                    Add record
                </Button>
            </Box>
        </GridToolbarContainer>
    );
}

export const ReusableDataGrid: React.FC<ReusableDataGridProps> = ({
    rows,
    columns,
    onAdd,
    onEdit,
    onView,
    onDelete,
    rowModesModel,
    setRowModesModel,
    loading,
    reloadData,
    totalRows,
    paginationModel,
    // onPaginationModelChange,
    onFilterChange,
    onSortChange,
    onParamsChange,
    enableSearch = true,
    enableFilters = true,
    enableSorting = true,
    searchPlaceholder = "Search...",
    pageSizeOptions = [10, 25, 50, 100],
}) => {
    const theme = useTheme();

    // State for tracking current server-side parameters
    const [currentParams, setCurrentParams] = React.useState<ServerSideParams>({
        page: paginationModel.page + 1, // Convert to 1-based indexing
        limit: paginationModel.pageSize,
    });

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: string) => () => {
        onEdit(id);
    };

    const handleviewClick = (id: string) => () => {
        onView(id);
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        const updatedRow = rows.find((row) => row._id === id);
        if (updatedRow) {
            const processedRow = processRowUpdate(updatedRow, rows.find(row => row._id === id) || updatedRow);
            console.log(processedRow);
        }
    };

    const handleDeleteClick = (id: string) => async () => {
        await onDelete(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        // Handle cancel logic here
    };

    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
        const updatedRow = { ...oldRow, ...newRow };
        console.log(updatedRow);
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    // Handle pagination changes
    const handlePaginationModelChange = (model: GridPaginationModel) => {
        const newParams = {
            ...currentParams,
            page: model.page + 1, // Convert to 1-based indexing
            limit: model.pageSize,
        };

        setCurrentParams(newParams);
        // onPaginationModelChange(model);

        // Call the unified server-side params change handler
        onParamsChange?.(newParams);
    };

    // Handle filter changes
    const handleFilterChange = (filterParams: FilterParams) => {
        const newParams = {
            ...currentParams,
            ...filterParams,
            page: 1, // Reset to first page when filtering
        };

        setCurrentParams(newParams);
        onFilterChange?.(filterParams);

        // Reset pagination to first page
        // onPaginationModelChange({ page: 0, pageSize: currentParams.limit });

        // Call the unified server-side params change handler
        onParamsChange?.(newParams);
    };

    // Handle sort changes
    const handleSortModelChange = (sortModel: GridSortModel) => {
        const sortParams: SortParams = {};

        if (sortModel.length > 0) {
            sortParams.sortBy = sortModel[0].field;
            sortParams.sortOrder = sortModel[0].sort || 'asc';
        }

        const newParams = {
            ...currentParams,
            ...sortParams,
        };

        setCurrentParams(newParams);
        onSortChange?.(sortParams);

        // Call the unified server-side params change handler
        onParamsChange?.(newParams);
    };

    // Handle filter model changes (for advanced filtering)
    const handleFilterModelChange = (filterModel: GridFilterModel) => {
        const filters: Record<string, any> = {};

        filterModel.items.forEach((item) => {
            if (item.value !== undefined && item.value !== null && item.value !== '') {
                filters[item.field] = {
                    operator: item.operator,
                    value: item.value,
                };
            }
        });

        const filterParams: FilterParams = {
            filters: Object.keys(filters).length > 0 ? filters : undefined,
        };

        handleFilterChange(filterParams);
    };

    return (
        <Box
            sx={{
                height: "100%",
                '& .actions': {
                    // color: 'text.secondary',
                },
                width: "100%",
                minWidth: 0,
                boxSizing: 'border-box'
            }}
        >
            <DataGrid
                rows={rows}
                getRowId={(row) => row._id}
                columns={[
                    ...columns,
                    {
                        field: 'actions',
                        type: 'actions',
                        headerName: 'Actions',
                        headerClassName: 'theme--header',
                        cellClassName: 'actions',
                        getActions: ({ id }) => {
                            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                            if (isInEditMode) {
                                return [
                                    <GridActionsCellItem
                                        icon={<SaveIcon />}
                                        label="Save"
                                        sx={{
                                            color: 'primary.main',
                                        }}
                                        onClick={handleSaveClick(id)}
                                    />,
                                    <GridActionsCellItem
                                        icon={<CancelIcon />}
                                        label="Cancel"
                                        className="textPrimary"
                                        onClick={handleCancelClick(id)}
                                        color="inherit"
                                    />,
                                ];
                            }
                            return [
                                <GridActionsCellItem
                                    icon={<EditIcon />}
                                    label="Edit"
                                    className="textPrimary"
                                    onClick={handleEditClick(id as string)}
                                    color="inherit"
                                />,
                                <GridActionsCellItem
                                    icon={<Person />}
                                    label="Edit"
                                    className="textPrimary"
                                    onClick={handleviewClick(id as string)}
                                    color="inherit"
                                />,
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={handleDeleteClick(id as string)}
                                    color="inherit"
                                />,
                            ];
                        },
                    },
                ]}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}

                // Server-side pagination
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                pageSizeOptions={pageSizeOptions}
                rowCount={totalRows}

                // Server-side sorting
                sortingMode={enableSorting ? "server" : "client"}
                onSortModelChange={handleSortModelChange}

                // Server-side filtering
                filterMode={enableFilters ? "server" : "client"}
                onFilterModelChange={handleFilterModelChange}

                slots={{
                    toolbar: () => (
                        <EditToolbar
                            onAdd={onAdd}
                            reloadData={reloadData}
                            onFilterChange={handleFilterChange}
                            enableSearch={enableSearch}
                            enableFilters={enableFilters}
                            searchPlaceholder={searchPlaceholder}
                        />
                    ),
                    loadingOverlay: CustomLoadingOverlay
                }}
                loading={loading}
                sx={{
                    // boxShadow: 2,
                    // border: 2,
                    // borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                    '& .theme--header': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }}
            />
        </Box>
    );
};