import { Input } from './ui/input'
import { ModeToggle } from './mode-toggle'
import { useApp } from './AppProvider'
import { ChevronRightIcon } from '@radix-ui/react-icons'

const Header = () => {
  const { user, sidebar, toggleSidebar } = useApp();
  return (
    <div className='py-2 px-4 border-b flex items-center justify-between'
    >
      <button
        onClick={toggleSidebar}
        style={ sidebar ? { display: 'none' } : { display: 'block' } }
        className='p-1 border hover:bg-secondary rounded-full'
      ><ChevronRightIcon /></button>
      <div className="leading-tight">
        <p className="text-muted-foreground">welcome,</p>
        <p className="">{user?.firstName} {user?.lastName}</p>
      </div>
      <div className="w-80">
          <Input
              placeholder='search'
          />
      </div>
        <ModeToggle />
    </div>
  )
}

export default Header