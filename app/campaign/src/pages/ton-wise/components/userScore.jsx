import LeaderboardSkeleton from './leaderBoard-skeleton';
import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import starSVG from '@/images/wise/star2.svg';
import timerSVG from '@/images/wise/timer.svg';
import tonSVG from '@/images/wise/ton.svg';
import tgSVG from '@/images/wise/tg2.svg';
import ethSVG from '@/images/wise/eth.svg';
import clsx from 'clsx';
import { useMemo } from 'react';

const addressLogoMap = {
  0: ethSVG,
  1: tonSVG,
  2: tgSVG,
};
export default function UserScore ({ user }) {
  const walletUrl = addressLogoMap[user?.addressType];
  const rankCF = useMemo(() => {
    const rank = user?.rank;
    const rt = {};
    if (rank === 0) {
      // 没有更新
      rt.display = '';
      rt.background = timerSVG;
    } else if (rank === -1) {
      rt.display = '100+';
      rt.background = starSVG;
    } else {
      rt.display = rank;
      rt.background = starSVG;
    }
    return rt;
  }, [user]);

  return user ? (
    <div className='flex items-center justify-between px-5 py-2 bg-[rgba(144,75,246)]/[0.10]'>
      <div className='flex items-center gap-x-2.5'>
        <span
          className='size-9 text-black text-xs text-center bg-cover bg-center flex items-center justify-center text-[10px] font-bold'
          style={{
            backgroundImage: `url(${rankCF.background})`,
          }}
        >
          {rankCF.display}
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
            ? user.address
            : shortAddressV1(user.address ?? '')}
          (me)
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
