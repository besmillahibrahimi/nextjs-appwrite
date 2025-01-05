"use client";

import { account } from "@/configs/appwrite/appwrite";
import type { Models } from "appwrite";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type ContextType = {
  user: Models.User<Models.Preferences> | null;
};

const defaultContext = {
  user: null,
};

export const AppContext = createContext<ContextType>(defaultContext);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: Readonly<React.PropsWithChildren>) {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      try {
        const user = await account.get();
        setUser(user);
      } catch (error) {
        setUser(null);
      }
    })();
  }, []);

  useEffect(() => {
    const message = searchParams.get("message");
    const type = searchParams.get("type") as MessageType;
    const title = searchParams.get("title");
    const useSonner = searchParams.get("useSonner");

    if (useSonner && useSonner === "true" && message && type && title) {
      setTimeout(() => {
        // make the component is rendered
        toast[type](title ?? message, { description: title ? message : null });
      }, 500);
    }
  }, [searchParams]);

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}
