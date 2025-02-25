import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
 
// 1. Specify protected and public routes
const protectedRoutes = ["/home"];
const publicRoutes = ["/sign-up", "/"];
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value || '{}';
  const { accessToken } = JSON.parse(cookie);
  const session = await decrypt(accessToken);
 
  // 4. Redirect to / if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
 
  // 5. Redirect to /home if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/home")
  ) {
    return NextResponse.redirect(new URL("/home", req.nextUrl));
  }
 
  return NextResponse.next();
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}