import clsx from 'clsx';
import { shortAddressV1, formatImpact } from '@tbook/utils/lib/conf';

export default function BoardTop ({
  rank = 1,
  className,
  address,
  score,
  avatar,
}) {
  return (
    <div className={clsx('space-y-4 flex flex-col items-center', className)}>
      <div
        className={clsx(
          'ring-2 ring-[#FFDFA2]  rounded-full relative',
          rank === 1 ? 'size-16' : 'size-12'
        )}
        style={{ backgroundImage: `url(${avatar})` }}
      >
        <span
          className={clsx(
            'absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-[#E59A40] text-xs rounded-full flex items-center justify-center text-black',
            rank === 1 ? 'size-[22px]' : 'size-[19px]'
          )}
        >
          {rank}
        </span>
      </div>
      <div className='text-center'>
        <p className='font-bold text-[10px] text-[#F8C685]'>
          {shortAddressV1(address ?? '')}
        </p>
        <p className='font-zen-dot text-[6px] text-white'>
          {formatImpact(score)}
        </p>
      </div>
    </div>
  );
}
