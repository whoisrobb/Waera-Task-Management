import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { cardSchema } from "@/lib/validate";
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { serverUrl } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";

type Input = z.infer<typeof cardSchema>;

const CreateCard = ({ listId, fetchLists }: { listId: string | undefined, fetchLists: () => void }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<Input>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            cardName: '',
        }
    });
    
    const onSubmit = (values: Input) => {
        setIsSubmitting(true);
        handleCreateCard(values.cardName);
    };
    
    const handleCreateCard = async (cardName: string) => {
        try {
          const response = await fetch(`${serverUrl}/user/cards/create/${listId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardName })
        })
        if (response.ok) {
            setIsSubmitting(false);
            const responseData = await response.json();
            toast({
                title: 'Success!',
                description: `created card ${responseData.CardName}`,
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
                name="cardName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Card name</FormLabel>
                    <FormControl>
                        <Input placeholder="Card name" {...field} />
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

export default CreateCard;