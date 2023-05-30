import React from 'react'
import { Link } from 'react-router-dom'
import { Spin } from 'antd'
import { UserMenu } from '@tbook/ui'
import Connect from '@/components/Connect'
import { useSelector } from 'react-redux'
import logo from '@/images/icon/logo.svg'
import LightProvider from '@/theme/LightProvider'

function Header () {
  const authUser = useSelector(state => state.user.authUser)
  const loadingUserStatus = useSelector(state => state.user.loadingUserStatus)

  return (
    <header className='sticky top-0 z-30 bg-white dark:bg-black shadow-d2'>
      <div className='px-4 lg:px-8'>
        <div className='flex items-center justify-between h-14 lg:h-16'>
          <div className='flex items-center'>
            <Link to='/' className='mr-1 lg:mr-16'>
              <img src={logo} className='h-4' />
            </Link>
          </div>

          <div className='flex items-center space-x-3'>
            {loadingUserStatus ? (
              <Spin />
            ) : authUser ? (
              <LightProvider>
                <UserMenu showProject={false} />
              </LightProvider>
            ) : (
              <Connect />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
