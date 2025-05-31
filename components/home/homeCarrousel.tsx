'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {
    images: string[]
    interval?: number
}

export default function HomeCarrousel({ images, interval = 3000 }: Props) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length)
        }, interval)
        return () => clearInterval(timer)
    }, [images.length, interval])

    return (
        <div className="w-full h-fit overflow-hidden relative">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map((src, i) => (
                    <div key={i} className="w-full flex-shrink-0 h-fit relative bg-neutral-500">
                        <Image src={src} alt={`Slide ${i}`} width={1920} height={100} objectFit="cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}
