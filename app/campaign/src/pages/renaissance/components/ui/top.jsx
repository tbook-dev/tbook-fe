import clsx from 'clsx';
import { shortAddressV1, formatImpact } from '@tbook/utils/lib/conf';

export default function BoardTop ({ rank = 1, className, address, score }) {
  const clsxMap = {
    1: 'size-[100px]',
    2: 'size-20',
    3: 'size-20',
  };

  return (
    <div className={clsx('space-y-4', className)}>
      <div
        className={clsx(
          clsxMap[rank],
          'ring-2 ring-[#9E78D6] relative rounded-full'
        )}
      >
        xxx
      </div>
      <div className='text-sm text-center'>
        <p className='font-medium'>{shortAddressV1(address ?? '')}</p>
        <p className='font-zen-dot text-[#FFB800]'>{formatImpact(score)}</p>
      </div>
    </div>
  );
}
