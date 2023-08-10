import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
export default function LayoutAdmin () {
  const authUser = useSelector(state => state.user.authUser)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!authUser && location.pathname !== aboardPath) {
      navigate(`${aboardPath}?redirect=${encodeURIComponent(target)}`)
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
