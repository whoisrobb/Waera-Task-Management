import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { serverUrl } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod"
import { cardSchema, listSchema } from '@/lib/validate';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DotsVerticalIcon, PlusIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';

type Board = {
    BoardID: string;
    BoardName: string;
    Description: string;
    TeamTeamID: any;
    UserUserID: string;
    createdAt: string;
    updatedAt: string;
}

type Card = {
    CardID: string;
    CardName: string;
    Checklists: any;
    Comments: any;
    Description: string | null;
    DueDate: string | null;
    Labels: any;
    ListListID: string;
    createdAt: string;
    updatedAt: string;
}

type List = {
    ListID: string;
    Cards: Card[] | [];
    BoardBoardID: string;
    ListName: string;
    createdAt: string;
    updatedAt: string;
}

type ListInput = z.infer<typeof listSchema>;

type CardInput = z.infer<typeof cardSchema>;

const Board = () => {
    const { boardId } = useParams();
    const listForm = useForm<ListInput>({
        resolver: zodResolver(listSchema),
        defaultValues: {
            listName: '',
        }
    });

    const [boardDetails, setBoardDetail] = useState<Board | null>(null);
    const [createList, setCreateList] = useState(false);
    const [createCard, setCreateCard] = useState({});
    const [listMenu, setListMenu] = useState({});
    const [lists, setLists] = useState<List[] | null>(null);
    const [listName, setListName] = useState('');
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
          const response = await fetch(`${serverUrl}/user/lists/create/${boardId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ listName })
          })
          .then((response) => {
            if (response.ok) {
              const data = response.json();
              fetchLists();
            }
          })
        } catch (err) {
          console.error(err);
        }
    };
    
    const handleCreateCard = async (cardName: string, listId: string) => {
        try {
          const response = await fetch(`${serverUrl}/user/cards/create/${listId}`, {
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
    
    const deleteCard = async (cardId: string) => {
        try {
            const response = await fetch(`${serverUrl}/user/cards/delete/${cardId}`, {
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

    console.log(lists);
  return (
    <div className='px-4 py-2 w-full overflow-x-scroll'>
        <div className="border p-2 rounded">
            <p className="">{boardDetails?.BoardName}</p>
        </div>
        <div className="my-2 flex gap-2 items-start">
            {/* lists */}
            {lists?.map((list) => (
                <div key={list.ListID} className="flex flex-col gap-2">
                    <div className="w-[15rem] border rounded flex items-center justify-between p-2">
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

                            <button className='p-1 hover:bg-secondary rounded'><DotsVerticalIcon /></button>
                        </div>
                    </div>
                    {list.Cards.map((card) => (
                      <div
                        key={card.CardID}
                        // onClick={() => {setCard(card); setCardTrue();}}
                      >
                        <CardItem
                            card={card}
                            deleteCard={deleteCard}
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


const CardItem = ({ card, deleteCard }: { card: Card; deleteCard: (cardId: string) => void }) => {
  return (
    <div className="border p-2 rounded">
        <div className="">
            <p className="">{card.CardName}</p>
        </div>
    </div>
  )
}