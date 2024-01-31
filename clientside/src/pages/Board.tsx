import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { backgroundColor, formatDate, serverUrl } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod"
import { listSchema } from '@/lib/validate';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ClockIcon, DotsVerticalIcon, PlusIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    // DialogFooter,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import 'react-quill/dist/quill.snow.css'
import CustomCheckbox from '@/components/checkbox/CustomCheckbox';
import ActiveCard from '@/components/ActiveCard';
import { BoardItem, Card, Checklist, LabelItem, List } from '@/lib/types';


type ListInput = z.infer<typeof listSchema>;

const Board = () => {
    const { boardId } = useParams();
    const listForm = useForm<ListInput>({
        resolver: zodResolver(listSchema),
        defaultValues: {
            listName: '',
        }
    });

    const [boardDetails, setBoardDetail] = useState<BoardItem | null>(null);
    const [lists, setLists] = useState<List[] | null>(null);
    // const [listName, setListName] = useState('');
    const [cardName, setCardName] = useState('');

    useEffect(() => {
      fetchBoard();
      fetchLists();
    }, [boardId])

    const fetchBoard = async () => {
      try {
        const response = await fetch(`${serverUrl}/user/boards/board/${boardId}`);
        const data = await response.json();
        setBoardDetail(data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchLists = async () => {
      try {
        const response = await fetch(`${serverUrl}/user/lists/${boardId}`);
        const data = await response.json();
        setLists(data);
      } catch (err) {
        console.error(err);
      }
    };

    const onListSubmit = (values: ListInput) => {
        handleCreateList(values.listName);
    };

    const onCardSubmit = (listId: string) => {
        handleCreateCard(cardName, listId);
    };

    const handleCreateList = async (listName: string) => {
        try {
          await fetch(`${serverUrl}/user/lists/create/${boardId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ listName })
          })
          .then((response) => {
            if (response.ok) {
            //   const data = response.json();
              fetchLists();
            }
          })
        } catch (err) {
          console.error(err);
        }
    };
    
    const handleCreateCard = async (cardName: string, listId: string) => {
        try {
          await fetch(`${serverUrl}/user/cards/create/${listId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardName })
          })
          .then((response) => {
            if (response.ok) {
              fetchLists();
            }
          })
        } catch (err) {
          console.error(err);
        }
    };

    const deleteList = async (listId: string) => {
        try {
            await fetch(`${serverUrl}/user/lists/delete/${listId}`, {
                method: 'DELETE'
            })
            .then((response) => {
                if (response.ok) {
                    fetchLists() 
                }
            })
        } catch (err) {
            console.error(err);
        }
    };

    const deleteCard = async (cardId: string) => {
        try {
            await fetch(`${serverUrl}/user/cards/delete/${cardId}`, {
                method: 'DELETE'
            })
            .then((response) => {
                if (response.ok) {
                    fetchLists();
                }
            })
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <div className='px-4 py-2 w-full h-full overflow-scroll'>
        <div className="border p-2 rounded">
            <p className="">{boardDetails?.BoardName}</p>
        </div>
        <div className="my-2 flex gap-2 items-start">
            {/* lists */}
            {lists?.map((list) => (
                <div key={list.ListID} className="max-w-[17rem] min-w-[17rem] flex flex-col border p-2 rounded gap-2">
                    <div className=" rounded flex items-center justify-between px-2 py-1">
                        <p className="">{list.ListName}</p>
                        <div className="flex gap-1">
                            <Popover>
                                <PopoverTrigger>
                                    <button className='p-1 hover:bg-secondary rounded'><PlusIcon /></button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <form onSubmit={(e) => {e.preventDefault(); onCardSubmit(list.ListID);}}>
                                        <Label>Create new card</Label>
                                        <Input className='my-2' value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder='Card Name' />
                                        <Button>Submit</Button>
                                    </form>
                                </PopoverContent>
                            </Popover>

                            
                            <Popover>
                                <PopoverTrigger>
                                    <button className='p-1 hover:bg-secondary rounded'><DotsVerticalIcon /></button>
                                </PopoverTrigger>
                                <PopoverContent className='w-48 p-2'>
                                    <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground'>placeholder</button>
                                    <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground'>placeholder</button>
                                    <button className='w-full text-left text-destructive py-1 px-2 capitalize rounded hover:bg-[#ff49492b]' onClick={() => deleteList(list.ListID)}>delete list</button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {list.Cards.map((card) => (
                      <div
                        key={card.CardID}
                      >
                        <CardItem
                            card={card}
                            deleteCard={deleteCard}
                            fetchLists={fetchLists}
                        />
                      </div>
                    ))}
                </div>
            ))}

            <Popover>
                <PopoverTrigger>
                    <Button variant={'secondary'} className='w-[15rem]'>Create list</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Form {...listForm}>
                        <form onSubmit={listForm.handleSubmit(onListSubmit)} className="space-y-2">
    
                            <FormField
                                control={listForm.control}
                                name="listName"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Create a new list</FormLabel>
                                    <FormControl>
                                        <Input placeholder="List name" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </PopoverContent>
            </Popover>

        </div>
    </div>
  )
}

export default Board


const CardItem = ({ card, deleteCard, fetchLists }: { card: Card; deleteCard: (cardId: string) => void; fetchLists: () => void }) => {
    const [color, setColor] = useState<string | null>(null);
    
    const bgStyles = {
        background: `linear-gradient(180deg, rgba(${color}, 0.15), rgba(${color}, .05))`
    };

    const bgClr = () => {
        const color = backgroundColor();
        setColor(color)
    };
    
    useEffect(() => {
        bgClr()
    }, [])

  return (
        <Dialog>
            <div style={bgStyles} className="border rounded py-2">

                <div className="flex px-2 justify-between">
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold">{card.CardName}</p>
                                {/* <Checkbox /> */}
                    </div>
                    
                    <Popover>
                        <PopoverTrigger>
                            <button className='p-1 hover:bg-secondary rounded'><DotsVerticalIcon /></button>
                        </PopoverTrigger>
                        <PopoverContent className='w-48 p-2'>
                            <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground' onClick={bgClr}>change color</button>
                            <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground'>placeholder</button>
                            <button className='w-full text-left text-destructive py-1 px-2 capitalize rounded hover:bg-[#ff49492b]' onClick={() => deleteCard(card.CardID)}>delete card</button>
                        </PopoverContent>
                    </Popover>
                </div>
            <DialogTrigger asChild>
                <button className="w-full text-left p-2 flex flex-col gap-2">
                    {/* labels */}
                    {card.Labels.length >= 1 &&
                    <div className="w-full flex flex-wrap gap-1">
                        {card.Labels.map((cardLabel: LabelItem) => (
                            <div className="" key={cardLabel.LabelID}>
                                <div className=""
                                >
                                    <p className='text-sm bg-background py-1 px-2 rounded-md' style={{ color: `#${cardLabel.Color}` }}>{cardLabel.LabelName}</p>
                                </div>
                            </div>
                        ))}
                    </div>}

                    {/* Dates */}
                    {card.DueDate &&
                    <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                        <ClockIcon />
                        {formatDate(card.createdAt)} - {formatDate(card.DueDate)}
                    </p>}
                    
                    {/* description */}
                    {card.Description &&
                    <div className="">
                        <div className='text-muted-foreground leading-tight' dangerouslySetInnerHTML={{ __html: card.Description }}/>
                    </div>}

                    {/* checklists */}
                    {card.Checklists.map((checklist: Checklist, index: number) => (
                    <div className="" key={index}>
                        <p>{checklist.ChecklistName}</p>
                        {card.Checklists &&
                        <ul>
                        {checklist.ChecklistItems.map((item, index) => (
                            <li key={index} className='ml-4'>
                                <div className="text-muted-foreground flex gap-2">
                                    <CustomCheckbox complete={item.ItemComplete} color={color} />
                                    <p className="">{item.ChecklistItemText}</p>
                                </div>
                            </li>
                        ))}
                        </ul>}
                    </div>
                    ))}
                </button>
            </DialogTrigger>
            <DialogContent
                // className="sm:max-w-[425px]"
                className=" max-h-[90vh] overflow-y-scroll scrollbar-hide mobile:max-w-screen"
            >
                <ActiveCard
                    card={card}
                    deleteCard={deleteCard}
                    fetchLists={fetchLists}
                />
            </DialogContent>
            </div>
        </Dialog>
  )
}