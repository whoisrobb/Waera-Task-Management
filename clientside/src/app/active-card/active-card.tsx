import { useState } from "react";
import { DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import Description from "./_components/description";
import Attachments from "./_components/attachments";
import { type Card } from "@/lib/types";
import ChecklistComponent from "./_components/checklist-component";
import CardTitle from "./_components/card-title";
import { Separator } from "@/components/ui/separator";
import ActiveCardHeader from "./active-card-header/active-card-header";
import { cn } from "@/lib/utils";

const routes = ['description', 'checklists', 'files']

const ActiveCard = ({ card }: { card: Card; }) => {
    const [activeRoute, setActiveRoute] = useState('description');
    
    return (
        <DialogHeader>
            <DialogTitle className=''>
                <CardTitle name={card.name} />
                <Separator />
            </DialogTitle>
            <DialogDescription className='flex flex-col gap-2 flex-wrap'>
                <ActiveCardHeader card={card} />
                <Separator />
                <div className="flex gap-2">
                    {routes.map((route) => (
                        <div
                            className="hover:cursor-pointer py-1 px-2"
                            key={route}
                            onClick={() => setActiveRoute(route)}
                        >
                            <span className={cn("capitalize font-bold",
                                activeRoute == route && "text-primary underline"
                            )}
                            >
                                {route}
                            </span>
                        </div>
                    ))}
                </div>
                
                {activeRoute == 'description' && <Description cardId={card.cardId} cardDescription={card.description} />}
                {activeRoute == 'files' && <Attachments attachments={card.attachments} />}
                {activeRoute == 'checklists' && <ChecklistComponent cardChecklists={card.checklists} cardId={card.cardId} />}
            </DialogDescription>
        </DialogHeader>
    )
}

export default ActiveCard;