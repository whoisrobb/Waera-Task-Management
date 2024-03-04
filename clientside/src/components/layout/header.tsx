import { useEffect, useState } from "react";
import { ModeToggle } from "../themes/mode-toggle";
import { Input } from "../ui/input";
import SidebarSheet from "./sidebar-sheet";
import { JwtPayload } from "@/lib/types";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  
  useEffect(() => {
    const data = localStorage.getItem('accessToken');
    setUser(jwtDecode(data as string))
  }, []);

  return (
    <div className="flex items-center justify-between border-b p-2">
      <SidebarSheet />
      <div className="hidden lg:flex flex-col leading-tight">
        <p className="text-muted-foreground">Welcome</p>
        <p className="">{user?.firstName} {user?.lastName}</p>
      </div>
      <div className="">
        <Input className="" />
      </div>
      <ModeToggle />
    </div>
  )
}

export default Header;