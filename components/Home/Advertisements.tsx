'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/superbase';

function Advertisements() {
    const [bannerText, setBannerText] = useState<string | null>(null);

    useEffect(() => {
        const fetchActiveBanner = async () => {
            const { data, error } = await supabaseBrowser
                .from('banners')
                .select('description')
                .eq('status', 'active')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (!error && data?.description) {
                setBannerText(data.description);
            }
        };

        fetchActiveBanner();
    }, []);

    return (
        bannerText ?
            <div className="p-2 bg-neutral-950">
                <p className="text-xs font-bold text-center text-neutral-100">
                    {bannerText}
                </p>
            </div>
            :
            <div className="p-2 bg-neutral-950">
                <p className="text-xs font-bold text-center text-neutral-950">
                    .
                </p>
            </div>
    );
}

export default Advertisements;
