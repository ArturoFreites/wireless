'use client';

import useSWR from 'swr';
import { supabaseBrowser } from '@/lib/superbase';

type Subcategory = {
	id: number;
	name: string;
};

type Category = {
	id: number;
	name: string;
	subcategories: Subcategory[];
};

const fetcher = async (): Promise<Category[]> => {
	const { data, error } = await supabaseBrowser
		.from('categories_with_subcategories')
		.select('*');

	if (error) throw new Error(error.message);
	return data as Category[];
};

export function useGroupedCategories() {
	const {
		data,
		error,
		isLoading,
		mutate,
	} = useSWR<Category[]>('categories_with_subcategories', fetcher, {
		revalidateOnFocus: true,
		refreshInterval: 10000, // cada 10 segundos
	});

	const sortedData = data?.map((cat) => ({
		...cat,
		subcategories: [...cat.subcategories].sort((a, b) =>
			a.name.localeCompare(b.name)
		),
	})) ?? [];

	return {
		data: sortedData,
		loading: isLoading,
		error,
		mutate,
	};
}
