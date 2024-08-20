import { useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import AmbassadorIcon from '@/images/icon/svgr/ambassador.svg?react';
import { useNavigate } from 'react-router-dom';
import useWallet from '@/hooks/useWallet';
import { useAmbassadorLevel } from '@/hooks/useAmbassador';

export default function Privilege() {
  const navigate = useNavigate();
  const { getWallets } = useWallet();
  const [tonKit] = getWallets('ton');
  const { data: userLevel } = useAmbassadorLevel();

  const list = useMemo(() => {
    return [
      {
        text: 'WISE Credit SBT',
        img: <SBTIcon className="size-[34px]" />,
        handle: () => {
          if (tonKit.connected) {
            navigate('/wise-score/sbt/1');
          } else {
            tonKit.connectHandle();
          }
        },
        show: true,
      },
      {
        text: 'Ambassador',
        img: <AmbassadorIcon className="size-[30px]" />,
        handle: () => {
          navigate('/wise-score/ambassador');
        },
        show: userLevel?.level >= 0,
      },
    ];
  }, [tonKit, navigate, userLevel]);
  return (
    <div className="space-y-2">
      <h2 className="text-sm text-white">
        Claim Rewards based on your WISE Credit Rating!
      </h2>
      <div className="grid grid-cols-3 gap-x-5">
        {list
          .filter((v) => v.show)
          .map((v) => {
            return (
              <div
                className="flex flex-col items-center gap-y-1 cursor-pointer"
                key={v.text}
                onClick={v.handle}
              >
                <div className="size-12 flex items-center justify-center rounded-full bg-white/5">
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
