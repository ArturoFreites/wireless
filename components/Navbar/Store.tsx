'use client'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart'

function Store() {
    const items = useCartStore((state) => state.items)
    const quantity = items.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <Link href="/cart">
            <div className="flex m-4 md:ml-2 cursor-pointer hover:scale-95 duration-300">
                <ShoppingBag width={20} fill="#11111" />
                <div className="bg-primary rounded-full px-2 text-xs flex justify-center items-center">
                    <p className="text-white font-semibold">{quantity}</p>
                </div>
            </div>
        </Link>
    )
}

export default Store
