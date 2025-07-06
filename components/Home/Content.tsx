'use client';

import { useState } from "react";
import { useGroupedProducts } from "@/hooks/useGroupedProducts";
import ContentGroup from "@/components/Home/ContentGroup";
import SearchResults from "./SearchResults";

function Content() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data, loading } = useGroupedProducts(6);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    if (loading) return <p className="text-center py-20 w-96">Cargando productos...</p>;

    return (
        <section className="bg-white px-4 md:px-12 py-6">
            <div className="w-full flex flex-col items-center justify-center mt-20 text-neutral-800">
                <p className="mb-2 font-semibold">Busca el producto</p>
                <input
                    type="text"
                    placeholder="Busca el produto"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded mb-8"
                />
            </div>

            {searchTerm.trim() ? (
                <SearchResults query={searchTerm} />
            ) : (
                Object.entries(data).map(([subcategoryId, group]) => (
                    <ContentGroup
                        key={subcategoryId}
                        title={group.subcategoryName}
                        products={group.products}
                        showSeeMoreButton={true}
                    />
                ))
            )}
        </section>
    );
}

export default Content;
