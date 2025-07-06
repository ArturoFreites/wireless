// lib/api.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ProductWithRelations } from '@/types/ProductWithRelations'

export async function fetchProductById(id: string): Promise<ProductWithRelations> {
	const supabase = createServerComponentClient({ cookies })

	const { data, error } = await supabase
		.from('products_with_relations')
		.select('*')
		.eq('id', id)
		.limit(1)
		.single()

	if (error || !data) throw new Error('Producto no encontrado')
	return data
}
