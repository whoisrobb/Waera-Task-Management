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
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { handleBoardCreate } from "@/api/board"
import { jwtDecode } from "jwt-decode"
import { JwtPayload } from "@/lib/types"

type Input = z.infer<typeof boardSchema>;

const CreateBoard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<JwtPayload | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<Input>({
        resolver: zodResolver(boardSchema),
        defaultValues: {
            boardName: '',
            description: ''
        }
    });

    useEffect(() => {
        const data = localStorage.getItem('accessToken');
        setUserData(jwtDecode(data as string));
    }, [])
    
    const onSubmit = async (values: Input) => {
        const formData = { ...values, userId: userData?.userId as string }
        setIsSubmitting(true)
        await handleBoardCreate({ formData, navigate });
        setIsSubmitting(false)
    };
    

  return (
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
                {isSubmitting ? <div className="flex items-center gap-2"><p className="italic">Creating</p></div>
                : <p>Create</p>
                }
            </Button>
        </form>
    </Form>
  )
}

export default CreateBoard