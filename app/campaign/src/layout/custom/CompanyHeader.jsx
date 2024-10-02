import clsx from 'clsx';
import { useLoaderData, Link, useParams } from 'react-router-dom';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/store/global';
// import UserAddress from '../common/UserAddress'
import AvatarSkeleton from '../common/AvatarSkeleton';
import Avatar from '../common/Avatar';
import fallbackLogo from '@/images/error/logo.svg';

function CompanyHeader ({ link = '', title = '',  }) {

  const { isLightTheme } = useLoaderData();
  const { userLogined, firstLoad } = useUserInfo();
  const dispath = useDispatch();
  const handleClick = () => {
    dispath(setLoginModal(true));
  };

  return (
    <header
      className={ clsx(
        'transition duration-300 ease-in-out',
        'backdrop-blur-sm'
      ) }
    >
      <div className={ clsx('px-4 py-1.5 lg:px-20', 
        isLightTheme ? 'bg-[#FCFAFD] text-black' : 'bg-black text-white') }>
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
                className={ clsx("px-2 py-1 text-sm  border rounded-md lg:hover:opacity-70", 
                  isLightTheme ? 'bg-white border-black' : 'bg-black border-white'
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
