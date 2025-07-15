import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { routeConfig } from 'config/routes.config';
import { generateBreadcrumbs } from '@utils/routes.utills';

export const useBreadcrumbs = () => {
    const location = useLocation();

    const breadcrumbs = useMemo(() => {
        return generateBreadcrumbs(routeConfig, location.pathname);
    }, [location.pathname]);

    return breadcrumbs;
};