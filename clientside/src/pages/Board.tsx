import CreateCard from "@/components/forms/create-card";
import CreateList from "@/components/forms/create-list";
import CardItem from "@/components/layout/card-item";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BoardItem, JwtPayload, List } from "@/lib/types";
import { deleteBoard, fetchBoard } from "@/server-functions/board";
import { deleteList, fetchFilteredLists } from "@/server-functions/list";
import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
    Select,
    SelectContent,
    // SelectGroup,
    SelectItem,
    // SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { handleUpdateDnd } from "@/server-functions/card";

const Board = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const DEFAULT_FILTERS = {
      order: "",
  };

  const [searchParams, setSearchParams] = useSearchParams(DEFAULT_FILTERS);
  const order = searchParams.get("order");

  const [userData, setUserData] = useState<JwtPayload | null>(null);
  const [boardDetails, setBoardDetail] = useState<BoardItem | null>(null);
  const [lists, setLists] = useState<List[] | null>(null);
  
  useEffect(() => {
    getData();
    const data = localStorage.getItem('accessToken');
    setUserData(jwtDecode(data as string));
  }, [boardId, order])

  const getData = async () => {
    const [boardData, listsData] = await Promise.all([fetchBoard(boardId as string), fetchFilteredLists({ valueId: boardId as string, order: order as string })]);
    setBoardDetail(boardData);
    setLists(listsData);
  }
  
  const handleOrder = (value: string) => {
    setSearchParams(prev => {
      prev.set("order", value)
      return prev
    })
  }

  const handleDragDrop = (result: any) => {
    const { source, destination } = result
    if (!lists) return

    const listSourceIndex = lists.findIndex((list) => list.ListID === source.droppableId)
    const listDestinationIndex = lists.findIndex((list) => list.ListID === destination.droppableId)

    const newSourceCards = [...lists[listSourceIndex].Cards]
    const newDestinationCards = source.droppableId !== destination.droppableId
      ? [...lists[listDestinationIndex].Cards]
      : newSourceCards
    
      const [removedCard] = newSourceCards.splice(source.index, 1)
      newDestinationCards.splice(destination.index, 0, removedCard)


      const newLists = [...lists]

      newLists[listSourceIndex] = {
        ...lists[listSourceIndex],
        Cards: newSourceCards
      }

      removedCard.ListListID = lists[listDestinationIndex].ListID
      handleUpdateDnd({ valueId: removedCard.CardID, listId: lists[listDestinationIndex].ListID })

      newLists[listDestinationIndex] = {
        ...lists[listDestinationIndex],
        Cards: newDestinationCards
      }

    setLists(newLists)
  }

  return (
    <div className='px-4 py-2 w-full h-full overflow-scroll'>
      <div className="border p-2 rounded flex justify-between items-baseline">
          <div className="leading-tight">
            <h1 className="font-bold">{boardDetails?.BoardName}</h1>
            <p className="text-muted-foreground">{boardDetails?.Description}</p>
          </div>
          <div className="flex items-center gap-4">
            <Select onValueChange={handleOrder}>
                <SelectTrigger className="">
                    <SelectValue placeholder="Filter Order:" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
            </Select>

            <Popover>
                <PopoverTrigger>
                    <button className='w-6 h-6 transition-colors hover:bg-secondary rounded flex justify-center items-center'><DotsVerticalIcon /></button>
                </PopoverTrigger>
                <PopoverContent className='w-48 p-2'>
                    <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground transition-colors'><div className="flex items-center gap-2">share board</div></button>
                    <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground transition-colors'><div className="flex items-center gap-2">create new list</div></button>
                    <button className='w-full text-left text-destructive py-1 px-2 capitalize rounded hover:bg-[#ff49492b] hover:text-destructive-foreground transition-colors' onClick={() => deleteBoard({ boardId: boardId as string, userId: userData?.userId as string, navigate})}><div className="flex items-center gap-2">delete board</div></button>
                </PopoverContent>
            </Popover>
          </div>
      </div>

      {/* lists */}
      <DragDropContext
        onDragEnd={handleDragDrop}
      >
        <div className="my-2 flex gap-2 items-start">
            {lists?.map((list) => (
                <div key={list.ListID} className="min-w-72 border p-2 rounded">
                  <Droppable droppableId={list.ListID}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        <div className="rounded flex items-center justify-between px-2 py-1">
                          <p className="">{list.ListName}</p>
                          <div className="flex gap-1">
                            <Popover>
                                <PopoverTrigger>
                                  <button className='w-6 h-6 transition-colors hover:bg-secondary rounded flex justify-center items-center'><PlusIcon /></button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <CreateCard valueId={list.ListID} getData={getData} />
                                </PopoverContent>
                            </Popover>
                            
                            <Popover>
                                <PopoverTrigger>
                                  <button className='w-6 h-6 transition-colors hover:bg-secondary rounded flex justify-center items-center'><DotsVerticalIcon /></button>
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
                        {list.Cards.map((card, index) => (
                          <Draggable draggableId={card.CardID} index={index} key={card.CardID}>
                            {(provided) => (
                            <div
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <CardItem
                                  card={card}
                                  getData={getData}
                              />
                            </div>)}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
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
        </DragDropContext>
    </div>
  )
}

export default Board;