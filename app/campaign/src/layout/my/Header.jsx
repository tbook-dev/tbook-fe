import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useResponsive } from 'ahooks'
import Links from './Links'
import MobleMenu from './MobleMenu'
import { useParams } from 'react-router-dom'
import useProjectQuery from '@/hooks/useProjectQuery'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useDispatch } from 'react-redux'
import { setLoginModal } from '@/store/global'
// import UserAddress from '../common/UserAddress'
import AvatarSkeleton from '../common/AvatarSkeleton'
import { Skeleton } from 'antd'
import Avatar from '../common/Avatar'

function Header () {
  const { pc } = useResponsive()
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
        'text-black dark:text-white shadow-d2',
        'transition duration-300 ease-in-out'
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
                  src={project?.avatarUrl}
                  alt='logo'
                  className='h-6 lg:h-10 object-contain'
                />
              )}
            </Link>
          </div>

          <Links hidden={!pc} />

          <div>
            {!firstLoad ? (
              <AvatarSkeleton />
            ) : userLogined ? (
              <div className='flex items-center gap-x-2'>
                <Avatar />
                <MobleMenu />
              </div>
            ) : (
              <button
                className='px-2 py-1 text-sm rounded-md bg-white'
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
