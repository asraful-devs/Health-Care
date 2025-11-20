import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT';

type RouteConfig = {
    exact: string[];
    patterns: RegExp[];
};

const authRoutes = ['/login', '/register', '/forgot-password'];

const commonProtectedRoutes: RouteConfig = {
    exact: ['/profile', '/settings'],
    patterns: [],
};

const doctorProtectedRoutes: RouteConfig = {
    patterns: [/^\/doctor\/.*/],
    exact: [],
};

const patientProtectedRoutes: RouteConfig = {
    patterns: [/^\/patient\/.*/],
    exact: [],
};

const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin\/.*/],
    exact: [],
};

const isAuthRoute = (pathName: string) => {
    return authRoutes.some((route: string) => route === pathName);
};

const isRouteMatches = (pathName: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathName)) {
        return true;
    }

    return routes.patterns.some((pattern: RegExp) => pattern.test(pathName));
};

const getRouteOwner = (
    pathName: string
): 'ADMIN' | 'DOCTOR' | 'PATIENT' | 'COMMON' | null => {
    if (isRouteMatches(pathName, adminProtectedRoutes)) {
        return 'ADMIN';
    }
    if (isRouteMatches(pathName, doctorProtectedRoutes)) {
        return 'DOCTOR';
    }
    if (isRouteMatches(pathName, patientProtectedRoutes)) {
        return 'PATIENT';
    }
    if (isRouteMatches(pathName, commonProtectedRoutes)) {
        return 'COMMON';
    }
    return null;
};

const getDefaultDashboardRoute = (role: UserRole): string => {
    switch (role) {
        case 'ADMIN':
            return '/admin/dashboard';
        case 'DOCTOR':
            return '/doctor/dashboard';
        case 'PATIENT':
            return '/patient/dashboard';
        default:
            return '/';
    }
};

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    const accessToken = request.cookies.get('accessToken')?.value || null;

    const userRole: UserRole | null = null;

    if (accessToken) {
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
