import { useCallback, useEffect, useState } from 'react';
import { Params } from '@models/pagination.modals';

/**
 * Custom hook to manage pagination, sorting, filtering, and search params.
 * Optionally triggers a callback when params change.
 *
 * @param initialParams - The initial params state
 * @param onParamsChangeEffect - Optional callback to run when params change (e.g., fetch data)
 */
export function usePaginationParams(
    initialParams: Params,
    onParamsChangeEffect?: (params: Params) => void
) {
    const [params, setParams] = useState<Params>(initialParams);

    // Handler to update params (for DataGrid, etc.)
    const handleParamsChange = useCallback((newParams: Partial<Params>) => {
        setParams((prev) => ({ ...prev, ...newParams }));
    }, []);

    // Optionally run effect when params change
    useEffect(() => {
        if (onParamsChangeEffect) {
            onParamsChangeEffect(params);
        }
    }, [params, onParamsChangeEffect]);

    return {
        params,
        setParams,
        handleParamsChange,
    };
} 