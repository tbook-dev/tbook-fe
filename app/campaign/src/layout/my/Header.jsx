import clsx from 'clsx'
import { useLoaderData, Link } from 'react-router-dom'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useDispatch } from 'react-redux'
import { setLoginModal } from '@/store/global'
// import UserAddress from '../common/UserAddress'
import AvatarSkeleton from '../common/AvatarSkeleton'
import { Skeleton } from 'antd'
import Avatar from '../common/Avatar'
import logo from '@/images/icon/logo.svg'

function Header () {
  const { project, projectUrl, isUsingSubdomain } = useLoaderData()
  const { userLogined, firstLoad } = useUserInfo()
  const dispath = useDispatch()
  const handleClick = () => {
    dispath(setLoginModal(true))
  }
  const logoUrl = project?.avatarUrl
  return (
    <header
      className={clsx(
        'transition duration-300 ease-in-out',
        'backdrop-blur-sm'
      )}
    >
      <div className='px-4 py-1.5 lg:px-20'>
        <div className='flex items-center justify-between h-10'>
          <div className='flex items-center'>
            <Link
              to="/"
              className='mr-1 lg:mr-16'
            >
              {!logoUrl ? (
                <Skeleton.Avatar />
              ) : (
                <img src={logoUrl} alt='logo' className='h-6 object-contain' />
              )}
            </Link>
          </div>

          {/* <Links hidden={!pc} /> */}

          <div>
            {!firstLoad ? (
              <AvatarSkeleton />
            ) : userLogined ? (
              <div className='flex items-center gap-x-4'>
                <Avatar />
              </div>
            ) : (
              <button
                className='px-2 py-1 text-sm rounded-md border border-white text-white lg:hover:opacity-70'
                onClick={handleClick}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
