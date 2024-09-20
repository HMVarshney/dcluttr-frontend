import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(request) {
  const searchParams = new URLSearchParams(request.nextUrl.search);

  if (request.nextUrl.pathname.includes("/log-in") || request.nextUrl.pathname.includes("/forgot-password")) {
    // TODO: Redirect to the module based on the user role.
    if (cookies().get("accessToken")) {
      return NextResponse.redirect(new URL("/stores", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/stores") || request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!cookies().get("accessToken")) {
      return NextResponse.redirect(new URL(`/log-in?redirect=${request.url}`, request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.includes("/sign-up")) {
    const token = cookies().get("accessToken");
    if (token && searchParams.get("invitation_id")) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}invitations/${searchParams.get("invitation_id")}/accept`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token.value}`
            }
          }
        );
      } catch (err) {}
      return NextResponse.redirect(new URL("/stores", request.url));
    } else if (token) {
      return NextResponse.redirect(new URL("/stores", request.url));
    }
  }

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
     * - icons
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico|icons).*)"
    },
    {
      source: "/:path*"
    }
  ]
};
