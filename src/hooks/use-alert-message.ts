"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useAlertMessage(
  shouldDisplay = true,
): AlertMessage & { useSonner: boolean } {
  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const type = searchParams.get("type") as MessageType;
  const title = searchParams.get("title");
  const useSonner = searchParams.get("useSonner");

  useEffect(() => {
    if (shouldDisplay && useSonner === "true" && message && type) {
      setTimeout(() => {
        // make the component is rendered
        toast[type](title ?? message, {
          description: title ? message : null,
        });
      }, 700);
    }
  }, [shouldDisplay, message, type, title, useSonner]);

  return { message, type, title, useSonner: useSonner === "true" };
}
