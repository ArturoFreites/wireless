// hooks/useGroupedCategories.ts
'use client'

import useSWR from 'swr'
import { supabaseBrowser } from '@/lib/superbase'

const fetcher = async () => {
    const { data, error } = await supabaseBrowser
        .from('categories_with_subcategories')
        .select('*')

    if (error) throw new Error(error.message)
    return data
}

export function useGroupedCategories() {
    const { data, error, isLoading, mutate } = useSWR('categories_with_subcategories', fetcher, {
        revalidateOnFocus: true,
        refreshInterval: 10000, // cada 10 segundos
    })

    const sortedData = data?.map((cat) => ({
        ...cat,
        subcategories: [...cat.subcategories].sort((a, b) => a.name.localeCompare(b.name)),
    })) ?? []

    return {
        data: sortedData,
        loading: isLoading,
        error,
        mutate,
    }
}
