import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import defaultAvator from '@/images/icon/defaultAvator.svg';
import { shortAddress } from '@tbook/utils/lib/conf';
import useSocial from '@/hooks/useSocial';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setLoginModal } from '@/store/global';
import { useTelegram } from '@/hooks/useTg';

export default function PersonalInfo () {
  const { data, userLogined, user } = useUserInfoQuery();
  const { socialList } = useSocial();
  const { isTMA } = useTelegram();
  const { open } = useWeb3Modal();
  const dispath = useDispatch();
  const handleLogin = useCallback(() => {
    dispath(setLoginModal(true));
  }, []);
  return (
    <div className='pt-4 flex flex-col items-center gap-y-4'>
      <img
        src={data?.user?.avatar ?? defaultAvator}
        alt='user avatar'
        className='w-20 h-20 rounded-full'
      />

      {user?.wallet ? (
        <p
          className='text-[#131517] text-base font-medium cursor-pointer'
          onClick={async () => await open()}
        >
          {shortAddress(data?.user?.wallet)}
        </p>
      ) : (
        <button className='text-[#006EE9] text-base' onClick={handleLogin}>
          Log In
        </button>
      )}

      <div className='flex items-center gap-x-3'>
        {socialList.map(v => {
          const logo = (
            <img
              src={v.connected ? v.activePic : v.picUrl}
              className='w-4 h-4 object-contain object-center'
            />
          );
          return v.connected ? (
            <span key={v.name}>{logo}</span>
          ) : (
            <button
              disabled={v.connected}
              key={v.name}
              onClick={userLogined ? () => v.loginFn(false) : null}
              rel='nofollow noopener noreferrer'
            >
              {logo}
            </button>
          );
        })}
      </div>
    </div>
  );
}
