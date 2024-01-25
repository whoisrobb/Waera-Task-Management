import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
  

const WorkspaceLayout = () => {
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

export default WorkspaceLayout