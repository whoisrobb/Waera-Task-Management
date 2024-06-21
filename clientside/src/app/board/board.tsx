import BoardProvider, { useBoardStore } from "@/providers/board-provider";
import BoardHeader from "../_components/board-header";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Lists from "./lists";
import { Separator } from "@/components/ui/separator";

const Board = () => {
  const { boardId } = useParams();
  const { boardData, fetchData } = useBoardStore();

  useEffect(() => {
    fetchData();
  }, [boardData, boardId]);

  console.log(boardData)
  return (
    <BoardProvider>
      <div className="px-4 h-full space-y-2">
        <BoardHeader />
        <Separator />
        <div className='py-2 w-full h-full overflow-scroll'>
          <Lists />
        </div>
      </div>
    </BoardProvider>
  )
}

export default Board;