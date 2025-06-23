'use client';

import { supabaseBrowser } from '@/lib/superbase';

export function useInsertWithUser() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const insert = async <T extends Record<string, any>>(table: string, values: T) => {
        const { data: { user }, error: userError } = await supabaseBrowser.auth.getUser();

        if (userError) {
            throw new Error('No se pudo obtener el usuario autenticado.');
        }
        
        if (!user) {
            throw new Error('Usuario no autenticado.');
        }

        const { error, data } = await supabaseBrowser
            .from(table)
            .insert(values)
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    };

    return { insert };
}
