import { useEffect, useState } from 'react'
import { ProductWithRelations } from '@/types/ProductWithRelations'
import { supabaseBrowser } from '@/lib/superbase'

export function useProductSearch(query: string) {
    const [products, setProducts] = useState<ProductWithRelations[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query.trim()) {
            setProducts([])
            return
        }

        setLoading(true)

        const fetchProducts = async () => {
            const { data, error } = await supabaseBrowser
                .from('products_with_relations')
                .select('*')
                .ilike('model', `%${query}%`)

            if (!error && data) {
                setProducts(data)
            }
            setLoading(false)
        }

        fetchProducts()
    }, [query])

    return { products, loading }
}
