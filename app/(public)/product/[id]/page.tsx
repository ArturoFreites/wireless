import { Metadata } from 'next'
import { fetchProductById } from '@/lib/apit'
import ProductClient from './ProductClient'

type Props = {
	params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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

export default async function Page({ params }: Props) {
	return <ProductClient id={params.id} />
}
