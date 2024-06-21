import { useUser } from "@/providers/user-provider";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  const { user } = useUser();
  return (
    <div className="border-b py-4 px-2">
      <Link to={`/workspace/${user?.userId}`} className="flex items-center">
        <p className="text-lg font-bold">WAERA MANAGER</p>
      </Link>
    </div>
  )
}

export default SidebarHeader;