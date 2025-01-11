import { createInstance } from "i18next";
import HttpApi from "i18next-http-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import clientEnv from "../env/ClientEnv";
import { getOptions } from "./i18n";
import { cookies } from "next/headers";

const httpApiToBackend = new HttpApi(null, {
  loadPath: `${clientEnv.app.address}/locales/{{lng}}/{{ns}}.json`,
});

const initI18next = async (lng: string, ns?: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(httpApiToBackend)
    .use(initReactI18next)
    .init({ ...getOptions(lng, ns), debug: true });
  return i18nInstance;
};

export async function useTranslation(ns?: string | string[]) {
  const cookieStore = await cookies();
  const lng = cookieStore.get("NEXT_LOCALE")?.value ?? "en";

  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}
