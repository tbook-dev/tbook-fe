import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import { useParams } from 'react-router-dom';
import CheckedIcon from '@/images/icon/svgr/checked.svg?react';

const typeMap = {
  1: {
    icon: NotcoinIcon,
    title: 'Notcoin Ranger',
    desc: 'Hold at least 1 Notcoin in TON wallet.',
  },
  2: {
    icon: TonIcon,
    title: 'Toncoin LP',
    desc: 'Have transaction record of Toncoin.',
  },
  3: {
    icon: NotcoinIcon,
    title: 'Notcoin LP',
    desc: 'Have transaction record of Notcoin.',
  },
  4: {
    icon: EthIcon,
    title: 'ETH LP',
    desc: 'Have transaction record of ETH.',
  },
};
export default function Ranger () {
  const { type } = useParams();
  const handleClick = () => {
    console.log('click');
  };
  const Icon = typeMap[type]?.icon;
  const title = typeMap[type]?.title;
  const desc = typeMap[type]?.desc;
  return (
    <div className='px-5 mt-3 lg:px-0 max-w-md mx-auto'>
      <div className='flex flex-col items-center gap-12'>
        <Icon width='180px' height='180px' />

        <div className='space-y-5 w-full'>
          <h2 className='mt-2 text-xl text-center'>{title}</h2>
          <div className='px-5 py-4 space-y-4 rounded-xl bg-white/10'>
            <h2 className='text-base'>Prerequisite</h2>
            <div className='flex items-center justify-between'>
              <p className='text-sm text-white/60'>{desc}</p>
              <CheckedIcon width='24px' height='24px' />
            </div>
          </div>
          <button
            onClick={handleClick}
            className='rounded-md bg-[#904BF6] btn-click w-full h-12 text-xs'
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
