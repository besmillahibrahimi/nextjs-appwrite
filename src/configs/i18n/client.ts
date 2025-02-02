"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { I18N, getOptions } from "./i18n";

const runsOnServerSide = typeof window === "undefined";

export const i18n = i18next.createInstance();
i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) =>
        import(`../../../public/locales/${lang}/${ns}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    ...getOptions(),
    detection: {
      order: ["path", "htmlTag", "cookie", "navigator"],
    },
    preload: runsOnServerSide ? I18N.locales : [],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });
