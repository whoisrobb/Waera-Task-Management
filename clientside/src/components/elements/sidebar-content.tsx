import { sidebarNav } from "@/lib/side-bar";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useUser } from "@/providers/user-provider";

const SidebarContent = () => {
  const { pathname } = useLocation();
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-4 px-2 h-[calc(100vh-4rem)] justify-between">
      <div className="">
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
      
      <Button variant={'ghost'} className="space-x-2">
        <ExitIcon />
        <span>Log out</span>
      </Button>
    </div>
  )
}

export default SidebarContent;