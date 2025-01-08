"use client";
import { redirect } from "next/navigation";
import { use, useEffect } from "react";
import { createSessionAction } from "../sign-in/action";

export default function GoogleCallbackPage({
  searchParams,
}: Readonly<{ searchParams: Promise<{ secret: string; userId: string }> }>) {
  const { secret, userId } = use(searchParams);
  useEffect(() => {
    (async () => {
      await createSessionAction(userId, secret);
      redirect("/");
    })();
  }, [secret, userId]);

  return <div>Logging in with google...</div>;
}
