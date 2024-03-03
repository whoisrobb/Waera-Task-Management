import CreateList from "@/components/forms/create-list";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BoardItem, JwtPayload, List } from "@/lib/types";
import { deleteBoard, fetchBoard } from "@/server-functions/board";
import { deleteList, fetchLists } from "@/server-functions/list";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<JwtPayload | null>(null);
  const [boardDetails, setBoardDetail] = useState<BoardItem | null>(null);
  const [lists, setLists] = useState<List[] | null>(null);
  
  useEffect(() => {
    getData();
    const data = localStorage.getItem('accessToken');
    setUserData(jwtDecode(data as string));
  }, [boardId])

  const getData = async () => {
    const [boardData, listsData] = await Promise.all([fetchBoard(boardId as string), fetchLists(boardId as string)]);
    setBoardDetail(boardData);
    setLists(listsData);
  }

  return (
    <div className='px-4 py-2 w-full h-full overflow-scroll'>
      <div className="border p-2 rounded flex justify-between items-baseline">
          <div className="leading-tight">
            <h1 className="font-bold">{boardDetails?.BoardName}</h1>
            <p className="text-muted-foreground">{boardDetails?.Description}</p>
          </div>
          <Popover>
              <PopoverTrigger>
                  <button className='w-6 h-6 transition-colors hover:bg-secondary rounded'>...</button>
              </PopoverTrigger>
              <PopoverContent className='w-48 p-2'>
                  <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground transition-colors'><div className="flex items-center gap-2">share board</div></button>
                  <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground transition-colors'><div className="flex items-center gap-2">create new list</div></button>
                  <button className='w-full text-left text-destructive py-1 px-2 capitalize rounded hover:bg-[#ff49492b] hover:text-destructive-foreground transition-colors' onClick={() => deleteBoard({ boardId: boardId as string, userId: userData?.userId as string, navigate})}><div className="flex items-center gap-2">delete board</div></button>
              </PopoverContent>
          </Popover>
      </div>

      {/* lists */}
        <div className="my-2 flex gap-2 items-start">
            {lists?.map((list) => (
                <div key={list.ListID} className="max-w-[17rem] min-w-[17rem] flex flex-col border p-2 rounded gap-2">
                    <div className=" rounded flex items-center justify-between px-2 py-1">
                        <p className="">{list.ListName}</p>
                        <div className="flex gap-1">
                            <Popover>
                                <PopoverTrigger>
                                  <button className='w-6 h-6 transition-colors hover:bg-secondary rounded'>+</button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    {/* <CreateCard listId={list.ListID} fetchLists={fetchLists} /> */}
                                </PopoverContent>
                            </Popover>

                            
                            <Popover>
                                <PopoverTrigger>
                                  <button className='w-6 h-6 transition-colors hover:bg-secondary rounded'>...</button>
                                </PopoverTrigger>
                                <PopoverContent className='w-48 p-2'>
                                    <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground transition-colors'>placeholder</button>
                                    <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground transition-colors'>placeholder</button>
                                    <button
                                      className='w-full text-left text-destructive py-1 px-2 capitalize rounded hover:bg-[#ff49492b] hover:text-destructive-foreground transition-colors'
                                      onClick={() => deleteList({ valueId: list.ListID, getData })}
                                    >delete list</button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {list.Cards.map((card) => (
                      <div
                        key={card.CardID}
                      >
                        {/* <CardItem
                            card={card}
                            deleteCard={deleteCard}
                            fetchLists={fetchLists}
                        /> */}
                      </div>
                    ))}
                </div>
            ))}

            <Popover>
                <PopoverTrigger>
                    <Button variant={'secondary'} className='w-[15rem] rounded-sm'>Create list</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <CreateList valueId={boardId as string} getData={getData} />
                </PopoverContent>
            </Popover>

        </div>
    </div>
  )
}

export default Board;