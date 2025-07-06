// app/(public)/product/[id]/page.tsx

import { Metadata } from 'next'
import ProductClient from './ProductClient'
import { generateProductMetadata } from '@/lib/api'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { id } = await params
	const product = await generateProductMetadata(id)

	if (!product) {
		return {
			title: 'Producto no encontrado',
		};
	}

	return {
		title: product.model ?? 'Producto',
		description: product.description ?? '',
		openGraph: {
			title: product.model ?? 'Producto',
			description: product.description ?? '',
			url: `https://www.wireless.ar/product/${id}`,
			images: [
				{
					url: product.main_image_url ?? 'https://res.cloudinary.com/diodsiaxm/image/upload/v1751815144/wireless_hi5bnv.webp',
					width: 800,
					height: 600,
				},
			],
		},
	};
}

export default async function Page({ params }: { params: Params }) {
	const { id } = await params
	return <ProductClient id={id} />
}
