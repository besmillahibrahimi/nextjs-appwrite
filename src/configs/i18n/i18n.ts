import type { InitOptions } from "i18next";
import type { I18NConfig } from "next/dist/server/config-shared";

export const i18n: I18NConfig = {
  defaultLocale: "en",
  locales: ["en"], // feel free to add more locales
  localeDetection: false,
};

export function getOptions(
  lng = i18n.defaultLocale,
  ns: string | string[] = "common",
): InitOptions {
  return {
    // debug: true,
    supportedLngs: i18n.locales,
    fallbackLng: i18n.defaultLocale,
    lng,
    fallbackNS: "common",
    defaultNS: "common",
    ns,
  };
}
