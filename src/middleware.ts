import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { ROUTES } from '@/config/route';
import { NEXTAUTH_SECRET } from '@/constants';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isSignInPage = pathname === ROUTES.SIGN_IN || pathname.startsWith(`${ROUTES.SIGN_IN}/`);

  // Redirect logged-in user from sign-in to dashboard
  if (token && isSignInPage) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
  }

  // Allow unauthenticated users to access sign-in
  if (!token && isSignInPage) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes
  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, req.url));
  }

  return NextResponse.next();
}

// The public company-profile site is not matched, so it never requires a session.
export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/profile/:path*', '/sign-in/:path*'],
};
