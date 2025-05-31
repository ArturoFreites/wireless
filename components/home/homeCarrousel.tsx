'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Props = {
    imagesMobile: string[]
    images: string[]
    interval?: number
}

export default function HomeCarrousel({ images, imagesMobile, interval = 3000 }: Props) {
    const [index, setIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const activeImages = isMobile ? imagesMobile : images

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % activeImages.length)
        }, interval)
        return () => clearInterval(timer)
    }, [activeImages.length, interval])

    return (
        <div className="w-full h-fit overflow-hidden relative">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {activeImages.map((src, i) => (
                    <div key={i} className="w-full flex-shrink-0 h-[80vh] relative">
                        <Image
                            src={src}
                            alt={`Banner ${i}`}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
