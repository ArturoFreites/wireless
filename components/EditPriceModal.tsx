/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CircleDollarSign } from 'lucide-react';
import { useUpdateWithUser } from '@/hooks/useUpdateWithUser';
import { useFeedbackStore } from '@/store/feedback';
import { useRouter } from 'next/navigation';

type Props = {
    productName: string;
    productId: string;
    currentPrice: number;
    onUpdated: () => void;
};

export default function EditPriceModal({
    productName = 'Sin nombre',
    productId,
    currentPrice = 0,
    onUpdated,
}: Props) {
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState(currentPrice);
    const { update } = useUpdateWithUser();
    const setFeedback = useFeedbackStore((state) => state.setFeedback);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (price <= 0) {
            setFeedback('El precio debe ser mayor a cero.', 'warning');
            return;
        }

        try {
            setLoading(true);
            await update('products', productId, { price });
            setFeedback('Precio actualizado correctamente.', 'success');
            setOpen(false);
            onUpdated();
            router.refresh(); // refresca la vista
        } catch (err: any) {
            setFeedback('Error al actualizar precio: ' + err.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
                className="cursor-pointer"
            >
                <CircleDollarSign className="text-green-600 hover:text-primary hover:fill-red-200 duration-300" size={24} />
            </button>

            {open &&
                createPortal(
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-6 rounded shadow-md w-[300px] text-neutral-700"
                        >
                            <h2 className="text-sm font-semibold mb-1">Editar Precio</h2>
                            <h3 className="text-xs mb-4">{productName}</h3>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full border p-2 rounded mb-3 text-sm"
                                />
                                <div className="flex justify-end gap-2 font-semibold">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="text-sm px-3 py-1 border rounded hover:bg-neutral-800 hover:text-white duration-200 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="text-sm px-3 py-1 bg-primary text-white rounded hover:bg-white hover:border-primary hover:border hover:text-primary duration-300 cursor-pointer"
                                    >
                                        {loading ? 'Guardando...' : 'Guardar'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}
