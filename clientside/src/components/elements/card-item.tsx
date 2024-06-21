import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Card } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { deleteCard } from "@/api/card";
import ActiveCard from "../../app/active-card/active-card";
import { ClockIcon, DragHandleDots2Icon } from "@radix-ui/react-icons";
import DropdownOptions from "./dropdown-options";

const CardItem = ({ card }: { card: Card; }) => {
    const [hover, setHover] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const deleteCardItem = async (cardId: string) => {
        await deleteCard({ valueId: cardId });
    }
  return (
        <Dialog>
            <div
                className="rounded py-2 text-sm bg-background shadow-md border"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className="flex px-2 justify-between items-baseline">
                    <div className="flex items-center justify-between">
                        <span
                            className={cn('hidden transition-all',
                            hover && 'block')}>
                            <DragHandleDots2Icon />
                        </span>
                        <p className="text-lg font-bold leading-tight flex items-center">{card.name}</p>
                    </div>
                    
                    <DropdownOptions actionFunc={() => deleteCardItem(card.cardId)} openModal={setIsOpen} />
                </div>
            <DialogTrigger asChild>
                <button className="w-full text-left p-2 flex flex-col gap-2">
                    {/* labels */}

                    {/* Dates */}
                    {card.dueDate &&
                    <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
                        <ClockIcon />
                        {formatDate(card.createdAt)} - {formatDate(card.dueDate)}
                    </p>}
                    
                    {/* description */}
                    {card.description &&
                    <div className="">
                        <div className='text-muted-foreground leading-tight' dangerouslySetInnerHTML={{ __html: card.description }}/>
                    </div>}
                </button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-scroll scrollbar-hide">
                <ActiveCard card={card} />
            </DialogContent>
            </div>
        </Dialog>
  )
}

export default CardItem;