import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApiBackend from "i18next-http-backend";

import clientEnv from "../env/ClientEnv";

const httpApiToBackend = new HttpApiBackend(null, {
  loadPath: `${clientEnv.app.address}/locales/{{lng}}/{{ns}}.json`,
});

i18n
  .use(httpApiToBackend)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    fallbackLng: "en", // Fallback language
    debug: process.env.NODE_ENV === "development", // Enable debug in development

    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
