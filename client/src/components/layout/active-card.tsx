import { Attachment, Card, Checklist, ChecklistItem, LabelItem } from "@/lib/types";
import { cn, formatDate, randomColor, serverUrl } from "@/lib/utils";
import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from "react";
import { DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { BookmarkIcon, CheckCircledIcon, ClockIcon, Cross2Icon, DownloadIcon, ExternalLinkIcon, FileIcon, Pencil2Icon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Checkbox } from "../ui/checkbox";
import { handleFileSubmit, handleUpdateChecklists } from "@/server-functions/attachment";
import { handleUpdateCard } from "@/server-functions/card";
import { handleUpdateLabels } from "@/server-functions/label";


const ActiveCard = ({ card, getData }: { card: Card; getData: () => void }) => {
    const [activeDescription, setActiveDescription] = useState(false);
    const [description, setDescription] = useState<string | undefined>('');
    const [cardLabels, setCardLabels] = useState<LabelItem[]>([]);
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [checklists, setChecklists] = useState<Checklist[]>([]);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [labels, setLabels] = useState<LabelItem[]>([]);
    const [labelInput, setLabelInput] = useState('');
    const [createChecklistName, setCreateChecklistName] = useState('');
    const [files, setFiles] = useState<File[]>([]);
  
    
    const onDrop = (acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
    };

    useEffect(() => {
        if (card) {
            setDescription(card.Description);
            setCardLabels(card.Labels);
        //     setCardId(card.CardID);
        //     setCardName(card.CardName);
            setDueDate(card.DueDate);
            setChecklists(card.Checklists);
            setAttachments(card.Attachments);
        }
        fetchLabels()
    }, [])

    useEffect(() => {
        if (date) {
            setDueDate(date)
            handleUpdateCard({ valueId: card.CardID, dueDate: date, getData });
        }
    }, [date])
    
    
    const removeLabel = (index: number) => {
        const newLabels = [...cardLabels];
        newLabels.splice(index, 1);
        setCardLabels(newLabels);
    };
    
    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
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
            if (response.ok) {
                setLabelInput('');
                fetchLabels();
            }
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
        handleUpdateCard({ valueId: card.CardID, description: description as string, getData });
    }, [description])

    useEffect(() => {
        handleUpdateLabels({ valueId: card.CardID, cardLabels, getData });
    }, [cardLabels])
    
    useEffect(() => {
        handleUpdateChecklists({ valueId: card.CardID, checklists, getData });
    }, [checklists])
    
    const handleViewFile = (attachment: Attachment) => {
        const fileType = attachment.FilePath.split('.').pop() || '';
        const fileUrl = `${serverUrl}/${attachment.FilePath}`; // Adjust file access path

        // Handle opening or downloading based on file type
        if (['pdf', 'jpg', 'jpeg', 'png'].includes(fileType.toLowerCase())) {
        // Open directly in browser for viewable files
            window.open(fileUrl, '_blank');
        } else {
        // Trigger download for other file types
            const link = document.createElement('a');
            link.href = fileUrl;
            link.download = attachment.FileName;
            link.click();
        }
    };

    const downloadFile = (attachment: Attachment) => {
        const fileUrl = `${serverUrl}/${attachment.FilePath}`; // Adjust file access path
      
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = attachment.FileName;
        link.click();
      };

    // console.log(card.Checklists)
    return (
        <>
        <DialogHeader>
            <DialogTitle className=''>
                <p className="my-2">{card.CardName}</p>
            </DialogTitle>
            <DialogDescription className='flex gap-2 flex-wrap'>
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

                <Popover>
                    <PopoverTrigger>
                        <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>dates</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                      />
                    </PopoverContent>
                </Popover>

                <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>members</Button>
                <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>labels</Button>

                <Popover>
                    <PopoverTrigger>
                        <Button variant={'secondary'} className='capitalize text-muted-foreground hover:text-secondary-foreground'>attachments</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section className='flex flex-col gap-2'>
                                <div
                                    {...getRootProps()}
                                    className='p-6 border border-dashed cursor-pointer text-center rounded'
                                >
                                    <input {...getInputProps()} />
                                    <p className='text-sm text-muted-foreground'>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                                {files.length >= 1 &&
                                    <div className="flex flex-col gap-1">
                                        {files.map((file, index) => (
                                            <div key={index} className="border py-1 px-2 rounded flex justify-between items-center">
                                                <div className="leading-tight">
                                                    <p className='text-sm text-muted-foreground'>{file.name}</p>
                                                    <p className='font-bold text-muted-foreground'>{file.type}</p>
                                                </div>
                                                <button className='p-1 hover:bg-secondary rounded' onClick={() => removeFile(index)}><Cross2Icon /></button>
                                            </div>
                                        ))}
                                    </div>}
                                <Button onClick={() => { handleFileSubmit({ cardId: card.CardID, files }), setFiles([]) }} disabled={files.length === 0}>
                                    Upload Files
                                </Button>
                            </section>
                        )}
                        </Dropzone>
                    </PopoverContent>
                </Popover>

                <Button variant={'outline'} className='capitalize hover:text-secondary-foreground border-destructive text-destructive'>delete card</Button>
        
            </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">

            {/* date */}
            {dueDate &&
            <div className="">
                <p className="flex items-center capitalize gap-2"><ClockIcon />due date</p>
                <p className="text-muted-foreground">{formatDate(dueDate)}</p>
            </div>}

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
            {/* {cardLabels.length >= 1 && */}
            <>
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
                            >
                                 <p className="flex items-center gap-1">
                                    {cardLabel.LabelName}
                                    <button className='p-1 hover:bg-secondary rounded' onClick={() => removeLabel(index)}><Cross2Icon /></button>
                                </p>
                            </button>
                    ))}
                </div>
            </>
            {/* } */}
            

            {/* Attachments */}
            {attachments.length >= 1 &&
            <>
                <p className="flex items-center capitalize gap-2"><FileIcon />attachments</p>
                <div className="flex flex-col gap-1">
                    {attachments.map((file) => (
                        <div className="border py-1 px-2 rounded" key={file.AttachmentID}>
                            <p className="text-muted-foreground">{file.FileName}</p>
                            <div className="flex gap-1">
                                <button className='p-1 hover:bg-secondary rounded' onClick={() => handleViewFile(file)}><ExternalLinkIcon /></button>
                                <button className='p-1 hover:bg-secondary rounded' onClick={() => downloadFile(file)}><DownloadIcon /></button>
                                <button className='p-1 hover:bg-secondary rounded text-destructive'><TrashIcon /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </>}

            {/* Checklists */}
            {checklists.length >= 1 &&
            <>
                <p className="flex items-center capitalize gap-2"><CheckCircledIcon />checklists</p>
                <div className="">
                    {checklists.map((checklist, index) => (
                        <ChecklistComponent
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

export default ActiveCard;


const ChecklistComponent = ({ checklist, checklistIndex, updateChecklistItems }: { checklist: Checklist, checklistIndex: number, updateChecklistItems: (checklistIndex: number, updatedItems: ChecklistItem[]) => void }) => {
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
                <li key={index} className='flex justify-between ml-4 my-2'>
                  <div className="flex items-center gap-2">
                    <Checkbox
                        checked={item.ItemComplete}
                        onCheckedChange={() => handleToggleItem(index)}
                        id={`checkbox-${item.ChecklistItemID}`}
                    />
                    <Label htmlFor={`checkbox-${item.ChecklistItemID}`}
                      className={cn(
                        'text-muted-foreground cursor-pointer transition-all',
                        item.ItemComplete && 'line-through')}
                    >
                      {item.ChecklistItemText}</Label>
                  </div>
                    <button className='p-1 hover:bg-secondary rounded' onClick={() => handleRemoveItem(index)}><Cross2Icon /></button>
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