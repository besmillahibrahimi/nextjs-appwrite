"use server";

import { createClient } from "@/configs/appwrite/server";
import clientEnv from "@/configs/env";
import { encodedRedirect } from "@/lib/utils";
import { AppwriteException } from "appwrite";
import { startCase } from "lodash-es";
import { ID } from "node-appwrite";

export async function forgotPasswordAction(formData: FormData) {
  const { account } = await createClient();
  let alert: (AlertMessage & { path: string }) | null = null;
  const email = formData.get("email") as string;

  if (!email) {
    alert = {
      path: "/auth/magic-link",
      message: "Please enter your email",
      type: "warning",
      title: "Form not filled",
      useSonner: true,
    };
    encodedRedirect(alert);
    return;
  }

  try {
    await account.createMagicURLToken(
      ID.unique(),
      email,
      `${clientEnv.app.address}/auth/magic-link/verify`,
    );
    alert = {
      path: "/auth/magic-link",
      message:
        "The magic link sent to your email. Use it to login to your account.",
      type: "success",
      title: "Success",
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      alert = {
        path: "/auth/magic-link",
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
