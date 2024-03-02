import Header from "@/components/layout/header"
import Sidebar from "@/components/layout/sidebar"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <section className='flex h-[100vh]'>
        <Sidebar />
        <div className="w-full text-screen overflow-y-hidden">
            <Header />
            <Outlet />
        </div>
    </section>
  )
}

export default Layout