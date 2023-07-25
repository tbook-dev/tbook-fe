import React, { useEffect, useRef } from 'react'
import { useProjects } from '@tbook/hooks'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const createUrl = '/new-project'

export default function LayoutAdmin ({ children }) {
  const navigate = useNavigate()
  const authUser = useSelector(state => state.user.authUser)
  const loadingUserStatus = useSelector(state => state.user.loadingUserStatus)
  const projects = useProjects()
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (!loadingUserStatus && authUser) {
      console.log({ projects }, 'xx')
      // 登录之后,如果为0，跳转到创建页面
      // 如果project的数量大于1，不做变化
      // 如果创建了新的project，自动跳转到dashboard
      if (projects.length === 0) {
        navigate(createUrl)
      } else {
        if (!isFirstRender.current) {
          navigate(`/dashboard/overview`)
        }
      }
      isFirstRender.current = false
    }
  }, [loadingUserStatus])

  return (
    <div className='flex flex-col min-h-screen dark:bg-black dark:text-white bg-[#FBFDFF]'>
      <div className='relative flex-auto overflow-x-hidden overflow-y-auto'>
        {children}
      </div>
    </div>
  )
}
