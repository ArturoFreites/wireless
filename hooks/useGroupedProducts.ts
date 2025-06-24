import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/superbase'
import { ProductWithRelations } from '@/types/ProductWithRelations'

type Grouped = {
	subcategoryName: string
	products: ProductWithRelations[]
}

export function useGroupedProducts(limit: number = 6) {
	const [data, setData] = useState<Record<string, Grouped>>({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true)

			// 1. Traemos subcategorías destacadas con nombre y posición
			const { data: featured, error: err1 } = await supabaseBrowser
				.from('featured_subcategories_with_name')
				.select('subcategory_id, subcategory_name, position')
				.order('position')

			if (err1 || !featured) {
				setLoading(false)
				return
			}

			const subcategoryIds = featured.map(f => f.subcategory_id)

			// 2. Traemos todos los productos de esas subcategorías
			const { data: allProducts, error: err2 } = await supabaseBrowser
				.from('products_with_relations') // O "products" si es tabla directa
				.select('*')
				.in('subcategory_id', subcategoryIds)

			if (err2 || !allProducts) {
				setLoading(false)
				return
			}

			// 3. Agrupamos y limitamos
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
		}

		fetchData()
	}, [limit])

	return { data, loading }
}
