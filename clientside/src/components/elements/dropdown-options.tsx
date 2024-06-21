import { DotsVerticalIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { useBoardStore } from "@/providers/board-provider";

type DropdownOptionsProps = {
    openModal: Dispatch<SetStateAction<boolean>>;
    actionFunc: () => void;
}

const DropdownOptions = ({ openModal, actionFunc }: DropdownOptionsProps) => {
    const { fetchData } = useBoardStore();
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant={'ghost'} size={"icon"} className='size-6'>
            <DotsVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem className="space-x-2 cursor-pointer" onClick={() => openModal((prev) => !prev)}>
                <Pencil2Icon />
                <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="space-x-2 cursor-pointer" onClick={() => { actionFunc(); fetchData() }}>
                <TrashIcon />
                <span>Delete</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownOptions;

/*
    modal state func
    title
    subtitle
*/