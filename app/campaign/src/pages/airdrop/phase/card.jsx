import { formatImpact } from '@tbook/utils/lib/conf';
import clsx from 'clsx';
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
}) {
  const handleClick = () => {
    setModalData({ amount: num, symbol });
    openModal();
  };
  return (
    <div
      className={clsx(
        'h-[294px] w-full flex flex-col justify-between rounded-2xl px-6 py-4',
        {
          'bg-[#0f0f0f] opacity-20': status !== statusMap.ongoing,
          'bg-gradient-to-r from-[#1d0618] to-[#160C25]':
            status === statusMap.ongoing,
        }
      )}
    >
      <div className='space-y-4'>
        <div className='flex items-center gap-x-3 font-zen-dot text-2xl uppercase'>
          <img
            src={logoUrl}
            className='size-10 rounded-full'
            alt='project logo'
          />
          {symbol}
        </div>
        <div className='font-zen-dot text-2xl'>{formatImpact(num)}</div>
      </div>

      <button
        disabled={status !== statusMap.ongoing}
        onClick={handleClick}
        className={clsx('w-[120px] rounded text-white py-1', {
          'bg-[#904BF6] opacity-20': status === statusMap.notStarted,
          'bg-[#904BF6]': status === statusMap.ongoing,
          'bg-[rgb(254,252,232)]/10': status === statusMap.ended,
        })}
      >
        Claim
      </button>
    </div>
  );
}