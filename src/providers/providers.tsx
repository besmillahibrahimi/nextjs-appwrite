import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { AppProvider } from "./app.provider";

export default function Providers({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    // AppProvider uses "useSearchParams". It's recommended to wrapped it in Suspense
    <Suspense fallback={"Loading..."}>
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
    </Suspense>
  );
}
