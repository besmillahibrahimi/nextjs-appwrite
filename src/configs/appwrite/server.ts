"use server";

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import env from "../env";
import { getEnvironment } from "../env/utils";

export async function createClient() {
  const client = new Client();

  client.setEndpoint(env.appwrite.endpoint).setProject(env.appwrite.projectId);
  // .setKey(env.appwrite.apiKey);

  // set session cookie if exists
  const cookieStore = await cookies();
  const cookie = cookieStore.get(env.auth.authCookieName);
  console.log("cookie", cookie);
  if (cookie?.value) {
    client.setSession(cookie.value);
  } else client.setKey(env.appwrite.apiKey);

  if (getEnvironment().isDevMode) client.setSelfSigned(true);

  return {
    get account() {
      return new Account(client);
    },
  };
}
