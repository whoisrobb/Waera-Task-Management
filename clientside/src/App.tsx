import { Route, Routes } from 'react-router-dom';
import AppProvider from './components/AppProvider';
import Login from './pages/Login';
import Register from './pages/Register';
import WorkspaceLayout from './components/WorkspaceLayout';
import Workspace from './pages/Workspace';
import Board from './pages/Board';
import Home from './pages/Home';

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
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