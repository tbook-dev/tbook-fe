import clsx from 'clsx';
import { shortAddressV1, formatImpact } from '@tbook/utils/lib/conf';

const textMap = {
  1: '🥇',
  2: '🥈',
  3: '🥉',
};
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
          'size-6'
        )}
        style={{ backgroundImage: `url(${avatar})` }}
      >
        <span
          className={clsx(
            'absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2  text-lg '
          )}
        >
          {textMap[rank]}
        </span>
      </div>
      <div className='text-center'>
        <p className='font-bold text-xs text-[#F8C685]'>
          {shortAddressV1(address ?? '')}
        </p>
        <p className='text-xs font-medium text-[#F8C685]/60'>
          {formatImpact(score)}
        </p>
      </div>
    </div>
  );
}
