'use client'


import CardContent from "@/components/Home/CardContent"
import { useProductSearch } from "@/hooks/useProductSearch"

type Props = {
	query: string
}

export default function SearchResults({ query }: Props) {
	const { products, loading } = useProductSearch(query)

	if (loading) return <p className="text-neutral-800 font-semibold text-center h-96">Buscando productos...</p>
	if (!products.length) return <p className="text-neutral-800 font-semibold text-center h-96">No se encontraron productos</p>

	return (
		<div className="flex flex-col justify-center items-center text-neutral-900 mt-10 pb-20">
			<h2 className="text-2xl font-bold mb-4">{`Resultados para: ${query}`}</h2>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 w-11/12">
				{products.map((product) => (
					<CardContent key={product.id} product={product} />
				))}
			</div>
		</div>
	)
}
