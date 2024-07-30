import { useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import AmbassadorIcon from '@/images/icon/svgr/ambassador.svg?react';
import { useNavigate } from 'react-router-dom';
import useWallet from '@/hooks/useWallet';

export default function Privilege() {
  const navigate = useNavigate();
  const { getWallets } = useWallet();
  const [tonKit] = getWallets('ton');

  const list = useMemo(() => {
    return [
      {
        text: 'WISE SBT',
        img: <SBTIcon className="size-[30px]" />,
        handle: () => {
          if (tonKit.connected) {
            navigate('/wise-score/sbt');
          } else {
            tonKit.connectHandle();
          }
        },
      },
      {
        text: 'Ambassador',
        img: <AmbassadorIcon className="size-[30px]" />,
        handle: () => {
          navigate('/wise-score/ambassador');
        },
      },
    ];
  }, [tonKit, navigate]);
  return (
    <div className="space-y-2">
      <h2 className="text-sm text-white/40">Privilege</h2>
      <div className="flex items-center gap-x-2">
        {list.map((v) => {
          return (
            <div
              className="space-y-1 cursor-pointer"
              key={v.text}
              onClick={v.handle}
            >
              <div className="size-12 rounded-full bg-white/5 flex items-center justify-center">
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
