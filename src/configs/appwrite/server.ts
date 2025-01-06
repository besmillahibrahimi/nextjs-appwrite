"use server";

import clientEnv from "../env/ClientEnv";
import { Account, Client } from "node-appwrite";
import { cookies } from "next/headers";
import serverEnv from "../env/ServerEnv";

export async function createSessionClient() {
  const cookieStore = await cookies();
  const client = new Client()
    .setEndpoint(serverEnv.appwrite.endpoint)
    .setProject(serverEnv.appwrite.projectId);

  const session = cookieStore.get(clientEnv.app.authCookieName);
  if (!session?.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(serverEnv.appwrite.endpoint)
    .setProject(serverEnv.appwrite.projectId);
  // .setKey(serverEnv.appwrite.apiKey);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createClient() {
  const client = new Client();

  client
    .setEndpoint(clientEnv.appwrite.endpoint)
    .setProject(clientEnv.appwrite.projectId)
    .setKey(serverEnv.appwrite.apiKey);

  // set session cookie if exists

  const cookieStore = await cookies();
  const cookie = cookieStore.get(clientEnv.app.authCookieName)?.value;
  if (cookie) {
    client.setSession(cookie);
  }

  return {
    get account() {
      return new Account(client);
    },
  };
}
