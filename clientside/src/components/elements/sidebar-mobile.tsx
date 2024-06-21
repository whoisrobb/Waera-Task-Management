import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '../ui/button'
import { ExitIcon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useSidebarStore } from '@/store/sidebar-store';
import { useUserStore } from '@/store/user-store';
import { cn } from '@/lib/utils';
import NavHeader from './nav-header';
import { Link, useLocation } from "react-router-dom";


const SidebarMobile = () => {
  const { sheetIsOpen, sheetOpenChange } = useSidebarStore((state) => state)
  return (
    <Sheet onOpenChange={sheetOpenChange} open={sheetIsOpen}>
      <SheetTrigger asChild className='lg:hidden'>
        <Button variant={"outline"} size={"icon"}><HamburgerMenuIcon /></Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle>
            <NavHeader />
          </SheetTitle>
          <SheetDescription>
            <SidebarContent />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>  
  )
}

export default SidebarMobile;


const SidebarContent = () => {
  const { pathname } = useLocation();
  const user = useUserStore((state) => state.userData);
  const { navItems, sheetOpenChange } = useSidebarStore((state) => state);    
return (
  <div className="flex flex-col gap-4 px-2">
    {navItems.map((nav, index) => (
      <div className="" key={index}>
        <h1 className="uppercase text-lg font-bold">{nav.name}</h1>
        <div className="flex flex-col">
          {nav.items.map((item, index) => (
              <Link
                onClick={sheetOpenChange}
                to={item.title === 'workspace' ? `/workspace/${user?.userId}` : item.href} key={index} className={cn(
                  "text-muted-foreground capitalize py-1 px-2 w-full ml-2 flex gap-2",
                  pathname.includes(item.title) && 'text-primary font-bold bg-secondary'
              )}>{item.title}</Link>
          ))}
        </div>
      </div>
    ))}
      <Button variant={'ghost'} className="space-x-2">
          <ExitIcon />
          <span>Log out</span>
      </Button>
  </div>
)
}