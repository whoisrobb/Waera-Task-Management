import UserWorkspace from '@/components/forms/user-workspace';
import { Button } from '@/components/ui/button';
import { useUser } from '@/providers/user-provider';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const WorkspaceHeader = () => {
    const [toggleForm, setToggleForm] = useState(false);
    const { user } = useUser();

    const setUserForm = (state: boolean) => {
        setToggleForm(state);
    }
  return (
      toggleForm ?
        <UserWorkspace setUserForm={setUserForm} />
        :
        <div className="space-y-2">
            <div className="flex items-center space-x-4">
                <FirstLetter firstName={user?.firstName!} />
                <div className="leading-tight text-sm">
                    <div className="text-lg flex items-center font-bold space-x-2">
                        <p>{`${user?.firstName} ${user?.lastName}'s workspace`}</p>
                        <Button onClick={() => setToggleForm(prev => !prev)} variant={'ghost'} size={"icon"}><Pencil1Icon /></Button>
                    </div>
                    {user?.domain && <Link to={user?.domain} target='_blank' className='hover:text-blue-600 text-sm text-muted-foreground'>{user.domain}</Link>}
                </div>
            </div>
            {user?.description && <p className="text-sm text-muted-foreground">{user.description}</p>}
        </div>
  )
}

export default WorkspaceHeader

const FirstLetter = ({ firstName }: { firstName: string }) => {
    const firstLetter =  firstName.split("")[0];

    return (
        <Button variant={'secondary'} size={"icon"} className='p-7'>
            <p className="font-bold text-4xl">
                {firstLetter}
            </p>
        </Button>
    )
}