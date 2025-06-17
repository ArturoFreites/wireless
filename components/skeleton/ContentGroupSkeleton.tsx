'use client';

export default function ContentGroupSkeleton() {
    return (
        <div className="flex flex-col justify-center items-center py-20 text-neutral-900 w-full">
            {/* Título y subrayado */}
            <div className="mb-20 w-fit">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-2 w-24 bg-gray-300 rounded animate-pulse" />
            </div>

            {/* Grilla de tarjetas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 w-11/12">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="mx-10 my-10 md:my-4 animate-pulse">
                        {/* Imagen con contenedor relativo para la etiqueta OFERTA */}
                        <div className="relative w-full h-52 bg-gray-200 rounded mb-4">
                            {/* Cinta OFERTA */}
                            <div className="absolute top-2 right-2 h-6 w-16 bg-red-300 rounded text-transparent">
                                OFERTA
                            </div>
                        </div>

                        {/* Textos del producto */}
                        <div className="mb-2 h-4 w-3/4 bg-gray-300 rounded" />
                        <div className="mb-2 h-3 w-1/2 bg-gray-200 rounded" />

                        {/* Etiquetas GB, batería, color */}
                        <div className="flex gap-2 mb-4">
                            <div className="h-5 w-14 bg-primary/40 rounded" />
                            <div className="h-5 w-20 bg-primary/40 rounded" />
                            <div className="h-5 w-16 bg-neutral-300 rounded" />
                        </div>

                        {/* Precio y botón */}
                        <div className="flex items-center justify-between">
                            <div className="h-6 w-20 bg-gray-300 rounded" />
                            <div className="h-8 w-24 bg-gray-400 rounded ml-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
