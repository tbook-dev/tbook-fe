import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';

export default function Ranger () {
  const handleClick = () => {
    console.log('click');
  };
  return (
    <div className='px-5 mt-3 lg:px-0 max-w-md mx-auto'>
      <div className='flex flex-col items-center gap-12'>
        <NotcoinIcon width='180px' height='180px' />

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
            className='rounded-md bg-[#904BF6] btn-click w-full h-10 text-xs'
          >
            <p className='font-syne text-xs font-bold text-white'>
              Share your honor
            </p>
            <span className='flex  justify-center items-center text-white/60'>
              First share to earn 500
              <span className='mx-1'>
                <TpointIcon />
              </span>
              TPoints
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
