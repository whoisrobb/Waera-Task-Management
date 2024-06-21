import CreateBoard from "@/components/forms/create-board";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BoardItem } from "@/lib/types";
import { fetchUserBoards } from "@/api/board";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WorkspaceHeader from "../_components/workspace-header";
import { Separator } from "@/components/ui/separator";

const Workspace = () => {
  const { userId } = useParams();
  const [userBoards, setUserBoards] = useState<BoardItem[] | null>(null);

  useEffect(() => {
    fetchBoards();
  }, []);
  
  const fetchBoards = async () => {
    const data = await fetchUserBoards(userId as string);
    setUserBoards(data);
  }

  return (
    <div className="px-4 py-2 space-y-4">
      <WorkspaceHeader />
      <Separator />
      
      <div className="">
          {userBoards &&
          <>
            <p className="capitalize text-lg font-bold">personal boards</p>
            <div className="grid lg:grid-cols-5 gap-2 md:grid-cols-4 grid-cols-2">
                <Popover>
                    <PopoverTrigger>
                      <Button variant={'secondary'} className='h-20 w-full rounded-none text-lg'>
                        Create Board
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <CreateBoard />
                    </PopoverContent>
                </Popover>
            {userBoards?.map((board) => (
                <Link className='h-20 py-2 px-4 border text-muted-foreground hover:bg-secondary hover:text-accent-foreground transition-colors' key={board.boardId} to={`/workspace/boards/${board.boardId}`}>
                  <p className="text-lg">{board.name}</p>
                </Link>
            ))}
            </div>
          </>}
        </div>
    </div>
  )
}

export default Workspace