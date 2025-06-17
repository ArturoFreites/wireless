import { useState } from 'react';
import { supabaseBrowser } from '@/lib/superbase';

export function useUpdateProductPrice() {
    const [loading, setLoading] = useState(false);

    const updatePrice = async (productId: string, newPrice: number) => {
        setLoading(true);
        await supabaseBrowser
            .from('products')
            .update({ price: newPrice })
            .eq('id', productId);
        setLoading(false);
    };

    return { updatePrice, loading };
}
