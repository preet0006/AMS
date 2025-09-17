import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/signUp")) {
    return NextResponse.next();
  }


  if (!token) {
    return NextResponse.redirect(new URL("/signUp", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
   
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
