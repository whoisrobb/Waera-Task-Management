import { Link, useNavigate } from "react-router-dom"
import { CalendarIcon, ChevronLeftIcon, GearIcon } from '@radix-ui/react-icons'
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { useApp } from "./AppProvider"
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
    const { user, handleLogout, sidebar, toggleSidebar } = useApp();
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
    <div
        style={ sidebar ? { display: '' } : { display: 'none' } }
        className="w-[17rem] h-full border-r p-4 flex flex-col justify-between"
    >
        <div className="">
        <div className="border-b pb-2 mb-4 flex flex-col items-end">
            <Link to={`/workspace/${user?.userId}`} className="flex items-center">
                <i className="uil uil-books text-3xl text-blue-600"></i>
                <p className="text-lg font-bold">WAERA MANAGER</p>
            </Link>
            <button
                onClick={toggleSidebar}
                style={ sidebar ? { display: 'block' } : { display: 'none' } }
                className='p-1 border hover:bg-secondary rounded-full'
            ><ChevronLeftIcon /></button>
        </div>

        <div className="my-4">
            <p className="text-sm font-bold uppercase">main</p>
            <div className="flex flex-col ml-4 text-muted-foreground">
                <Link to={`/workspace/${user?.userId}`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><i className="uil uil-dashboard"></i> workspace</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><i className="uil uil-user"></i> teams</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><GearIcon /> workspace settings</Link>
            </div>
        </div>
        {/* <div className="">
            <p className="text-sm font-bold uppercase">workpace views</p>
            <div className="flex flex-col ml-4 text-muted-foreground">
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><Pencil1Icon /> notes</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><EnvelopeOpenIcon /> inbox</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><TableIcon /> table</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><CalendarIcon /> calendar</Link>
                <Link to={`#`} className="capitalize flex items-center gap-2 hover:bg-accent p-1 rounded "><DashboardIcon /> kanban board</Link>
            </div>
        </div> */}
        <div className="my-4">
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
        </div>

        <div className="w-full justify-end">
            <Popover>
                <PopoverTrigger className="w-full">
                    <button className="border flex gap-2 items-center text-sm text-muted-foreground text-left w-full p-1 rounded overflow-hidden hover:bg-accent hover:text-accent-foreground">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div className='leading-tight'>
                            <p className="">{user?.username}</p>
                            {/* <p className="text-[12px] font-bold">{user?.email}</p> */}
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="flex gap-3 mb-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='leading-tight text-muted-foreground'>
                            <p className="">{user?.username}</p>
                            <p className="text-[12px] font-bold">{user?.email}</p>
                        </div>
                    </div>
                    <hr />
                    <button onClick={handleLogout} className='py-1 px-2 text-destructive w-full text-left hover:bg-secondary rounded'>sign out</button>
                </PopoverContent>
            </Popover>
        </div>
    </div>
  )
}

export default Sidebar