/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import TableSkeleton from '@/components/Skeleton/TableSkeleton';
import { useFeedbackStore } from '@/store/feedback';
import { supabaseBrowser } from '@/lib/superbase';
import { CircleCheck, CircleMinus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useBanners } from '@/hooks/useBanner';

function BannerPage() {
    const { data: banners, loading, refetch } = useBanners();
    const setFeedback = useFeedbackStore((s) => s.setFeedback);

    const [newDescription, setNewDescription] = useState('');
    const [creating, setCreating] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const setOnlyActiveBanner = async (id: string) => {
        try {
            await supabaseBrowser.from('banners').update({ status: 'inactive' }).neq('id', id);
            const { error } = await supabaseBrowser.from('banners').update({ status: 'active' }).eq('id', id);
            if (error) throw error;
            setFeedback('Banner activado correctamente.', 'success');
            refetch();
        } catch (err: any) {
            setFeedback('Error al activar banner: ' + err.message, 'error');
        }
    };

    const handleCreateBanner = async () => {
        if (!newDescription.trim()) {
            setFeedback('Descripción requerida', 'error');
            return;
        }

        try {
            setCreating(true);

            const {
                data: { user },
                error: userError
            } = await supabaseBrowser.auth.getUser();

            if (userError || !user) {
                throw new Error('Usuario no autenticado');
            }

            const { error } = await supabaseBrowser.from('banners').insert([
                {
                    description: newDescription,
                    status: 'inactive',
                    user_id: user.id,
                },
            ]);

            if (error) throw error;

            setFeedback('Banner creado correctamente.', 'success');
            setNewDescription('');
            refetch();
        } catch (err: any) {
            setFeedback('Error al crear banner: ' + err.message, 'error');
        } finally {
            setCreating(false);
        }
    };

    const handleSaveEdit = async (id: string) => {
        try {
            const { error } = await supabaseBrowser
                .from('banners')
                .update({ description: editValue })
                .eq('id', id);

            if (error) throw error;

            setFeedback('Descripción actualizada.', 'success');
            setEditingId(null);
            refetch();
        } catch (err: any) {
            setFeedback('Error al editar: ' + err.message, 'error');
        }
    };

    return (
        <section className="w-full p-6">
            <h1 className="font-semibold text-xl mb-4">Banners</h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                <input
                    type="text"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Nueva descripción del banner"
                    className="border border-neutral-400 rounded px-3 py-1 text-sm w-full sm:w-auto"
                />
                <button
                    onClick={handleCreateBanner}
                    className="flex items-center gap-1 bg-primary text-white px-4 py-1.5 text-xs rounded hover:bg-opacity-90 transition"
                    disabled={creating}
                >
                    <Plus size={14} /> Agregar banner
                </button>
            </div>

            <article className="overflow-x-auto">
                {loading ? (
                    <TableSkeleton columns={4} />
                ) : (
                    <table className="min-w-[600px] w-full text-sm">
                        <thead className="bg-neutral-200 text-xs">
                            <tr>
                                <th className="text-left p-2">Descripción</th>
                                <th className="text-left p-2">Estado</th>
                                <th className="text-left p-2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners?.map((banner) => (
                                <tr key={banner.id} className="border-t hover:bg-neutral-100 transition-colors">
                                    <td className="p-2">
                                        {editingId === banner.id ? (
                                            <div className="flex gap-2">
                                                <input
                                                    value={editValue}
                                                    onChange={(e) => setEditValue(e.target.value)}
                                                    className="border px-2 py-1 text-sm rounded"
                                                />
                                                <button
                                                    onClick={() => handleSaveEdit(banner.id)}
                                                    className="bg-green-600 text-white px-2 rounded text-xs"
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(null);
                                                        setEditValue('');
                                                    }}
                                                    className="bg-neutral-400 text-white px-2 rounded text-xs"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <span>{banner.description || '—'}</span>
                                                <button
                                                    onClick={() => {
                                                        setEditingId(banner.id);
                                                        setEditValue(banner.description || '');
                                                    }}
                                                    className="ml-2 text-xs text-blue-600 underline"
                                                >
                                                    Editar
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {banner.status === 'active' ? (
                                            <CircleCheck className="text-white fill-green-600 hover:text-green-600 hover:fill-white transition" />
                                        ) : (
                                            <CircleMinus className="text-white fill-red-500 hover:text-red-500 hover:fill-white transition" />
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {banner.status !== 'active' && (
                                            <button
                                                onClick={() => setOnlyActiveBanner(banner.id)}
                                                className="text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                Activar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </article>
        </section>
    );
}

export default BannerPage;
