import { Route, Routes } from "react-router-dom";
import Layout from "./app/layout";
import SignIn from "./app/auth/sign-in";
import SignUp from "./app/auth/sign-up";
import { Toaster } from "sonner";
import Landing from "./app/landing";
import Workspace from "./app/workspace/workspace";
import Board from "./app/board/board";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Landing />} />
        <Route path="/workspace" element={<Layout />}>
          <Route path=":userId" element={<Workspace />} />
          <Route path="boards/:boardId" element={<Board />} />
        </Route>
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App;