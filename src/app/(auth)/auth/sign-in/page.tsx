"use client";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signInAction } from "../_actions/auth.action";

export default function SignInPage() {
  const login = (values: any) => {};

  return (
    <div>
      <form>
        <Input type="email" name="email" required />
        <Input type="password" name="password" required />
        <SubmitButton formAction={signInAction} type="submit">
          Submit
        </SubmitButton>
      </form>
    </div>
  );
}
