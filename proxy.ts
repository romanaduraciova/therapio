import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/pricing', '/contact', '/blog'];

const isPublicRoute = (pathname: string) =>
	pathname === '/' ||
	PUBLIC_ROUTES.some(
		route => pathname === route || pathname.startsWith(`${route}/`)
	);

export default function proxy(request: NextRequest) {
	const { pathname, search } = request.nextUrl;

	if (!isPublicRoute(pathname) && !getSessionCookie(request)) {
		const redirectUrl = new URL('/login', request.url);
		redirectUrl.searchParams.set('callbackUrl', pathname + search);
		return NextResponse.redirect(redirectUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)'
	]
};
