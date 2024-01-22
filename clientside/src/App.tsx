import React, { ReactNode } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import AppProvider, { useApp } from './components/AppProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkspaceLayout from './components/WorkspaceLayout';
import Workspace from './pages/Workspace';
import Board from './pages/Board';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="workspace" element={<WorkspaceLayout />}>
            <Route path=":userId" element={<Workspace />} />
            <Route path="boards/:boardId" element={<Board />} />
          </Route>
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;