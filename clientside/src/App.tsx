import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";
import { Toaster } from "sonner";
import Workspace from "./pages/workspace";
import Board from "./pages/board";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/sign-in" replace />} />
          <Route path="workspace/:userId" element={<Workspace />} />
          <Route path="workspace/boards/:boardId" element={<Board />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App;