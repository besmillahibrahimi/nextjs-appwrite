"use server";

import { createClient } from "@/configs/appwrite/server";
import serverEnv from "@/configs/env/ServerEnv";
import { getEnvironment } from "@/configs/env/utils";
import { encodedRedirect } from "@/lib/utils";
import { AppwriteException } from "appwrite";
import { startCase } from "lodash-es";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type Models, OAuthProvider } from "node-appwrite";

export async function setSessionCookie(session: Models.Session) {
  const cookieStore = await cookies();
  cookieStore.set(serverEnv.auth.authCookieName, session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: !getEnvironment().isDevMode,
    expires: new Date(session.expire),
  });
}

export async function createSessionAction(
  userId: string,
  secret: string,
  url: string,
) {
  let alert: (AlertMessage & { path: string }) | null = null;

  try {
    const { account } = await createClient();
    const session = await account.createSession(userId, secret);
    await setSessionCookie(session);
    alert = {
      path: "/",
      message: "Logged in successfully",
      type: "success",
      title: "Success",
      useSonner: true,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      alert = {
        path: url,
        message: error.message,
        type: "error",
        title: startCase(error.type),
        useSonner: true,
      };
    } else if (error instanceof Error) {
      alert = {
        path: url,
        message: "message" in error ? error.message : "Something went wrong",
        type: "error",
        title: "Error",

        useSonner: true,
      };
    } else {
      alert = {
        path: url,
        message: "Something went wrong",
        type: "error",
        title: "Error",

        useSonner: true,
      };
    }
  }

  encodedRedirect(alert);
}

export async function signInAction(formData: FormData) {
  let alert: (AlertMessage & { path: string }) | null = null;
  const { account } = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    alert = {
      path: "/auth/sign-in",
      message: "Please fill all the fields",
      type: "warning",
      title: "Form not filled",
      useSonner: true,
    };
    encodedRedirect(alert);
    return;
  }

  try {
    // don't call redirect in try context.
    const session = await account.createEmailPasswordSession(email, password);

    await setSessionCookie(session);
    alert = {
      path: "/",
      message: "Logged in successfully",
      type: "success",
      title: "Success",
      useSonner: true,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      alert = {
        path: "/auth/sign-in",
        message: error.message,
        type: "error",
        title: startCase(error.type),
        useSonner: true,
      };
    } else if (error instanceof Error) {
      alert = {
        path: "/auth/reset-password",
        message: "message" in error ? error.message : "Something went wrong",
        type: "error",
        title: "Error",

        useSonner: true,
      };
    } else {
      alert = {
        path: "/auth/reset-password",
        message: "Something went wrong",
        type: "error",
        title: "Error",

        useSonner: true,
      };
    }
  }

  encodedRedirect(alert);
}

export async function googleSignInAction() {
  const { account } = await createClient();
  const url = await account.createOAuth2Token(
    OAuthProvider.Google,
    serverEnv.auth.googleRedirectCallback,
    serverEnv.auth.googleRedirectCallback,
  );
  redirect(url);
}
