import Image from "next/image";
import { useState } from "react";

type Props = {
    imageMain:string;
    images: string[];
    is_offer?: boolean | null;
}

export default function ProductGallery({ imageMain,images = [], is_offer }: Props) {
    const [mainImage, setMainImage] = useState(imageMain);

    const allImages = images.includes(imageMain) ? images : [imageMain, ...images];

    return (
        <div className="flex justify-center items-start p-10 md:w-1/2">
            <div className="flex flex-col gap-4 m-4">
                {allImages?.map((img, i) => (
                    <button key={i} onClick={() => setMainImage(img)}>
                        {
                            <Image
                                src={img}
                                alt={`Miniatura ${i}`}
                                width={60}
                                height={60}
                                className="rounded-lg border hover:border-black transition-all duration-300 lg:w-24"
                            />
                        }
                    </button>
                ))}
            </div>

            <div className="relative flex">
                {
                    <Image
                        src={mainImage}
                        alt="Imagen principal"
                        width={250}
                        height={250}
                        className="md:w-72 rounded-md lg:w-90"
                    />
                }

                {is_offer && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
                        OFERTA
                    </div>
                )}
            </div>
        </div>
    );
}
