import CreateBoard from "@/components/forms/create-board";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BoardItem } from "@/lib/types";
import { fetchUserBoards } from "@/server-functions/board";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <div className="px-4 py-2">
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
                <Link className='h-20 py-2 px-4 border text-muted-foreground hover:bg-secondary hover:text-accent-foreground transition-colors' key={board.BoardID} to={`/workspace/boards/${board.BoardID}`}>
                  <p className="text-lg">{board.BoardName}</p>
                </Link>
            ))}
            </div>
          </>}
        </div>
    </div>
  )
}

export default Workspace