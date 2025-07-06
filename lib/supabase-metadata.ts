// lib/supabase-metadata.ts
import { ProductWithRelations } from '@/types/ProductWithRelations'
import { createServerClient } from '@supabase/ssr'

export const createSupabaseMetadataClient = () =>
	createServerClient<ProductWithRelations>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.SUPABASE_SERVICE_ROLE_KEY!,
		{
			cookies: {
				get() {
					return undefined
				},
				set: async () => {},
				remove: async () => {},
			},
		}
	)
