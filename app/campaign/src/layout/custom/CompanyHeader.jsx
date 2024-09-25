import clsx from 'clsx';
import { useLoaderData, Link, useParams } from 'react-router-dom';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/store/global';
// import UserAddress from '../common/UserAddress'
import AvatarSkeleton from '../common/AvatarSkeleton';
import { Skeleton } from 'antd';
import Avatar from '../common/Avatar';
import fallbackLogo from '@/images/error/logo.svg';
import LazyImage from '@/components/lazyImage';

function CompanyHeader ({ link = '', title = '', backgroundColor = '', textColor = 'text-white', borderColor = 'border-white' }) {

  // const { project, projectUrl, isUsingSubdomain } = useLoaderData();
  const { userLogined, firstLoad } = useUserInfo();
  const dispath = useDispatch();
  const handleClick = () => {
    dispath(setLoginModal(true));
  };
  // const logoUrl = project?.avatarUrl;
  return (
    <header
      className={ clsx(
        'transition duration-300 ease-in-out',
        'backdrop-blur-sm'
      ) }
    >
      <div className={ clsx('px-4 py-1.5 lg:px-20', backgroundColor) }>
        <div className='flex items-center justify-between h-10'>
          <div className='flex items-center'>
            <Link
              to={ link }
              className='mr-1 text-lg font-bold lg:mr-16'
            >
              { title }
            </Link>
          </div>

          <div>
            { !firstLoad ? (
              <AvatarSkeleton />
            ) : userLogined ? (
              <div className='flex items-center gap-x-4'>
                <Avatar />
              </div>
            ) : (
              <button
                className={ clsx("px-2 py-1 text-sm  border rounded-md lg:hover:opacity-70", textColor, borderColor
                ) }
                onClick={ handleClick }
              >
                Log In
              </button>
            ) }
          </div>
        </div>
      </div>
    </header>
  );
}

export default CompanyHeader;
