export interface Permission {
    name: string;
    view: boolean;
    edit: boolean;
    delete: boolean;
}



interface UpdatedPermission {
    name: string;
    view: boolean;
    edit: boolean;
    delete: boolean;
    _id: string;
}

interface UpdatedBy {
    id: string;
    name: string;
}

interface PermissionUpdateEvent {
    permissionId: string;
    updatedPermissions: UpdatedPermission[];
    updatedBy: UpdatedBy;
    timestamp: string;
    type: 'organization_update';
}
