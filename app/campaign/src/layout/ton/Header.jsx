import logo from '@/images/icon/logo.svg';
import clsx from 'clsx';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/store/global';
import AvatarSkeleton from '../common/AvatarSkeleton';
import Avatar from '../common/Avatar';

function Header () {
  const { userLogined, firstLoad } = useUserInfo();
  const dispath = useDispatch();
  const handleClick = () => {
    dispath(setLoginModal(true));
  };
  return (
    <header
      className={clsx(
        'top-0 z-30  text-white',
        'transition duration-300 ease-in-out',
        'sticky bg-black'
      )}
    >
      <div className='px-4 py-1.5 lg:px-20'>
        <div className='flex items-center justify-between h-10'>
          <div className='flex items-center'>
            <img src={logo} className='h-6 object-contain' />
          </div>

          <div>
            {!firstLoad ? (
              <AvatarSkeleton />
            ) : userLogined ? (
              <div className='flex items-center gap-x-2'>
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
  );
}

export default Header;