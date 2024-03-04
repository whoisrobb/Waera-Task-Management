import { useApp } from '@/components/AppProvider';
import { serverUrl } from '@/lib/utils';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BoardItem } from '@/lib/types';
import CreateBoard from '@/forms/CreateBoard';


const Workspace = () => {
  const { user } = useApp();
  const [userBoards, setUserBoards] = useState<BoardItem[] | null>(null);
  
  useEffect(() => {
    if (user) {
      fetchUserBoards();
    }
  }, [user])

  const fetchUserBoards = async () => {
      try {
          const response = await fetch(`${serverUrl}/user/boards/${user?.userId}`)
          const data = await response.json();
          setUserBoards(data);
      } catch (err) {
          console.error(err);
      }
  };
  return (
    <div className='px-4 py-2'>
      
      <div className="">
          {userBoards &&
          <>
            <p className="capitalize text-lg font-bold">personal boards</p>
            <div className="grid grid-cols-5 gap-2 mobile:grid-cols-2">
                <Popover>
                    <PopoverTrigger>
                      <button className='h-20 w-full py-2 px-4 bg-secondary text-muted-foreground hover:bg-secondary hover:text-accent-foreground'>
                        <p className="text-lg">create board</p>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <CreateBoard />
                    </PopoverContent>
                </Popover>
            {userBoards?.map((board) => (
                <Link className='h-20 py-2 px-4 border text-muted-foreground hover:bg-secondary hover:text-accent-foreground' key={board.BoardID} to={`/workspace/boards/${board.BoardID}`}>
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