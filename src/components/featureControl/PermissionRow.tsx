// PermissionRow.tsx
import React from 'react';
import {
    TableRow,
    TableCell,
    Switch,
    Typography,
    Chip,
} from '@mui/material';
import { Permission } from '@models/Permission.types';

interface Props {
    index: number;
    permission: Permission;
    onToggle: (index: number, key: keyof Pick<Permission, 'view' | 'edit' | 'delete'>) => void;
}

const PermissionRow: React.FC<Props> = ({ index, permission, onToggle }) => (
    <TableRow>
        <TableCell sx={{ padding: "0px", paddingX: "10px" }}>
            <Typography variant="body1" fontWeight="medium">
                {permission.name}
            </Typography>
        </TableCell>

        {(['view', 'edit', 'delete'] as const).map((right) => (
            <TableCell key={right} align="center" sx={{ padding: "0px" }}>
                <Switch
                    checked={permission[right]}
                    onChange={() => onToggle(index, right)}
                    color={right === 'delete' ? 'error' : 'primary'}
                    inputProps={{ 'aria-label': `${permission.name}-${right}` }}
                />
            </TableCell>
        ))}
    </TableRow>
);

export default React.memo(PermissionRow);