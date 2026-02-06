// PermissionsTable.tsx
import React, { useState } from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Chip,
    TextField,
    InputAdornment,
    IconButton,
    Tooltip,
    TablePagination,
    alpha,
    useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Permission } from '@models/Permission.types';
import PermissionRow from './PermissionRow';

interface Props {
    permissions: Permission[];
    onToggle: (index: number, key: keyof Pick<Permission, 'view' | 'edit' | 'delete'>) => void;
}

const PermissionsTable: React.FC<Props> = ({ permissions, onToggle }) => {
    const theme = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Filter permissions based on search query
    const filteredPermissions = permissions.filter(permission =>
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (permission.description && permission.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedPermissions = filteredPermissions.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Paper
            elevation={2}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                overflow: 'hidden'
            }}
        >
            {/* Search Bar */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search features..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setPage(0);
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                        endAdornment: searchQuery && (
                            <InputAdornment position="end">
                                <Tooltip title="Clear search">
                                    <IconButton
                                        size="small"
                                        onClick={() => setSearchQuery('')}
                                        edge="end"
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 1,
                        },
                    }}
                />
                {searchQuery && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Found {filteredPermissions.length} feature{filteredPermissions.length !== 1 ? 's' : ''}
                    </Typography>
                )}
            </Box>

            {/* Table Container */}
            <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
                <Table size="medium" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: 600,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                                    py: 2,
                                    minWidth: 250
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <FilterListIcon fontSize="small" color="primary" />
                                    <span>Feature</span>
                                </Box>
                            </TableCell>
                            {['View', 'Edit', 'Delete'].map((h) => (
                                <TableCell
                                    key={h}
                                    align="center"
                                    sx={{
                                        fontWeight: 600,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                        borderBottom: `2px solid ${theme.palette.primary.main}`,
                                        py: 2,
                                        width: 120
                                    }}
                                >
                                    <Chip
                                        label={h}
                                        size="small"
                                        color={h === 'Delete' ? 'error' : h === 'Edit' ? 'primary' : 'success'}
                                        variant="outlined"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedPermissions.length > 0 ? (
                            paginatedPermissions.map((permission, index) => {
                                // Find the original index in the permissions array
                                const originalIndex = permissions.findIndex(p => p.name === permission.name);
                                return (
                                    <PermissionRow
                                        key={permission.name}
                                        index={originalIndex}
                                        permission={permission}
                                        onToggle={onToggle}
                                    />
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                                    <Box sx={{ textAlign: 'center', color: 'text.secondary' }}>
                                        <SearchIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                                        <Typography variant="h6" gutterBottom>
                                            {searchQuery ? 'No matching features found' : 'No features available'}
                                        </Typography>
                                        <Typography variant="body2">
                                            {searchQuery ? 'Try a different search term' : 'Add features to get started'}
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            {filteredPermissions.length > 0 && (
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredPermissions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        borderTop: 1,
                        borderColor: 'divider',
                    }}
                />
            )}
        </Paper>
    );
};

export default PermissionsTable;