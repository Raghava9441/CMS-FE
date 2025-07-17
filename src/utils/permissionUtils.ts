
// types/permissions.types.ts
export interface Permission {
    name: string;
    view: boolean;
    edit: boolean;
    delete: boolean;
    _id: string;
}

export interface UserPermissions {
    permissions: Permission[];
}


export const getPermissionByResourceName = (
    permissions: Permission[],
    resourceName: string
): Permission | null => {
    return permissions.find(p => p.name === resourceName) || null;
};

export const hasViewPermission = (
    permissions: Permission[],
    resourceName: string
): boolean => {
    const permission = getPermissionByResourceName(permissions, resourceName);
    return permission ? permission.view : false;
};

export const hasEditPermission = (
    permissions: Permission[],
    resourceName: string
): boolean => {
    const permission = getPermissionByResourceName(permissions, resourceName);
    return permission ? permission.edit : false;
};

export const hasDeletePermission = (
    permissions: Permission[],
    resourceName: string
): boolean => {
    const permission = getPermissionByResourceName(permissions, resourceName);
    return permission ? permission.delete : false;
};