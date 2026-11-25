import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const ROOT_ROUTE = '/';
const PUBLIC_ROUTES = ['/login', '/pricing', '/contact'];

export default function proxy(request: NextRequest) {
	const isPublic =
		ROOT_ROUTE === request.nextUrl.pathname ||
		PUBLIC_ROUTES.some(route => request.nextUrl.pathname.startsWith(route));

	if (!isPublic && !getSessionCookie(request)) {
		const redirectUrl = new URL('/login', request.url);
		redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);

		return NextResponse.redirect(redirectUrl);
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
