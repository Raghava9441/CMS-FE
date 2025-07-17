import { Permission } from '@models/Permission.types';
import { RootState } from '@redux/store';
import { hasDeletePermission, hasEditPermission, hasViewPermission } from '@utils/permissionUtils';
import { useSelector } from 'react-redux';
export const usePermissions = () => {
    const permissions = useSelector((state: RootState) => state.auth.permissions || []);

    return {
        permissions,
        hasViewPermission: (resourceName: string) => hasViewPermission(permissions, resourceName),
        hasEditPermission: (resourceName: string) => hasEditPermission(permissions, resourceName),
        hasDeletePermission: (resourceName: string) => hasDeletePermission(permissions, resourceName),
        getPermission: (resourceName: string) =>
            permissions.find((p: Permission) => p.name === resourceName) || null,
    };
};