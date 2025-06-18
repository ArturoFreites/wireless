/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/superbase';

export function useBanners() {
    const [data, setData] = useState<any[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchBanners = async () => {
        setLoading(true);

        const {
            data: { user },
            error: userError
        } = await supabaseBrowser.auth.getUser();

        if (userError || !user) {
            setData([]);
            setLoading(false);
            return;
        }

        const { data, error } = await supabaseBrowser
            .from('banners')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setData(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    return { data, loading, refetch: fetchBanners };
}
