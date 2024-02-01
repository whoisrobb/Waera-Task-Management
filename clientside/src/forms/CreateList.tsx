import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { listSchema } from "@/lib/validate"
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
// import { useApp } from "@/components/AppProvider"
import { toast } from "@/components/ui/use-toast"
import { Spinner } from "@nextui-org/react"
import { useState } from "react"

type Input = z.infer<typeof listSchema>;

const CreateList = ({ boardId, fetchLists }: { boardId: string | undefined, fetchLists: () => void }) => {
    // const { user } = useApp();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<Input>({
        resolver: zodResolver(listSchema),
        defaultValues: {
            listName: '',
        }
    });
    
    const onSubmit = (values: Input) => {
        setIsSubmitting(true);
        handleCreateList(values.listName);
    };
    
    const handleCreateList = async (listName: string) => {
        try {
          const response = await fetch(`${serverUrl}/user/lists/create/${boardId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ listName })
        })
        if (response.ok) {
            setIsSubmitting(false);
            const responseData = await response.json();
            toast({
                title: 'Success!',
                description: `created list ${responseData.ListName}`,
            });
            fetchLists();
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
                name="listName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>List name</FormLabel>
                    <FormControl>
                        <Input placeholder="List name" {...field} />
                    </FormControl>
                    {/* <FormDescription>
                        This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <div className="flex items-center gap-2"><Spinner color="default" size="sm" /><p className="italic">Creating</p></div>
                : <p>Create</p>
                }
            </Button>
        </form>
    </Form>
    </div>
  )
}

export default CreateList;