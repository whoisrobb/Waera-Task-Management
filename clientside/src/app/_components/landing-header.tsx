import AvatarButton from '@/components/elements/avatar-button';
import NavHeader from '@/components/elements/nav-header';
import { Button } from '@/components/ui/button';
import { useUser } from '@/providers/user-provider';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  const { user } = useUser();
    const token = localStorage.getItem('accessToken');

  return (
    <div className='h-16 w-full border-b flex gap-2 items-center justify-between px-2'>
        <NavHeader />
      
        <div className="space-x-2">
            {token ?
                <>
                    <AvatarButton />
                    <Link to={`/workspace/${user?.userId}`}>
                        <Button variant={"expandIcon"} Icon={ArrowRightIcon} iconPlacement={'right'}>
                            Workspace
                        </Button>
                    </Link>
                </>
                :
                <Link to={'/sign-in'}>
                    <Button>Sign in</Button>
                </Link>}
        </div>
    </div>
  )
}

export default LandingHeader;