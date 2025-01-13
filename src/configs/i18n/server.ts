"use server";
import i18n from "i18next";
import Backend from "i18next-fs-backend";
import path from "node:path";
import { getOptions } from "./i18n";

const initI18n = async (locale: string, ns: string | string[]) => {
  if (!i18n.isInitialized) {
    await i18n.use(Backend).init({
      ...getOptions(locale, ns),
      backend: {
        loadPath: path.resolve("./public/locales/{{lng}}/{{ns}}.json"),
      },
    });
  }
  return i18n;
};

export async function useTranslation(locale: string, ns: string | string[]) {
  const i18n = await initI18n(locale, ns);

  return {
    t: i18n.getFixedT(locale, ns),
    i18n,
  };
}

export default initI18n;
