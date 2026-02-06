import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper, Alert, Collapse, IconButton } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BugReportIcon from '@mui/icons-material/BugReport';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    isolate?: boolean; // If true, only shows error in this component's space
    level?: 'page' | 'section' | 'component'; // Defines the scope of the error boundary
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    resetKeys?: any[]; // Keys that when changed, will reset the error boundary
    showDetails?: boolean; // Show error details (disable in production)
    customErrorComponent?: React.ComponentType<ErrorFallbackProps>;
    componentName?: string; // Name of the component for better debugging
    retryable?: boolean; // Whether to show retry button
    onRetry?: () => void; // Custom retry handler
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
    errorCount: number;
    showDetails: boolean;
}

export interface ErrorFallbackProps {
    error: Error;
    errorInfo: ErrorInfo | null;
    resetError: () => void;
    errorCount: number;
    level: string;
    componentName?: string;
    showDetails?: boolean;
}

class GranularErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            errorCount: 0,
            showDetails: false,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to error reporting service
        console.error('Error caught by boundary:', {
            error,
            errorInfo,
            componentName: this.props.componentName,
            level: this.props.level,
        });

        this.setState(prevState => ({
            error,
            errorInfo,
            errorCount: prevState.errorCount + 1,
        }));

        // Call custom error handler if provided
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }

        // Send to analytics/monitoring service
        this.logErrorToService(error, errorInfo);
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps) {
        // Reset error boundary when resetKeys change
        if (this.state.hasError && this.props.resetKeys) {
            const hasResetKeyChanged = this.props.resetKeys.some(
                (key, index) => key !== prevProps.resetKeys?.[index]
            );

            if (hasResetKeyChanged) {
                this.resetError();
            }
        }
    }

    logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
        // Integrate with your error tracking service (Sentry, LogRocket, etc.)
        // Example:
        // Sentry.captureException(error, {
        //     contexts: {
        //         react: {
        //             componentStack: errorInfo.componentStack,
        //         },
        //     },
        //     tags: {
        //         boundary_level: this.props.level,
        //         component_name: this.props.componentName,
        //     },
        // });

        // For now, just log to console
        if (process.env.NODE_ENV === 'development') {
            console.group('🔴 Error Boundary Caught Error');
            console.error('Error:', error);
            console.error('Error Info:', errorInfo);
            console.error('Component Name:', this.props.componentName);
            console.error('Level:', this.props.level);
            console.groupEnd();
        }
    };

    resetError = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });

        // Call custom retry handler if provided
        if (this.props.onRetry) {
            this.props.onRetry();
        }
    };

    toggleDetails = () => {
        this.setState(prevState => ({
            showDetails: !prevState.showDetails,
        }));
    };

    render() {
        if (this.state.hasError) {
            // Use custom error component if provided
            if (this.props.customErrorComponent) {
                const CustomErrorComponent = this.props.customErrorComponent;
                return (
                    <CustomErrorComponent
                        error={this.state.error!}
                        errorInfo={this.state.errorInfo}
                        resetError={this.resetError}
                        errorCount={this.state.errorCount}
                        level={this.props.level || 'component'}
                        componentName={this.props.componentName}
                        showDetails={this.props.showDetails}
                    />
                );
            }

            // Use custom fallback if provided
            if (this.props.fallback) {
                return <>{this.props.fallback}</>;
            }

            // Default error UI based on level
            return this.renderDefaultErrorUI();
        }

        return this.props.children;
    }

    renderDefaultErrorUI = () => {
        const { level = 'component', componentName, showDetails: showDetailsProp } = this.props;
        const { error, errorInfo, errorCount, showDetails } = this.state;

        const isDevelopment = process.env.NODE_ENV === 'development';
        const shouldShowDetails = isDevelopment && (showDetailsProp !== false);

        // Different styling based on error boundary level
        const getLevelStyles = () => {
            switch (level) {
                case 'page':
                    return {
                        minHeight: '400px',
                        p: 4,
                        m: 2,
                    };
                case 'section':
                    return {
                        minHeight: '200px',
                        p: 3,
                        m: 1,
                    };
                case 'component':
                default:
                    return {
                        minHeight: '100px',
                        p: 2,
                        m: 0.5,
                    };
            }
        };

        return (
            <Paper
                elevation={level === 'page' ? 3 : 1}
                sx={{
                    ...getLevelStyles(),
                    backgroundColor: 'error.lighter',
                    border: '1px solid',
                    borderColor: 'error.light',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ textAlign: 'center', maxWidth: 600 }}>
                    <ErrorOutlineIcon
                        sx={{
                            fontSize: level === 'page' ? 64 : level === 'section' ? 48 : 32,
                            color: 'error.main',
                            mb: 2,
                        }}
                    />

                    <Typography
                        variant={level === 'page' ? 'h4' : level === 'section' ? 'h5' : 'h6'}
                        gutterBottom
                        color="error"
                    >
                        {level === 'page' && 'Page Error'}
                        {level === 'section' && 'Section Error'}
                        {level === 'component' && 'Component Error'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {componentName ? (
                            <>
                                An error occurred in the <strong>{componentName}</strong> component.
                            </>
                        ) : (
                            <>Something went wrong in this {level}.</>
                        )}
                        {errorCount > 1 && (
                            <> This error has occurred {errorCount} times.</>
                        )}
                    </Typography>

                    {shouldShowDetails && error && (
                        <Box sx={{ mb: 2 }}>
                            <Button
                                size="small"
                                onClick={this.toggleDetails}
                                startIcon={showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                sx={{ mb: 1 }}
                            >
                                {showDetails ? 'Hide' : 'Show'} Error Details
                            </Button>

                            <Collapse in={showDetails}>
                                <Alert severity="error" sx={{ textAlign: 'left', mt: 1 }}>
                                    <Typography variant="caption" component="div" sx={{ mb: 1 }}>
                                        <strong>Error:</strong> {error.message}
                                    </Typography>
                                    {error.stack && (
                                        <Typography
                                            variant="caption"
                                            component="pre"
                                            sx={{
                                                fontSize: '0.7rem',
                                                overflow: 'auto',
                                                maxHeight: 200,
                                                backgroundColor: 'rgba(0,0,0,0.05)',
                                                p: 1,
                                                borderRadius: 1,
                                            }}
                                        >
                                            {error.stack}
                                        </Typography>
                                    )}
                                    {errorInfo?.componentStack && (
                                        <Typography
                                            variant="caption"
                                            component="pre"
                                            sx={{
                                                fontSize: '0.7rem',
                                                overflow: 'auto',
                                                maxHeight: 200,
                                                backgroundColor: 'rgba(0,0,0,0.05)',
                                                p: 1,
                                                borderRadius: 1,
                                                mt: 1,
                                            }}
                                        >
                                            {errorInfo.componentStack}
                                        </Typography>
                                    )}
                                </Alert>
                            </Collapse>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {(this.props.retryable !== false) && (
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<RefreshIcon />}
                                onClick={this.resetError}
                                size={level === 'component' ? 'small' : 'medium'}
                            >
                                Try Again
                            </Button>
                        )}

                        {level === 'page' && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => window.location.href = '/'}
                                size="medium"
                            >
                                Go to Home
                            </Button>
                        )}

                        {isDevelopment && (
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<BugReportIcon />}
                                onClick={() => {
                                    console.log('Error Object:', error);
                                    console.log('Error Info:', errorInfo);
                                }}
                                size={level === 'component' ? 'small' : 'medium'}
                            >
                                Log to Console
                            </Button>
                        )}
                    </Box>
                </Box>
            </Paper>
        );
    };
}

export default GranularErrorBoundary;