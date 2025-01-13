import { AlertMessage } from "@/components/alert-message/alert-message";
import { ForgotPasswordForm } from "./forgot-password-form";

export default async function ForgotPasswordPage({
  searchParams,
}: Readonly<{ searchParams: Promise<AlertMessage> }>) {
  const alert = await searchParams;
  return (
    <div>
      <ForgotPasswordForm />
      <AlertMessage className="mt-4" {...alert} />
    </div>
  );
}
