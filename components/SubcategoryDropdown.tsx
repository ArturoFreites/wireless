// components/SubcategoryDropdown.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/superbase';

type Subcategory = {
    id: string;
    name: string;
    category_id: string;
};

type Props = {
    categoryId: string;
    value: string;
    onChange: (value: string) => void;
};

export default function SubcategoryDropdown({ categoryId, value, onChange }: Props) {
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

    useEffect(() => {
        if (!categoryId) return;

        const fetchSubcategories = async () => {
            const { data, error } = await supabaseBrowser
                .from('subcategories')
                .select('*')
                .eq('category_id', categoryId);

            if (!error && data) setSubcategories(data);
        };
        fetchSubcategories();
    }, [categoryId]);

    return (
        <div className="flex flex-col mb-4">
            <label className="text-xs font-semibold mb-1">Subcategoría</label>
            <select
                className="border rounded p-2 text-sm"
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Seleccione una subcategoría</option>
                {subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
            </select>
        </div>
    );
}
