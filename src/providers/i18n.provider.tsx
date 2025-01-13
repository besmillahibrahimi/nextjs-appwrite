"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/configs/i18n/client";

interface Props {
  children: React.ReactNode;
  locale: string;
}

const I18nProvider: React.FC<Props> = ({ children, locale }) => {
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default I18nProvider;
