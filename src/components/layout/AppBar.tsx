import { Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { TRoleType } from "@/types/auth";
import { IconInput } from "@/components/ui/input/IconInput";
import { Link } from "react-router-dom";
import { publicRoutes } from "@/types/routes";
import { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import { useDebounce } from "@uidotdev/usehooks";
import MainLogo from "@/assets/images/main-logo.png";

const Logo = () => (
  <Link to={publicRoutes.DASHBOARD} className="flex items-center space-x-2">
    <img
      src={MainLogo}
      alt="main-logo"
      className="w-25 h-12 object-contain"
      width={100}
      height={32}
    />
  </Link>
);

const NavMenu = () => (
  <nav className="px-10 py-3 min-w-max">
    <ul className="flex items-center gap-6">
      <li>Shop</li>
      <li>On Sale</li>
      <li>New Arrivals</li>
      <li>Brands</li>
    </ul>
  </nav>
);

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
    clearOnDefault: true,
  });
  const [inputVal, setInputVal] = useState(searchQuery || "");
  const debouncedInputValue = useDebounce(inputVal, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  useEffect(() => {
    if (debouncedInputValue !== searchQuery) {
      setSearchQuery(debouncedInputValue);
    }
  }, [searchQuery, debouncedInputValue]);

  // Update input value by default
  useEffect(() => {
    if (searchQuery !== inputVal) setInputVal(searchQuery);
  }, [searchQuery]);

  return (
    <IconInput
      value={inputVal}
      className="rounded-3xl"
      inputClassName="max-w-none border-0 focus-visible:ring-0 py-3"
      placeholder="Search for products..."
      onChange={handleInputChange}
      startIcon={<Search className="h-4 w-4" />}
    />
  );
};

const AdminAppBar = () => {
  return (
    <>
      <Logo />
      <NavMenu />
      <SearchInput />
    </>
  );
};

const UserAppBar = () => {
  return (
    <>
      <Logo />
      <NavMenu />
    </>
  );
};

export const AppBar = () => {
  const user = useAuthStore((store) => store.user);

  if (user?.roles.some((role) => role.name === TRoleType.ADMIN))
    return <AdminAppBar />;
  return <UserAppBar />;
};
