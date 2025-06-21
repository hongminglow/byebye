import { Button } from "@/components/ui/button/Button";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";

export const Header = () => (
  <div className="flex gap-4 px-3 py-2">
    {/* <div className="flex items-center space-x-4">
      <IconThemeToggle />
    </div> */}
    <div className="ml-auto ">
      <LogoutButton />
    </div>
  </div>
);

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
