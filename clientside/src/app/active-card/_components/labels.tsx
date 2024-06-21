import { fetchLabels, handleAddLabel, handleLabelSubmit } from "@/api/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LabelItem } from "@/lib/types";
import { useBoardStore } from "@/providers/board-provider";
import { BookmarkIcon, Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

type LabelsProps = {
    cardLabels: LabelItem[];
    cardId: string;
}

const Labels = ({ cardLabels, cardId }: LabelsProps) => {
    const { fetchData } = useBoardStore();
    // const [cardLabels, setCardLabels] = useState<LabelItem[]>(labels);
    const [appLabels, setAppLabels] = useState<LabelItem[]>([]);
    const [labelName, setLabelName] = useState('');

    const removeLabel = async (index: number) => {
        const newLabels = [...cardLabels];
        newLabels.splice(index, 1);
        await handleAddLabel({ valueId: cardId, labels: newLabels });
        // cardLabels = data.labels as LabelItem[]
        fetchData()
    };
    
    useEffect(() => {
        getLabels()
    }, [])

    const getLabels = async () => {
        const data = await fetchLabels();
        setAppLabels(data);
    }
    
    const createLabels = async () => {
        const newLabel = await handleLabelSubmit(labelName);
        appLabels.push(newLabel)
    }

    const addCardLabels = async (label: LabelItem) => {
        for (let i = 0; i < cardLabels.length; i++) {
            if (cardLabels[i].labelId == label.labelId) {
                return
            }
        }

        await handleAddLabel({ valueId: cardId, labels: [...cardLabels, label] });
        fetchData();
    };

  return (
    <>
        <div className="flex items-center gap-2">
            <Popover>
                <PopoverTrigger>
                    <Button variant={'outline'} className='size-9' size={'icon'}><PlusIcon /></Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Label>Labels</Label>
                    <form onSubmit={(e) => {e.preventDefault(); createLabels(); getLabels();}}>
                        <Input value={labelName} placeholder='Create new label' onChange={(e) => setLabelName(e.target.value)} />
                        <Button className='my-2'>Create</Button>
                    </form>
                    <div className="h-full max-h-52 flex flex-col overflow-y-scroll gap-1">
                        {appLabels?.map((label, index) => (
                            <button
                                key={index}
                                style={{ backgroundColor: `#${label.color}` }}
                                className='p-2 w-full'
                                onClick={() => addCardLabels(label)}
                            >
                                {label.name}
                            </button>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
            {cardLabels?.length >= 1 &&
            cardLabels.map((cardLabel, index) => (
            <Button
                key={cardLabel.labelId}
                style={{ background: `#${cardLabel.color}` }}
                size={'sm'}
                className={`inline-flex m-0 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
            >
                    <p className="flex items-center gap-1">
                    {cardLabel.name}
                    <button className='p-1 hover:bg-secondary-foreground rounded' onClick={() => removeLabel(index)}><Cross2Icon /></button>
                </p>
            </Button>
            ))}
        </div>
    </>
  )
}

export default Labels