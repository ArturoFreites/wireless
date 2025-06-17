// components/CategoryDropdown.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/superbase';

type Category = {
    id: string;
    name: string;
};

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function CategoryDropdown({ value, onChange }: Props) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabaseBrowser.from('categories').select('*');
            if (!error && data) setCategories(data);
        };
        fetchCategories();
    }, []);

    return (
        <div className="flex flex-col mb-4">
            <label className="text-xs font-semibold mb-1">Categoría</label>
            <select
                className="border rounded p-2 text-sm"
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Seleccione una categoría</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>
        </div>
    );
}