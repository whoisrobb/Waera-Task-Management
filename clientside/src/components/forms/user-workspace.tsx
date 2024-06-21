import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from '../ui/textarea';
import { useUser } from '@/providers/user-provider';
import { updateUserData } from '@/api/user';
import { userWorkspaceSchema } from "@/lib/validate";

type UserInputSchema = z.infer <typeof userWorkspaceSchema>;
export type UserInputProps = UserInputSchema & { userId: string }

const UserWorkspace = ({ setUserForm }: { setUserForm: (to: boolean) => void }) => {
    const { user, setUser } = useUser();
    const form = useForm<UserInputSchema>({
        resolver: zodResolver(userWorkspaceSchema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            domain: user?.domain ?? '',
            description: user?.description ?? '',
        }
    });

    const onSubmit = async (values: UserInputSchema) => {
        const formData = { ...values, userId: user?.userId! }
        const updatedUser = await updateUserData(formData);
        setUser(updatedUser);
        setUserForm(false);
    };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full max-w-96">

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="Domain" {...field} />
              </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
            <Button type="submit">Submit</Button>
            <Button type='button' onClick={() => setUserForm(false)} variant={"secondary"}>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}

export default UserWorkspace;