import React from 'react';
import {
    Box,
    Button,
    IconButton,
    CircularProgress,
    Typography,
    TextField,
    InputAdornment,
    Chip,
    Tooltip,
    alpha,
    Stack,
    Paper,
} from '@mui/material';
import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRowModesModel,
    GridRowModes,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridActionsCellItem,
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridPaginationModel,
    GridSortModel,
    GridFilterModel,
} from '@mui/x-data-grid';
import { styled, useTheme } from '@mui/material/styles';
import { debounce } from 'lodash';

// Icons
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import CachedIcon from '@mui/icons-material/Cached';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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
    totalRows: number;
    paginationModel: GridPaginationModel;
    onFilterChange?: (params: FilterParams) => void;
    onSortChange?: (params: SortParams) => void;
    onParamsChange?: (params: ServerSideParams) => void;
    enableSearch?: boolean;
    enableFilters?: boolean;
    enableSorting?: boolean;
    searchPlaceholder?: string;
    pageSizeOptions?: number[];
}

// Styled Components
const StyledGridOverlay = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: theme.spacing(2),
}));

const StyledSearchField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: '10px',
        backgroundColor: alpha(theme.palette.background.paper, 0.6),
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        '&:hover': {
            backgroundColor: theme.palette.background.paper,
            borderColor: alpha(theme.palette.primary.main, 0.3),
        },
        '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`,
        },
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '& .MuiOutlinedInput-input': {
        padding: '6px 10px',
        fontSize: '0.875rem',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: '10px',
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.875rem',
    padding: '6px 16px',
    boxShadow: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.25)}`,
        transform: 'translateY(-1px)',
    },
    '&.MuiButton-outlined': {
        borderWidth: '1.5px',
        '&:hover': {
            borderWidth: '1.5px',
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
        },
    },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '10px',
    width: 34,
    height: 34,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    backgroundColor: alpha(theme.palette.background.paper, 0.6),
    backdropFilter: 'blur(10px)',
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        borderColor: theme.palette.primary.main,
        transform: 'translateY(-1px)',
        boxShadow: `0 3px 10px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
}));

function CustomLoadingOverlay() {
    return (
        <StyledGridOverlay>
            <CircularProgress size={52} thickness={4} />
            <Typography variant="body1" color="text.secondary" fontWeight={600}>
                Loading data...
            </Typography>
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
    totalRows?: number;
}

function EditToolbar({
    onAdd,
    reloadData,
    onFilterChange,
    enableSearch = true,
    enableFilters = true,
    searchPlaceholder = 'Search records...',
    totalRows = 0,
}: EditToolbarProps) {
    const theme = useTheme();
    const [isRotating, setIsRotating] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    const debouncedSearch = React.useMemo(
        () =>
            debounce((term: string) => {
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

    React.useEffect(() => {
        return () => {
            if (typeof debouncedSearch === 'function' && 'cancel' in debouncedSearch) {
                debouncedSearch.cancel();
            }
        };
    }, [debouncedSearch]);

    return (
        <GridToolbarContainer
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 1.5,
                gap: 1.5,
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                {enableSearch && (
                    <StyledSearchField
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        size="small"
                        sx={{ minWidth: 280 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        fontSize="small"
                                        sx={{ color: theme.palette.text.secondary }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}

                <Chip
                    label={`${totalRows.toLocaleString()} Records`}
                    size="small"
                    sx={{
                        height: 28,
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.15)} 100%)`,
                        color: theme.palette.primary.main,
                        border: `1.5px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        backdropFilter: 'blur(10px)',
                    }}
                />
            </Box>

            <Stack direction="row" spacing={1}>
                <Tooltip title="Refresh Data" arrow placement="top">
                    <StyledIconButton onClick={handleIconClick}>
                        <CachedIcon
                            sx={{
                                fontSize: '1.1rem',
                                transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)',
                                color: theme.palette.primary.main,
                            }}
                        />
                    </StyledIconButton>
                </Tooltip>

                {enableFilters && (
                    <Tooltip title="Advanced Filters" arrow placement="top">
                        <Box>
                            <GridToolbarFilterButton
                                componentsProps={{
                                    button: {
                                        sx: {
                                            borderRadius: '10px',
                                            textTransform: 'none',
                                            fontWeight: 600,
                                            fontSize: '0.875rem',
                                            height: 34,
                                            px: 1.5,
                                            minWidth: 'auto',
                                            backgroundColor: alpha(theme.palette.background.paper, 0.6),
                                            backdropFilter: 'blur(10px)',
                                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                                borderColor: theme.palette.primary.main,
                                                transform: 'translateY(-1px)',
                                                boxShadow: `0 3px 10px ${alpha(
                                                    theme.palette.primary.main,
                                                    0.2
                                                )}`,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Tooltip>
                )}

                <Tooltip title="Export Data" arrow placement="top">
                    <Box>
                        <GridToolbarExport
                            slotProps={{
                                button: {
                                    variant: 'outlined',
                                    startIcon: <FileDownloadIcon sx={{ fontSize: '1.1rem' }} />,
                                    sx: {
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                        height: 34,
                                        px: 1.5,
                                        minWidth: 'auto',
                                        backgroundColor: alpha(theme.palette.background.paper, 0.6),
                                        backdropFilter: 'blur(10px)',
                                        borderWidth: '1.5px',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            borderWidth: '1.5px',
                                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                            borderColor: theme.palette.primary.main,
                                            transform: 'translateY(-1px)',
                                            boxShadow: `0 3px 10px ${alpha(
                                                theme.palette.primary.main,
                                                0.2
                                            )}`,
                                        },
                                    },
                                },
                            }}
                        />
                    </Box>
                </Tooltip>

                <StyledButton
                    variant="contained"
                    startIcon={<AddIcon sx={{ fontSize: '1.1rem' }} />}
                    onClick={onAdd}
                    disableElevation
                >
                    Add Record
                </StyledButton>
            </Stack>
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
    onFilterChange,
    onSortChange,
    onParamsChange,
    enableSearch = true,
    enableFilters = true,
    enableSorting = true,
    searchPlaceholder = 'Search records...',
    pageSizeOptions = [10, 25, 50, 100],
}) => {
    const theme = useTheme();

    const [currentParams, setCurrentParams] = React.useState<ServerSideParams>({
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
    });

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: string) => () => {
        onEdit?.(id);
    };

    const handleviewClick = (id: string) => () => {
        onView(id);
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        const updatedRow = rows.find((row) => row._id === id);
        if (updatedRow) {
            const processedRow = processRowUpdate(
                updatedRow,
                rows.find((row) => row._id === id) || updatedRow
            );
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

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        const newParams = {
            ...currentParams,
            page: model.page + 1,
            limit: model.pageSize,
        };

        setCurrentParams(newParams);
        onParamsChange?.(newParams);
    };

    const handleFilterChange = (filterParams: FilterParams) => {
        const newParams = {
            ...currentParams,
            ...filterParams,
            page: 1,
        };

        setCurrentParams(newParams);
        onFilterChange?.(filterParams);
        onParamsChange?.(newParams);
    };

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
        onParamsChange?.(newParams);
    };

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
        <Paper
            elevation={0}
            sx={{
                height: '100%',
                width: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.06)}`,
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
                        width: 120,
                        cellClassName: 'actions',
                        getActions: ({ id }) => {
                            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
                            if (isInEditMode) {
                                return [
                                    <GridActionsCellItem
                                        icon={
                                            <Tooltip title="Save Changes" arrow>
                                                <SaveIcon sx={{ fontSize: '1.1rem' }} />
                                            </Tooltip>
                                        }
                                        label="Save"
                                        sx={{
                                            color: 'success.main',
                                            borderRadius: '6px',
                                            padding: '4px',
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.success.main, 0.1),
                                            },
                                        }}
                                        onClick={handleSaveClick(id)}
                                    />,
                                    <GridActionsCellItem
                                        icon={
                                            <Tooltip title="Cancel" arrow>
                                                <CancelIcon sx={{ fontSize: '1.1rem' }} />
                                            </Tooltip>
                                        }
                                        label="Cancel"
                                        sx={{
                                            color: 'error.main',
                                            borderRadius: '6px',
                                            padding: '4px',
                                            '&:hover': {
                                                backgroundColor: alpha(theme.palette.error.main, 0.1),
                                            },
                                        }}
                                        onClick={handleCancelClick(id)}
                                    />,
                                ];
                            }
                            return [
                                <GridActionsCellItem
                                    icon={
                                        <Tooltip title="Edit Record" arrow>
                                            <EditIcon sx={{ fontSize: '1.1rem' }} />
                                        </Tooltip>
                                    }
                                    label="Edit"
                                    sx={{
                                        color: 'primary.main',
                                        borderRadius: '6px',
                                        padding: '4px',
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                        },
                                    }}
                                    onClick={handleEditClick(id as string)}
                                />,
                                <GridActionsCellItem
                                    icon={
                                        <Tooltip title="View Details" arrow>
                                            <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
                                        </Tooltip>
                                    }
                                    label="View"
                                    sx={{
                                        color: 'info.main',
                                        borderRadius: '6px',
                                        padding: '4px',
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.info.main, 0.1),
                                        },
                                    }}
                                    onClick={handleviewClick(id as string)}
                                />,
                                <GridActionsCellItem
                                    icon={
                                        <Tooltip title="Delete Record" arrow>
                                            <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                                        </Tooltip>
                                    }
                                    label="Delete"
                                    sx={{
                                        color: 'error.main',
                                        borderRadius: '6px',
                                        padding: '4px',
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                                        },
                                    }}
                                    onClick={handleDeleteClick(id as string)}
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
                paginationMode="server"
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationModelChange}
                pageSizeOptions={pageSizeOptions}
                rowCount={totalRows}
                sortingMode={enableSorting ? 'server' : 'client'}
                onSortModelChange={handleSortModelChange}
                filterMode={enableFilters ? 'server' : 'client'}
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
                            totalRows={totalRows}
                        />
                    ),
                    loadingOverlay: CustomLoadingOverlay,
                }}
                loading={loading}
                sx={{
                    border: 'none',
                    height: '100%',

                    // Header styling - more compact
                    '& .theme--header': {
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: theme.palette.primary.contrastText,
                        fontWeight: 700,
                        fontSize: '0.813rem',
                        letterSpacing: '0.3px',
                        textTransform: 'uppercase',
                        minHeight: '42px !important',
                        maxHeight: '42px !important',
                    },

                    // Reduce column header height
                    '& .MuiDataGrid-columnHeaders': {
                        minHeight: '42px !important',
                        maxHeight: '42px !important',
                        borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    },

                    '& .MuiDataGrid-columnHeader': {
                        minHeight: '42px !important',
                        maxHeight: '42px !important',
                    },

                    // Cell styling - more compact
                    '& .MuiDataGrid-cell': {
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.05)}`,
                        fontSize: '0.875rem',
                        padding: '8px 12px',
                        minHeight: '44px !important',
                        maxHeight: '44px !important',
                        '&:focus': {
                            outline: 'none',
                        },
                        '&:focus-within': {
                            outline: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                            outlineOffset: '-2px',
                        },
                    },

                    // Row styling - more compact
                    '& .MuiDataGrid-row': {
                        minHeight: '44px !important',
                        maxHeight: '44px !important',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                            cursor: 'pointer',
                        },
                        '&.Mui-selected': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.12),
                            },
                        },
                    },

                    // Column separator
                    '& .MuiDataGrid-columnSeparator': {
                        color: alpha(theme.palette.divider, 0.2),
                    },

                    // Footer styling - more compact
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
                        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)} 0%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`,
                        backdropFilter: 'blur(20px)',
                        minHeight: '48px',
                        padding: '4px 12px',
                    },

                    // Pagination styling - more compact
                    '& .MuiTablePagination-root': {
                        color: theme.palette.text.secondary,
                        fontSize: '0.813rem',
                    },
                    '& .MuiTablePagination-toolbar': {
                        minHeight: '48px',
                        padding: '0 8px',
                    },
                    '& .MuiTablePagination-select': {
                        borderRadius: '8px',
                        fontSize: '0.813rem',
                        fontWeight: 600,
                        paddingTop: '4px',
                        paddingBottom: '4px',
                        '&:focus': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            borderRadius: '8px',
                        },
                    },
                    '& .MuiTablePagination-selectLabel': {
                        fontSize: '0.813rem',
                        margin: 0,
                    },
                    '& .MuiTablePagination-displayedRows': {
                        fontSize: '0.813rem',
                        fontWeight: 600,
                        margin: 0,
                    },
                    '& .MuiTablePagination-selectIcon': {
                        color: theme.palette.primary.main,
                    },
                    '& .MuiTablePagination-actions': {
                        marginLeft: '12px',
                    },
                    '& .MuiTablePagination-actions button': {
                        borderRadius: '8px',
                        padding: '4px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                            transform: 'scale(1.05)',
                        },
                        '&.Mui-disabled': {
                            opacity: 0.3,
                        },
                    },

                    // Scrollbar styling
                    '& .MuiDataGrid-virtualScroller': {
                        '&::-webkit-scrollbar': {
                            width: '8px',
                            height: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            backgroundColor: alpha(theme.palette.divider, 0.05),
                            borderRadius: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.3),
                            borderRadius: '8px',
                            transition: 'background-color 0.2s ease',
                            '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.5),
                            },
                        },
                    },

                    // No rows overlay
                    '& .MuiDataGrid-overlay': {
                        backgroundColor: alpha(theme.palette.background.paper, 0.95),
                        backdropFilter: 'blur(8px)',
                    },
                }}
            />
        </Paper>
    );
};