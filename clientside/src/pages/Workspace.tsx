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
        <p className="capitalize text-lg font-bold">personal boards</p>
        {userBoards &&
            userBoards.map((board) => (
                <Link key={board.BoardID} to={`/workspace/boards/${board.BoardID}`}>
                  <p className="">{board.BoardName}</p>
                </Link>
            ))
        }
      </div>

      <div className="">
        <p className="capitalize text-lg font-bold">team boards</p>
      </div>
    </div>
  )
}

export default Workspace