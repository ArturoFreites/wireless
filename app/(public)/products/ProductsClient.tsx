'use client';

import { useSearchParams } from 'next/navigation';
import { useFilteredProducts } from '@/hooks/useFilteredProducts';
import ContentGroupSkeleton from '@/components/skeleton/ContentGroupSkeleton';
import NoDataComponent from '@/components/NoDataComponent';
import ContentGroup from '@/components/home/ContentGroup';

export default function ProductsClient() {
    const searchParams = useSearchParams();
    const categoryId = searchParams.get('categoryId') ?? undefined;
    const subcategoryId = searchParams.get('subcategoryId') ?? undefined;

    const { data: products, loading, error } = useFilteredProducts(categoryId, subcategoryId);

    if (loading) return <ContentGroupSkeleton />;
    if (error) return <p>Error: {error}</p>;
    if (!products || products.length === 0) return <NoDataComponent />;

    return (
        <article className='h-full'>
            <ContentGroup
                products={products}
                title={categoryId ? products[0].category_name : products[0].subcategory_name}
            />
        </article>
    );
}
