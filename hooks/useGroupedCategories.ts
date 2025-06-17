// hooks/useGroupedCategories.ts
import { useSupabaseQuery } from './useSupabaseQuery';
import { useMemo } from 'react';

export function useGroupedCategories() {
	const filters = useMemo(() => ({}), []);
	const select = useMemo(() => '*', []); // selecciona todos los campos del view

	const {
		data,
		loading,
		error,
	} = useSupabaseQuery<{
		id: number;
		name: string;
		subcategories: { id: number; name: string }[];
	}>(
		'categories_with_subcategories', // 👈 vista agrupada
		filters,
		1,
		100,
		select
	);

	return {
		data,
		loading,
		error
	};
}
