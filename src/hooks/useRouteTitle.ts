import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { routeConfig } from '../config/routes.config';
import { extractRouteParams, findRouteByPath } from '@utils/routes.utills';

export const useRouteTitle = () => {
    const location = useLocation();

    useEffect(() => {
        const currentRoute = findRouteByPath(routeConfig, location.pathname);

        if (currentRoute?.metadata?.title) {
            let title = currentRoute.metadata.title;

            // Handle dynamic titles
            if (currentRoute.metadata.dynamicTitle && currentRoute.isDynamic) {
                const params = extractRouteParams(currentRoute.path, location.pathname);
                title = currentRoute.metadata.dynamicTitle(params);
            }

            document.title = title;
        }
    }, [location.pathname]);
};