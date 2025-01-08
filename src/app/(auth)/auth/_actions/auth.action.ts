"use server";

import { createClient } from "@/configs/appwrite/server";
import serverEnv from "@/configs/env/ServerEnv";
import { encodedRedirect } from "@/lib/utils";
import { cookies } from "next/headers";

export async function signOutAction() {
  const { account } = await createClient();
  const cookieStore = await cookies();
  cookieStore.delete(serverEnv.auth.authCookieName);
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
  const cookie = cookieStore.get(serverEnv.auth.authCookieName);
  return cookie?.value;
}
