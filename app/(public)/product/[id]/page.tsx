'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import WhatsappIcon from "@/components/Icon/WhatsappIcon";
import Price from "@/components/Price";
import { useProductById } from "@/hooks/useProductById";
import { Banknote, BatteryCharging, CreditCardIcon, HandCoinsIcon, Recycle, Truck } from "lucide-react";
import ProductPageSkeleton from '@/components/Skeleton/ProductPageSkeleton';
import ProductGallery from '@/components/Product/ProductGallery';

export default function Page() {

    const { id } = useParams<{ id: string }>();
    const { data: product, loading, error } = useProductById(id);

    if (loading) return <ProductPageSkeleton />
    if (error) return <p className="pt-16 text-red-500">Error: {error}</p>;
    if (!product) return <p className="pt-16 text-neutral-800">Producto no encontrado</p>;

    const message = `Hola! Quiero consultar por el modelo ${product.model ?? ""} ${product.storage ? `${product.storage}GB` : ""}` +
        (product.color ? ` en color ${product.color}` : "") +
        (product.battery_percentage != null ? ` con batería al ${product.battery_percentage}%` : "");


    const href = `https://wa.me/17164932230?text=${encodeURIComponent(message)}`;


    return (
        <section className="pt-12 md:pt-16 bg-white flex flex-col items-center">
            <h1 className="text-3xl text-neutral-900 font-bold mb-6">{product.model}</h1>
            <h1 className="text-xl text-neutral-700 font-medium mb-6">{product.is_used && "Usado"}</h1>
            <div className='md:flex'>
                <ProductGallery
                    images={product.image_urls ?? []}
                    is_offer={product.is_offer}
                />

                <div className="md:w-1/2">
                    <p className='text-sm px-10 text-neutral-900 my-4'>
                        {product.description}
                    </p>
                    <div className='px-10 flex flex-col gap-2 text-neutral-800 '>

                        {
                            product.storage &&

                            <div className="flex text-sm items-center">
                                <h4 className='font-normal mr-1'>- Almacenamiento</h4>
                                <h4 className='font-semibold mr-1'>{product.storage}GB</h4>
                            </div>

                        }
                        {
                            product.battery_percentage &&

                            <div className="flex text-sm items-center">
                                <h4 className='font-normal mr-1'>- Condición de batería</h4>
                                <h4 className='font-semibold mr-1'>{product.battery_percentage}</h4>
                                <BatteryCharging width={18} height={18} />
                            </div>

                        }
                        {
                            product.color &&

                            <div className="flex text-sm">
                                <h4 className='font-normal mr-1'>- Color</h4>
                                <h4 className='font-semibold'>{product.color}</h4>
                            </div>

                        }
                    </div>

                    <Price amount={product == null ? 0 : product.price} />

                    <div className="text-neutral-600 text-xs px-10">
                        {
                            product.category_name == "iPhone" && <div className="flex items-center mb-4"><Recycle /><p className="pl-2">Realizamos Plan Canje a partir del iPhone 11</p></div>
                        }
                        <div className="flex items-center mb-4"><CreditCardIcon /><p className="pl-2">Hasta 12 cuotas abonando con tarjeta Visa o Master</p></div>
                        <div className="flex items-center mb-4"><Banknote /><p className="pl-2">Aboná en efectivo o transferencia</p></div>
                        <div className="flex items-center mb-4"><HandCoinsIcon /><p className="pl-2">Aceptamos pago en cripto</p></div>
                        <div className="flex items-center mb-4"><Truck /><p className="pl-2">Envío sin cargo en Capital Federal y La Costa</p></div>
                    </div>

                    <div className='flex justify-center pb-10'>
                        <Link
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between"
                        >
                            <button className="flex items-center bg-neutral-900 text-white text-xs px-20 py-3 rounded font-semibold my-6 hover:bg-neutral-600 duration-300 ml-3 cursor-pointer">
                                <WhatsappIcon />
                                <p className="ml-1">Consultar</p>
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
}
