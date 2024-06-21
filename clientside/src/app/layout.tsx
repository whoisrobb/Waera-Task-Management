
import Header from "@/components/layouts/header";
import Sidebar from "@/components/layouts/sidebar";
import { Navigate, Outlet } from "react-router-dom";

const Layout = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return <Navigate to='/sign-in' replace />
  }
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