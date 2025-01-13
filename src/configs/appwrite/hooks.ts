"use client";
import { getAuthCookie } from "@/app/[locale]/auth/_actions/auth.action";
import { useEffect, useState } from "react";
import { account, client } from "./client";

export function useAppWrite() {
  const [user, setUser] = useState<AppWrite.User | null>(null);
  const [cookie, setCookie] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const cookie = await getAuthCookie();
        if (!cookie) return;
        setCookie(cookie);
        client.setSession(cookie);
        const user = await account.get();
        setUser(user);
      } catch (error) {
        setCookie(null);
        setUser(null);
      }
    })();
  }, []);

  return {
    user,
    client,
    cookie,
  };
}
