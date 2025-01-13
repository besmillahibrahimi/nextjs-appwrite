"use client";

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { I18N, getOptions } from "./i18n";

const runsOnServerSide = typeof window === "undefined";

import HttpBackend from "i18next-http-backend";

export const clientI18n = i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    ...getOptions(undefined, ["common"]),
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: { useSuspense: true },
  });

export const i18n = i18next.createInstance();
i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../../public/locales/${language}/${namespace}.json`),
    ),
  )
  .use(initReactI18next)
  .init({
    ...getOptions("fa", "common"),
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
