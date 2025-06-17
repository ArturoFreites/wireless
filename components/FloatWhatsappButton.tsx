'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WhatsappIcon from './icon/WhatsappIcon';

export default function FloatWhatsappButton() {
    const message = "Hola! Tengo una consulta.";
    const phone = "17164932230";
    const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50"
        >
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 pt-3 pb-4 md:px-4 md:py-3 rounded-full shadow-lg transition-all duration-300"
            >
                <WhatsappIcon width={24} height={24} />
                <span className="hidden md:inline md:ml-2 text-sm font-medium">¿Necesitás ayuda?</span>
            </Link>
        </motion.div>
    );
}
