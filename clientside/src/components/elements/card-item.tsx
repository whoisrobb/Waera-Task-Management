import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Card } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { deleteCard } from "@/api/card";
import ActiveCard from "../../app/active-card/active-card";
import DropdownOptions from "./dropdown-options";
import { Separator } from "../ui/separator";
import { Paperclip } from "lucide-react";
import { Button } from "../ui/button";
import { useBoardStore } from "@/providers/board-provider";

const CardItem = ({ card }: { card: Card; }) => {
    const { fetchData } = useBoardStore();
    const [isOpen, setIsOpen] = useState(false);

    const deleteCardItem = async (cardId: string) => {
        await deleteCard({ valueId: cardId });
        fetchData();
    }
    console.log(isOpen)
  return (
    <div className="border rounded-sm bg-background">
        <Dialog>
            <DialogHeader className="">
                <DialogTitle className="flex px-1 justify-between items-baseline py-1">
                    <p className="text-lg font-bold leading-tight flex items-center">{card.name}</p>
                    <DropdownOptions actionFunc={() => deleteCardItem(card.cardId)} openModal={setIsOpen} />
                </DialogTitle>
                <DialogTrigger asChild className="cursor-pointer">
                    <div className="w-full text-left p-2 flex flex-col gap-2">
                        {/* labels */}
                        {card.labels?.length >= 1 &&
                        <div className="flex gap-1">
                            {card.labels.map((cardLabel) => (
                                <Button
                                    key={cardLabel.labelId}
                                    style={{ background: `#${cardLabel.color}` }}
                                    size={'sm'}
                                    className={'h-5'}
                                >
                                    <p className="flex items-center gap-1">
                                        {cardLabel.name}
                                    </p>
                                </Button>
                            ))}
                        </div>}
                        

                        {/* Dates */}
                        <div className="flex items-center w-full gap-2 text-[12px] text-muted-foreground">
                            <div className="bg-muted w-full p-2 rounded-sm">
                                <p className="uppercase text-xs">started on</p>
                                <p className="font-bold text-primary">{formatDate(card.createdAt)}</p>
                            </div>
                            <div className="bg-muted w-full p-2 rounded-sm">
                                <p className="uppercase text-xs">Due date</p>
                                <p className="font-bold text-primary">{card.dueDate ? formatDate(card.dueDate): "Unavailable"}</p>
                            </div>
                        </div>
                        
                        {/* description */}
                        {card.description &&
                        <div className="">
                            <div className='text-muted-foreground leading-tight' dangerouslySetInnerHTML={{ __html: card.description }}/>
                        </div>}
                    </div>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-scroll scrollbar-hide">
                    <ActiveCard card={card} />
                </DialogContent>
                
            </DialogHeader>
                <Separator />
                <DialogFooter className="px-2 py-1">
                    <span className="flex items-center text-muted-foreground">
                        <Paperclip className="size-3" />
                        <p className="">{card.attachments.length}</p>
                    </span>
                </DialogFooter>
        </Dialog>
    </div>
  )
}

export default CardItem;