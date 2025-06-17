'use client'

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { ProductWithRelations } from "@/types/ProductWithRelations"
import CardContent from "@/components/Home/CardContent"

type Props = { products: ProductWithRelations[], title:string|null}


function ContentGroup({ products, title}: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start({ opacity: 1, y: 0 })
        }
    }, [isInView, controls])

    return (
        <div className="flex flex-col justify-center items-center py-20 text-neutral-900">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-16"
            >
                <div className="w-fit mb-2">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="h-2 rounded-xs bg-primary" />
                </div>
            </motion.div>
            {
                products ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 w-11/12">
                    {products.map((product) => (
                        <CardContent key={product.id} product={product} />
                    ))}
                </div> :
                    <p>Algo</p>
            }
        </div>
    )
}

export default ContentGroup
