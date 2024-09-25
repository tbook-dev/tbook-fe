import LeaderboardSkeleton from './LeaderBoardSkeleton';

import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';

import TonIcon from './icons/Ton.svg?react';
import TonLight from './icons/TonLight.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import TgIcon from '@/images/icon/tg-blue.svg?react';

import Rank1 from './icons/Rank1.svg?react';
import Rank2 from './icons/Rank2.svg?react';
import Rank3 from './icons/Rank3.svg?react';

import clsx from 'clsx';

const getAddressLogo = (addressType, rank) => {
  const addressLogoMap = {
    0: <EthIcon />,
    1: rank <= 3 ? <TonIcon /> : <TonLight />,
    2: <TgIcon />,
  };

  return addressLogoMap[ addressType ] || null;
};


const RankDisplay = ({ rank }) => {

  if ([1,2,3].includes(rank)) {
    switch (rank) {
      case 1: return <Rank1 />;
      case 2: return <Rank2 />;
      case 3: return <Rank3 />;
      default: return null;
    }
  }

  return (
    <span className="flex-none w-8 pl-3 text-lg font-medium text-[#9A81E6]">
      { rank }
    </span>
  );
};

export default function ScoreItem({ user }) {

  const walletUrl = getAddressLogo(user?.addressType, user?.rank);

  const getBgColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-[#9A81E6]';
      case 2: return 'bg-[#C0ACFD]';
      case 3: return 'bg-[#D5C8FF]';
      default: return 'bg-white';
    }
  };

  return user ? (
    <div
      className={clsx(
        'p-4 flex items-center justify-between gap-x-3 rounded-2xl text-lg',
        getBgColor(user.rank),
        [ 1, 2, 3 ].includes(user.rank)
          ? 'h-[70px] border border-white/10  rounded-2xl'
          : 'opacity-100'
      )}
    >
      <RankDisplay rank={ user.rank } />
      <div
        className={clsx(
          'flex-auto flex items-center gap-x-1 font-medium text-md',
          user?.addressType === 1
            ? 'bg-clip-text text-transparent'
            : 'text-black'
        )}
      >
        {walletUrl}
        <span className={ clsx("text-lg ml-1", [ 1, 2, 3 ].includes(user.rank) ? 'text-[#5812B1]' : 'text-[#9A81E6]')}>
          { shortAddressV1(user.address ?? '') }
        </span>

      </div>

      <span className={ clsx("flex-none font-bold text-black", [ 1, 2, 3 ].includes(user.rank) ? "text-2xl" : "text-lg")}>
        { formatImpact(user.pointNum)}
      </span>
    </div>
  ) : (
    <LeaderboardSkeleton size={1} />
  );
}
