'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ContentGroupSkeleton from '@/components/Skeleton/ContentGroupSkeleton';
import NoDataComponent from '@/components/NoDataComponent';
import ContentGroup from '@/components/Home/ContentGroup';

export default function ProductsClient() {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId') ?? undefined;
    const subcategoryId = searchParams.get('subcategoryId') ?? undefined;

    const { data: products, loading, error } = useFilteredProducts(categoryId, subcategoryId);

    const [sortOption, setSortOption] = useState<'cheap' | 'expensive' | 'newest' | 'default'>('cheap');

    const sortedProducts = useMemo(() => {
        if (!products) return [];

        const sorted = [...products];
        switch (sortOption) {
            case 'cheap':
                return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
            case 'expensive':
                return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
            case 'newest':
                return sorted.sort(
                    (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
                );
            default:
                return products;
        }
    }, [products, sortOption]);


    if (loading) return <ContentGroupSkeleton />;
    if (error) return <p>Error: {error}</p>;
    if (!products || products.length === 0) return <NoDataComponent />;

    return (
        <article className="h-full">
            <div className="flex justify-center md:justify-end mb-4 pr-4 pt-20 pb-10 md:mr-20">
                <select
                    className="rounded-md text-sm px-3 py-2 text-neutral-800"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as typeof sortOption)}
                >
                    <option value="cheap">Más baratos</option>
                    <option value="expensive">Más caros</option>
                    <option value="newest">Más nuevos</option>
                </select>
            </div>

            <ContentGroup
                products={sortedProducts}
                title={categoryId ? products[0].category_name : products[0].subcategory_name}
                showSeeMoreButton={false}
            />
        </article>
    );
}
