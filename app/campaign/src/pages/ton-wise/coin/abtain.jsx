import NotcoinIcon from '@/images/icon/svgr/notcoin.svg?react';
import TonIcon from '@/images/icon/svgr/ton.svg?react';
import EthIcon from '@/images/icon/svgr/eth.svg?react';
import RefreshIcon from '@/images/icon/svgr/refresh.svg?react';
import { useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import { stonfi, dedustio } from '@/utils/tma';
import { useParams } from 'react-router-dom';

const typeMap = {
  1: {
    icon: <TonIcon className="size-[180px]" />,
    title: 'Toncoin Ranger',
    desc: 'Have transaction record of Toncoin.',
  },
  2: {
    icon: <NotcoinIcon className="size-[180px]" />,
    title: 'Notcoin Ranger',
    desc: 'Have transaction record of Notcoin.',
  },
  3: {
    icon: <EthIcon className="size-[180px]" />,
    title: 'ETH Ranger',
    desc: 'Have transaction record of ETH.',
  },
  4: {
    icon: (
      <div className="relative">
        <TonIcon className="size-[180px]" />
        <span className="text-[40px] absolute bottom-0 right-0 font-medium">
          %
        </span>
      </div>
    ),
    title: 'Toncoin Staker',
    desc: (
      <>
        <p>
          Stake on
          <button
            onClick={() => WebApp.openTelegramLink(stonfi)}
            className="text-[#2D83EC] mx-1"
          >
            ston.fi
          </button>
          and
          <button
            onClick={() => WebApp.openTelegramLink(dedustio)}
            className="text-[#2D83EC] mx-1"
          >
            dedust.io
          </button>
          are both automatically detected!
        </p>
        <p>More platform support coming, stay tuned!</p>
      </>
    ),
  },
  5: {
    icon: (
      <div className="relative">
        <TonIcon className="size-[180px]" />
        <RefreshIcon className="absolute bottom-0 right-0" />
      </div>
    ),
    title: 'Liquidity Provider',
    desc: (
      <>
        <p>
          Provide liquidity
          <button
            onClick={() => WebApp.openTelegramLink(stonfi)}
            className="text-[#2D83EC] mx-1"
          >
            ston.fi
          </button>
          and
          <button
            onClick={() => WebApp.openTelegramLink(dedustio)}
            className="text-[#2D83EC] mx-1"
          >
            dedust.io
          </button>
          are both automatically detected!
        </p>
        <p>More platform support coming, stay tuned!</p>
      </>
    ),
  },
};
export default function Ranger() {
  const { type } = useParams();
  const handleClick = useCallback(() => {
    WebApp.openTelegramLink(stonfi);
  }, []);

  const Icon = typeMap[type]?.icon;
  const title = typeMap[type]?.title;
  const desc = typeMap[type]?.desc;
  return (
    <div className="px-5 mt-3 lg:px-0 max-w-md mx-auto">
      <div className="flex flex-col items-center gap-12">
        <div className="opacity-70">{Icon}</div>
        <div className="space-y-5 w-full">
          <h2 className="mt-2 text-xl text-center">{title}</h2>
          <div className="px-5 py-4 space-y-4 rounded-xl bg-white/10">
            <h2 className="text-base">Prerequisite</h2>
            <div className="text-sm text-white/60">{desc}</div>
          </div>
          <button
            onClick={handleClick}
            className="rounded-md bg-[#904BF6] text-white hover:opacity-70 btn-click w-full h-10"
          >
            Go Obtain
          </button>
        </div>
      </div>
    </div>
  );
}
