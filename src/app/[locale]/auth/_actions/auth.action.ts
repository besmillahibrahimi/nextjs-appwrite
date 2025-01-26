"use server";

import { createClient } from "@/configs/appwrite/server";
import env from "@/configs/env/client";
import { encodedRedirect } from "@/lib/utils";
import { cookies } from "next/headers";

export async function signOutAction() {
  const { account } = await createClient();
  const cookieStore = await cookies();
  if (!cookieStore.has(env.auth.authCookieName)) return;
  cookieStore.delete(env.auth.authCookieName);
  await account.deleteSession("current");
  encodedRedirect({
    path: "/auth/sign-in",
    message: "Logged out successfully",
    type: "success",
    title: "Success",
    useSonner: true,
  });
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(env.auth.authCookieName);
  return cookie?.value;
}
