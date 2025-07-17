import { usePermissions } from '@hooks/usePermissions';
import React from 'react';

interface ConditionalComponentProps {
    resource: string;
    action: 'view' | 'edit' | 'delete';
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export const ConditionalComponent: React.FC<ConditionalComponentProps> = ({
    resource,
    action,
    children,
    fallback = null
}) => {
    const { hasViewPermission, hasDeletePermission, hasEditPermission } = usePermissions();
    if (action === "view") {
        if (hasViewPermission(resource)) {
            return <>{children}</>;
        }
    }
    if (action === "edit") {
        if (hasEditPermission(resource)) {
            return <>{children}</>;
        }
    }
    if (action === "delete") {

        if (hasDeletePermission(resource)) {
            return <>{children}</>;
        }
    }
    
    return <>{fallback}</>;
};
