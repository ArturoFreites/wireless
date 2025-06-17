'use client'

import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import WhatsappIcon from '../icon/WhatsappIcon'
import { ProductWithRelations } from '@/types/ProductWithRelations'
import { BatteryCharging, ShoppingBagIcon } from 'lucide-react'

type Props = { product: ProductWithRelations }

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
            className="mx-10 my-10 md:my-4"
        >
            <div className="relative">
                <Link href={`/product/${product.id}`}>
                    {
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product?.main_image_url || ""}
                            alt={product?.model || ""}
                            className="w-full h-auto hover:scale-95 duration-200 cursor-pointer rounded-md"
                        />
                    }
                </Link>

                {product.is_offer && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                        OFERTA
                    </div>
                )}
            </div>

            <div className="mb-4 w-full">
                <h2 className="font-bold w-full">{product.model}</h2>
                <h3 className="text-xs truncate">{product.description}</h3>
                <div className='flex gap-2'>
                    {product.storage && (
                        <div className='text-xs font-semibold text-white my-2 px-2 py-1 bg-primary w-fit rounded-md flex items-center'>
                            <h4>{product.storage} GB</h4>
                        </div>
                    )}
                    {product.battery_percentage != null && (
                        <div className='text-xs font-semibold text-white my-2 px-2 py-1 bg-neutral-800 w-fit rounded-md flex items-center'>
                            <h4 className='mr-1'>{product.battery_percentage}%</h4>
                            <BatteryCharging width={18} height={18} />
                        </div>
                    )}
                    {product.color && (
                        <div className='text-xs font-semibold text-white my-2  px-2 py-1 bg-neutral-800 w-fit rounded-md flex items-center'>
                            <h4>{product.color}</h4>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col w-full items-center justify-center'>
                <p className="font-bold text-xl">${product.price} USD</p>
                <div className='flex justify-center items-center mt-5'>
                    <Link
                        href="https://wa.me/17164932230"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex"
                    >
                        <button className="flex items-center bg-neutral-900 text-white text-xs px-4 py-2 rounded font-semibold hover:bg-neutral-600 cursor-pointer duration-300 ml-3">
                            <WhatsappIcon />
                            <p className='ml-1'>Consultar</p>
                        </button>
                    </Link>
                    <button className="flex items-center bg-neutral-400 text-white px-2 py-1 rounded font-semibold hover:bg-neutral-600 cursor-pointer duration-300 ml-3">
                        <ShoppingBagIcon width={14} height={14} />
                        <p className='text-md ml-1'>+</p>
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
