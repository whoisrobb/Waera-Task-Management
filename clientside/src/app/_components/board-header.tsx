import BoardFilters from "./board-filters";
import { useBoardStore } from "@/providers/board-provider";
import DropdownOptions from "@/components/elements/dropdown-options";
import { deleteBoard } from "@/api/board";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/providers/user-provider";
import { useState } from "react";

const BoardHeader = () => {
    const { boardData } = useBoardStore();
    const { user } = useUser();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const deleteBoardItem = async () => {
        await deleteBoard(boardData?.boardId!);
        navigate(`/workspace/${user?.userId}`)
    }
    console.log(isOpen)
  return (
    boardData &&
    <div className="flex justify-between h-24 items-end">
        <div className="leading-tight">
            <h1 className="font-bold text-3xl">{boardData.name}</h1>
            <p className="text-muted-foreground">{boardData.description}</p>
        </div>
        <div className="flex items-center gap-4">
            <BoardFilters />
            {/* <DropdownDialog isOpen={isOpen} setIsOpen={setIsOpen} title="Edit Board Details">
                <CreateBoard />
            </DropdownDialog> */}
            <DropdownOptions actionFunc={deleteBoardItem} openModal={setIsOpen} />
        </div>
    </div>
  )
}

export default BoardHeader;