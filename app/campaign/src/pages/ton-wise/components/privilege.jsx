import { useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import { useNavigate } from 'react-router-dom';
import useWallet from '@/hooks/useWallet';

export default function Privilege() {
  const navigate = useNavigate();
  const { getWallets } = useWallet();
  const [tonKit] = getWallets('ton');

  const list = useMemo(() => {
    return [
      {
        text: 'WISE Credit SBT',
        img: <SBTIcon className="size-12" />,
        handle: () => {
          if (tonKit.connected) {
            navigate('/wise-score/sbt');
          } else {
            tonKit.connectHandle();
          }
        },
      },
    ];
  }, [tonKit]);
  return (
    <div className="space-y-2">
      <h2 className="text-sm text-white">
        Claim Rewards based on your WISE Credit Rating!
      </h2>
      <div className="flex items-center gap-x-2">
        {list.map((v) => {
          return (
            <div
              className="space-y-1 cursor-pointer"
              key={v.text}
              onClick={v.handle}
            >
              <div className="rounded-full bg-white/5 flex items-center justify-center">
                {v.img}
              </div>
              <span className="text-xs">{v.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
