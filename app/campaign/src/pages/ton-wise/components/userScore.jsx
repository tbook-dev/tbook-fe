import LeaderboardSkeleton from './leaderBoard-skeleton';
import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import starSVG from '@/images/wise/star2.svg';
import timerSVG from '@/images/wise/timer.svg';
import clsx from 'clsx';
import { useMemo } from 'react';
import { cn } from '@/utils/conf';
import social from '@/utils/social';

const addressLogoMap = {
  0: social.eth,
  1: social.ton,
  2: social.tg,
};

const clsMap = {
  // wise-score
  1: {
    container: 'bg-[rgba(144,75,246)]/[0.10] px-5 py-2',
    rink: 'text-black  font-bold  text-[10px]',
    score: 'text-[#904BF6] font-zen-dot',
    tonAddress:
      'bg-gradient-to-r from-[#2D83EC] to-[#1AC9FF]  bg-clip-text text-transparent',
    address: {
      0: 'fill-black',
      1: 'fill-[#1AC9FF]',
      2: 'fill-black',
    },
  },
  // renaissance
  2: {
    container: 'bg-linear10 rounded-lg px-5 py-2',
    rink: 'text-[#F8C685]/60 text-xs',
    score: 'text-[#F8C685]',
    tonAddress: 'bg-linear11 bg-clip-text text-transparent',
    address: {
      0: 'fill-black',
      1: 'fill-[#F8C685]',
      2: 'fill-black',
    },
  },
};
export default function UserScore ({ user, type = 1 }) {
  const WalletIcon = addressLogoMap[user?.addressType];
  const rankCF = useMemo(() => {
    const rank = user?.rank;
    const rt = {};
    if (rank === 0) {
      // 没有更新
      rt.display = '';
      rt.background = timerSVG;
    } else if (rank === -1) {
      rt.display = '500+';
      rt.background = starSVG;
    } else {
      rt.display = rank;
      rt.background = starSVG;
    }
    return rt;
  }, [user]);

  return user ? (
    <div
      className={cn(
        'flex items-center justify-between',
        clsMap[type].container
      )}
    >
      <div className='flex items-center gap-x-2.5'>
        <span
          className={cn(
            'size-9  text-xs text-center bg-cover bg-center flex items-center justify-center',

            clsMap[type].rink
          )}
          style={{
            backgroundImage: type === 1 && `url(${rankCF.background})`,
          }}
        >
          {rankCF.display}
        </span>

        {type === 1 && (
          <img src={user.avatar} className='size-[42px] rounded-full' />
        )}
        <span
          className={clsx(
            'inline-flex items-center gap-x-0.5 font-medium text-sm ',
            user?.addressType === 1 ? clsMap[type].tonAddress : 'text-black'
          )}
        >
          {WalletIcon && (
            <WalletIcon className={clsMap[type].address[user?.addressType]} />
          )}
          {user?.addressType === 2
            ? user.address
            : shortAddressV1(user.address ?? '')}
          ({type === 1 ? 'me' : 'you'})
        </span>
      </div>

      <span className={cn('text-sm ', clsMap[type].score)}>
        {formatImpact(user.totalScore)}
      </span>
    </div>
  ) : (
    <LeaderboardSkeleton size={1} />
  );
}
