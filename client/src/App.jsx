import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import DndTest from './pages/DndTest'
import Register from './pages/Register'
import WorkspaceLayout from './components/WorkspaceLayout'
import Workspace from './pages/Workspace'
import Board from './pages/Board'
import TaskProvider from './components/TaskProvider'

function App() {
  return (
    <TaskProvider>
      <Routes>
        <Route path='/dnd' element={<DndTest />} />

        <Route path='/'>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

          <Route path='workspace' element={<WorkspaceLayout />}>
            <Route path=':userId' element={<Workspace />} />
            <Route path='boards/:boardId' element={<Board />} />
          </Route>
        </Route>

      </Routes>
    </TaskProvider>
  )
}

export default App
