import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.indexOf("sellers") > -1) {
    if (
      request.cookies.get("profileId") === undefined ||
      request.cookies.get("userID") !== request.cookies.get("profileId")
    ) {
      return NextResponse.redirect(
        new URL("/account/create-profile", request.url)
      );
    }
  }
}

export const config = {
  matcher: [
    "/buyers",
    "/buyers/:path*",
    "/sellers/:path*",
    "/inbox",
    "/account",
    "/account/earnings",
    "/account/create-profile",
    "/account/referrals",
    "/blogs/:id/index",
  ],
};
