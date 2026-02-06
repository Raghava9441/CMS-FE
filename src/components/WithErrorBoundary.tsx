import React, { ComponentType } from 'react';
import GranularErrorBoundary, { ErrorFallbackProps } from './Granularerrorboundary ';

interface WithErrorBoundaryOptions {
    level?: 'page' | 'section' | 'component';
    componentName?: string;
    isolate?: boolean;
    fallback?: React.ReactNode;
    customErrorComponent?: ComponentType<ErrorFallbackProps>;
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    resetKeys?: any[];
    showDetails?: boolean;
    retryable?: boolean;
}

/**
 * Higher-Order Component that wraps a component with an error boundary
 * 
 * @example
 * // Basic usage
 * const SafeComponent = withErrorBoundary(MyComponent);
 * 
 * @example
 * // With options
 * const SafeComponent = withErrorBoundary(MyComponent, {
 *   level: 'component',
 *   componentName: 'MyComponent',
 *   isolate: true,
 * });
 * 
 * @example
 * // As a decorator (if using TypeScript with experimentalDecorators)
 * @withErrorBoundary({ level: 'section', componentName: 'MySection' })
 * class MySection extends React.Component { ... }
 */
export function withErrorBoundary<P extends object>(
    Component: ComponentType<P>,
    options: WithErrorBoundaryOptions = {}
): ComponentType<P> {
    const {
        level = 'component',
        componentName = Component.displayName || Component.name || 'Component',
        isolate = true,
        fallback,
        customErrorComponent,
        onError,
        resetKeys,
        showDetails,
        retryable,
    } = options;

    const WrappedComponent: React.FC<P> = (props) => {
        return (
            <GranularErrorBoundary
                level={level}
                componentName={componentName}
                isolate={isolate}
                fallback={fallback}
                customErrorComponent={customErrorComponent}
                onError={onError}
                resetKeys={resetKeys}
                showDetails={showDetails}
                retryable={retryable}
            >
                <Component {...props} />
            </GranularErrorBoundary>
        );
    };

    WrappedComponent.displayName = `withErrorBoundary(${componentName})`;

    return WrappedComponent;
}

/**
 * Hook-based alternative for functional components
 * 
 * @example
 * function MyComponent() {
 *   return useErrorBoundary(
 *     <div>Content</div>,
 *     { level: 'component', componentName: 'MyComponent' }
 *   );
 * }
 */
export function useErrorBoundaryWrapper(
    children: React.ReactNode,
    options: WithErrorBoundaryOptions = {}
): JSX.Element {
    const {
        level = 'component',
        componentName = 'Component',
        isolate = true,
        fallback,
        customErrorComponent,
        onError,
        resetKeys,
        showDetails,
        retryable,
    } = options;

    return (
        <GranularErrorBoundary
            level={level}
            componentName={componentName}
            isolate={isolate}
            fallback={fallback}
            customErrorComponent={customErrorComponent}
            onError={onError}
            resetKeys={resetKeys}
            showDetails={showDetails}
            retryable={retryable}
        >
            {children}
        </GranularErrorBoundary>
    );
}