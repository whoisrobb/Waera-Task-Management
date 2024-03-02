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
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { handleLogin } from "@/server-functions/auth"

type Input = z.infer<typeof loginSchema>;

const SignInForm = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [demoIsSubmitting, setDemoIsSubmitting] = useState(false);

    const form = useForm<Input>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            value: 'iamironman',
            password: 'howardpotts',
        }
    });

    const onSubmit = async (values: Input) => {
        setIsSubmitting(true);
        await handleLogin({ values, navigate });
        setIsSubmitting(false);
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
                                {/* <Button type="submit">submit</Button> */}
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <div className="flex items-center gap-2"><p className="italic">Signing in</p></div>
                                    : <p>Submit</p>
                                    }
                                </Button>
                                {/* <Button
                                    disabled={demoIsSubmitting}
                                    variant={'secondary'}
                                    type="button"
                                    onClick={async () => {setDemoIsSubmitting(true); await handleLogin({ DEMO_ACCOUNT, navigate}); setDemoIsSubmitting(false);}}
                                >
                                    {demoIsSubmitting ? <div className="flex items-center gap-2"><p className="italic">Signing in</p></div>
                                    : <p>Demo</p>
                                    }
                                </Button> */}
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex gap-2 text-center">
                    <p className="">Don't have an account?</p>
                    <Link to={'/register'}>Sign Up</Link>
                </CardFooter>
            </Card>
        </div>
      )
    }
    
export default SignInForm