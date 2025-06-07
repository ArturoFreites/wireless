'use client'

import Link from 'next/link'
import { useState } from 'react'

type Props = {
    images: string[],
    description: string
    amount: number
}

export default function ProductGallery({ images, description, amount }: Props) {
    const [mainImage, setMainImage] = useState(images[0])

    return (
        <div className='md:flex'>
            <div className="flex items-start">
                <div className="flex flex-col gap-4">
                    {images.map((img, i) => (
                        <button key={i} onClick={() => setMainImage(img)}>
                            <img
                                src={img}
                                alt={`Miniatura ${i}`}
                                width={60}
                                height={60}
                                className="rounded-lg border hover:border-black transition-all duration-300"
                            />
                        </button>
                    ))}
                </div>
                <div className='flex'>
                    <img
                        src={mainImage}
                        alt="Imagen principal"
                        width={250}
                        height={250}
                        className="rounded-lg shadow-lg md:w-80"
                    />
                </div>
            </div>
            <div>
                <p className='text-neutral-900 m-6'>
                    {description}
                </p>
                <div className='flex justify-center m-6'>
                    <p className="font-bold text-xl text-neutral-900">${amount}</p>
                    <Link href="https://wa.me/17164932230" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                        <button className="bg-neutral-900 text-white text-xs px-4 py-2 rounded font-semibold
                            hover:bg-neutral-600 duration-300 ml-3">
                            Consultar
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    )
}
