"use client";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { AppProvider } from "./app.provider";
import { I18nextProvider } from "react-i18next";
import i18n from "@/configs/i18n";

export default function Providers({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    // AppProvider uses "useSearchParams". It's recommended to wrapped it in Suspense
    <Suspense
      fallback={
        <div className="flex justify-center items-center">Loading...</div>
      }
    >
      <I18nextProvider i18n={i18n}>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </AppProvider>
      </I18nextProvider>
    </Suspense>
  );
}
