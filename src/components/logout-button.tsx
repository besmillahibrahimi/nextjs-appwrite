import { signOutAction } from "@/app/[locale]/auth/_actions/auth.action";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

export const LogoutButton = () => {
  return (
    <Button onClick={signOutAction}>
      <LogOut />
    </Button>
  );
};
