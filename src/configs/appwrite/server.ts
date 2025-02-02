"use server";

import { cookies } from "next/headers";
import { Account, Client, Databases, Functions } from "node-appwrite";
import { serverEnv } from "../env/server";
import { getEnvironment } from "../env/utils";

export async function createClient() {
  const client = new Client();

  client
    .setEndpoint(serverEnv.appwrite.endpoint)
    .setProject(serverEnv.appwrite.projectId);

  // set session cookie if exists
  const cookieStore = await cookies();
  const cookie = cookieStore.get(serverEnv.auth.authCookieName);

  if (cookie?.value) {
    client.setSession(cookie.value);
  } else client.setKey(serverEnv.appwrite.apiKey);

  if (getEnvironment().isDevMode) client.setSelfSigned(true);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get functions() {
      return new Functions(client);
    },
  };
}
