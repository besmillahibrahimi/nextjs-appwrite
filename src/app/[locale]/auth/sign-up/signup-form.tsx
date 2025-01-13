import { SubmitButton } from "@/components/submit-button";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { signUpAction } from "./action";

export function SignUpForm({
  className,
  ...props
}: Readonly<React.ComponentPropsWithoutRef<"div">>) {
  return (
    <div className={cn("min-w-96 flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Create an account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="e.g. Besmillah Ibrahimi"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="e.g. hi@ibrahimi.info"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <Input id="password" name="password" type="password" required />
              </div>
              <SubmitButton formAction={signUpAction} className="w-full">
                Get Started
              </SubmitButton>

              <Link
                href={"/auth/google"}
                className={buttonVariants({
                  className: "w-full",
                  variant: "outline",
                })}
              >
                Sign up with Google
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="underline underline-offset-4"
              >
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
