'use client'

import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Product } from '../services/products'

type Props = {
    product: Product
}

export default function CardContent({ product }: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start({ opacity: 1, y: 0 })
        }
    }, [isInView, controls])

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-14 my-4"
        >
            <div>
                <img src={product.image} alt={product.name} className="w-full h-auto hover:scale-95 duration-200" />
            </div>
            <div className="mb-4">
                <h2 className="font-bold">{product.name}</h2>
                <h3 className="text-xs">{product.description}</h3>
            </div>
            <div className="flex items-center justify-between">
                <p className="font-bold text-xl">${product.amout}</p>
                <button className="bg-neutral-900 text-white text-xs px-4 py-2 rounded font-semibold
                    hover:bg-neutral-600 cursor-pointer duration-300
                ">
                    Consultar
                </button>
            </div>
        </motion.div>
    )
}
