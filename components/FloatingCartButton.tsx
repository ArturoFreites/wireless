'use client'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function FloatingCartButton() {
    const items = useCartStore((state) => state.items)
    const quantity = items.reduce((acc, item) => acc + item.quantity, 0)
    const pathname = usePathname()

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const isCartPage = pathname === '/cart'

    if (!isMobile || quantity < 1 || isCartPage) return null

    return (
        <Link href="/cart">
            <div className="fixed bottom-22 right-6 z-50 bg-primary text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer">
                <div className="relative flex items-center">
                    <ShoppingBag width={28} height={28} />
                    <span className="absolute -top-4 -right-4 bg-white text-primary text-xs font-bold px-2 py-[2px] rounded-full">
                        {quantity}
                    </span>
                </div>
            </div>
        </Link>
    )
}
