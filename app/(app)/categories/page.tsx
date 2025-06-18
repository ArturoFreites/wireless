/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/superbase';
import { Pencil, Trash2, Plus, X, Check, XCircle } from 'lucide-react';

function Categories() {
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [newSubNameMap, setNewSubNameMap] = useState<Record<string, string>>({});
    const [editingSubMap, setEditingSubMap] = useState<Record<string, string | null>>({});
    const [editSubValueMap, setEditSubValueMap] = useState<Record<string, string>>({});

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabaseBrowser
            .from('categories')
            .select('*, subcategories(*)')
            .order('created_at', { ascending: true });

        if (!error) setCategories(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        const { error } = await supabaseBrowser.from('categories').insert({ name: newCategoryName });
        if (!error) {
            setNewCategoryName('');
            fetchCategories();
        }
    };

    const handleDeleteCategory = async (id: string) => {
        await supabaseBrowser.from('categories').delete().eq('id', id);
        fetchCategories();
    };

    const handleEditCategory = async (id: string) => {
        await supabaseBrowser.from('categories').update({ name: editValue }).eq('id', id);
        setEditingCategory(null);
        fetchCategories();
    };

    const handleCreateSubcategory = async (categoryId: string) => {
        const name = newSubNameMap[categoryId];
        if (!name?.trim()) return;
        await supabaseBrowser.from('subcategories').insert({ name, category_id: categoryId });
        setNewSubNameMap((prev) => ({ ...prev, [categoryId]: '' }));
        fetchCategories();
    };

    const handleDeleteSubcategory = async (id: string) => {
        await supabaseBrowser.from('subcategories').delete().eq('id', id);
        fetchCategories();
    };

    const handleEditSubcategory = async (id: string) => {
        await supabaseBrowser.from('subcategories').update({ name: editSubValueMap[id] }).eq('id', id);
        setEditingSubMap((prev) => ({ ...prev, [id]: null }));
        fetchCategories();
    };

    return (
        <section className="p-6">
            <h1 className="text-xl font-bold mb-4">Categorías</h1>

            <div className="flex gap-2 mb-6">
                <input
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Nueva categoría"
                    className="border border-neutral-400 rounded px-3 py-1 text-sm"
                />
                <button
                    onClick={handleCreateCategory}
                    className="flex items-center gap-1 bg-primary text-white px-3 py-1 rounded text-xs"
                >
                    <Plus size={14} /> Crear
                </button>
            </div>

            {loading ? (
                <p className="text-sm">Cargando...</p>
            ) : (
                <ul className="space-y-4">
                    {categories.map((cat) => (
                        <li key={cat.id} className="border p-4 rounded-md shadow bg-white">
                            {editingCategory === cat.id ? (
                                <div className="flex items-center gap-2 mb-2">
                                    <input
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="border border-neutral-400 rounded px-2 py-1 text-sm"
                                    />
                                    <button
                                        onClick={() => handleEditCategory(cat.id)}
                                        className="text-xs px-2 py-1 bg-green-600 text-white rounded"
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => setEditingCategory(null)}
                                        className="text-xs px-2 py-1 bg-neutral-400 text-white rounded"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold text-sm">{cat.name}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingCategory(cat.id);
                                                setEditValue(cat.name);
                                            }}
                                            className="text-blue-600"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCategory(cat.id)}
                                            className="text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <ul className="mt-2 ml-4 list-disc text-sm text-neutral-700 space-y-1">
                                {cat.subcategories?.length > 0 ? (
                                    cat.subcategories.map((sub: any) => (
                                        <li key={sub.id} className="flex items-center justify-between">
                                            {editingSubMap[sub.id] === sub.id ? (
                                                <>
                                                    <input
                                                        value={editSubValueMap[sub.id] || ''}
                                                        onChange={(e) => setEditSubValueMap((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                                                        className="border border-neutral-400 rounded px-2 py-1 text-sm mr-2"
                                                    />
                                                    <div className="flex gap-1">
                                                        <button onClick={() => handleEditSubcategory(sub.id)} className="text-green-600">
                                                            <Check size={16} />
                                                        </button>
                                                        <button onClick={() => setEditingSubMap((prev) => ({ ...prev, [sub.id]: null }))} className="text-neutral-600">
                                                            <XCircle size={16} />
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <span>{sub.name}</span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingSubMap((prev) => ({ ...prev, [sub.id]: sub.id }));
                                                                setEditSubValueMap((prev) => ({ ...prev, [sub.id]: sub.name }));
                                                            }}
                                                            className="text-blue-600"
                                                        >
                                                            <Pencil size={14} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteSubcategory(sub.id)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li className="italic">Sin subcategorías</li>
                                )}
                            </ul>

                            <div className="flex gap-2 mt-2 ml-4">
                                <input
                                    value={newSubNameMap[cat.id] || ''}
                                    onChange={(e) => setNewSubNameMap((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                                    placeholder="Nueva subcategoría"
                                    className="border border-neutral-300 rounded px-2 py-1 text-sm"
                                />
                                <button
                                    onClick={() => handleCreateSubcategory(cat.id)}
                                    className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                                >
                                    + Agregar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default Categories;
