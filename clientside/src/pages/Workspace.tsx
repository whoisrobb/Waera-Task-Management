import { useApp } from '@/components/AppProvider';
import { serverUrl } from '@/lib/utils';
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Board = {
  BoardID: string;
  BoardName: string;
  Description: string | null;
  CreatorUserID: string | null;
  UserUserID: string | null;
  TeamTeamID: string | null;
  createdAt: string;
  updatedAt: string;
}

type Input = z.infer<typeof boardSchema>;

const Workspace = () => {
  const { user } = useApp();
  const navigate = useNavigate();
  const [userBoards, setUserBoards] = useState<Board[] | null>(null);
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
  
  useEffect(() => {
    if (user) {
      fetchUserBoards();
    }
  }, [user])
  // console.log(user);

  const fetchUserBoards = async () => {
      try {
          const response = await fetch(`${serverUrl}/user/boards/${user?.userId}`)
          const data = await response.json();
          setUserBoards(data);
      } catch (err) {
          console.error(err);
      }
  };
  return (
    <div className='px-4 py-2'>
      
      <div className="">
          {userBoards &&
          <>
            <p className="capitalize text-lg font-bold">personal boards</p>
            <div className="grid grid-cols-5 gap-2 mobile:grid-cols-2">
                <Popover>
                    <PopoverTrigger>
                      <button className='h-20 w-full py-2 px-4 bg-secondary text-muted-foreground hover:bg-secondary hover:text-accent-foreground'>
                        <p className="text-lg">create board</p>
                      </button>
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
            {userBoards?.map((board) => (
                <Link className='h-20 py-2 px-4 border text-muted-foreground hover:bg-secondary hover:text-accent-foreground' key={board.BoardID} to={`/workspace/boards/${board.BoardID}`}>
                  <p className="text-lg">{board.BoardName}</p>
                </Link>
            ))}
            </div>
          </>}
      </div>
    </div>
  )
}

export default Workspace