'use client'

import { useRef, useEffect, useMemo } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { ProductWithRelations } from "@/types/ProductWithRelations"
import CardContent from "@/components/Home/CardContent"
import Link from "next/link"
import { useGroupedCategories } from "@/hooks/useGroupedCategories"

type Props = {
    products: ProductWithRelations[],
    title: string | null,
    showSeeMoreButton?: boolean
}

function ContentGroup({ products, title, showSeeMoreButton }: Props) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
    const controls = useAnimation()

    useEffect(() => {
        if (isInView) {
            controls.start({ opacity: 1, y: 0 })
        }
    }, [isInView, controls])

    const { data: groupedCategories } = useGroupedCategories()

    const subcategoryId = useMemo(() => {
        if (!title || !groupedCategories) return null

        for (const category of groupedCategories) {
            const match = category.subcategories.find(
                sub => (sub.name ?? '').toLowerCase() === (title ?? '').toLowerCase()
            )
            if (match) return match.id
        }


        return null
    }, [title, groupedCategories])

    return (
        <div className="flex flex-col justify-center items-center text-neutral-900">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-2"
            >
                <div className="w-fit mb-2">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <div className="h-2 rounded-xs bg-primary" />
                </div>
            </motion.div>

            {products && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 w-11/12">
                    {products.map((product) => (
                        <CardContent key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <p>Sin productos</p>
            )}

            {showSeeMoreButton && (
                <Link
                    href={`/products?subcategoryId=${subcategoryId}`}
                    className="mt-8 mb-30 px-6 py-2 bg-primary text-white text-sm font-semibold rounded hover:bg-primary/90 transition"
                >
                    Ver más
                </Link>
            )}
        </div>
    )
}

export default ContentGroup
