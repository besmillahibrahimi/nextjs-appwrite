"use server";

import { createClient } from "@/configs/appwrite/server";
import clientEnv from "@/configs/env/ClientEnv";
import { encodedRedirect } from "@/lib/utils";
import { AppwriteException } from "appwrite";
import { startCase } from "lodash-es";

export async function forgotPasswordAction(formData: FormData) {
  const { account } = await createClient();
  let alert: (AlertMessage & { path: string }) | null = null;
  const email = formData.get("email") as string;

  if (!email) {
    alert = {
      path: "/auth/forgot-password",
      message: "Please enter your email",
      type: "warning",
      title: "Form not filled",
      useSonner: true,
    };
    encodedRedirect(alert);
    return;
  }

  try {
    await account.createRecovery(
      email,
      `${clientEnv.app.address}/auth/reset-password`,
    );
    alert = {
      path: "/auth/forgot-password",
      message: "Password recovery email sent",
      type: "success",
      title: "Success",
    };
  } catch (error) {
    console.log("forgot", error);
    if (error instanceof AppwriteException) {
      alert = {
        path: "/auth/forgot-password",
        message: error.message,
        type: "error",
        title: startCase(error.type),
        useSonner: true,
      };
    } else {
      alert = {
        path: "/auth/forgot-password",
        message: "Something went wrong",
        type: "error",
        title: "Error",
        useSonner: true,
      };
    }
  }

  encodedRedirect(alert);
}
