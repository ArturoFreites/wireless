'use client'

import { useState } from 'react'

type Props = {
    images: string[]
}

export default function ProductGallery({ images }: Props) {
    const [mainImage, setMainImage] = useState(images[0])

    return (
        <div className="flex justify-center items-start p-10 md:w-1/2">
            <div className="flex flex-col gap-4 m-4">
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
                    className="md:w-72"
                />
            </div>
        </div>
    )
}
