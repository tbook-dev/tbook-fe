import { formatImpact, shortAddressV1 } from '@tbook/utils/lib/conf';
import starSVG from '@/images/wise/star2.svg';
import timerSVG from '@/images/wise/timer.svg';
import clsx from 'clsx';
import { useMemo } from 'react';
import { cn } from '@/utils/conf';
import useWiseScore from '@/hooks/useWiseScore';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import TgIcon from '@/images/icon/svgr/tg.svg?react';

const addressLogoMap = {
  0: <EthIcon />,
  1: <TonIcon />,
  2: <TgIcon />,
};

export default function UserScore({ className }) {
  const { data: user } = useWiseScore();
  const walletIcon = addressLogoMap[user?.addressType];
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

  return user ? (
    <div
      className={cn(
        'flex items-center justify-between',
        'rounded-lg px-5 py-2',
        className
      )}
    >
      <div className="flex items-center gap-x-2.5">
        <span
          className={cn(
            'size-9 text-center bg-cover bg-center flex items-center justify-center',
            'font-medium text-xs'
          )}
        >
          {rankCF.display}
        </span>

        <span
          className={clsx(
            'inline-flex items-center gap-x-0.5 font-medium text-sm',
            user?.addressType === 1 &&
              'bg-linear15 bg-clip-text text-transparent'
          )}
        >
          {walletIcon}
          {user?.addressType === 2
            ? user.address
            : shortAddressV1(user.address ?? '')}
          (you)
        </span>
      </div>

      <span className="text-xs">{formatImpact(user.totalScore)}</span>
    </div>
  ) : (
    <div className="h-[52px] bg-[#1f1f1f] animate-pulse" />
  );
}
