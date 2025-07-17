export interface RoutePermission {
    roles: string[];
    permissions?: string[];
    customCheck?: (user: any, params?: any) => boolean;
}

export interface RouteMetadata {
    title: string;
    description?: string;
    keywords?: string[];
    breadcrumb?: string;
    icon?: React.ReactNode;
    hideInMenu?: boolean;
    hideInBreadcrumb?: boolean;
    order?: number;
    feature?: string;
    dynamicTitle?: (params: any) => string;
    dynamicBreadcrumb?: (params: any) => string;
}

export interface RouteConfig {
    layout?: React.ComponentType<any>;
    exact?: boolean;
    index?: boolean;
    children?: RouteConfig[];
    permission?: RoutePermission;
    metadata?: RouteMetadata;
    lazy?: boolean;
    fallback?: React.ComponentType<any>;
    preload?: boolean;
    isDynamic?: boolean;
    paramKeys?: string[];
    parentId?: string;
    showInSidebar?: boolean;
    sidebarMatcher?: string;
    id: string;
    path: string;
    component: React.LazyExoticComponent<any>;
    loadingComponent?: React.ComponentType;
    errorBoundary?: React.ComponentType<{ error: Error; retry: () => void }>;
    breadcrumb?: string | ((params: any) => string);
    icon?: string;
    badge?: string | number;
    // Feature Flags & A/B Testing
    featureFlags?: string[];
    // Route Protection
    guards?: {
        canView?: (context: any) => boolean | Promise<boolean>;
        canEdit?: (context: any) => boolean | Promise<boolean>;
        canDelete?: (context: any) => boolean | Promise<boolean>;
        resolve?: Record<string, (context: any) => any>;
    };
    resourceName?: string
}

export interface SidebarItem {
    id: string;
    label: string;
    path: string;
    icon: React.ReactNode;
    order: number;
    roles: string[];
    permissions?: string[];
    featureFlag?: string;
    badge?: {
        text: string;
        variant: 'new' | 'beta' | 'premium' | 'count';
        count?: number;
    };
    children?: SidebarItem[];
    isExternal?: boolean;
    target?: '_blank' | '_self';
    divider?: boolean;
    category?: string;
    customCheck?: (user: any) => boolean;
    // New properties for sub-routes
    matchPattern?: string; // Pattern to match for active state
    exactMatch?: boolean;
    dynamicChildren?: boolean; // If children are loaded dynamically
    childrenLoader?: () => Promise<SidebarItem[]>;
}