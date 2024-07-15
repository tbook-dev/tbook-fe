import LeaderboardSkeleton from './leaderBoard-skeleton';
import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import TgIcon from '@/images/icon/svgr/tg.svg?react';
import clsx from 'clsx';

const addressLogoMap = {
  0: <EthIcon />,
  1: <TonIcon />,
  2: <TgIcon />,
};
export default function ScoreItem({ user }) {
  const walletUrl = addressLogoMap[user?.addressType];
  return user ? (
    <div
      className={clsx(
        'p-4 flex items-center justify-between gap-x-3',
        [1, 2, 3].includes(user.rank)
          ? 'border border-white/10 bg-[rgb(255,190,0)]/10 rounded-2xl'
          : 'opacity-60'
      )}
    >
      <span className="text-xs font-medium w-8 flex-none pl-1">
        {user.rank}
      </span>
      <div
        className={clsx(
          'flex-auto flex items-center gap-x-1 font-medium text-sm',
          user?.addressType === 1
            ? 'bg-gradient-to-r from-[#2D83EC] to-[#1AC9FF]  bg-clip-text text-transparent'
            : 'text-white'
        )}
      >
        {walletUrl}
        {user?.addressType === 2
          ? // ? user.address  直接显示一眼就处理的逻辑
            user.address
          : shortAddressV1(user.address ?? '')}
      </div>

      <span className="flex-none text-sm">{formatImpact(user.totalScore)}</span>
    </div>
  ) : (
    <LeaderboardSkeleton size={1} />
  );
}
