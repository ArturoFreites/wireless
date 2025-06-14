import WhatsappIcon from "@/components/icon/whatsappIcon";
import Price from "@/components/price";
import ProductGallery from "@/components/product/productGallery";
import { PRODUCTS } from "@/components/services/products";
import { Banknote, CreditCardIcon, HandCoinsIcon, Recycle, Truck } from "lucide-react";
import Link from "next/link";


const images = [
    'https://www.wireless.ar/iphone_16pro_web.jpg',
    'https://www.wireless.ar/web_iphone15.jpg',
    'https://www.wireless.ar/web_iphone_14.jpg',
]

function Page() {
    return (
        <section className="pt-12 md:pt-16 bg-white flex flex-col
            items-center
            ">
            <h1 className="text-3xl text-neutral-900 font-bold mb-6">iPhone 16 Pro Max</h1>
            <div className='md:flex'>
                <ProductGallery images={images} />
                <div className="md:w-1/2">

                    <p className='text-sm px-10 text-neutral-900 my-4'>
                        {PRODUCTS[0].description}
                    </p>

                    <Price amount={PRODUCTS[0].amout} />

                    <div className="text-neutral-600 text-xs px-10">
                        <div className="flex items-center mb-4">
                            <Recycle />
                            <p className="pl-2">Realizamos Plan Canje a partir del iPhone 11</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <CreditCardIcon />
                            <p className="pl-2">Hasta 12 cuotas abonando con tarjeta Visa o Master</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <Banknote />
                            <p className="pl-2">Abona efectivo o transferencia</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <HandCoinsIcon />
                            <p className="pl-2">Aceptamos pago en cripto</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <Truck />
                            <p className="pl-2">Envio sin cargo en Capital Federal y La Costa</p>
                        </div>
                    </div>
                    <div className='flex justify-center pb-10'>
                        <Link href="https://wa.me/17164932230" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between">
                            <button className="flex items-center bg-neutral-900 text-white text-xs px-20 py-3 rounded font-semibold my-6
                            hover:bg-neutral-600 duration-300 ml-3 cursor-pointer">
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

export default Page;