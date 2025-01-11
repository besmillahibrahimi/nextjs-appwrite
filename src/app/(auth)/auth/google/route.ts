import { createClient } from "@/configs/appwrite/server";
import { OAuthProvider } from "node-appwrite";

export async function GET() {
  const { account } = await createClient();
  const url = await account.createOAuth2Token(
    OAuthProvider.Google,
    "/auth/google/callback",
    "/auth/google/callback",
  );

  return Response.redirect(url);
}
