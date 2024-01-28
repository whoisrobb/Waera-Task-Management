import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '@/lib/utils';

type JwtPayload = {
  userId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

type AppContextValue = {
  user: JwtPayload | null;
  sidebar: boolean;
  toggleSidebar: () => void;
//   setUser: React.Dispatch<React.SetStateAction<JwtPayload | null>>;
  handleLogout: () => void;
  handleRegister: (firstName: string, lastName: string, username: string, email: string, password: string) => Promise<void>;
  handleLogin: (value: string, password: string) => Promise<void>;
}

const AppContext = createContext<AppContextValue>({
  user: null,
  sidebar: true,
  toggleSidebar: () => {},
//   setUser: () => {},
  handleLogout: () => {},
  handleRegister: async () => {},
  handleLogin: async () => {},
});

export const useApp = () => {
    const context = useContext(AppContext);
  
    if (!context) {
      throw new Error('useUserContext must be used within an AppProvider');
    }
  
    return context;
};

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<JwtPayload | null>(null);
    const [sidebar, setSidebar] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
        const decoded = jwtDecode<JwtPayload>(accessToken);
        setUser(decoded);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUser(null);
        navigate('/login')
    };

    const toggleSidebar = () => {
      setSidebar((prev) => !prev)
    }
  
    const handleRegister = async (firstName: string, lastName: string, username: string, email: string, password: string) => {
        try {
            const response = await fetch(`${serverUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, username, email, password }),
            });
            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('accessToken', token);
                const userData = jwtDecode<JwtPayload>(token);
                setUser(userData);
                navigate(`/workspace/${userData.userId}`)
            } else {
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (err) {
            console.error(err);
        }
    };
  
    const handleLogin = async (value: string, password: string) => {
        try {
            const response = await fetch(`${serverUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value, password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                localStorage.setItem('accessToken', token);
                const userData = jwtDecode<JwtPayload>(token);
                setUser(userData);
                navigate(`/workspace/${userData.userId}`);
            } else {
                const errorData = await response.json();
                console.error(errorData);
            }
        } catch (err) {
            console.error(err);
        }
    };

  return (
    <AppContext.Provider value={{ user, sidebar, toggleSidebar, handleLogout, handleRegister, handleLogin }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;