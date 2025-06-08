'use client'

import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Product } from '../services/products'

type Props = { product: Product }

export default function CardContent({ product }: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) controls.start({ opacity: 1, y: 0 })
    }, [isInView, controls])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-10 my-4"
        >
            {/* 👉 Link que envuelve la imagen */}
            <Link href={`/product/${product.id}`}>
                {/* Usa <Image> si quieres optimización automática */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto hover:scale-95 duration-200 cursor-pointer"
                />
            </Link>

            <div className="mb-4 w-full">
                <h2 className="font-bold w-full">{product.name}</h2>
                <h3 className="text-xs truncate">{product.description}</h3>
            </div>

            <Link href="https://wa.me/17164932230" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                <p className="font-bold text-xl">${product.amout}</p>
                <button className="bg-neutral-900 text-white text-xs px-4 py-2 rounded font-semibold
                            hover:bg-neutral-600 duration-300 ml-3">
                                
                    Consultar
                </button>
            </Link>
        </motion.div>
    )
}
