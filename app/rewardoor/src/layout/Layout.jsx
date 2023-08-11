import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useEffect } from 'react'

const aboardPath = '/aboard'
export default function LayoutAdmin () {
  const authUser = useSelector(state => state.user.authUser)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!authUser && location.pathname !== aboardPath) {
      navigate(
        `${aboardPath}?redirect=${encodeURIComponent(location.pathname)}`
      )
    }
  }, [authUser])
  return (
    <div className='flex flex-col min-h-screen dark:bg-black dark:text-white bg-[#FBFDFF]'>
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  )
}
