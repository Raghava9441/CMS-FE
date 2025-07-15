import { useEffect, useState } from "react";
import { RouteConfig } from "@models/routes.types";

export const useRouteData = (route: RouteConfig, params: any = {}) => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        resolveRouteData();
    }, [route.id, JSON.stringify(params)]);

    const resolveRouteData = async () => {
        if (!route.guards?.resolve) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const context = { route, params };
            const resolvers = Object.entries(route.guards.resolve);
            const results = await Promise.all(
                resolvers.map(async ([key, resolver]) => {
                    return [key, await resolver(context)];
                })
            );

            setData(Object.fromEntries(results));
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        resolveRouteData();
    };

    return { data, loading, error, refetch };
};