"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function useAlertMessage(
  shouldDisplay = true,
): AlertMessage & { useSonner: boolean } {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get("message");
  const type = (searchParams.get("type") as MessageType) ?? "info";
  const title = searchParams.get("title");
  const useSonner = searchParams.get("useSonner");

  useEffect(() => {
    if (shouldDisplay && useSonner === "true" && message) {
      setTimeout(() => {
        toast[type](title ?? message, {
          description: title ? message : null,

          onAutoClose() {
            // Remove the alert message from the query parameters
            console.log("onDismiss");
            const params = new URLSearchParams(window.location.search);
            params.delete("message");
            params.delete("type");
            params.delete("title");
            params.delete("useSonner");

            router.replace(`?${params.toString()}`);
          },
        });
      }, 700);
    }
  }, [shouldDisplay, message, type, title, useSonner, router.replace]);

  return { message, type, title, useSonner: useSonner === "true" };
}
