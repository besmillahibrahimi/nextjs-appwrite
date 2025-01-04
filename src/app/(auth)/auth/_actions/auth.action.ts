"use server";

import { account, ID } from "@/configs/appwrite/appwrite";
import { AppwriteException } from "appwrite";

export async function signUpAction(
  user: Pick<TUser, "email" | "name" | "password">,
) {
  return account.create(ID.unique(), user.email, user.password, user.name);
}

export async function signInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const res = await account.createEmailPasswordSession(email, password);
  } catch (err) {
    if (err instanceof AppwriteException) {
    }
    console.log(err);
    return err;
  }
}
