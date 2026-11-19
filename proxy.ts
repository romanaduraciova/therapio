import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/', '/login'];

export default function proxy(request: NextRequest) {
	const isPublic = PUBLIC_ROUTES.some(route =>
		request.nextUrl.pathname.startsWith(route)
	);

	if (!isPublic && !getSessionCookie(request)) {
		const redirectUrl = new URL('/login', request.url);
		redirectUrl.searchParams.set('callbackUrl', request.nextUrl.href);

		return NextResponse.redirect(redirectUrl);
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
