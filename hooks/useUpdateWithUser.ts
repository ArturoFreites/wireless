'use client';

import { supabaseBrowser } from '@/lib/superbase';

export function useUpdateWithUser() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const update = async <T extends Record<string, any>>(
        table: string,
        id: string,
        values: Partial<T>,
        idColumn: string = 'id'
    ) => {
        const { data: { user }, error: userError } = await supabaseBrowser.auth.getUser();

        if (userError) {
            throw new Error('No se pudo obtener el usuario autenticado.');
        }
        if (!user) {
            throw new Error('Usuario no autenticado.');
        }

        const { error, data } = await supabaseBrowser
            .from(table)
            .update(values)
            .eq(idColumn, id)
            .eq('user_id', user.id) // Verifica que el registro pertenezca al usuario
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }

        return data;
    };

    return { update };
}
