import { sidebarNav } from "@/lib/side-bar";
import { JwtPayload } from "@/lib/types";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SidebarContent = () => {
    const { pathname } = useLocation();
    const [user, setUser] = useState<JwtPayload | null>(null);
    
    useEffect(() => {
      const data = localStorage.getItem('accessToken');
      setUser(jwtDecode(data as string))
    }, []);
  return (
    <div className="flex flex-col gap-4 px-2">
      {sidebarNav.map((nav, index) => (
        <div className="" key={index}>
          <h1 className="uppercase text-lg font-bold">{nav.name}</h1>
          <div className="flex flex-col">
            {nav.items.map((item, index) => (
              <Link to={item.title === 'workspace' ? `/workspace/${user?.userId}` : item.href} key={index} className={cn(
                "text-muted-foreground capitalize py-1 px-2 w-full ml-2 flex gap-2",
                pathname.includes(item.title) && 'text-primary font-bold bg-secondary'
              )}>{item.title}</Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default SidebarContent;