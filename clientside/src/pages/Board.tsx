import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { backgroundColor, randomColor, serverUrl } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod"
import { listSchema } from '@/lib/validate';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BookmarkIcon, CheckCircledIcon, ClockIcon, Cross2Icon, DotsVerticalIcon, Pencil2Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    // DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import ReactQuill from 'react-quill'
  import 'react-quill/dist/quill.snow.css'
import { Checkbox } from '@nextui-org/react';
import CustomCheckbox from '@/components/checkbox/CustomCheckbox';

type Board = {
    BoardID: string;
    BoardName: string;
    Description: string;
    TeamTeamID: any;
    UserUserID: string;
    createdAt: string;
    updatedAt: string;
}

type ChecklistItem = {
    // ChecklistItemID: string;
    ChecklistItemText: string;
    ItemComplete: Boolean;
    // createdAt: string;
    // updatedAt: string;
}

type Checklist = {
    ChecklistID: string;
    ChecklistName: string;
    // CardCardID: string;
    ChecklistItems: ChecklistItem[];
    // createdAt: string;
    // updatedAt: string;
}

type CardLabel = {
    CardCardID: string;
    LabelLabelID: string;
    createdAt: string;
    updatedAt: string;
}

type Label = {
    CardLabels: CardLabel[];
    Color: string;
    LabelID: string;
    LabelName: string;
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

const Board = () => {
    const { boardId } = useParams();
    const listForm = useForm<ListInput>({
        resolver: zodResolver(listSchema),
        defaultValues: {
            listName: '',
        }
    });

    const [boardDetails, setBoardDetail] = useState<Board | null>(null);
    // const [createList, setCreateList] = useState(false);
    // const [createCard, setCreateCard] = useState({});
    // const [listMenu, setListMenu] = useState({});
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
          const response = await fetch(`${serverUrl}/user/lists/create/${boardId}`, {
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

    const deleteList = async (listId: string) => {
        try {
            const response = await fetch(`${serverUrl}/user/lists/delete/${listId}`, {
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
                        {card.Labels.map((cardLabel: Label) => (
                            <div className="" key={cardLabel.LabelID}>
                                <div className=""
                                >
                                    <p className='text-sm bg-background py-1 px-2 rounded-md' style={{ color: `#${cardLabel.Color}` }}>{cardLabel.LabelName}</p>
                                </div>
                            </div>
                        ))}
                    </div>}

                    {/* Dates */}
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <ClockIcon />
                        March 13
                    </p>
                    
                    {/* description */}
                    <div className="">
                        <div className='text-muted-foreground leading-tight' dangerouslySetInnerHTML={{ __html: card.Description }}/>
                    </div>

                    {/* checklists */}
                    {card.Checklists.map((checklist: Checklist) => (
                    <div className="" key={checklist.ChecklistID}>
                        <p>{checklist.ChecklistName}</p>
                        {card.Checklists &&
                        <ul>
                        {checklist.ChecklistItems.map((item, index) => (
                            <li key={index} className='ml-4'>
                                <div className="text-muted-foreground flex gap-2">
                                    {/* <input
                                        checked={item.ItemComplete}
                                        readOnly
                                        type="checkbox"
                                    /> */}
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
                className=" max-h-screen overflow-y-scroll scrollbar-hide"
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


const ActiveCard = ({ card, deleteCard, fetchLists }: { card: Card; deleteCard: (cardId: string) => void; fetchLists: () => void }) => {
    const [activeDescription, setActiveDescription] = useState(false);
    const [description, setDescription] = useState<string | null>(null);
    const [cardLabels, setCardLabels] = useState<Label[]>([]);
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const [labels, setLabels] = useState<Label[]>([]);
    const [labelInput, setLabelInput] = useState('');
    const [createChecklistName, setCreateChecklistName] = useState('');

    useEffect(() => {
        if (card) {
            setDescription(card.Description);
            setCardLabels(card.Labels);
        //     setCardId(card.CardID);
        //     setCardName(card.CardName);
            setChecklists(card.Checklists);
        //     setSavedAttachments(card.Attachments);
        }
        fetchLabels()
    }, [])
    
    const removeLabel = (index: number) => {
        const newLabels = [...cardLabels];
        newLabels.splice(index, 1);
        setCardLabels(newLabels);
    };

    const fetchLabels = async () => {
        try {
            const response = await fetch(`${serverUrl}/user/labels`);
            const data = await response.json();
            setLabels(data);
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleLabelSubmit = async () => {
        try {
            const response = await fetch(`${serverUrl}/user/label`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ labelName: labelInput, color: randomColor() })
            })
            .then((response) => {
                if (response.ok) {
                    setLabelInput('');
                    fetchLabels();
                }
            })
        } catch (err) {
            console.error(err);
        }
    };

    const updateChecklistItems = (checklistIndex: number, updatedItems: ChecklistItem[]) => {
        const updatedChecklists = [...checklists];
        updatedChecklists[checklistIndex].ChecklistItems = updatedItems;
        setChecklists(updatedChecklists);
    };

    useEffect(() => {
        handleUpdateCard(card.CardID, description, checklists, cardLabels);
    }, [description, checklists, cardLabels])
    
    const handleUpdateCard = async (cardId: string, description: string | null, checklists: Checklist[], cardLabels: Label[]) => {
        try {
            const response = await fetch(`${serverUrl}/user/cards/updateCard/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    // cardName: ,
                    // dueDate: ,
                    description: description,
                    checklists: checklists,
                    labelIds: cardLabels.map((label) => label.LabelID)
                }),
            });

            if (response.ok) {
                fetchLists();
            }
        } catch (error) {
            console.error('Error updating card:', error);
        }
    };
    

    // console.log(card.Checklists)
    return (
        <>
        <DialogHeader>
            <DialogTitle className=''>
                <Button variant={'outline'} onClick={() => deleteCard(card.CardID)}><TrashIcon /></Button>
                <p className="my-2">{card.CardName}</p>
            </DialogTitle>
            <DialogDescription className='flex gap-2'>
                <Popover>
                    <PopoverTrigger>
                        <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>checklists</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Label>Create new checklist</Label>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setChecklists([...checklists, { ChecklistName: createChecklistName, ChecklistItems: [] }]);
                            setCreateChecklistName('');
                            }}>
                            <Input
                                className='my-2'
                                value={createChecklistName}
                                placeholder='create new checklist'
                                onChange={(e) => setCreateChecklistName(e.target.value)}
                            />
                            <Button>Create Checklist</Button>
                        </form>
                    </PopoverContent>
                </Popover>
                <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>dates</Button>
                <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>members</Button>
                <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>labels</Button>
                <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>attachments</Button>
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
            {/* description */}
            <div className=''>
                <p className="flex items-center capitalize gap-2"><Pencil2Icon />description</p>
                {activeDescription ?
                    <div className='text-muted-foreground'>
                        <ReactQuill value={description} onChange={(value) => setDescription(value)} />
                        <Button className='my-2' onClick={() => setActiveDescription(false)}>add</Button>
                    </div>
                    :
                    <div>
                        {description ?
                            <div
                                onClick={() => setActiveDescription(true)}
                                className='p-2 text-muted-foreground rounded border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                                dangerouslySetInnerHTML={{ __html: description }}
                                style={{ cursor: 'pointer' }}
                            />
                            :
                            <Button variant={'ghost'} onClick={() => setActiveDescription(true)} className=''>Enter description</Button>
                        }
                    </div>
                }
            </div>

            {/* labels */}
            <div className="">
                <p className="flex items-center capitalize gap-2"><BookmarkIcon />labels</p>
                <div className="flex items-center gap-2">
                    <Popover>
                        <PopoverTrigger>
                            <Button variant={'outline'} className='p-3'><PlusIcon /></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Label>Labels</Label>
                            <form onSubmit={(e) => {e.preventDefault(); handleLabelSubmit()}}>
                                <Input value={labelInput} placeholder='Create new label' onChange={(e) => setLabelInput(e.target.value)} />
                                <Button className='my-2'>Create</Button>
                            </form>
                            <div className="max-h-52 flex flex-col overflow-y-scroll gap-1">
                                {labels?.map((label, index) => (
                                    <button
                                        key={index}
                                        style={{ backgroundColor: `#${label.Color}` }}
                                        className='p-2 w-full'
                                        onClick={() => setCardLabels([...cardLabels, label])}
                                    >
                                        {label.LabelName}
                                    </button>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>
                    {cardLabels?.length >= 1 &&
                        cardLabels.map((cardLabel, index) => (
                            <button
                                key={cardLabel.LabelID}
                                style={{ backgroundColor: `#${cardLabel.Color}` }}
                                className='inline-flex p-2 m-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                                // onClick={() => setCardLabels([...cardLabels, cardLabel])}
                            >
                                 <p className="flex items-center gap-1">
                                    {cardLabel.LabelName}
                                    <button onClick={() => removeLabel(index)}><Cross2Icon /></button>
                                </p>
                            </button>
                    ))}
                </div>
            </div>

            {/* Checklists */}
            {checklists.length >= 1 &&
            <>
                <p className="flex items-center capitalize gap-2"><CheckCircledIcon />checklists</p>
                <div className="">
                    {checklists.map((checklist, index) => (
                        <Checklist
                            key={index}
                            checklist={checklist}
                            checklistIndex={index}
                            updateChecklistItems={updateChecklistItems}
                        />
                    ))}
                </div>
            </>}
        </div>
        </>
    )
}


const Checklist = ({ checklist, checklistIndex, updateChecklistItems }: { checklist: Checklist, checklistIndex: number, updateChecklistItems: (checklistIndex: number, updatedItems: ChecklistItem[]) => void }) => {
    const [checklistItems, setChecklistItems] = useState(checklist.ChecklistItems);
    const [createChecklistItemName, setCreateChecklistItemName] = useState('');
    const [createChecklistItem, setCreateChecklistItem] = useState(false);

    // Function to update checklist items and notify the parent
    const handleToggleItem = (index: number) => {
        const updatedItems = [...checklistItems];
        updatedItems[index].ItemComplete = !updatedItems[index].ItemComplete;
        setChecklistItems(updatedItems);
        updateChecklistItems(checklistIndex, updatedItems);
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = [...checklistItems];
        updatedItems.splice(index, 1);
        setChecklistItems(updatedItems);
        updateChecklistItems(checklistIndex, updatedItems);
    };

    const handleCreateItem = () => {
        const newChecklistItem = { ChecklistItemText: createChecklistItemName, ItemComplete: false }
        setChecklistItems([...checklistItems, newChecklistItem]);
        updateChecklistItems(checklistIndex, [...checklistItems, newChecklistItem]);
        setCreateChecklistItemName('');
    };

  return (
    <div className="">
        <p className="">{checklist.ChecklistName}</p>
            {checklistItems && checklistItems.map((item, index) => (
                <li key={index} className='flex justify-between ml-4'>
                    {/* <div className="flex gap-4">
                        <input className="flex"
                            checked={item.ItemComplete}
                            onChange={() => handleToggleItem(index)}
                            type="checkbox"
                        />
                        <p className='text-muted-foreground'>{item.ChecklistItemText}</p>
                    </div> */}
                    <Checkbox
                        isSelected={item.ItemComplete}
                        onValueChange={() => handleToggleItem(index)}
                        defaultSelected
                        lineThrough
                    >
                        <p className='text-muted-foreground'>{item.ChecklistItemText}</p>
                    </Checkbox>
                    <button className='remove' onClick={() => handleRemoveItem(index)}><Cross2Icon /></button>
                </li>
            ))}
            {createChecklistItem &&
            <form className='flex gap-2 my-2' onSubmit={(e) => {e.preventDefault(); handleCreateItem();}}
            >
                <Input
                    type="text"
                    value={createChecklistItemName}
                    placeholder='Create checklist item'
                    onChange={(e) => setCreateChecklistItemName(e.target.value)}
                />
                <Button className="">create</Button>
            </form>}
            {createChecklistItem ?
                <Button variant={"outline"} className='capitalize' onClick={() => setCreateChecklistItem(false)}>done</Button>
                :
                <Button variant={"ghost"} className='capitalize text-muted-foreground' onClick={() => setCreateChecklistItem(true)}>create new item</Button>
            }
    </div>
  )
}