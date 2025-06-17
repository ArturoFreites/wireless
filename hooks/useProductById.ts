import { useMemo } from "react";
import { useSupabaseQuery } from "./useSupabaseQuery";
import { ProductWithRelations } from "@/types/ProductWithRelations";

export function useProductById(id?: string) {
    const filters = useMemo(() => {
        return id ? { id } : undefined;
    }, [id]);

    const { data, loading, error } = useSupabaseQuery<ProductWithRelations>(
        "products_with_relations",
        filters,
        1,
        1,
        "*"
    );

    return {
        data: data?.[0] ?? null,
        loading,
        error,
    };
}
