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
import { resetPasswordAction } from "./action";

export function ResetPasswordForm({
  expire,
  secret,
  userId,
}: Readonly<{
  userId: string;
  secret: string;
  expire: string;
}>) {
  return (
    <div className={"w-full flex flex-col gap-6"}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Type your new password below to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Input type="hidden" name="userId" defaultValue={userId} required />
            <Input type="hidden" name="secret" defaultValue={secret} required />
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  minLength={8}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeatPassword">Repeat Password</Label>
                <Input
                  id="repeatPassword"
                  type="password"
                  name="passwordAgain"
                  required
                  minLength={8}
                />
              </div>

              <SubmitButton
                formAction={resetPasswordAction}
                type="submit"
                className="w-full"
              >
                Submit
              </SubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
