import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwtToken } from "@/untils/auth";

const isAuthPages = (url: string) =>
  ["/signin", "/signup"].some((page) => page.startsWith(url));

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);
  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
    const response = NextResponse.redirect(new URL(`/customer/dashboard`, url));
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    searchParams.set("next", nextUrl.pathname);
    const response = NextResponse.redirect(
      new URL(`/signin?${searchParams}`, url),
    );
    response.cookies.delete("token");
    return response;
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/signin", "/signup", "/customer/:path*"],
};
