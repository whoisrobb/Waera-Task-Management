import { JwtPayload } from "@/lib/types";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
    const [user, setUser] = useState<JwtPayload | null>(null);
    
    useEffect(() => {
      const data = localStorage.getItem('accessToken');
      setUser(jwtDecode(data as string))
    }, []);
  return (
    <div className="border-b py-4 px-2">
      <Link to={`/workspace/${user?.userId}`} className="flex items-center">
        <p className="text-lg font-bold">WAERA MANAGER</p>
      </Link>
    </div>
  )
}

export default SidebarHeader;