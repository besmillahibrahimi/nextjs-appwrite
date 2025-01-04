"use client";
import { forwardRef, ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "./ui/button";

type Props = Exclude<ButtonProps, "type"> & {
  inPending?: ReactNode;
};

export const SubmitButton = forwardRef<HTMLButtonElement, Props>(({ inPending, ...props }, ref) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" ref={ref} {...props}>
      {pending ? inPending ?? "Submitting..." : props.children}
    </Button>
  );
});
