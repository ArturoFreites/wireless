import Link from "next/link";

function NoDataComponent() {
    return (
        <section className="text-neutral-800 pt-12 md:pt-16 h-screen flex flex-col items-center">
            <div className="flex flex-col w-4/5 m-10 items-center justify-center">
                <h1 className="w-fit text-center mb-6">
                    No hay artículos cargados en esta categoría
                </h1>
                <Link href={"/"}
                    className="underline text-sm font-semibold"
                >
                    <p>Regresar al inicio</p>
                </Link>
            </div>
        </section>
    );
}

export default NoDataComponent;