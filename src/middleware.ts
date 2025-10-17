import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // Allow demo paths without auth
  if (req.nextUrl.pathname.startsWith('/demo')) {
    return NextResponse.next()
  }
  
  // Re-enable auth for dashboard routes (uncomment when ready)
  /*
  const isAuthed = req.cookies.get("next-auth.session-token") || 
                   req.cookies.get("__Secure-next-auth.session-token")
  const pathname = req.nextUrl.pathname
  
  const needsAuth = pathname.startsWith("/my-work") || 
                    pathname.startsWith("/team") ||
                    pathname.startsWith("/plan") ||
                    pathname.startsWith("/kudos") ||
                    pathname.startsWith("/ai") ||
                    pathname.startsWith("/settings")
  
  if (needsAuth && !isAuthed) {
    const url = new URL("/login", req.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }
  */
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/demo/:path*",
    "/my-work/:path*",
    "/team/:path*",
    "/plan/:path*",
    "/kudos/:path*",
    "/ai/:path*",
    "/settings/:path*",
  ],
}
