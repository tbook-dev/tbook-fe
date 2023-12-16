import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import useProjectQuery from '@/hooks/useProjectQuery'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useDispatch } from 'react-redux'
import { setLoginModal } from '@/store/global'
// import UserAddress from '../common/UserAddress'
import AvatarSkeleton from '../common/AvatarSkeleton'
import { Skeleton } from 'antd'
import Avatar from '../common/Avatar'
import logo from '@/images/icon/logo.svg'

function Header () {
  const { projectId } = useParams()
  const { data: project } = useProjectQuery(projectId)
  const { userLogined, firstLoad } = useUserInfo()
  const dispath = useDispatch()
  const handleClick = () => {
    dispath(setLoginModal(true))
  }
  return (
    <header
      className={clsx(
        'transition duration-300 ease-in-out',
        'backdrop-blur-sm'
      )}
    >
      <div className='px-4 py-2 lg:px-20 lg:py-2.5'>
        <div className='flex items-center justify-between h-10 lg:h-16'>
          <div className='flex items-center'>
            <Link to={`/app/${projectId}/campaign`} className='mr-1 lg:mr-16'>
              {!firstLoad ? (
                <Skeleton.Avatar />
              ) : (
                <img
                  src={projectId ? project?.avatarUrl : logo}
                  alt='logo'
                  className='h-6 lg:h-10 object-contain'
                />
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
