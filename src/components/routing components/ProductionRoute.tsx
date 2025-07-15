import { RouteConfig } from "@models/routes.types";
import { Suspense, useEffect } from "react";
import DefaultLoadingComponent from "./DefaultLoadingComponent";
import AccessDeniedComponent from "./AccessDeniedComponent";
import { ErrorBoundary } from "./ErrorBoundary";
import { useRouteData } from "@hooks/useRouteData";

export const ProductionRoute: React.FC<{
    route: RouteConfig;
    params?: any;
}> = ({ route, params = {} }) => {
    const Layout = route.layout;
    // const { canActivate } = useRouteGuard(route);
    const { data, loading, error, refetch } = useRouteData(route, params);

    

    // // Handle loading state
    // if (loading || canActivate === null) {
    //     const LoadingComponent = route.loadingComponent || DefaultLoadingComponent;
    //     return <LoadingComponent />;
    // }

    // // Handle access denied
    // if (canActivate === false) {
    //     return <AccessDeniedComponent route={route} />;
    // }

    // Handle error state
    if (error) {
        return (
            <ErrorBoundary route={route}>
                <ErrorComponent error={error} retry={refetch} />
            </ErrorBoundary>
        );
    }

    // Render main component
    return (
        <ErrorBoundary route={route}>
            <Suspense fallback={route.loadingComponent || <DefaultLoadingComponent />}>
                {Layout ? (
                    <Layout>
                        <route.component {...params} routeData={data} />
                    </Layout>
                ) : (
                    <route.component {...params} routeData={data} />
                )}
            </Suspense>
        </ErrorBoundary>
    );
};