import { NextRequest, NextResponse } from 'next/server';

// Reemplazá con tu Project Ref de Supabase
const SUPABASE_COOKIE_NAME = `sb-${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}-auth-token`;

const protectedRoutes = ['/dashboard', '/create', '/edit', '/config'];

export function middleware(req: NextRequest) {
    const res = NextResponse.next();

    const token = req.cookies.get(SUPABASE_COOKIE_NAME)?.value;
    const isLoggedIn = !!token;

    const { pathname } = req.nextUrl;
    const isProtected = protectedRoutes.some((route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    if (isProtected && !isLoggedIn) {
        const loginUrl = req.nextUrl.clone();
        loginUrl.pathname = '/login';
        loginUrl.searchParams.set('redirectedFrom', pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isLoggedIn && pathname === '/login') {
        const dashboardUrl = req.nextUrl.clone();
        dashboardUrl.pathname = '/dashboard';
        return NextResponse.redirect(dashboardUrl);
    }

    return res;
}
