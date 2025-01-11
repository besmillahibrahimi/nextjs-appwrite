import { createClient } from "@/configs/appwrite/server";
import serverEnv from "@/configs/env/ServerEnv";
import { OAuthProvider } from "node-appwrite";

export async function GET() {
  const { account } = await createClient();
  const url = await account.createOAuth2Token(
    OAuthProvider.Google,
    serverEnv.auth.googleRedirectCallback,
    serverEnv.auth.googleRedirectCallback,
  );

  return Response.redirect(url);
}
