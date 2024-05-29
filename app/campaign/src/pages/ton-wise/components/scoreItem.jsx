import LeaderboardSkeleton from './leaderBoard-skeleton';
import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import starSVG from '@/images/wise/star2.svg';
import tonSVG from '@/images/wise/ton.svg';
import tgSVG from '@/images/wise/tg2.svg';
import ethSVG from '@/images/wise/eth.svg';
import clsx from 'clsx';

const addressLogoMap = {
  0: ethSVG,
  1: tonSVG,
  2: tgSVG,
};
export default function ScoreItem ({ user }) {
  const walletUrl = addressLogoMap[user?.addressType];
  return user ? (
    <div className='flex items-center justify-between px-5 py-2'>
      <div className='flex items-center gap-x-2.5'>
        <span
          className='size-9 text-black text-xs text-center bg-cover bg-center flex items-center justify-center text-[10px] font-bold'
          style={{
            backgroundImage: `url(${starSVG})`,
          }}
        >
          {user.rank}
        </span>
        <img src={user.avatar} className='size-[42px] rounded-full' />
        <span
          className={clsx(
            'inline-flex items-center gap-x-0.5 font-medium text-sm ',
            user?.addressType === 1
              ? 'bg-gradient-to-r from-[#2D83EC] to-[#1AC9FF]  bg-clip-text text-transparent'
              : 'text-black'
          )}
        >
          {walletUrl && (
            <img src={walletUrl} className='w-5 h-5' alt='address type' />
          )}
          {user?.addressType === 2
            ? // ? user.address  直接显示一眼就处理的逻辑
              user.address
            : shortAddressV1(user.address ?? '')}
        </span>
      </div>

      <span className='text-[#904BF6] text-sm font-zen-dot'>
        {formatImpact(user.totalScore)}
      </span>
    </div>
  ) : (
    <LeaderboardSkeleton size={1} />
  );
}
