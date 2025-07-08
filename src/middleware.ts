import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host');
  // Only redirect if host is fileslap.com (not www.fileslap.com)
  if (host === 'fileslap.com') {
    const url = request.nextUrl;
    url.host = 'www.fileslap.com';
    // 301 redirect, preserve path and query
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

// Apply to all routes
export const config = {
  matcher: '/:path*',
}; 