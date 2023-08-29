import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '@/images/icon/logo.svg'
import { Web3Button } from '@web3modal/react'
import clsx from 'clsx'

function Header () {
  const [isSticky, setSticky] = useState(false)
  return (
    <header
      className={clsx(
        'top-0 z-30  text-black dark:text-white shadow-d2',
        'transition duration-300 ease-in-out',
        isSticky
          ? 'sticky bg-white dark:bg-black'
          : 'fixed bg-transpant inset-x-0'
      )}
    >
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
