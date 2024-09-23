import { GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowModesModel } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { organizationApi } from '../api/organization.api'
import { Organization } from '../models/organization.modal'
import { ReusableDataGrid } from '../components/ReusableDataGrid'
import {
    randomId,
} from '@mui/x-data-grid-generator';
import { Box } from '@mui/material'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { organizationActions } from '../redux/actions/organization.actions'

type Props = {}

function Organizations({ }: Props) {
    const dispatch = useDispatch<AppDispatch>()

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'category', headerName: 'Category', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'number', headerName: 'Number', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'contactEmail', headerName: 'ContactEmail', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'contactPhone', headerName: 'ContactPhone', flex: 1, editable: true, headerClassName: 'theme--header' },
        { field: 'website', headerName: 'Website', flex: 1, editable: true, headerClassName: 'theme--header' },
    ]

    const [rows, setRows] = React.useState<Organization[]>([])
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    // const [loading, setLoading] = useState<boolean>(true);
    const { data: organizations,loading } = useSelector((state: RootState) => state.organization);

    useEffect(() => {
        dispatch(organizationActions.fetchOrganizations())
    }, [])

    const handleAdd = async () => {
        const newRow = {
            _id: randomId(),
            name: '',
            category: '',
            number: '',
        };

        setRows((oldRows) => (oldRows ? [newRow, ...organizations?.organizations] : [newRow]));

        setRowModesModel((prevModel) => ({
            ...prevModel,
            [newRow._id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }, // Focus on the 'name' field
        }));
    };


    const handleEdit = async (id: GridRowId, updatedRow: GridRowModel) => {
        console.log("hehe")
        const updatedRows = rows?.map((row) => (row._id === id ? updatedRow : row));
        setRows(updatedRows);

        // Update API
        // await axios.put(`${API_URL}/${id}`, updatedRow);
    };

    const handleDelete = async (id: GridRowId) => {
        console.log(id)
        // setRows(rows.filter((row) => row._id !== id));
        dispatch(organizationActions.deleteOrganization(id))
        // Delete from API
        // await axios.delete(`${API_URL}/${id}`);
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <ReusableDataGrid
                columns={columns}
                onAdd={handleAdd}
                onDelete={handleDelete}
                onEdit={handleEdit}
                rows={organizations?.organizations}
                rowModesModel={rowModesModel}
                setRowModesModel={setRowModesModel}
                loading={loading}
            />
        </Box>
    )
}

export default Organizations