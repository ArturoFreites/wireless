import { useEffect, useRef, useState } from 'react'
import { supabaseBrowser } from '@/lib/superbase'
import { ProductWithRelations } from '@/types/ProductWithRelations'

type Grouped = {
	subcategoryName: string
	products: ProductWithRelations[]
}

export function useGroupedProducts(limit: number = 6) {
	const [data, setData] = useState<Record<string, Grouped>>({})
	const [loading, setLoading] = useState(true)
	const hasFetched = useRef(false) // 🔒 para cache local en memoria

	useEffect(() => {
		if (hasFetched.current) return // ⛔ evita que se vuelva a ejecutar

		const fetchData = async () => {
			setLoading(true)

			const { data: featured, error: err1 } = await supabaseBrowser
				.from('featured_subcategories_with_name')
				.select('subcategory_id, subcategory_name, position')
				.eq('active', true)
				.order('position')

			if (err1 || !featured) {
				console.error('Error fetching featured subcategories:', err1)
				setLoading(false)
				return
			}

			const subcategoryIds = featured.map(f => f.subcategory_id)

			const { data: allProducts, error: err2 } = await supabaseBrowser
				.from('products_with_relations')
				.select('*')
				.in('subcategory_id', subcategoryIds)

			if (err2 || !allProducts) {
				console.error('Error fetching products:', err2)
				setLoading(false)
				return
			}

			const grouped: Record<string, Grouped> = {}

			for (const sub of featured) {
				const groupProducts = allProducts.filter(p => p.subcategory_id === sub.subcategory_id)

				if (groupProducts.length > 0) {
					grouped[sub.subcategory_id] = {
						subcategoryName: sub.subcategory_name,
						products: groupProducts.slice(0, limit),
					}
				}
			}

			setData(grouped)
			setLoading(false)
			hasFetched.current = true // ✅ marcamos como "ya lo traje"
		}

		fetchData()
	}, [limit])

	return { data, loading }
}
