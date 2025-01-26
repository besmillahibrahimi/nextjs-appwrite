"use server";
import i18n from "i18next";
import ResourceBackend from "i18next-resources-to-backend";
import { cookies } from "next/headers";
import { serverEnv } from "../env/server";
import { I18N, getOptions } from "./i18n";

const resource = ResourceBackend(
  (lang: string, ns: string) =>
    import(`../../../public/locales/${lang}/${ns}.json`),
);

const initI18n = async (locale: string) => {
  if (!i18n.isInitialized) {
    await i18n.use(resource).init(getOptions(locale, "common"));
  } else {
    await i18n.changeLanguage(locale);
  }
  return i18n;
};

export async function useTranslation(ns: string | string[] = ["common"]) {
  const locale =
    (await cookies()).get(serverEnv.app.localeCookieName)?.value ??
    I18N.defaultLocale;

  const i18n = await initI18n(locale);

  return {
    t: i18n.getFixedT(locale, ns),
    i18n,
  };
}

export default initI18n;
