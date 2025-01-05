import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { signInAction } from "../_actions/auth.action";
import { AlertMessage } from "@/components/alert-message/alert-message";

export default async function SignInPage(
  props: Readonly<PagePropsWithAlertMessage>,
) {
  const searchParams = await props.searchParams;
  return (
    <div>
      <form className="flex flex-col space-y-3 items-center">
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
          autoComplete="current-user"
        />
        <SubmitButton formAction={signInAction} type="submit">
          Submit
        </SubmitButton>
        <AlertMessage {...searchParams} />
      </form>
    </div>
  );
}
