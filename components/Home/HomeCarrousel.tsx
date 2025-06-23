/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
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

    const goTo = (i: number) => {
        setIndex((i + activeImages.length) % activeImages.length)
    }

    useEffect(() => {
        const timer = setInterval(() => {
            goTo(index + 1)
        }, 3000)
        return () => clearInterval(timer)
    }, [index, activeImages.length])

    const handlers = useSwipeable({
        onSwipedLeft: () => goTo(index + 1),
        onSwipedRight: () => goTo(index - 1),
        trackMouse: true,
        touchEventOptions: { passive: false }
    })

    return (
        <div className="w-full h-fit overflow-hidden relative md:pt-8">
            {loading ? (
                <div className="w-full h-[80vh] bg-black animate-pulse" />
            ) : (
                <>
                    {/* Carrusel con swipe */}
                    <div
                        {...handlers}
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                        {activeImages.map((src, i) => (
                            <div key={i} className="w-full flex-shrink-0 h-[80vh] relative">
                                <img
                                    src={src}
                                    alt={`Banner ${i}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Puntos indicadores */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {activeImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                className={`w-3 h-3 rounded-full ${
                                    i === index ? 'bg-white' : 'bg-white/50'
                                } transition`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
