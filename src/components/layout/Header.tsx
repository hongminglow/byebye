import { Button } from "@/components/ui/button/Button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";
import { AppBar } from "./AppBar";

export const Header = () => {
  return (
    <header className="flex gap-4 px-25 py-6 items-center justify-center">
      <AppBar />

      {/* <div className="flex items-center space-x-4">
      <IconThemeToggle />
    </div> */}
      <div className="ml-auto ">
        <LogoutButton />
      </div>
    </header>
  );
};

const LogoutButton = () => {
  const logout = useLogout();
  const handleLogout = () => logout.mutate();

  return (
    <Button onClick={handleLogout}>
      <LogOut />
      Log Out
    </Button>
  );
};
