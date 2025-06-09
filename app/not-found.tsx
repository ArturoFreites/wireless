import Image from "next/image";
import Link from "next/link";

function NotFound() {
    return (
        <section className="h-screen text-neutral-950
            flex justify-center items-center bg-white
        ">
            <div className="flex flex-col items-center justify-center">
                <div className="flex justify-center items-center">
                    <Image
                        className=""
                        src={"/img/wireless.webp"}
                        alt="wireless"
                        width={80}
                        height={80}
                    />
                    <p className="font-semibold">Wireless.Ar</p>
                </div>
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