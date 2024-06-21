import { useUser } from "@/providers/user-provider";
import { Link } from "react-router-dom";

const NavHeader = () => {
    const { user } = useUser();
  return (
    <div className="border-b h-16 px-2 flex items-center">
      <Link to={`/workspace/${user?.userId}`} className="flex items-center">
        <p className="text-lg font-bold">STRYDE MANAGER</p>
      </Link>
    </div>
  )
}

export default NavHeader;