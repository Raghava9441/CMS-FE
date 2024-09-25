import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
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
} from '@mui/x-data-grid';
import { CircularProgress, styled, Typography, useTheme } from '@mui/material';

interface ReusableDataGridProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    onAdd: () => void;
    onEdit: (id: GridRowId, updatedRow: GridRowModel) => Promise<void>;
    onDelete: (id: GridRowId) => Promise<void>;
    rowModesModel: GridRowModesModel;
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>;
    loading: boolean;
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

function EditToolbar({ onAdd }: { onAdd: () => void }) {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', padding: 1 }}>
            <GridToolbarExport
                slotProps={{
                    tooltip: { title: 'Export data' },
                    button: { variant: 'outlined' },
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
}) => {

    const theme = useTheme();
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        // console.log(id)
        // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        // Get the updated row by finding it in the rows array after the user edits it
        const updatedRow = rows.find((row) => row._id === id);
        if (updatedRow) {
            // Apply the row update and use the updated data
            const processedRow = processRowUpdate(updatedRow, rows.find(row => row._id === id) || updatedRow);
            console.log(processedRow)
            await onEdit(id, processedRow); // Pass the updated row to the handleEdit function
        }
    };

    const handleDeleteClick = (id: GridRowId) => async () => {
        await onDelete(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    };

    const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
        const updatedRow = { ...oldRow, ...newRow };
        console.log(updatedRow)
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
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
                                    onClick={handleEditClick(id)}
                                    color="inherit"
                                />,
                                <GridActionsCellItem
                                    icon={<DeleteIcon />}
                                    label="Delete"
                                    onClick={handleDeleteClick(id)}
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
                    toolbar: () => <EditToolbar onAdd={onAdd} />,
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
