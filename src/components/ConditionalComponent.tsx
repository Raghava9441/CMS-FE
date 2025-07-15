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
    const { hasPermission } = usePermissions();

    if (hasPermission(resource, action)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
