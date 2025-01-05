type MessageType = "error" | "warning" | "info" | "success";

type AlertMessage = {
  title?: React.ReactNode | null;
  message?: React.ReactNode | null;
  type?: MessageType | null;
  useSonner?: boolean;
};
