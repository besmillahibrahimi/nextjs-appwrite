import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AlertMessage({
  message,
  type,
  title,
  useSonner,
}: Readonly<AlertMessage>) {
  if (useSonner) return null;

  if (!message || !type) return null;

  return (
    <Card className={"mb-4"} variant={type}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
    </Card>
  );
}
