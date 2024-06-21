import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Checklist } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckCircledIcon, Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useBoardStore } from "@/providers/board-provider";
import { handleCreateChecklist, handleCreateChecklistItem, handleDeleteChecklist, handleDeleteChecklistItem, handleUpdateChecklist, handleUpdateChecklistItem } from "@/api/checklist";
import DropdownOptions from "@/components/elements/dropdown-options";

type ChecklistProps = {
    cardId: string;
    cardChecklists: Checklist[];
}

const ChecklistComponent = ({ cardChecklists, cardId }: ChecklistProps) => {
    const [createChecklistName, setCreateChecklistName] = useState('');
    const { fetchData } = useBoardStore();

    const createChecklist = async () => {
        await handleCreateChecklist({ name: createChecklistName, valueId: cardId });
        fetchData()
    }
  return (
    <div className="space-y-4">
        <div className="flex items-center capitalize gap-2">
            <CheckCircledIcon />
            <span className="text-primary">checklists</span>
            <Popover>
                <PopoverTrigger>
                    <Button variant={'outline'} size={'icon'} className="size-6">
                        <PlusIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Label>Create new checklist</Label>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        createChecklist();
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
        </div>

        <div className="space-y-4">
            {cardChecklists.map((checklist, index) => (
                <ChecklistItems
                    key={index}
                    checklist={checklist}
                />
            ))}
        </div>
    </div>
  )
}

export default ChecklistComponent;

type ChecklistItemsProps = {
    checklist: Checklist, 
}

type ToggleItemProps = {
    checklistItemId: string;
    completed: boolean;
}

const ChecklistItems = ({ checklist }: ChecklistItemsProps) => {
    const [updateForm, setUpdateForm] = useState(false);
    const [checklistName, setChecklistName] = useState(checklist.name);
    const { fetchData } = useBoardStore();
    const [createChecklistItemName, setCreateChecklistItemName] = useState('');
    const [createChecklistItem, setCreateChecklistItem] = useState(false);

    const handleToggleItem = async ({ checklistItemId, completed }: ToggleItemProps) => {
        await handleUpdateChecklistItem({ valueId: checklist.checklistId, checklistItemId, completed })
        fetchData()
    };

    const handleRemoveItem = async (checklistItemId: string) => {
        await handleDeleteChecklistItem({ valueId: checklistItemId })
        fetchData();
    };

    const handleCreateItem = async () => {
        const newChecklistItem = { valueId: checklist.checklistId, text: createChecklistItemName }
        await handleCreateChecklistItem(newChecklistItem);
        setCreateChecklistItemName('');
        fetchData()
    };

    const updateChecklist = async () => {
        await handleUpdateChecklist({ name: checklistName, valueId: checklist.cardId, checklistId: checklist.checklistId });
        setUpdateForm(false);
        fetchData()
    }

    const deleteCheklist = async () => {
        await handleDeleteChecklist({ valueId: checklist.checklistId });
        fetchData();
    }

  return (
    <div className="">
        <p className="flex items-center gap-2">
            {updateForm ?
            <form className="space-y-1" onSubmit={(e) => {e.preventDefault(); updateChecklist()}}>
                <Input value={checklistName} onChange={(e) => setChecklistName(e.target.value)} />
                <div className="flex gap-2">
                    <Button size={'sm'}>Update</Button>
                    <Button variant={'ghost'} size={'sm'} type="button" onClick={() => setUpdateForm((prev) => !prev)}>Cancel</Button>
                </div>
            </form>
            : 
            <>
                <span>{checklist.name}</span>
                <DropdownOptions openModal={setUpdateForm} actionFunc={deleteCheklist} />
            </>}
        </p>
            {checklist.checklistItems.map((item, index) => (
                <li key={index} className='flex justify-between ml-4 my-2'>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={item.completed}
                            onCheckedChange={
                                () => handleToggleItem({
                                    completed: !item.completed,
                                    checklistItemId: item.checklistItemId!
                                })
                            }
                            id={`checkbox-${item.checklistItemId}`}
                        />
                        <Label htmlFor={`checkbox-${item.checklistItemId}`}
                            className={cn(
                                'text-muted-foreground cursor-pointer transition-all',
                                item.completed && 'line-through')}
                        >
                            {item.text}</Label>
                    </div>
                    <button
                        className='p-1 hover:bg-secondary rounded'
                        onClick={() => handleRemoveItem(item.checklistItemId!)}
                    >
                        <Cross2Icon />
                    </button>
                </li>
            ))}
            {createChecklistItem &&
            <form
                className='flex gap-2 my-2'
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateItem();
                }}
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