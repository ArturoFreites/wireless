'use client';

import { useGroupedProducts } from "@/hooks/useGroupedProducts";
import ContentGroup from "./ContentGroup";

function Content() {
    const { data, loading } = useGroupedProducts(6);

    if (loading) return <p className="text-center py-20">Cargando productos...</p>;

    return (
        <section className="bg-white">
            {Object.entries(data).map(([subcategoryId, group]) => (
                <ContentGroup
                    key={subcategoryId}
                    title={group.subcategoryName}
                    products={group.products}
                />
            ))}
        </section>
    );
}

export default Content;
