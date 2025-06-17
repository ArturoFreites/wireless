// hooks/useGroupedProducts.ts
import { useEffect, useState } from "react";
import { ProductWithRelations } from "@/types/ProductWithRelations";
import { supabaseBrowser } from "@/lib/superbase";

type GroupedProducts = Record<string, {
    subcategoryName: string;
    products: ProductWithRelations[];
}>;

export function useGroupedProducts(limitPerSubcategory: number = 6) {
    const [data, setData] = useState<GroupedProducts>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetch() {
            const { data: all, error } = await supabaseBrowser
                .from("products_with_relations")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error(error);
                setLoading(false);
                return;
            }

            const grouped: GroupedProducts = {};

            all.forEach((product: ProductWithRelations) => {
                const subId = product.subcategory_id ?? "desconocido";
                if (!grouped[subId]) {
                    grouped[subId] = {
                        subcategoryName: product.subcategory_name ?? "Sin nombre",
                        products: [],
                    };
                }
                if (grouped[subId].products.length < limitPerSubcategory) {
                    grouped[subId].products.push(product);
                }
            });

            setData(grouped);
            setLoading(false);
        }

        fetch();
    }, [limitPerSubcategory]);

    return { data, loading };
}
