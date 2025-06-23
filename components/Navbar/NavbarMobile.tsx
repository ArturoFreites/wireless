'use client';

import { useEffect, useState } from 'react';
import { MenuIcon, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { NavLink } from '@/types/navbar';
import NavbarLinks from "@/components/Navbar/NavbarLinks";
import Store from './Store';


type Props = {
    links: NavLink[] | null;
    hidden: boolean;
    loading: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function NavbarMobile({ links, hidden, loading }: Props) {
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [mobileOpen]);

    return (
        <>
            <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 text-neutral-900 focus:outline-none"
                aria-label="Open mobile menu"
            >
                <MenuIcon size={24} />
            </button>

            <div
                className={`fixed inset-0 bg-white z-60 transform transition-transform duration-300 ease-in-out ${mobileOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0 pointer-events-none'
                    }`}
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
                    <Link
                        href="/"
                        className="h-full flex justify-center items-center hover:scale-95 duration-300"
                    >
                        <Image
                            src="/img/wireless.webp"
                            alt="Logo Wireless"
                            width={55}
                            height={55}
                        />
                        <p className="pl-1 text-sm font-semibold text-neutral-700">WIRELESS.AR</p>
                    </Link>
                </div>

                <div
                    className="flex-grow flex flex-col items-center justify-center space-y-6"
                    onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest('a[href="/cart"]')) {
                            setMobileOpen(false);
                        }
                    }}
                >
                    <Store />
                </div>


                {loading ? (
                    <div className="animate-pulse h-4 w-32 bg-gray-200 rounded" />
                ) : !links ? (
                    <p className="text-red-500 text-sm">Error al cargar categorías</p>
                ) : (
                    <NavbarLinks
                        links={links}
                        hidden={false}
                        onClickLink={() => setMobileOpen(false)}
                    />
                )}
            </div>
        </>
    );
}
