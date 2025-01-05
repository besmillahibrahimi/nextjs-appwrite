"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          error:
            "group-[.toaster]:bg-destructive/50 group-[.toaster]:border-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:hover:bg-destructive/50 group-[.toast]:text-destructive-foreground/70",
          warning:
            "group-[.toaster]:bg-yellow-100 group-[.toaster]:border-yellow-400 group-[.toaster]:text-yellow-700",
          info: "group-[.toaster]:bg-blue-100 group-[.toaster]:border-blue-400 group-[.toaster]:text-blue-700",
          success:
            "group-[.toaster]:bg-green-100 group-[.toaster]:border-green-400 group-[.toaster]:text-green-700",
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
