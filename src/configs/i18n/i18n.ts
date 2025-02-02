// i18n/i18n.ts

import type { InitOptions } from "i18next";
import type { I18NConfig } from "next/dist/server/config-shared";

export const I18N: I18NConfig = {
  defaultLocale: "fa",
  locales: ["en", "fa", "ar"], // feel free to add more locales
  localeDetection: false,
};

export function getOptions(
  lng = I18N.defaultLocale,
  ns: string | string[] = [],
): InitOptions {
  return {
    // debug: true,
    supportedLngs: I18N.locales,
    fallbackLng: I18N.defaultLocale,
    lng,
    ns,
    fallbackNS: "common",
    defaultNS: "common",
  };
}
