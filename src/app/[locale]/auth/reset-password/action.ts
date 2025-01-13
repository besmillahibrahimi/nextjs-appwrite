"use server";

import { createClient } from "@/configs/appwrite/server";
import { encodedRedirect } from "@/lib/utils";
import { AppwriteException } from "appwrite";
import { startCase } from "lodash-es";

export async function resetPasswordAction(formData: FormData) {
  const { account } = await createClient();
  let alert:
    | (AlertMessage & { path: string; userId?: string; secret?: string })
    | null = null;

  const userId = formData.get("userId") as string;
  const secret = formData.get("secret") as string;
  const password = formData.get("password") as string;
  const passwordAgain = formData.get("passwordAgain") as string;

  if (!userId || !secret || !password || !passwordAgain) {
    alert = {
      path: "/auth/reset-password",
      message: "Please fill all the fields",
      type: "warning",
      title: "Form not filled",
      useSonner: true,
      secret,
      userId,
    };
    encodedRedirect(alert);
    return;
  }

  if (password !== passwordAgain) {
    alert = {
      path: "/auth/reset-password",
      message: "Passwords do not match",
      type: "warning",
      title: "Form not filled",
      useSonner: true,
      secret,
      userId,
    };
    encodedRedirect(alert);
    return;
  }

  try {
    await account.updateRecovery(userId, secret, password);
    alert = {
      path: "/auth/sign-in",
      message: "Password reset successfully",
      type: "success",
      title: "Success",
      useSonner: true,
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      alert = {
        path: "/auth/reset-password",
        message: error.message,
        type: "error",
        title: startCase(error.type),
        useSonner: true,
        secret,
        userId,
      };
    } else if (error instanceof Error) {
      alert = {
        path: "/auth/reset-password",
        message: "message" in error ? error.message : "Something went wrong",
        type: "error",
        title: startCase((error as AppwriteException).type ?? "Error"),
        secret,
        userId,
        useSonner: true,
      };
    } else {
      alert = {
        path: "/auth/reset-password",
        message: "Something went wrong",
        type: "error",
        title: "Error",
        secret,
        userId,
        useSonner: true,
      };
    }
  }

  encodedRedirect(alert);
}
