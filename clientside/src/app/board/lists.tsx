import CreateCard from "@/components/forms/create-card";
import CreateList from "@/components/forms/create-list";
import CardItem from "@/components/elements/card-item";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { handleUpdateDnd } from "@/api/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { useParams } from "react-router-dom";
import { deleteList } from "@/api/list";
import { useBoardStore } from "@/providers/board-provider";
import DropdownOptions from "@/components/elements/dropdown-options";
import { useState } from "react";

const Lists = () => {
  const { boardId } = useParams();
  const { listsData, setListsData } = useBoardStore();
  const [isOpen, setIsOpen] = useState(false);
    
  const handleDragDrop = (result: any) => {
    const { source, destination } = result
    if (!listsData) return

    const listSourceIndex = listsData.findIndex((list) => list.listId === source.droppableId)
    const listDestinationIndex = listsData.findIndex((list) => list.listId === destination.droppableId)

    const newSourceCards = [...listsData[listSourceIndex].cards]
    const newDestinationCards = source.droppableId !== destination.droppableId
      ? [...listsData[listDestinationIndex].cards]
      : newSourceCards
    
      const [removedCard] = newSourceCards.splice(source.index, 1)
      newDestinationCards.splice(destination.index, 0, removedCard)


      const newLists = [...listsData]

      newLists[listSourceIndex] = {
        ...listsData[listSourceIndex],
        cards: newSourceCards
      }

      removedCard.listId = listsData[listDestinationIndex].listId
      handleUpdateDnd({ valueId: removedCard.cardId, listId: listsData[listDestinationIndex].listId })

      newLists[listDestinationIndex] = {
        ...listsData[listDestinationIndex],
        cards: newDestinationCards
      }

    setListsData(newLists)
  }
  
  const deleteListItem = async (listId: string) => {
    await deleteList({ valueId: listId });
  }
  return (
    listsData &&
    <DragDropContext
      onDragEnd={handleDragDrop}
    >
      <div className="my-2 flex gap-2 items-start">
        {listsData.map((list) => (
          <div key={list.listId} className="min-w-72 p-2 rounded-md shadow-inner border">
            <Droppable droppableId={list.listId}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  <div className="rounded flex items-center justify-between px-2 py-1">
                    <p className="uppercase text-xs text-muted-foreground">{list.name}</p>
                    <div className="flex gap-1">
                      <Popover>
                        <PopoverTrigger>
                          <Button variant={"ghost"} size={"icon"} className="size-6"><PlusIcon /></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <CreateCard valueId={list.listId} />
                        </PopoverContent>
                      </Popover>
                      
                      <DropdownOptions actionFunc={() => deleteListItem(list.listId)} openModal={setIsOpen} />
                    </div>
                  </div>
                  {list.cards.map((card, index) => (
                    <Draggable draggableId={card.cardId} index={index} key={card.cardId}>
                      {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <CardItem
                          card={card}
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
            <Button className='w-[15rem] rounded-sm'>Create list</Button>
          </PopoverTrigger>
          <PopoverContent>
            <CreateList valueId={boardId as string} />
          </PopoverContent>
        </Popover>
      </div>
    </DragDropContext>
  )
}

export default Lists
