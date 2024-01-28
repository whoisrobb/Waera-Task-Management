import { useApp } from '@/components/AppProvider';
import { serverUrl } from '@/lib/utils';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

type Board = {
  BoardID: string;
  BoardName: string;
  Description: string | null;
  CreatorUserID: string | null;
  UserUserID: string | null;
  TeamTeamID: string | null;
  createdAt: string;
  updatedAt: string;
}

const Workspace = () => {
  const { user } = useApp();
  const [userBoards, setUserBoards] = useState<Board[] | null>(null);
  
  useEffect(() => {
    if (user) {
      fetchUserBoards();
    }
  }, [user])
  // console.log(user);

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
            <div className="flex">
            {userBoards?.map((board) => (
                <Link className='h-20 py-2 px-4 w-60 border text-muted-foreground hover:bg-secondary hover:text-accent-foreground' key={board.BoardID} to={`/workspace/boards/${board.BoardID}`}>
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