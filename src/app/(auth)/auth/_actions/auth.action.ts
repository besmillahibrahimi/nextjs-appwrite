"use server";

import { createClient } from "@/configs/appwrite/server";
import { ID } from "@/configs/appwrite/client";
import clientEnv from "@/configs/env/ClientEnv";
import { type EncodedRedirect, encodedRedirect } from "@/lib/utils";
import { AppwriteException } from "appwrite";
import { startCase } from "lodash-es";
import { cookies } from "next/headers";

export async function signUpAction(formData: FormData) {
  let alert: EncodedRedirect | null = null;

  const { account } = await createClient();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    encodedRedirect({
      path: "/auth/sign-up",
      message: "Please fill all the fields",
      type: "warning",
      title: "Form not filled",
      useSonner: true,
    });
    return;
  }

  try {
    await account.create(ID.unique(), email, password, name);

    alert = {
      path: "/auth/sign-in",
      message: "Account created successfully",
      type: "success",
      title: "Success",
      useSonner: true,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      alert = {
        path: "/auth/sign-up",
        message: error.message,
        type: "error",
        title: startCase(error.type),
        useSonner: true,
      };
    } else {
      alert = {
        path: "/auth/sign-up",
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
    console.log("logged in", session);
    const cookieStore = await cookies();
    cookieStore.set(clientEnv.app.authCookieName, session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

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
    } else {
      console.log("error", error);
      alert = {
        path: "/auth/sign-in",
        message: "Something went wrong",
        type: "error",
        title: "Error",
        useSonner: true,
      };
    }
  }

  encodedRedirect(alert);
}
