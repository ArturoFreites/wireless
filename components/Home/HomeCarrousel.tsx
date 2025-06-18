/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { supabaseBrowser } from '@/lib/superbase'

export default function HomeCarrousel() {
    const [imagesMobile, setImagesMobile] = useState<string[]>([])
    const [images, setImages] = useState<string[]>([])
    const [index, setIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchImages = async () => {
            const { data: mobileImages } = await supabaseBrowser
                .from('carrusels')
                .select('img')
                .eq('type', 'mobile')
                .eq('status', 'active')

            const { data: desktopImages } = await supabaseBrowser
                .from('carrusels')
                .select('img')
                .eq('type', 'desktop')
                .eq('status', 'active')

            if (mobileImages) setImagesMobile(mobileImages.map((i: any) => i.img))
            if (desktopImages) setImages(desktopImages.map((i: any) => i.img))

            setLoading(false)
        }

        fetchImages()
    }, [])

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
        }, 3000)
        return () => clearInterval(timer)
    }, [activeImages.length])

    return (
        <div className="w-full h-fit overflow-hidden relative md:pt-8">
            {loading ? (
                <div className="w-full h-[80vh] bg-black animate-pulse" />
            ) : (
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${index * 100}%)` }}
                >
                    {activeImages.map((src, i) => (
                        <div key={i} className="w-full flex-shrink-0 h-[80vh] relative">
                            <img
                                src={src}
                                alt={`Banner ${i}`}
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
