import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
export default function UnloginCard({ symbol, active, logoUrl }) {
  const dispath = useDispatch();
  const handleClick = () => {
    dispath(setConnectWalletModal(true));
  };
  return (
    <div
      className={clsx(
        'h-[196px] w-full flex flex-col justify-between rounded-2xl px-6 py-4',
        active
          ? 'bg-gradient-to-r from-[#1d0618] to-[#160C25]'
          : 'bg-black/20 opacity-20'
      )}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-x-3 font-zen-dot text-2xl uppercase">
          <img
            src={logoUrl}
            className="size-10 rounded-full"
            alt="project logo"
          />
          {symbol}
        </div>
        <div className="text-base">
          Connect wallet to check the GAME you are eligible to claim
        </div>
      </div>

      <button
        disabled={!active}
        onClick={handleClick}
        className={clsx('w-[120px] rounded text-white py-1', 'bg-[#904BF6]')}
      >
        Connect wallet
      </button>
    </div>
  );
}
