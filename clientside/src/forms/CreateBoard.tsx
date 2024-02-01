import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { boardSchema } from "@/lib/validate"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { serverUrl } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { useApp } from "@/components/AppProvider"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Spinner } from "@nextui-org/react"

type Input = z.infer<typeof boardSchema>;

const CreateBoard = () => {
    const { user } = useApp();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<Input>({
        resolver: zodResolver(boardSchema),
        defaultValues: {
            boardName: '',
            description: ''
        }
    });
    
    const onSubmit = async (values: Input) => {
        setIsSubmitting(true)
        handleBoardCreate(values.boardName, values.description);
    };
    
    const handleBoardCreate = async (boardName: string, description: string) => {
        const formData = { boardName, description, userId: user?.userId }
        try {
            const response = await fetch(`${serverUrl}/user/boards/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                setIsSubmitting(false)
                const responseData = await response.json();
                toast({
                    title: 'Success!',
                    description: `created board ${responseData.BoardName}`,
                });
                navigate(`/workspace/boards/${responseData.BoardID}`);
            } else {
                console.error(response.status, response.statusText);
                toast({
                    variant: 'destructive',
                    title: 'Failed!',
                    description: 'Something went wrong',
                });
            }
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <div>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

            <FormField
                control={form.control}
                name="boardName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Board name</FormLabel>
                    <FormControl>
                        <Input placeholder="Board name" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                        This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                        This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
            />

            <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? <div className="flex items-center gap-2"><Spinner color="default" size="sm" /><p className="italic">Creating</p></div>
                : <p>Create</p>
                }
            </Button>
        </form>
    </Form>
    </div>
  )
}

export default CreateBoard