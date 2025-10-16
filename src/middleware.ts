import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const isAuthed = req.cookies.get("next-auth.session-token") || 
                   req.cookies.get("__Secure-next-auth.session-token")
  const pathname = req.nextUrl.pathname
  
  // Protect all dashboard routes
  const needsAuth = pathname.startsWith("/my-flow") || 
                    pathname.startsWith("/team-pulse") ||
                    pathname.startsWith("/alignment") ||
                    pathname.startsWith("/culture") ||
                    pathname.startsWith("/settings")
  
  if (needsAuth && !isAuthed) {
    const url = new URL("/login", req.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/my-flow/:path*",
    "/team-pulse/:path*",
    "/alignment/:path*",
    "/culture/:path*",
    "/settings/:path*",
  ],
}
