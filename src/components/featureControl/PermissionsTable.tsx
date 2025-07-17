// PermissionsTable.tsx
import React from 'react';
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
} from '@mui/material';
import { Permission } from '@models/Permission.types';
import PermissionRow from './PermissionRow';

interface Props {
    permissions: Permission[];
    onToggle: (index: number, key: keyof Pick<Permission, 'view' | 'edit' | 'delete'>) => void;
}

const PermissionsTable: React.FC<Props> = ({ permissions, onToggle }) => (
    <TableContainer component={Paper} elevation={3}>
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Feature</TableCell>
                    {['View', 'Edit', 'Delete'].map((h) => (
                        <TableCell key={h} align="center" sx={{ fontWeight: 600 }}>
                            <Chip label={h} size="small" color={h === 'Delete' ? 'error' : 'primary'} />
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {permissions.map((p, i) => (
                    <PermissionRow key={p.name} index={i} permission={p} onToggle={onToggle} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);

export default PermissionsTable;