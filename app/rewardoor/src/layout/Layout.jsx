import { useNavigate, useLocation, Outlet } from "react-router-dom"
import { useEffect } from "react"
import useUserInfo from "@/hooks/useUserInfoQuery"

const aboardPath = "/aboard"

export default function LayoutAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { error } = useUserInfo();

  useEffect(() => {
    if (error && error.code === 401 && location.pathname !== aboardPath) {
      navigate(
        `${aboardPath}?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
    }
  }, [error]);


  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white bg-[#FBFDFF]">
      <div className="relative flex-auto overflow-x-hidden overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
