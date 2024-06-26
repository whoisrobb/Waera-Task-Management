import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/lib/validate"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { handleLogin } from "@/api/user"
import { User } from "@/lib/types"
// import { useUserStore } from "@/store/user-store"
import { useUser } from "@/providers/user-provider"

type Input = z.infer<typeof loginSchema>;

const SignInForm = () => {
    const navigate = useNavigate();
    // const setUser = useUserStore((state) => state.setUser);
    const { setUser } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<Input>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            value: 'tonystark@example.com',
            password: 'password',
        }
    });

    const onSubmit = async (values: Input) => {
        setIsSubmitting(true);
        const data = await handleLogin({ values });
        setUser(data as User);
        setIsSubmitting(false);
        navigate('/')
    };

    return (
        <div className='h-screen grid place-items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Welcome back.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
    
                            <FormField
                                control={form.control}
                                name="value"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Username or email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username or email" {...field} />
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Password" {...field} type="password" />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-2 capitalize">
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Signing in'
                                    : 'Login'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex gap-2 text-center">
                    <p className="text-muted-foreground">Press login to continue with demo. Site still under construction</p>
                </CardFooter>
            </Card>
        </div>
      )
    }
    
export default SignInForm