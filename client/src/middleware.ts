import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log({pathname});
  
  // Get stored auth data (JWT) from cookies
  const token = request.cookies.get('session')?.value;
  console.log({token});
  // Define protected routes
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/doctor');
    
  // Redirect to login if accessing protected routes without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
  
  // If user has a token, verify role for specific paths
  if (token) {
    try {
      // Decode the token (JWT is base64 encoded with 3 parts separated by dots)
      const payload = JSON.parse(
        Buffer.from(token, 'base64').toString()
      );

      console.log({payload});

      const base64Payload = payload.jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    
      // Add padding if needed
      const paddedBase64Payload = base64Payload.padEnd(
        base64Payload.length + (4 - (base64Payload.length % 4)) % 4,
        '='
      );
      
      // Decode and parse the payload
      const decodedPayload = Buffer.from(paddedBase64Payload, 'base64').toString();
      const payload1 = JSON.parse(decodedPayload);
      
      console.log({payload1});
  
      
      const userRole = payload1.role;
      
      // Role-based access control
      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      
      if (pathname.startsWith('/doctor') && userRole !== 'doctor') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      // If token can't be parsed, redirect to login
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/doctor/:path*'
  ],
};