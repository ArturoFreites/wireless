/* eslint-disable @next/next/no-img-element */
'use client'

import { useCartStore } from '@/store/cart'
import { useCriptoDollar } from '@/hooks/useCriptoDollar'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import WhatsappIcon from '@/components/Icon/WhatsappIcon'
import Skeleton from '@/components/Skeleton'

export default function CartPage() {
    const { items, removeFromCart, clearCart } = useCartStore()
    const { data: dollar, loading } = useCriptoDollar()

    const totalUSD = items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0)
    const totalARS = totalUSD * (dollar?.venta ?? 0)

    const message =
        'Hola! Quiero consultar por los siguientes productos:\n' +
        items
            .map((item) => {
                if (item.is_used) {
                    return `- ${item.model} ${item.storage ?? ''}GB ${item.color ?? ''} (Batería: ${item.battery_percentage ?? '?'}%) x${item.quantity}`
                }
                return `- ${item.model} ${item.storage ?? ''}GB x${item.quantity}`
            })
            .join('\n')

    const href = `https://wa.me/17164932230?text=${encodeURIComponent(message)}`

    if (items.length === 0)
        return (
            <div className="p-20 flex flex-col items-center text-center min-h-screen">
                <h1 className="text-neutral-800 text-xl font-semibold">Su carrito está vacío</h1>
                <Link href="/" className="text-primary underline mt-4 block w-fit">Volver a la tienda</Link>
            </div>
        )

    return (
        <div className="flex flex-col max-w-4xl mx-auto text-neutral-800 h-screen overflow-y-auto px-4 pb-32">
            <h1 className="text-2xl font-bold mb-6 pt-20">Tu carrito</h1>

            {/* Tabla desktop */}
            <div className="hidden md:block overflow-x-auto max-h-[60vh] overflow-y-auto rounded-md border border-neutral-200">
                <table className="w-full border-collapse text-sm min-w-[700px]">
                    <thead className="sticky top-0 bg-neutral-200 z-10">
                        <tr className="text-xs text-left">
                            <th className="px-4 py-2"></th>
                            <th className="px-4 py-2">Detalle</th>
                            <th className="px-4 py-2">Cantidad</th>
                            <th className="px-4 py-2">Precio USD</th>
                            <th className="px-4 py-2">Subtotal ARS</th>
                            <th className="px-4 py-2 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            const subtotalARS = (item.price ?? 0) * item.quantity * (dollar?.venta ?? 0)
                            return (
                                <tr key={item.id} className="bg-white shadow-sm rounded-md text-xs">
                                    <td className="px-4 py-4">
                                        <img className='w-20' src={item.main_image_url ?? " "} alt={item.model ?? "imagen"} />
                                    </td>
                                    <td className="px-4 py-3 font-semibold">
                                        {[item.model,
                                        item.storage ? `${item.storage}GB` : null,
                                        item.is_used ? 'Usado' : null,
                                        item.battery_percentage != null ? `Batería: ${item.battery_percentage}%` : null,
                                        item.color ? `Color: ${item.color}` : null,
                                        ].filter(Boolean).join(' | ')}
                                    </td>
                                    <td className="px-4 py-3">{item.quantity}</td>
                                    <td className="px-4 py-3">${(item.price ?? 0) * item.quantity} USD</td>
                                    <td className="px-4 py-3">${subtotalARS.toLocaleString('es-AR', { minimumFractionDigits: 2 })} ARS</td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-500 hover:text-red-800"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-4">
                {items.map((item) => {
                    const subtotalARS = (item.price ?? 0) * item.quantity * (dollar?.venta ?? 0)
                    return (
                        <div key={item.id} className="rounded-md shadow-2xl p-4 text-sm bg-neutral-50 text-neutral-800">
                            <div className="font-bold mb-4">
                                {item.model} {item.storage && `${item.storage}GB`}
                            </div>
                            <div className='flex items-center'>
                                <div className="space-y-1 text-xs w-1/2">
                                    {item.is_used && <p className="font-medium">Usado</p>}
                                    {item.battery_percentage != null && <p>Batería: {item.battery_percentage}%</p>}
                                    {item.color && <p>Color: {item.color}</p>}
                                    <p>Cantidad: {item.quantity}</p>
                                    <p className='mt-4 font-semibold'>Precio: ${(item.price ?? 0) * item.quantity} USD</p>
                                    <p>Subtotal ARS: ${subtotalARS.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <div className='w-1/2 flex justify-center items-center'>
                                    <img className='w-36 h-36' src={item.main_image_url ?? " "} alt={item.model ?? "imagen"} />
                                </div>
                            </div>
                            <div className="mt-2 text-right">
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 text-xs font-semibold hover:text-red-700"
                                >
                                    <Trash2 width={18} height={18} />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>

            {loading ? (
                <Skeleton className="h-16 w-full my-6" />
            ) : (
                <div className="my-10 md:text-right text-center">
                    <p className="text-lg font-semibold mb-2">Total: ${totalUSD.toFixed(2)} USD</p>
                    <p className="text-neutral-600 text-sm">Total estimado en ARS: ${totalARS.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</p>
                    <p className="text-xs text-neutral-500">Cotización: ${dollar?.venta.toFixed(2)} - Actualizado: {new Date(dollar?.fechaActualizacion ?? '').toLocaleString('es-AR')}</p>
                </div>
            )}

            <div className="mt-6 gap-4 flex flex-col md:flex-row items-center justify-center">
                <Link href={"/"}>
                    <button className="flex items-center bg-white text-primary underline px-6 py-2 rounded font-semibold hover:text-neutral-800 text-xs cursor-pointer">
                        <span className="ml-2">Seguir comprando</span>
                    </button>
                </Link>

                <button
                    onClick={clearCart}
                    className="bg-red-500 text-xs text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer"
                >
                    Vaciar carrito
                </button>

                <Link href={href} target="_blank" rel="noopener noreferrer">
                    <button className="flex items-center bg-neutral-800 text-white px-6 py-2 rounded font-semibold hover:bg-neutral-600 text-xs cursor-pointer">
                        <WhatsappIcon />
                        <span className="ml-2">Consultar por WhatsApp</span>
                    </button>
                </Link>
            </div>
        </div>
    )
}
