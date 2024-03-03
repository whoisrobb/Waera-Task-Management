import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Card, Checklist, LabelItem } from "@/lib/types";
import { backgroundColor, formatDate } from "@/lib/utils";
import CustomCheckbox from "../checkbox/CustomCheckbox";
import { deleteCard } from "@/server-functions/card";

const CardItem = ({ card, getData }: { card: Card; getData: () => void }) => {
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
            <div style={bgStyles} className="border rounded py-2 text-sm">

                <div className="flex px-2 justify-between items-baseline">
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold leading-tight">{card.CardName}</p>
                                {/* <Checkbox /> */}
                    </div>
                    
                    <Popover>
                        <PopoverTrigger>
                            <button className='p-1 hover:bg-secondary rounded'>...</button>
                        </PopoverTrigger>
                        <PopoverContent className='w-48 p-2'>
                            <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground' onClick={bgClr}>change color</button>
                            <button className='w-full text-left text-muted-foreground py-1 px-2 capitalize rounded hover:bg-accent hover:text-accent-foreground'>placeholder</button>
                            <button
                                className='w-full text-left text-destructive py-1 px-2 capitalize rounded hover:bg-[#ff49492b]'
                                onClick={() => deleteCard({ valueId: card.CardID, getData })}
                            >delete card</button>
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
                        {/* <ClockIcon /> */}
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
                {/* <ActiveCard
                    card={card}
                    deleteCard={deleteCard}
                    fetchLists={fetchLists}
                /> */}
            </DialogContent>
            </div>
        </Dialog>
  )
}

export default CardItem;