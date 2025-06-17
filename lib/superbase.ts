
import { createBrowserClient, createServerClient } from '@supabase/ssr';

type MinimalCookies = {
    get: (key: string) => { value: string } | undefined;
};

export const createSupabaseServerClient = (cookies: MinimalCookies) =>
    createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (key) => cookies.get(key)?.value,
                set: async () => { },
                remove: async () => { },
            },
        }
    );

export const supabaseBrowser = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
