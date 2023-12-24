import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import ActiveCard from './ActiveCard'
import { useTask } from './TaskProvider'

const WorkspaceLayout = () => {
  const { activeCard } = useTask();
  return (
    <section id='app'>
      <Sidebar />
      <div className="space">
        <Header />
        <Outlet />
      </div>
      { activeCard && <ActiveCard /> }
    </section>
  )
}

export default WorkspaceLayout