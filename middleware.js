import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    console.log("middleware ran!!");
    if (request.nextUrl.pathname.startsWith('/log-in') || request.nextUrl.pathname.startsWith('/sign-up')) {
        //TODO: Redirect to the module based on the user role.
        console.log("in login");
        if (cookies().get("accessToken")) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
        return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        console.log("dashboard");
        if (!cookies().get("accessToken")) {
            return NextResponse.redirect(new URL('/log-in', request.url));
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
        // {
        //     source : '/((?!api|_next/static|_next/image|favicon.ico).*)',
        // },
        {
            source: '/:path*'
        }
    ],
}