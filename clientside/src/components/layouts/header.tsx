import AvatarButton from '../elements/avatar-button'
import { ModeToggle } from '../themes/mode-toggle'
import NotificationsElement from '../elements/notifications-element'
import SidebarMobile from '../elements/sidebar-mobile'
import SearchInput from '../forms/search-input'

const Header = () => {
  return (
    <div className='h-16 w-full border-b flex items-center justify-between px-2'>
      <SidebarMobile />
      <SearchInput />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ModeToggle />
          <NotificationsElement />
        </div>
        <AvatarButton />
      </div>
    </div>
  )
}

export default Header
