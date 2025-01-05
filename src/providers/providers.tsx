import { AppProvider } from "./app.provider";

export default function Providers({
  children,
}: Readonly<React.PropsWithChildren>) {
  return <AppProvider>{children}</AppProvider>;
}
