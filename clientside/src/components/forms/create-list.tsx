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
import { useState } from "react"
import { handleCreateList } from "@/server-functions/list"
import { ListProps } from "@/lib/types"

type Input = z.infer<typeof listSchema>;

const CreateList = ({ valueId, getData }: ListProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<Input>({
        resolver: zodResolver(listSchema),
        defaultValues: {
            listName: '',
        }
    });
    
    const onSubmit = async (values: Input) => {
        setIsSubmitting(true);
        await handleCreateList({ listName: values.listName, valueId, getData});
        setIsSubmitting(false);
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
                {isSubmitting ? 'Creating' : 'Create'}
            </Button>
        </form>
    </Form>
    </div>
  )
}

export default CreateList;