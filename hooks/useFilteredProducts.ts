'use client';

import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { ProductWithRelations } from "@/types/ProductWithRelations";

export function useFilteredProducts(
    categoryId?: string,
    subcategoryId?: string,
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
    status: string | null = "active"
) {
    const filters = useMemo(() => {
        const baseFilters: Record<string, string> = {};

        if (subcategoryId) baseFilters.subcategory_id = subcategoryId;
        else if (categoryId) baseFilters.category_id = categoryId;

        if (status) baseFilters.status = status;

        return baseFilters;
    }, [categoryId, subcategoryId, status]);

    const select = useMemo(() => "*", []);

    const order = useMemo(() => {
        if (!sortBy) return undefined;
        return {
            column: sortBy,
            ascending: sortOrder === 'asc',
        };
    }, [sortBy, sortOrder]);

    const {
        data,
        loading,
        error,
        mutate
    } = useSupabaseQuery<ProductWithRelations>(
        "products_with_relations",
        filters,
        1,
        100,
        select,
        order
    );

    return { data, loading, error, mutate };
}
