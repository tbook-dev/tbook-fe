import { useNavigate, useLocation, Outlet } from "react-router-dom"
import { useEffect } from "react"
import useUserInfo from "@/hooks/useUserInfoQuery"
import { Spin } from "antd"
import { useState } from "react"

const aboardPath = "/aboard"

export default function LayoutAdmin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, data, isLoading } = useUserInfo();
  const [firstLoad, setFirstLoad] = useState(false);
  
  useEffect(() => {
    if (error && error.code === 401 && location.pathname !== aboardPath) {
      navigate(
        `${aboardPath}?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`
      );
    }
  }, [error]);


  useEffect(() => {
    if(!firstLoad && !isLoading){
      setFirstLoad(true)
      return
    }
  },[isLoading])

  // console.log({firstLoad, isLoading})
  return (
    <div className="flex flex-col min-h-screen dark:bg-black dark:text-white bg-[#FBFDFF]">
      <div className="relative flex-auto overflow-x-hidden overflow-y-auto">
        {
          !firstLoad ? <div className="flex pt-40 justify-center">
            <Spin spinning />
          </div> : <Outlet />
        }
        
      </div>
    </div>
  );
}
