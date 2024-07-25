import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import starSVG from '@/images/wise/star2.svg';
import timerSVG from '@/images/wise/timer.svg';
import clsx from 'clsx';
import { useMemo } from 'react';
import { cn } from '@/utils/conf';
import social from '@/utils/social';
import useWiseScore from '@/hooks/useWiseScore';

const addressLogoMap = {
  0: social.eth,
  1: social.ton,
  2: social.tg,
};

export default function UserScore() {
  const { data: user, isGranted, isLoaded } = useWiseScore();

  const WalletIcon = addressLogoMap[user?.addressType];
  const rankCF = useMemo(() => {
    const rank = user?.rank;
    const rt = {};
    if (rank === 0) {
      // 没有更新
      rt.display = '500+';
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

  return isLoaded ? (
    isGranted && (
      <div
        className={cn(
          'flex items-center justify-between',
          'bg-linear10 rounded-lg px-5 py-2'
        )}
      >
        <div className="flex items-center gap-x-2.5">
          <span
            className={cn(
              'size-9  text-xs text-center bg-cover bg-center flex items-center justify-center',
              'text-[#F8C685]/60 text-xs'
            )}
          >
            {rankCF.display}
          </span>

          <span
            className={clsx(
              'inline-flex items-center gap-x-0.5 font-medium text-sm ',
              'bg-linear11 bg-clip-text text-transparent'
            )}
          >
            {WalletIcon && <WalletIcon className="fill-[#F8C685]" />}
            {user?.addressType === 2
              ? user.address
              : shortAddressV1(user.address ?? '')}
            (you)
          </span>
        </div>

        <span className={cn('text-sm ', 'text-[#F8C685]')}>
          {formatImpact(user.totalScore)}
        </span>
      </div>
    )
  ) : (
    <div className="h-[52px] bg-linear10 animate-pulse" />
  );
}
