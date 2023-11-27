import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenPayload } from "@/untils/auth";

const checkCustomerAuthPage = (request: NextRequest) => {
  return (
    request.nextUrl.pathname.startsWith("/customer/signin") ||
    request.nextUrl.pathname.startsWith("/customer/signup")
  );
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let token = request.cookies.get("token");
  console.log(checkCustomerAuthPage(request));
  // if(getTokenPayload(token)) {
  // if(checkCustomerAuthPage(request)) {
  //     return NextResponse.redirect(new URL('/customer/dashboard', request.url))
  // }

  // return NextResponse.next()
  console.log("run 12");
  // } else {
  // if(!checkCustomerAuthPage(request)) {
  //     return NextResponse.redirect(new URL('/customer/signin', request.url))
  // }

  console.log("run 13");
  // }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/customer/:path*",
};
