import { Account, Client, Databases, Functions, Storage } from "appwrite";
import clientEnv from "../env/ClientEnv";

export { ID } from "appwrite";

export function createClient() {
  const client = new Client();

  client
    .setEndpoint(clientEnv.appwrite.endpoint)
    .setProject(clientEnv.appwrite.projectId);

  // set session cookie if exists
  if (typeof window !== "undefined") {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${clientEnv.app.authCookieName}=`))
      ?.split("=")[1];
    if (cookie) {
      client.setSession(cookie);
    }
  } else {
    // set session cookie if exists
    const { cookies } = require("next/headers");
    const cookieStore = cookies();
    const cookie = cookieStore.get(clientEnv.app.authCookieName)?.value;
    if (cookie) {
      client.setSession(cookie);
    }
  }

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get functions() {
      return new Functions(client);
    },
  };
}
