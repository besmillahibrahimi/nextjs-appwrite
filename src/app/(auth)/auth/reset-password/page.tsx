import { AlertMessage } from "@/components/alert-message/alert-message";
import { ResetPasswordForm } from "./reset-password-form";

export default async function ResetPasswordPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<
    Partial<AlertMessage> & { userId: string; secret: string; expire: string }
  >;
}>) {
  const query = await searchParams;
  return (
    <div>
      <ResetPasswordForm {...query} />
      {"type" in query && <AlertMessage className="mt-4" {...query} />}
    </div>
  );
}
