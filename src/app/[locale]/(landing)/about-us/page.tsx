"use client";

import { useApp } from "@/providers/app.provider";
import { useTranslation } from "react-i18next";

export default function AboutUsPage() {
  const { user } = useApp();
  const { t, i18n } = useTranslation("common");

  return (
    <div>
      <h1>About Us</h1>
      <p>{t("appName")}</p>
      <button
        type="button"
        onClick={() => {
          i18n.changeLanguage(i18n.resolvedLanguage === "fa" ? "en" : "fa");
        }}
      >
        {i18n.resolvedLanguage}
      </button>
      <p>{user?.email}</p>
      <p>{user?.name}</p>
    </div>
  );
}
