import ProductGallery from "@/components/product/productGallery";
import { PRODUCTS } from "@/components/services/products";


const images = [
    'https://www.wireless.ar/iphone_16pro_web.jpg',
    'https://www.wireless.ar/web_iphone15.jpg',
    'https://www.wireless.ar/web_iphone_14.jpg',
]

function Page() {
    return (
        <section className="pt-28 md:pt-16 bg-white flex flex-col
            items-center
            ">
            <h1 className="text-3xl text-neutral-900 font-bold mb-6">iPhone 16 Pro Max</h1>
            <ProductGallery images={images} description={PRODUCTS[0].description} amount={PRODUCTS[0].amout}/>
        </section>
    );
}

export default Page;