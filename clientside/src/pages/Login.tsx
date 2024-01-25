import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
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
import { useApp } from "@/components/AppProvider"
import { Link } from "react-router-dom"

type Input = z.infer<typeof loginSchema>;

const Login = () => {
    const { handleLogin } = useApp();
    const form = useForm<Input>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            value: '',
            password: '',
        }
    });

    const onSubmit = (values: Input) => {
        handleLogin(values.value, values.password);
    };

    return (
        <div>
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
    
                            <Button type="submit">Submit</Button>
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
    
export default Login