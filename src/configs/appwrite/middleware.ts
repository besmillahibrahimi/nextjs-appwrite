import { type NextRequest, NextResponse } from "next/server";
import env from "../env";
import { i18nMiddleware } from "../i18n/middleware";

export const updateSession = async (request: NextRequest) => {
  try {
    const response = i18nMiddleware(request);

    if (response.redirected) return response;

    const authCookie = request.cookies.get(env.auth.authCookieName);

    // redirect login user to home page

    if (authCookie?.value && response.url.includes("/auth/")) {
      return NextResponse.redirect(new URL("/", request.url));
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
