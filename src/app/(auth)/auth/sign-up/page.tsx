import { AlertMessage } from "@/components/alert-message/alert-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { signUpAction } from "../_actions/auth.action";

export default async function SignUpPage(
  props: Readonly<PagePropsWithAlertMessage>,
) {
  const searchParams = await props.searchParams;
  return (
    <div>
      <form className="flex flex-col space-y-3 items-center">
        <Input type="text" name="name" required placeholder="Name" />
        <Input
          type="email"
          name="email"
          required
          placeholder="Email"
          autoComplete="username"
        />
        <Input
          type="password"
          name="password"
          required
          placeholder="Password"
          autoComplete="current-password"
        />
        <SubmitButton formAction={signUpAction} type="submit">
          Get Started
        </SubmitButton>
        <AlertMessage {...searchParams} />
      </form>
    </div>
  );
}
