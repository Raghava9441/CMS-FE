import { RouteConfig } from "@models/routes.types";
import React from "react";
import DefaultErrorComponent from "./DefaultErrorComponent";

export class ErrorBoundary extends React.Component<
    { children: React.ReactNode; route: RouteConfig },
    { hasError: boolean; error: Error | null; errorId: string }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null, errorId: '' };
    }

    static getDerivedStateFromError(error: Error) {
        return {
            hasError: true,
            error,
            errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log to monitoring service
        this.logError(error, errorInfo);

        // Track analytics
        this.trackErrorEvent(error);
    }

    private logError(error: Error, errorInfo: React.ErrorInfo) {
        // Send to logging service (e.g., Sentry, LogRocket)
        console.error('Route Error:', {
            error: error.message,
            stack: error.stack,
            errorInfo,
            route: this.props.route,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        });
    }

    private trackErrorEvent(error: Error) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'route_error', {
                error_message: error.message,
                route_id: this.props.route.id,
                route_path: this.props.route.path
            });
        }
    }

    private handleRetry = () => {
        this.setState({ hasError: false, error: null, errorId: '' });
    };

    render() {
        if (this.state.hasError) {
            const ErrorComponent = this.props.route?.errorBoundary || DefaultErrorComponent;
            return (
                <ErrorComponent
                    error={this.state.error!}
                    retry={this.handleRetry}
                    errorId={this.state.errorId}
                />
            );
        }

        return this.props.children;
    }
}