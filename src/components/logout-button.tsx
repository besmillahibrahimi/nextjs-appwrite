import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOutAction } from "@/app/(auth)/auth/_actions/auth.action";

export const LogoutButton = () => {
  return (
    <Button onClick={signOutAction}>
      <LogOut />
    </Button>
  );
};
