"use server";

import { account, ID } from "@/configs/appwrite/appwrite";
import { encodedRedirect } from "@/lib/utils";
import { AppwriteException } from "appwrite";

export async function signUpAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await account.create(ID.unique(), email, password, name);

    if (res) {
      encodedRedirect({
        path: "/auth/sign-in",
        message: "Account created successfully",
        type: "success",
        title: "Success",
        useSonner: true,
      });
    }
  } catch (error) {
    if (error instanceof AppwriteException) {
      encodedRedirect({
        path: "/auth/sign-up",
        message: error.message,
        type: "error",
        title: error.name,
        useSonner: true,
      });
      return;
    }

    encodedRedirect({
      path: "/auth/sign-up",
      message: "Something went wrong",
      type: "error",
      title: "Error",
      useSonner: true,
    });
  }
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await account.createEmailPasswordSession(email, password);
    console.log("----", res);
  } catch (err) {
    if (err instanceof AppwriteException) {
      encodedRedirect({
        path: "/auth/sign-in",
        message: err.message,
        type: "error",
        title: err.name,
      });
      return;
    }
    encodedRedirect({
      path: "/auth/sign-in",
      message: "Something went wrong",
      type: "error",
      title: "Error",
    });
  }
}
