"use client";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { AppProvider } from "./app.provider";
import I18nProvider from "./i18n.provider";

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
      <I18nProvider locale="fa">
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
      </I18nProvider>
    </Suspense>
  );
}
