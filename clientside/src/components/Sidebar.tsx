import { Link, useNavigate } from "react-router-dom"
import { CalendarIcon, DashboardIcon, GearIcon, TableIcon } from '@radix-ui/react-icons'
import { Button } from "./ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApp } from "./AppProvider"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { boardSchema } from "@/lib/validate"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "./ui/input"
import { serverUrl } from "@/lib/utils"

type Input = z.infer<typeof boardSchema>;

const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useApp();
    const form = useForm<Input>({
        resolver: zodResolver(boardSchema),
        defaultValues: {
            boardName: '',
            description: ''
        }
    });

    const onSubmit = (values: Input) => {
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
                const responseData = await response.json();
                navigate(`/workspace/boards/${responseData.BoardID}`);
            } else {
                console.error(response.status, response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    };

  return (
    // <div className="w-60 h-full border-r bg-gradient-to-t from-[rgba(168,39,167,0.1)] to-[rgba(141,141,215,0.05)] p-4 flex flex-col justify-between">
    <div className="w-60 h-full border-r p-4 flex flex-col justify-between">
        <div className="">
            <Link to={`#`} className="flex items-center">
                <i className="uil uil-books text-3xl text-blue-600"></i>
                <p className="text-lg font-bold">WAERA MANAGER</p>
            </Link>
        </div>
        <div className="">
            <p className="text-sm font-bold uppercase">main</p>
            <div className="flex flex-col ml-4 text-muted-foreground">
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><i className="uil uil-dashboard"></i> workspace</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><i className="uil uil-user"></i> teams</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><GearIcon /> workspace settings</Link>
            </div>
        </div>
        <div className="">
            <p className="text-sm font-bold uppercase">workpace views</p>
            <div className="flex flex-col ml-4 text-muted-foreground">
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><TableIcon /> table</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><CalendarIcon /> calendar</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><DashboardIcon /> kanban board</Link>
            </div>
        </div>
        <div className="">
            <p className="text-sm font-bold uppercase">actions</p>
            <div className="flex flex-col ml-4 text-muted-foreground">
                <Popover>
                    <PopoverTrigger>
                        <button className="capitalize flex w-full items-center gap-2 hover:bg-accent p-1 rounded hover:text-accent-foreground"><i className="uil uil-create-dashboard"></i> create board</button>
                    </PopoverTrigger>
                    <PopoverContent>
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
                                        <Input placeholder="Description" {...field} />
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
                    </PopoverContent>
                </Popover>

                <button className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded hover:text-accent-foreground"><CalendarIcon /> calendar</button>
            </div>
        </div>
        <div className="">
            <button className="bg-accent border flex gap-2 items-center text-sm text-left w-full p-1 rounded overflow-hidden">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className='leading-tight'>
                    <p className="">{user?.username}</p>
                    <p className="text-[12px] font-bold">{user?.email}</p>
                </div>
            </button>
        </div>
    </div>
  )
}

export default Sidebar