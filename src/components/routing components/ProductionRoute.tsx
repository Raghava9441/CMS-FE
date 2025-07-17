import React from "react";
import { RouteConfig } from "@models/routes.types";
import { Suspense } from "react";
import DefaultLoadingComponent from "./DefaultLoadingComponent";
import AccessDeniedComponent from "./AccessDeniedComponent";
import { ErrorBoundary } from "./ErrorBoundary";
import { useRouteData } from "@hooks/useRouteData";
import { useRouteGuard } from "@hooks/useRouteGuard";

import {
    Box,
    Typography,
    Button,
    Paper,
    Backdrop,
    SvgIcon,
} from "@mui/material";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

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
                        You don't have permission to access this page. Please contact your administrator if you believe this is an error.
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
    const Layout = route.layout;
    const { canActivateRoute } = useRouteGuard();
    const { data, loading, error, refetch } = useRouteData(route, params);

    // Check if user can activate this route
    const canActivate = canActivateRoute(route);

    // Handle loading state
    if (loading) {
        const LoadingComponent = route.loadingComponent || DefaultLoadingComponent;
        return <LoadingComponent />;
    }

    // Handle error state
    if (error) {
        return (
            <ErrorBoundary route={route}>
                <ErrorComponent error={error} retry={refetch} />
            </ErrorBoundary>
        );
    }

    // Render main component
    const mainComponent = (
        <ErrorBoundary route={route}>
            <Suspense fallback={route.loadingComponent || <DefaultLoadingComponent />}>
                {Layout ? (
                    <Layout>
                        <route.component {...params} routeData={data} route={route} canActivate={canActivate} />
                    </Layout>
                ) : (
                    <route.component {...params} routeData={data} route={route} canActivate={canActivate} />
                )}
            </Suspense>
        </ErrorBoundary>
    );

    // Handle access denied
    if (!canActivate) {
        if (useBlurOverlay) {
            return <BlurOverlay>{mainComponent}</BlurOverlay>;
        } else {
            return <AccessDeniedComponent route={route} />;
        }
    }

    return mainComponent;
};