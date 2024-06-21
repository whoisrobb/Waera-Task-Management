import { User } from "@/lib/types";
import { handleRegister } from "@/api/user";
// import { useUserStore } from "@/store/user-store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useUser } from "@/providers/user-provider";

const SignUp = () => {
  // const setUser = useUserStore((state) => state.setUser);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const values = {
    firstName: 'Tony',
    lastName: 'Stark',
    username: 'iamironman',
    email: 'tonystark@example.com',
    password: 'password',
  }

  useEffect(() => {
    submit()
  }, [])

  const submit = async () => {
    const data = await handleRegister({values})
    setUser(data as User);
    navigate('/')
  }
  return (
    <div>SignUp</div>
  )
}

export default SignUp