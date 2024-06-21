import { handleFileSubmit } from "@/api/attachment";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { type Attachment } from "@/lib/types";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction, useState } from "react";
import Dropzone from 'react-dropzone';

type AddFilesProps = {
    cardId: string;
    attachments: Attachment[];
    setAttachments: Dispatch<SetStateAction<Attachment[]>>;
}

const AddFiles = ({ cardId, setAttachments, attachments }: AddFilesProps) => {
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);
    };
    
    const removeFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };
    
    const addFiles = async () => {
        const data = await handleFileSubmit({ cardId, files });
        const newFiles = attachments;

        data.map((file: Attachment) => {
            newFiles.push(file)
        });

        setAttachments(newFiles);
    }
  return (
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
                    <Button onClick={() => { addFiles(); setFiles([]); }} disabled={files.length === 0}>
                        Upload Files
                    </Button>
                </section>
            )}
            </Dropzone>
        </PopoverContent>
    </Popover>
  )
}

export default AddFiles;