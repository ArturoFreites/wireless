import { Metadata } from 'next'
import ProductClient from './ProductClient'
import { fetchProductById } from '@/lib/apit'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const product = await fetchProductById(params.id)

	return {
		title: product.model ?? 'Producto',
		description: product.description ?? '',
		openGraph: {
			title: product.model ?? 'Producto',
			description: product.description ?? '',
			url: `https://www.wireless.ar/product/${params.id}`,
			images: [
				{
					url: product.main_image_url ?? 'https://res.cloudinary.com/diodsiaxm/image/upload/v1751815144/wireless_hi5bnv.webp',
					width: 800,
					height: 600,
				},
			],
		},
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	return <ProductClient id={params.id} />
}
