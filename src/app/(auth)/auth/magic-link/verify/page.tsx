"use client";
import { AlertMessage } from "@/components/alert-message/alert-message";
import { redirect } from "next/navigation";
import { use, useEffect } from "react";
import { createSessionAction } from "../../sign-in/action";

export default function VerifyMagicLinkPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<AlertMessage & { secret: string; userId: string }>;
}>) {
  const alert = use(searchParams);

  const { secret, userId } = alert;

  if (!secret || !userId) {
    redirect("/auth/sign-in");
  }

  useEffect(() => {
    (async () => {
      await createSessionAction(userId, secret, "/auth/magic-link/verify");
      redirect("/");
    })();
  }, [secret, userId]);
  return (
    <div>
      <p>Logging to your account...</p>
      <AlertMessage className="mt-4" {...alert} />
    </div>
  );
}
