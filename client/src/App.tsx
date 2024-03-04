import { Route, Routes, Navigate } from 'react-router-dom';
import AppProvider from './components/AppProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkspaceLayout from './components/WorkspaceLayout';
import Workspace from './pages/Workspace';
import Board from './pages/Board';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="workspace" element={<WorkspaceLayout />}>
            <Route path=":userId" element={<Workspace />} />
            <Route path="boards/:boardId" element={<Board />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </AppProvider>
  );
}

export default App;