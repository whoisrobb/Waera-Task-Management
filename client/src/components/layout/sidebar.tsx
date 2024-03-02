import SidebarContent from "./sidebar-content"
import SidebarHeader from "./sidebar-header"

const Sidebar = () => {

  return (
    <div className="w-[17rem] border-r px-2 hidden lg:flex flex-col">
      <SidebarHeader />
      <SidebarContent />
    </div>
  )
}

export default Sidebar