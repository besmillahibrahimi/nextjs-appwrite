import { type NextRequest, NextResponse } from "next/server";
import serverEnv from "../env/ServerEnv";

export const updateSession = async (request: NextRequest) => {
  try {
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const authCookie = request.cookies.get(serverEnv.auth.authCookieName);

    // redirect login user to home page
    if (authCookie?.value && request.nextUrl.pathname.startsWith("/auth/")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // protected routes
    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      !authCookie?.value
    ) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
