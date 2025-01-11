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
  className,
}: Readonly<AlertMessage & { className?: string }>) {
  if (useSonner) return null;

  if (!message || !type) return null;

  return (
    <Card className={className} variant={type}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{message}</CardDescription>
      </CardHeader>
    </Card>
  );
}
