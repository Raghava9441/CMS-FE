import { z } from 'zod';

// Environment schema for validation
export const envSchema = z.object({
    // Environment identifier
    VITE_APP_ENV: z.enum(['local', 'development', 'qa', 'beta', 'production']).default('development'),

    // API Configuration
    VITE_APP_API_ORIGIN: z.string().url(),

    // WebEx Configuration
    VITE_APP_WEBEX_BASE_URL: z.string().url(),
    VITE_APP_WEBEX_CLIENT_ID: z.string(),

    // Sentry Configuration
    VITE_APP_SENTRY_TOKEN: z.string(),
    VITE_APP_SENTRY_ORG_SLUG: z.string(),
    VITE_APP_SENTRY_PROJECT_NAME: z.string(),
    VITE_APP_SENTRY_RELEASE: z.string(),
    VITE_APP_SENTRY_DNS: z.string().url(),

    // Feature Flags
    VITE_APP_ENABLE_CONSOLE_LOGS: z.boolean().default(false),
    VITE_APP_DEBUG: z.boolean().default(false),
    VITE_APP_FEATURE_FLAG_TEST: z.boolean().default(false),
});

// Type inferred from schema
export type EnvConfig = z.infer<typeof envSchema>;

// Function to parse environment variables with type safety
export const parseEnv = (): EnvConfig => {
    try {
        // Parse environment variables
        const parsedEnv = envSchema.parse({
            VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
            VITE_APP_API_ORIGIN: import.meta.env.VITE_APP_API_ORIGIN,
            VITE_APP_WEBEX_BASE_URL: import.meta.env.VITE_APP_WEBEX_BASE_URL,
            VITE_APP_WEBEX_CLIENT_ID: import.meta.env.VITE_APP_WEBEX_CLIENT_ID,
            VITE_APP_SENTRY_TOKEN: import.meta.env.VITE_APP_SENTRY_TOKEN,
            VITE_APP_SENTRY_ORG_SLUG: import.meta.env.VITE_APP_SENTRY_ORG_SLUG,
            VITE_APP_SENTRY_PROJECT_NAME: import.meta.env.VITE_APP_SENTRY_PROJECT_NAME,
            VITE_APP_SENTRY_RELEASE: import.meta.env.VITE_APP_SENTRY_RELEASE,
            VITE_APP_SENTRY_DNS: import.meta.env.VITE_APP_SENTRY_DNS,
            VITE_APP_ENABLE_CONSOLE_LOGS: import.meta.env.VITE_APP_ENABLE_CONSOLE_LOGS === 'true',
            VITE_APP_DEBUG: import.meta.env.VITE_APP_DEBUG === 'true',
            VITE_APP_FEATURE_FLAG_TEST: import.meta.env.VITE_APP_FEATURE_FLAG_TEST === 'true',
        });

        return parsedEnv;
    } catch (error) {
        console.error('Invalid environment variables:', error);
        throw new Error('Environment configuration validation failed');
    }
};

// Environment configuration instance
export const envConfig = parseEnv();

// Helper function to check current environment
export const isEnvironment = (env: string): boolean => {
    return envConfig.VITE_APP_ENV === env;
};

// Helper functions for common environment checks
export const isLocal = (): boolean => isEnvironment('local');
export const isDevelopment = (): boolean => isEnvironment('development');
export const isQA = (): boolean => isEnvironment('qa');
export const isBeta = (): boolean => isEnvironment('beta');
export const isProduction = (): boolean => isEnvironment('production');

// API configuration helper
export const getApiBaseUrl = (): string => {
    return envConfig.VITE_APP_API_ORIGIN;
};

// WebEx configuration helper
export const getWebexConfig = () => {
    return {
        baseUrl: envConfig.VITE_APP_WEBEX_BASE_URL,
        clientId: envConfig.VITE_APP_WEBEX_CLIENT_ID,
    };
};

// Sentry configuration helper
export const getSentryConfig = () => {
    return {
        dsn: envConfig.VITE_APP_SENTRY_DNS,
        release: envConfig.VITE_APP_SENTRY_RELEASE,
        environment: envConfig.VITE_APP_ENV,
        org: envConfig.VITE_APP_SENTRY_ORG_SLUG,
        project: envConfig.VITE_APP_SENTRY_PROJECT_NAME,
        token: envConfig.VITE_APP_SENTRY_TOKEN,
    };
};

// Feature flag helpers
export const isFeatureEnabled = (feature: string): boolean => {
    switch (feature) {
        case 'test':
            return envConfig.VITE_APP_FEATURE_FLAG_TEST;
        default:
            return false;
    }
};

export default envConfig;
