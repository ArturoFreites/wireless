// components/NavbarMobile.tsx
"use client"

import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import NavBarLinks from "./navbarLinks";
import { NAVLINKS } from "../services/navbar";
import Link from "next/link";
import Image from "next/image";
import Store from "./store";

export default function NavbarMobile() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Botón de menú en móvil */}
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-neutral-900 focus:outline-none"
                aria-label="Open mobile menu"
            >
                <MenuIcon size={24} />
            </button>

            {/* Overlay móvil con efecto de slide-in */}
            <div
                className={`fixed inset-0 bg-white z-60 transform transition-transform duration-300 ease-in-out
            ${mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}
            >
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 text-neutral-900 focus:outline-none"
                        aria-label="Close mobile menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="w-full mb-4">
                    <Link href={"/"} className="h-full flex justify-center items-center hover:scale-95 duration-300">
                        <Image
                            src={"/img/wireless.webp"}
                            alt="wireless"
                            width={45}
                            height={45}
                        />
                        <p className="pl-1 text-sm text-neutral-700">
                            Wireless.Ar
                        </p>
                    </Link>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                    <Store />
                </div>
                <NavBarLinks links={NAVLINKS} hidden={false} />
            </div>
        </>
    );
}
