'use client';

export default function ProductPageSkeleton() {
    return (
        <section className="pt-12 md:pt-16 bg-white flex flex-col items-center">
            {/* Título */}
            <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-6" />

            {/* Contenedor principal */}
            <div className="md:flex w-full px-4 md:px-10">
                {/* Galería de imágenes */}
                <div className="flex justify-center items-start p-10 md:w-1/2">
                    <div className="flex flex-col gap-4 m-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-[60px] h-[60px] bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                    </div>
                    <div className="flex">
                        <div className="w-[250px] h-[250px] bg-gray-300 rounded-lg animate-pulse" />
                    </div>
                </div>

                {/* Información del producto */}
                <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col justify-between">
                    <div className="px-6 md:px-10">
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse my-4" />
                        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse mb-6" />

                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center mb-4 gap-2">
                                <div className="w-4 h-4 bg-gray-300 rounded animate-pulse" />
                                <div className="w-2/3 h-3 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Botón */}
                    <div className="flex justify-center pb-10 mt-4">
                        <div className="h-10 w-60 bg-gray-300 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        </section>
    );
}
