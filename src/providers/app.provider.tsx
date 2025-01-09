"use client";

import { useAppWrite } from "@/configs/appwrite/hooks";
import { useAlertMessage } from "@/hooks/use-alert-message";
import type { Models } from "appwrite";
import { createContext, useContext } from "react";

type ContextType = {
  user: Models.User<Models.Preferences> | null;
};

const defaultContext = {
  user: null,
};

export const AppContext = createContext<ContextType>(defaultContext);

export const useApp = () => useContext(AppContext);

export function AppProvider({ children }: Readonly<React.PropsWithChildren>) {
  const { user } = useAppWrite();

  useAlertMessage();

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
}
