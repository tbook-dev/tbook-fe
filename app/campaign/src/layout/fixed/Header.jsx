import { Link } from 'react-router-dom';
import logo from '@/images/icon/logo.svg';
import clsx from 'clsx';
import { useResponsive } from 'ahooks';
import { useSelector } from 'react-redux';
import Links from '../common/Links';
import MobleMenu from '../common/MobleMenu';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/store/global';
import { useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
// import UserAddress from '../common/UserAddress'
import AvatarSkeleton from '../common/AvatarSkeleton';
import Avatar from '../common/Avatar';

function Header () {
  const { pc } = useResponsive();
  const { isConnected } = useAccount();
  const headerTransparent = useSelector(s => s.global.headerTransparent);
  const { userLogined, firstLoad, user } = useUserInfo();
  const dispath = useDispatch();
  const { open } = useWeb3Modal();
  const handleClick = () => {
    dispath(setLoginModal(true));
  };
  return (
    <header
      className={clsx(
        'top-0 z-10 fixed inset-x-0',
        'transition duration-300 ease-in-out',
        pc && headerTransparent ? 'bg-transpant ' : 'bg-black'
      )}
    >
      <div className='px-4 py-1.5 lg:px-20 bg-black'>
        <div className='flex items-center justify-between h-10'>
          <div className='flex items-center'>
            <Link to='/' className='mr-1 lg:mr-16'>
              <img src={logo} className='h-6 object-contain' />
            </Link>
          </div>

          <div>
            {!firstLoad ? (
              <AvatarSkeleton />
            ) : userLogined ? (
              <Avatar />
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
