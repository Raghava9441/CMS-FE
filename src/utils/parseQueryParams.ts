import { Params } from "@models/pagination.modals";

export const parseQueryParams = (params: Params) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', params.page.toString());
    queryParams.append('limit', params.limit.toString());

    // Search parameter
    if (params.searchTerm && params.searchTerm.trim()) {
        queryParams.append('search', params.searchTerm.trim());
    }

    // Sort parameters
    if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy);
        queryParams.append('sortOrder', params.sortOrder || 'asc');
    }

    if (params.filters) {
        Object.entries(params.filters).forEach(([key, filterObj]) => {
            if (filterObj && typeof filterObj === 'object') {
                // Handle DataGrid filter format
                if (filterObj.value !== undefined) {
                    queryParams.append(`filter[${key}]`, filterObj.value);
                    if (filterObj.operator) {
                        queryParams.append(`filter[${key}][operator]`, filterObj.operator);
                    }
                }
            } else {
                // Handle simple filter format
                queryParams.append(`filter[${key}]`, filterObj);
            }
        });
    }

    return queryParams.toString();
}