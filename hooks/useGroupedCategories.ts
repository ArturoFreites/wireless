import { useMemo } from 'react';
import { useSupabaseQuery } from './useSupabaseQuery';

export function useGroupedCategories() {
	const filters = useMemo(() => ({}), []);
	const select = useMemo(() => '*', []);

	const { data, loading, error } = useSupabaseQuery<{
		id: number;
		name: string;
		subcategories: { id: number; name: string }[];
	}>(
		'categories_with_subcategories',
		filters,
		1,
		100,
		select
	);

	const sortedData = useMemo(() => {
		if (!data) return [];
		return data.map((cat) => ({
			...cat,
			subcategories: [...cat.subcategories].sort((a, b) =>
				a.name.localeCompare(b.name)
			),
		}));
	}, [data]);

	return {
		data: sortedData,
		loading,
		error,
	};
}
