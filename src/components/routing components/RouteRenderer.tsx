import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routeConfig } from '../../config/routes.config';
import { RouteConfig } from '@models/routes.types';
import _404 from '../../pages/_404';
import { ProductionRoute } from './ProductionRoute';

const RouteRenderer: React.FC = () => {
    const renderRoute = (route: RouteConfig): React.ReactElement => {
        return (
            <Route
                key={route.id}
                path={route.path}
                index={route.index}
                element={<ProductionRoute route={route} useBlurOverlay={true} />}
            >
                {route.children?.map(child => renderRoute(child))}
            </Route>
        );
    };

    return (
        <Routes>
            {routeConfig.map(route => renderRoute(route))}
            <Route path="*" element={<_404 />} />
        </Routes>
    );
};

export default RouteRenderer;
