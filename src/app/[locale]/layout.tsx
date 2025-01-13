import "@/configs/i18n/client";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/providers/providers";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: Readonly<
  {
    children: React.ReactNode;
  } & LocaleParams
>) {
  const { locale } = await params;
  return (
    <html lang={locale?.slice(0, 2)} suppressHydrationWarning>
      <body
        className={`bg-background ${inter.className}`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
