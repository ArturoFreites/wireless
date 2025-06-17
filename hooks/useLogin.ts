// hooks/useLogin.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseBrowser } from '@/lib/superbase';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);

        const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        } else {
            router.push('/dashboard');
        }

        setLoading(false);
    };

    return { login, loading, error };
}
