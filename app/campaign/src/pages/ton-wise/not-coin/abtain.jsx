import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import { useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import { stonfi } from '@/utils/conf';
export default function Ranger () {
  const handleClick = useCallback(() => {
    WebApp.openTelegramLink(stonfi);
  }, []);
  return (
    <div className='px-5 mt-3 lg:px-0 max-w-md mx-auto'>
      <div className='flex flex-col items-center gap-12'>
        <div className='opacity-70'>
          <NotcoinIcon width='180px' height='180px' />
        </div>
        <div className='space-y-5 w-full'>
          <h2 className='mt-2 text-xl text-center'>Notcoin Ranger</h2>
          <div className='px-5 py-4 space-y-4 rounded-xl bg-white/10'>
            <h2 className='text-base'>Prerequisite</h2>
            <p className='text-sm text-white/60'>
              Hold at least 1 Notcoin in TON wallet
            </p>
          </div>
          <button
            onClick={handleClick}
            className='rounded-md bg-[#904BF6] text-white hover:opacity-70 btn-click w-full h-10'
          >
            Go Obtain
          </button>
        </div>
      </div>
    </div>
  );
}
