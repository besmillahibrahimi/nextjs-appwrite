"use client";

import { useSearchParams } from "next/navigation";

export function useAlertMessage(): AlertMessage {
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const title = searchParams.get("title");
  const type = searchParams.get("type") as MessageType | null;

  return { message, type, title };
}
