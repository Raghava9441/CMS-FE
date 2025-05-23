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
} from '@mui/x-data-grid';
import { CircularProgress, IconButton, styled, Typography, useTheme } from '@mui/material';

interface ReusableDataGridProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    onAdd: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    rowModesModel: GridRowModesModel;
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
    loading: boolean;
    reloadData?: () => void;
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

function EditToolbar({ onAdd, reloadData }: { onAdd: () => void; reloadData?: () => void }) {
    const [isRotating, setIsRotating] = React.useState(false);

    const handleIconClick = () => {
        setIsRotating(true);
        reloadData?.();
        setTimeout(() => setIsRotating(false), 1000);
    };

    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', padding: 1 }}>
            <GridToolbarQuickFilter />
            <GridToolbarFilterButton />
            <IconButton onClick={handleIconClick}>
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
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
            />
            <Button color="primary" startIcon={<AddIcon />} onClick={onAdd} variant='outlined'>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export const ReusableDataGrid: React.FC<ReusableDataGridProps> = ({
    rows,
    columns,
    onAdd,
    onEdit,
    onDelete,
    rowModesModel,
    setRowModesModel,
    loading,
    reloadData,
}) => {

    const theme = useTheme();
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: string) => () => {
        // console.log(id)
        onEdit(id);
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        const updatedRow = rows.find((row) => row._id === id);
        if (updatedRow) {
            const processedRow = processRowUpdate(updatedRow, rows.find(row => row._id === id) || updatedRow);
            console.log(processedRow)
        }
    };

    const handleDeleteClick = (id: string) => async () => {
        await onDelete(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        // setRowModesModel({
        //     ...rowModesModel,
        //     [id]: { mode: GridRowModes.View, ignoreModifications: true },
        // });
    };

    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
        const updatedRow = { ...oldRow, ...newRow };
        console.log(updatedRow)
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        // setRowModesModel(newRowModesModel);
    };

    return (
        <Box
            sx={{
                height: "100%",
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                '& .theme--header': {
                    backgroundColor: theme.palette.primary.main,
                },
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
                slots={{
                    toolbar: () => <EditToolbar onAdd={onAdd} reloadData={reloadData} />,
                    loadingOverlay: CustomLoadingOverlay
                }}
                loading={loading}
                sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'primary.main',
                    },
                }}
            />
        </Box>
    );
};
