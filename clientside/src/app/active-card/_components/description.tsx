import { handleUpdateCard } from "@/api/card";
import { Button } from "@/components/ui/button";
import { useBoardStore } from "@/providers/board-provider";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

type DescriptionProps = {
    cardDescription: string | undefined;
    cardId: string;
}

const Description = ({ cardDescription, cardId }: DescriptionProps) => {
    const { fetchData } = useBoardStore();
    const [description, setDescription] = useState<string | undefined>(cardDescription);
    const [activeDescription, setActiveDescription] = useState(false);

  return (
    <div className=''>
        <p className="flex items-center capitalize gap-2"><Pencil2Icon />description</p>
        {activeDescription ?
            <div className='text-muted-foreground'>
                <ReactQuill value={description} onChange={(value) => setDescription(value)} />
                <Button
                    className='my-2'
                    onClick={() => {
                        handleUpdateCard({ valueId: cardId, description });
                        setActiveDescription(false);
                        fetchData();
                    }}>
                        Save
                    </Button>
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
  )
}

export default Description;