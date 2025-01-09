"use client";
import { redirect } from "next/navigation";
import { use, useEffect } from "react";
import { createSessionAction } from "../../sign-in/action";

export default function GoogleCallbackPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ secret: string; userId: string }> }>) {
  const { secret, userId } = use(searchParams);

  if (!secret || !userId) {
    redirect("/auth/sign-in");
  }
  useEffect(() => {
    (async () => {
      await createSessionAction(userId, secret, "/auth/google/callback");
      redirect("/");
    })();
  }, [secret, userId]);

  return <div>Logging in with google...</div>;
}
