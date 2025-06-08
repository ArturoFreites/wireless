import Image from "next/image";

function Page() {
    return (
        <section className="w-screen h-screen
            flex flex-col md:flex-row
        ">
            <div className="bg-neutral-200 text-neutral-700 
                md:w-1/3 h-full
                flex flex-col justify-center items-center
                ">
                <Image
                    className="md:hidden"
                    src={"/img/wireless.webp"}
                    alt="wireless"
                    width={50}
                    height={50}
                />
                <h1 className="mb-6 font-semibold">Ingreso</h1>
                <div className="my-2">
                    <p className="text-sm mb-1">Email</p>
                    <input
                        className="bg-white py-1 px-2 text-sm rounded-md"
                        placeholder="Ingrese email"></input>
                </div>
                <div className="my-2">
                    <p className="text-sm mb-1">Contraseña</p>
                    <input
                        className="bg-white py-1 px-2 text-sm rounded-md"
                        placeholder="Ingrese email"></input>
                </div>
                <button className="mt-6 bg-neutral-800 px-4 py-2 rounded-md text-xs font-semibold text-white">
                    Ingresar
                </button>
            </div>
            <div className="hidden md:w-2/3 md:flex md:justify-center md:items-center">
                <Image
                    src={"/img/wireless.webp"}
                    alt="wireless"
                    width={200}
                    height={200}
                />
                <div className="flex flex-col">
                    <p className="pl-1 font-black text-3xl text-neutral-800">
                        Wireless.Ar
                    </p>
                    <p className="text-neutral-800 font-extrabold">
                        PANEL DE ADMINISTRACIÓN
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Page