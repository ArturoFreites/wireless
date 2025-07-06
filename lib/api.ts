import { createSupabaseMetadataClient } from '@/lib/supabase-metadata'

export async function generateProductMetadata(id: string) {
	const supabase = createSupabaseMetadataClient()

	const { data: product } = await supabase
		.from('products_with_relations')
		.select('*')
		.eq('id', id)
		.single()

	return product
}
