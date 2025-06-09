'use client'

import { UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function NavDashboard() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className={`fixed bottom-25 right-5 z-50 sm:hidden bg-neutral-200 rounded-full px-4 py-2 flex justify-center items-center shadow-2xl ${open ? 'hidden' : ''}`}
            >
                <Image
                    className=""
                    src={"/img/wireless.webp"}
                    alt="wireless"
                    width={35}
                    height={35}
                />
                <p className="font-semibold text-sm text-neutral-700">Menu</p>
            </button>

            {/* Sidebar */}
            <aside
                className={`md:hidden fixed w-full sm:static min-h-screen inset-y-0 left-0 z-40 bg-white flex-col
                            transition-all duration-300 transform
                            ${open ? 'translate-x-0' : 'translate-x-full'}
                            sm:translate-x-0 
                            ${open ? 'sm:w-72' : 'sm:w-30'}
                        `}
            >
                <div
                    onClick={() => setOpen(!open)}
                    className="flex items-center justify-center sm:h-24 h-16 m-6"
                >
                    <Image
                        className=""
                        src={"/img/wireless.webp"}
                        alt="wireless"
                        width={35}
                        height={35}
                    />
                    <p className="ml-2 font-semibold text-neutral-700 text-sm">Wireless.Ar</p>
                </div>

                <button
                    aria-label="Cerrar"
                    onClick={() => setOpen(!open)}
                    className="md:hidden cursor-pointer absolute right-3 top-3 text-5xl leading-none text-neutral-700 hover:text-gray-600"
                >
                    ×
                </button>

                <div className="w-full mx-10">
                    <p>Contenido</p>
                </div>

            </aside>

            <article className="hidden w-1/6 h-full text-neutral-800 shadow-md
                md:flex flex-col items-center
            ">
                <div className="mt-10 flex justify-center items-center">
                    <Image
                        className=""
                        src={"/img/wireless.webp"}
                        alt="wireless"
                        width={35}
                        height={35}
                    />
                    <p className="font-semibold text-xs ml-2">Wireless.Ar</p>
                </div>
                <div className="my-10">
                    <p>Content</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <div className="flex justify-center items-center">
                        <UserCircle width={20} height={20} />
                        <p className="text-xs ml-1">
                            pedro@gmail.com
                        </p>
                    </div>
                    <Link href={"/login"} className="
                        text-xs underline mt-1 font-semibold
                    "
                    >
                        Cerrar sessión
                    </Link>
                </div>
            </article>
        </>
    );
}

export default NavDashboard;