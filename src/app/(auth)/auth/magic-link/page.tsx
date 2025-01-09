import { AlertMessage } from "@/components/alert-message/alert-message";
import { MagicLinkForm } from "./magic-link-form";

export default async function MagicLinkPage({
  searchParams,
}: Readonly<{ searchParams: Promise<AlertMessage> }>) {
  const alert = await searchParams;
  return (
    <div>
      <MagicLinkForm />
      <AlertMessage className="mt-4" {...alert} />
    </div>
  );
}
