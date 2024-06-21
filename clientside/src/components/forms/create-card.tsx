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
import { useState } from "react";
import { ListProps } from "@/lib/types";
import { handleCreateCard } from "@/api/card";
import { useBoardStore } from "@/providers/board-provider";

type Input = z.infer<typeof cardSchema>;

const CreateCard = ({ valueId }: ListProps) => {
    const { fetchData } = useBoardStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const form = useForm<Input>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            cardName: '',
        }
    });
    
    const onSubmit = async (values: Input) => {
        setIsSubmitting(true);
        await handleCreateCard({ cardName: values.cardName, valueId });
        fetchData();
        setIsSubmitting(false);
    };
    

  return (
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
                { isSubmitting ? 'Creating' : 'Create' }
            </Button>
        </form>
    </Form>
  )
}

export default CreateCard;