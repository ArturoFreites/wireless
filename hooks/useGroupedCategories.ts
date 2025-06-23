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
		.select('*')
		.order('created_at', { ascending: true });

	if (error) throw new Error(error.message);

	return (data as Category[]).map((cat) => ({
		...cat,
		subcategories: cat.subcategories.sort((a, b) => a.name.localeCompare(b.name)),
	}));
};

export function useGroupedCategories() {
	const {
		data,
		error,
		isLoading,
		mutate,
	} = useSWR<Category[]>('categories_with_subcategories', fetcher, {
		revalidateOnFocus: true,
		refreshInterval: 10000,
	});

	return {
		data: data ?? [],
		loading: isLoading,
		error,
		mutate,
	};
}
