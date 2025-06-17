import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProductWithRelations } from '@/types/ProductWithRelations'

type CartItem = ProductWithRelations & { quantity: number }

type CartState = {
    items: CartItem[]
    expiresAt: number | null
    addToCart: (product: ProductWithRelations) => void
    removeFromCart: (id: string) => void
    clearCart: () => void
    checkExpiration: () => void
}

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 2 // 3 días en ms

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            expiresAt: null,
            addToCart: (product) => {
                get().checkExpiration()

                const currentItems = get().items
                const exists = currentItems.find((item) => item.id === product.id)

                const updatedItems = exists
                    ? product.is_used
                        ? currentItems
                        : currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    : [...currentItems, { ...product, quantity: 1 }]

                set({ items: updatedItems, expiresAt: Date.now() + EXPIRATION_TIME })
            },
            removeFromCart: (id) => {
                get().checkExpiration()
                set({ items: get().items.filter((item) => item.id !== id) })
            },
            clearCart: () => set({ items: [], expiresAt: null }),
            checkExpiration: () => {
                const now = Date.now()
                const expiresAt = get().expiresAt
                if (expiresAt && now > expiresAt) {
                    set({ items: [], expiresAt: null })
                }
            },
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({
                items: state.items,
                expiresAt: state.expiresAt,
            }),
        }
    )
)
