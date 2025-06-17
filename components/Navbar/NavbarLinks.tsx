'use client';

import { NavLink } from '@/types/navbar';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
    links: NavLink[];
    hidden: boolean;
    onClickLink?: () => void;
};

function NavBarLinks({ links, hidden, onClickLink }: Props) {
    const [expandedCategoryId, setExpandedCategoryId] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleCategoryClick = (id: number, hasSubcategories: boolean) => {
        if (isMobile) {
            if (hasSubcategories) {
                setExpandedCategoryId(prev => (prev === id ? null : id));
            } else {
                onClickLink?.(); // cerrar si no hay subcategorías
            }
        }
    };

    return (
        <div
            className={`${hidden ? 'hidden' : ''} w-full mt-2 text-neutral-600 md:flex md:justify-center md:items-center md:w-6/8 md:my-0`}
        >
            {links.map((link) => {
                const hasValidSubcategories = link.subcategories.some(
                    (sc) => sc.id && sc.name
                );
                const isExpanded = expandedCategoryId === link.id;

                return (
                    <div
                        key={link.id}
                        className="relative group text-center md:text-xs p-2 font-semibold cursor-pointer hover:text-neutral-950 duration-300"
                        onClick={() => handleCategoryClick(link.id, hasValidSubcategories)}
                    >
                        <Link
                            href={`/products?categoryId=${link.id}`}
                            onClick={() => {
                                if (!isMobile || !hasValidSubcategories) {
                                    onClickLink?.();
                                }
                            }}
                        >
                            <p>{link.name}</p>
                        </Link>

                        {/* Subcategorías en mobile */}
                        {isMobile && isExpanded && hasValidSubcategories && (
                            <div className="mt-2 space-y-1">
                                {link.subcategories
                                    .filter((sc) => sc.id && sc.name)
                                    .map((sub) => (
                                        <Link
                                            href={`/products?subcategoryId=${sub.id}`}
                                            key={sub.id}
                                            onClick={onClickLink}
                                        >
                                            <p className="text-neutral-500 text-sm hover:text-black transition mb-2">
                                                {sub.name}
                                            </p>
                                        </Link>
                                    ))}
                            </div>
                        )}

                        {/* Subcategorías en desktop */}
                        {!isMobile && hasValidSubcategories && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-48 bg-white shadow-lg rounded-lg py-2 px-4 z-50 hidden group-hover:block">
                                {link.subcategories
                                    .filter((sc) => sc.id && sc.name)
                                    .map((sub) => (
                                        <Link
                                            href={`/products?subcategoryId=${sub.id}`}
                                            key={sub.id}
                                            onClick={onClickLink}
                                        >
                                            <p className="text-neutral-500 font-medium text-sm hover:text-black transition pb-3 text-left">
                                                {sub.name}
                                            </p>
                                        </Link>
                                    ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default NavBarLinks;
