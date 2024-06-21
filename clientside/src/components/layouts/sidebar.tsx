import SidebarContent from "../elements/sidebar-content";
// import SidebarDesktop from "../elements/sidebar-desktop";
import SidebarHeader from "../elements/sidebar-header";

const Sidebar = () => {

  return (
    <div className="w-[17rem] border-r px-2 hidden lg:flex flex-col">
      <SidebarHeader />
      <SidebarContent />
      {/* <SidebarDesktop /> */}
    </div>
  )
}

export default Sidebar