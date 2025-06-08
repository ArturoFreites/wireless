import Link from "next/link";

function NotFound() {
    return (
        <section className="h-screen mt-20 text-neutral-950
            flex justify-center
        ">
            <div className="h-full">
                <h1 className="pt-14
                    font-black text-2xl
                ">
                    URL INCORRECTA
                </h1>
                <p className="mb-5">
                    La sección que quiere acceder no existe
                </p>
                <Link href={"/"}
                    className="underline font-semibold hover:text-primary duration-300"
                >
                    Volver a la página principal
                </Link>
            </div>
        </section>
    );
}

export default NotFound;