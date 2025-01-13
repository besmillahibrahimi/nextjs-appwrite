import { type NextRequest, NextResponse } from "next/server";
import { I18N } from "./i18n";

export function i18nMiddleware(req: NextRequest) {
  const cookieLang = req.cookies.get("locale")?.value ?? I18N.defaultLocale;

  const acceptLanguage =
    req.headers.get("accept-language")?.split(",")[0].slice(0, 2) ??
    I18N.defaultLocale;
  const locale =
    cookieLang ||
    (I18N.locales.includes(acceptLanguage)
      ? acceptLanguage
      : I18N.defaultLocale);

  const url = req.nextUrl.clone();
  if (!url.pathname.startsWith(`/${locale}`)) {
    url.pathname = `/${locale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
