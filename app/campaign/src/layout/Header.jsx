import React from 'react'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import logo from '@/images/icon/logo.svg'
// import Button from '@/components/button'
// import Profile from '@/components/profile'
// import { useSignIn } from '@tbook/hooks'
import { Web3Button } from '@web3modal/react'

function Header () {
  // const authUser = useSelector(state => state.user.authUser)
  // const loadingUserStatus = useSelector(state => state.user.loadingUserStatus)
  // const { loading, handleSignIn } = useSignIn()

  return (
    <header className='sticky top-0 z-30 bg-white dark:bg-black shadow-d2'>
      <div className='px-4 py-2 lg:px-20 lg:py-5'>
        <div className='flex items-center justify-between h-14 lg:h-16'>
          <div className='flex items-center'>
            <Link to='/' className='mr-1 lg:mr-16'>
              <img src={logo} className='w-5 h-8 object-contain' />
            </Link>
          </div>

          <div className='flex items-center space-x-3'>
            <Web3Button icon='show' balance='hide' avatar='hide' />
            {/* {loadingUserStatus ? (
              <Spin />
            ) : authUser ? (
              <Profile />
            ) : null} */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
