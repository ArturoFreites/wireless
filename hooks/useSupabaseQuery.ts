/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabaseBrowser } from '@/lib/superbase';
import { useEffect, useState, useCallback } from 'react';

type Filters = Record<string, string | number | boolean | null>;

type Order = {
    column: string;
    ascending: boolean;
};

export function useSupabaseQuery<T = any>(
    table: string,
    filters: Filters = {},
    page: number = 1,
    pageSize: number = 10,
    selectString: string = '*',
    order?: Order
) {
    const [data, setData] = useState<T[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const fetch = useCallback(async () => {
        setLoading(true);

        let query = supabaseBrowser
            .from(table)
            .select(selectString, { count: 'exact' });

        if (order?.column) {
            query = query.order(order.column, { ascending: order.ascending });
        } else {
            query = query.order('created_at', { ascending: true });
        }

        for (const key in filters) {
            const value = filters[key];
            if (value !== null && value !== undefined && value !== '') {
                query = query.eq(key, value);
            }
        }

        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error || !Array.isArray(data)) {
            setError(error?.message ?? 'Error desconocido');
            setData(null);
            setTotalCount(0);
        } else {
            setData(data as T[]);
            setError(null);
            setTotalCount(count || 0);
        }

        setLoading(false);
    }, [table, filters, page, pageSize, selectString, JSON.stringify(order)]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    return {
        data,
        loading,
        error,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
        mutate: fetch
    };
}
