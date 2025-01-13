import { SubmitButton } from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forgotPasswordAction } from "./action";

export function ForgotPasswordForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className={cn("w-full flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. name@domain.com"
                  required
                />
              </div>

              <SubmitButton
                formAction={forgotPasswordAction}
                type="submit"
                className="w-full"
              >
                Submit
              </SubmitButton>
            </div>
            <div className="mt-4 text-center text-sm">
              If you remember password just{" "}
              <Link
                href="/auth/sign-in"
                className="underline underline-offset-4"
              >
                log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
