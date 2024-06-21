import { Dialog, DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

type DropdownDialog = {
    title: string;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}

const DropdownDialog = ({ title, children, isOpen, setIsOpen }: DropdownDialog) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                {children}
            </DialogDescription>
        </DialogHeader>
    </Dialog>
  )
}

export default DropdownDialog
