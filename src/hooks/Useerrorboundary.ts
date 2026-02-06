import { useCallback, useState } from 'react';
import { ErrorInfo } from 'react';

/**
 * Hook to programmatically reset error boundaries
 */
export const useErrorHandler = () => {
    const [error, setError] = useState<Error | null>(null);

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    const handleError = useCallback((error: Error) => {
        setError(error);
        throw error; // Re-throw to be caught by error boundary
    }, []);

    return {
        error,
        resetError,
        handleError,
    };
};

/**
 * Hook to track error boundary resets
 */
export const useErrorBoundaryReset = (dependencies: any[] = []) => {
    const [resetKey, setResetKey] = useState(0);

    const reset = useCallback(() => {
        setResetKey(prev => prev + 1);
    }, []);

    return {
        resetKey,
        reset,
        resetKeys: [...dependencies, resetKey],
    };
};

/**
 * Custom error logging function
 */
export const logError = (
    error: Error,
    errorInfo: ErrorInfo | null,
    context?: {
        componentName?: string;
        level?: string;
        userId?: string;
        additionalData?: Record<string, any>;
    }
) => {
    const errorLog = {
        timestamp: new Date().toISOString(),
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
        },
        errorInfo: errorInfo ? {
            componentStack: errorInfo.componentStack,
        } : null,
        context,
        userAgent: navigator.userAgent,
        url: window.location.href,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error Log:', errorLog);
    }

    // Send to error tracking service in production
    if (process.env.NODE_ENV === 'production') {
        // Example: Send to your error tracking service
        // fetch('/api/errors', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(errorLog),
        // });

        // Or use a service like Sentry
        // Sentry.captureException(error, {
        //     contexts: { react: errorInfo },
        //     tags: context,
        // });
    }

    return errorLog;
};