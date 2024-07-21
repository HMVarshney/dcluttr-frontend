import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    if (request.nextUrl.pathname.includes('/log-in')
        // || request.nextUrl.pathname.includes('/sign-up')//TODO: Redirect to the module
        || request.nextUrl.pathname.includes('/forgot-password')) {
        //TODO: Redirect to the module based on the user role.
        console.log("in login");
        if (cookies().get("accessToken")) {
            return NextResponse.redirect(new URL('/stores', request.url));
        }
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/stores') || request.nextUrl.pathname.startsWith('/dashboard')) {
        if (!cookies().get("accessToken")) {
            return NextResponse.redirect(new URL(`/log-in?redirect=${request.url}`, request.url));
        }
        return NextResponse.next()
    }

    // return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next();
}

// // See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        },
        {
            source: '/:path*'
        }
    ],
}