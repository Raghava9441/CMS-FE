// usePermissions.ts
import { useState, useCallback } from 'react';
import type { Permission } from '../types/Permission.types';

export function useFeatureFlag(initial: Permission[] = []) {
    const [perms, setPerms] = useState<Permission[]>(initial);
    const toggle = useCallback(
        (index: number, key: keyof Pick<Permission, 'view' | 'edit' | 'delete'>) => {
            setPerms((prev) =>
                prev.map((p, i) =>
                    i === index ? { ...p, [key]: !p[key] } : p
                )
            );
        },
        []
    );

    return { permissions: perms, toggle, setPermissions: setPerms };
}