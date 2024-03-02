import {
    Sheet,
    SheetContent,
    // SheetDescription,
    SheetHeader,
    // SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { BookOpen } from "lucide-react";
import SidebarContent from "./sidebar-content";
import SidebarHeader from "./sidebar-header";

const SidebarSheet = () => {
  return (
    <div className="lg:hidden">
        <Sheet>
            <SheetTrigger>
                <Button variant={'outline'} size={'icon'}><BookOpen /></Button>
            </SheetTrigger>
            <SheetContent side={'left'}>
                <SheetHeader>
                    <SidebarHeader />
                </SheetHeader>
                <SidebarContent />
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default SidebarSheet