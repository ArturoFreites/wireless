import { useState } from "react";

type Props = {
    images: string[];
    is_offer?: boolean | null;
}

export default function ProductGallery({ images = [], is_offer }: Props) {
    const [mainImage, setMainImage] = useState(images[0] ?? '');

    return (
        <div className="flex justify-center items-start p-10 md:w-1/2">
            <div className="flex flex-col gap-4 m-4">
                {images?.map((img, i) => (
                    <button key={i} onClick={() => setMainImage(img)}>
                        {
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={img}
                                alt={`Miniatura ${i}`}
                                width={60}
                                height={60}
                                className="rounded-lg border hover:border-black transition-all duration-300"
                            />
                        }
                    </button>
                ))}
            </div>

            <div className="relative flex">
                {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={mainImage}
                        alt="Imagen principal"
                        width={250}
                        height={250}
                        className="md:w-72 rounded-md"
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
