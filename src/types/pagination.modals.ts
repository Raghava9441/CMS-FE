interface PaginationParams {
    page: number;
    limit: number;
}

interface FilterParams {
    searchTerm?: string;
    filters?: Record<string, any>;
}

interface SortParams {
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface Params extends PaginationParams, FilterParams, SortParams { }