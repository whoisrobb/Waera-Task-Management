import { Button } from "@/components/ui/button";
import { type Attachment } from "@/lib/types";
import { handleOpenFile } from "@/lib/utils";
import { DownloadIcon, ExternalLinkIcon, FileIcon, TrashIcon } from "@radix-ui/react-icons";

const Attachments = ({ attachments }: { attachments: Attachment[] }) => {    
  return (
    <>
        <p className="flex items-center capitalize gap-2"><FileIcon />attachments</p>
        <div className="flex flex-col gap-1">
            {attachments.map((file) => (
                <div className="border py-1 px-2 rounded" key={file.attachmentId}>
                    <p className="text-muted-foreground">{file.filename}</p>
                    <div className="flex gap-1">
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='p-1 size-6 hover:bg-secondary rounded'
                            onClick={() => handleOpenFile(file.filename)}>
                                <ExternalLinkIcon />
                        </Button>
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='p-1 size-6 hover:bg-secondary rounded'
                            onClick={() => handleOpenFile(file.filename)}>
                                <DownloadIcon />
                        </Button>
                        <Button
                            variant={'ghost'}
                            size={'icon'}
                            className='p-1 size-6 hover:bg-secondary rounded text-destructive'>
                                <TrashIcon />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default Attachments;