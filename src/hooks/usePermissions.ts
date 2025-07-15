import { RootState } from '@redux/store';
import { useSelector } from 'react-redux';

export const usePermissions = () => {
    const permissions = useSelector((state: RootState) => state.auth.permissions);
    const hasPermission = (resourceName: string, action: 'view' | 'edit' | 'delete'): boolean => {
        const permission = permissions.find(p => p.name === resourceName);
        return permission ? permission[action] : false;
    };

    const getResourcePermissions = (resourceName: string) => {
        return permissions.find(p => p.name === resourceName);
    };

    return {
        permissions,
        hasPermission,
        getResourcePermissions
    };
};