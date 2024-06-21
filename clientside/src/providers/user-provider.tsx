import { User } from "@/lib/types";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type UserProviderProps = {
    children: ReactNode;
}

type UserContextProps = {
    user: User | null;
    setUser: (user: User) => void;
    removeUser: () => void
};

const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
    removeUser: () => {}
});

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }: UserProviderProps) => {
    const userData = localStorage.getItem("authStorage");
    const parsedData = userData ? JSON.parse(userData) : null;
    const [user, setUserData] = useState<User | null>(parsedData);

    useEffect(() => {
        if (user) {
            localStorage.setItem("authStorage", JSON.stringify(user));
        }
    }, [user])

    const setUser = (user: User) => {
        setUserData(user);
    }

    const removeUser = () => {
        setUserData(null);
        localStorage.removeItem("authStorage");
        localStorage.removeItem("accessToken");
    }

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider;
