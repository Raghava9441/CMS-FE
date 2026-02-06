import React, { Suspense } from "react";
import { RouteConfig } from "@models/routes.types";
import DefaultLoadingComponent from "./DefaultLoadingComponent";
import AccessDeniedComponent from "./AccessDeniedComponent";
import { useRouteData } from "@hooks/useRouteData";
import { useRouteGuard } from "@hooks/useRouteGuard";
import { Box, Typography, Button, Paper, Backdrop, SvgIcon } from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useParams } from "react-router-dom";
import DefaultErrorComponent from "./DefaultErrorComponent";
import GranularErrorBoundary from "@components/Granularerrorboundary ";

const BlurOverlay: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box position="relative">
            {/* Blurred content */}
            <Box
                sx={{
                    filter: "blur(6px)",
                    pointerEvents: "none",
                    userSelect: "none",
                }}
            >
                {children}
            </Box>

            {/* Access denied overlay */}
            <Backdrop
                open
                sx={{
                    position: "absolute",
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        p: 4,
                        maxWidth: 400,
                        mx: 2,
                        textAlign: "center",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            backgroundColor: "error.light",
                            mb: 2,
                            mx: "auto",
                        }}
                    >
                        <SvgIcon component={ReportProblemOutlinedIcon} color="error" />
                    </Box>

                    <Typography variant="h6" gutterBottom>
                        Access Denied
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        You don't have permission to access this page. Please contact your
                        administrator if you believe this is an error.
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        sx={{ mt: 3 }}
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </Paper>
            </Backdrop>
        </Box>
    );
};

export const ProductionRoute: React.FC<{
    route: RouteConfig;
    params?: any;
    useBlurOverlay?: boolean;
}> = ({ route, params = {}, useBlurOverlay = false }) => {
    const urlParams = useParams();

    const routeParams =
        params && Object.keys(params).length > 0 ? params : urlParams;
    const Layout = route.layout;
    const { canActivateRoute } = useRouteGuard();
    const { data, loading, error, refetch } = useRouteData(route, routeParams);

    const canActivate = canActivateRoute(route);

    // PAGE LEVEL ERROR BOUNDARY - Wraps the entire route
    return (
        <GranularErrorBoundary
            level="page"
            componentName={`Route: ${route.id}`}
            onError={(error, errorInfo) => {
                console.error(`Page-level error in route ${route.id}:`, error);
                // Send to analytics/monitoring
            }}
            resetKeys={[route.id, routeParams]}
        >
            {/* Handle loading state */}
            {loading && (
                <GranularErrorBoundary
                    level="component"
                    componentName="LoadingComponent"
                    isolate
                >
                    {route.loadingComponent ? (
                        <route.loadingComponent />
                    ) : (
                        <DefaultLoadingComponent />
                    )}
                </GranularErrorBoundary>
            )}

            {!loading && error && (
                <GranularErrorBoundary
                    level="section"
                    componentName="ErrorComponent"
                    isolate
                >
                    {error.response?.data?.statusCode === 403 ? (
                        <BlurOverlay>
                            {/* Placeholder for blurred content */}
                        </BlurOverlay>
                    ) : (
                        <DefaultErrorComponent
                            error={error}
                            retry={refetch}
                            errorId={new Date().getTime().toString()}
                        />
                    )}
                </GranularErrorBoundary>
            )}

            {!loading && !error && (
                <>
                    {!canActivate ? (
                        useBlurOverlay ? (
                            <BlurOverlay>
                                {renderMainComponent(
                                    route,
                                    Layout,
                                    params,
                                    data,
                                    canActivate,
                                    routeParams
                                )}
                            </BlurOverlay>
                        ) : (
                            <GranularErrorBoundary
                                level="component"
                                componentName="AccessDeniedComponent"
                                isolate
                            >
                                <AccessDeniedComponent route={route} />
                            </GranularErrorBoundary>
                        )
                    ) : (
                        renderMainComponent(
                            route,
                            Layout,
                            params,
                            data,
                            canActivate,
                            routeParams
                        )
                    )}
                </>
            )}
        </GranularErrorBoundary>
    );
};


const renderMainComponent = (
    route: RouteConfig,
    Layout: any,
    params: any,
    data: any,
    canActivate: boolean,
    routeParams: any
) => {
    return (
        <GranularErrorBoundary
            level="section"
            componentName={`Component: ${route.id}`}
            isolate
            onError={(error, errorInfo) => {
                console.error(`Component error in ${route.id}:`, error);
            }}
        >
            <Suspense
                fallback={
                    <GranularErrorBoundary
                        level="component"
                        componentName="SuspenseFallback"
                        isolate
                    >
                        {route.loadingComponent ? (
                            <route.loadingComponent />
                        ) : (
                            <DefaultLoadingComponent />
                        )}
                    </GranularErrorBoundary>
                }
            >
                {Layout ? (
                    <GranularErrorBoundary
                        level="component"
                        componentName="Layout"
                        isolate
                    >
                        <Layout>
                            <GranularErrorBoundary
                                level="component"
                                componentName={route.id}
                                isolate
                            >
                                <route.component
                                    {...params}
                                    routeData={data}
                                    route={route}
                                    canActivate={canActivate}
                                />
                            </GranularErrorBoundary>
                        </Layout>
                    </GranularErrorBoundary>
                ) : (
                    <GranularErrorBoundary
                        level="component"
                        componentName={route.id}
                        isolate
                    >
                        <route.component
                            {...params}
                            routeData={data}
                            route={route}
                            canActivate={canActivate}
                        />
                    </GranularErrorBoundary>
                )}
            </Suspense>
        </GranularErrorBoundary>
    );
};