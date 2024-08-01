import { useResponsive } from 'ahooks';
// import Page404 from '@/pages/404';
import LargeScreenOnly from '@/components/largeScreenOnly';
import Page from './page';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import emptyIcon from '@/images/icon/empty.svg';
import { useDispatch } from 'react-redux';
import { setLoginModal } from '@/store/global';
import Loading from '@/components/pageFallback';

export default function Attestation () {
  const { pc } = useResponsive();
  const { userLogined, firstLoad } = useUserInfoQuery();
  const dispath = useDispatch();

  const handleClick = () => {
    dispath(setLoginModal(true));
  };

  return pc ? (
    !firstLoad ? (
      <Loading text="Aggregating metrics..."/>
    ) : userLogined ? (
      <Page />
    ) : (
      <div className='pt-[130px]'>
        <div className='flex flex-col items-center justify-center gap-y-4'>
          <img src={emptyIcon} alt='empty' className='size-[160px]' />
          <p className='text-sm text-[#717374]'>
            Log in to view and manage your Attestation.
          </p>
          <button
            className='px-5 py-3 rounded-md bg-[#904BF6] w-[280px] hover:opacity-70'
            onClick={handleClick}
          >
            Log In
          </button>
        </div>
      </div>
    )
  ) : (
    <LargeScreenOnly />
  );
}
