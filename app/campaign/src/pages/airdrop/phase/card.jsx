import { formatImpact } from '@tbook/utils/lib/conf';
import clsx from 'clsx';
import LazyImage from '@/components/lazyImage';
const statusMap = {
  notStarted: 1,
  ongoing: 2,
  ended: 3,
};

export default function AirDropCard ({
  num,
  symbol,
  logoUrl,
  status,
  setModalData,
  openModal,
  phaseNum,
}) {
  const handleClick = () => {
    setModalData({ amount: num, symbol, phaseNum });
    openModal();
  };
  console.log({ status });
  return (
    <div
      className={clsx(
        'h-[196px] w-full flex flex-col justify-between rounded-2xl px-6 py-4',
        status === statusMap.ongoing
          ? 'bg-gradient-to-r from-[#1d0618] to-[#160C25]'
          : 'bg-[#0f0f0f] opacity-20'
      )}
    >
      <div className='space-y-4'>
        <div className='flex items-center gap-x-3 font-zen-dot text-2xl uppercase'>
          <LazyImage
            src={logoUrl}
            className='size-10 rounded-full'
            alt='project logo'
          />
          {symbol}
        </div>
        <div className='font-zen-dot text-2xl'>{formatImpact(num)}</div>
      </div>

      <button
        disabled={status !== statusMap.ongoing || num === '0'}
        onClick={handleClick}
        className={clsx('w-[120px] rounded py-1', {
          'bg-[#904BF6] text-white opacity-20': status === statusMap.notStarted,
          'bg-[#904BF6] text-white ': status === statusMap.ongoing,
          'bg-[rgb(254,252,232)]/10 text-white ':
            status === statusMap.ended || num === '0',
        })}
      >
        {num === '0' ? 'Claim' : 'Claim'}
      </button>
    </div>
  );
}
