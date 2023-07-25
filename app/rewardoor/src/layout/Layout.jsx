import React from 'react'
import { useProjects } from '@tbook/hooks'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const homeUrl = '/'

export default function LayoutAdmin ({ children }) {
  const navigate = useNavigate()
  const authUser = useSelector(state => state.user.authUser)
  const loadingUserStatus = useSelector(state => state.user.loadingUserStatus)
  const projects = useProjects()

  useEffect(() => {
    if (!loadingUserStatus && authUser) {
      // 登录之后跳转到首页，如果project的数量大于1，跳转到首页，如果为0，跳转到创建页面
      if (projects.length === 0) {
        navigate('/create')
      } else {
        navigate(homeUrl)
      }
    }
  }, [loadingUserStatus, authUser])
  return (
    <div className='flex flex-col min-h-screen dark:bg-black dark:text-white bg-[#FBFDFF]'>
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        {children}
      </div>
    </div>
  )
}
