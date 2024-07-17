import Nav from './components/nav';
import sbtPNG from '@/images/wise/rewards/sbt.png';
import Sbt2kIcon from '@/images/icon/svgr/sbt2k.svg?react';
import Sbt5kIcon from '@/images/icon/svgr/sbt5k.svg?react';
import Sbt20kIcon from '@/images/icon/svgr/sbt20k.svg?react';
import Sbt50kIcon from '@/images/icon/svgr/sbt50k.svg?react';
import { useMemo } from 'react';
import { cn } from '@/utils/conf';
import { useNavigate } from 'react-router-dom';

const Tag = ({ className, level }) => {
  const textMap = {
    1: 'Mint Open',
    2: 'Pending',
  };
  return (
    <span
      className={cn(
        'bg-[#904BF6] px-1.5 py-px text-xs rounded-t-md rounded-br-md',
        className
      )}
    >
      {textMap[level ?? 1]}
    </span>
  );
};
export default function SBT() {
  const navigate = useNavigate();
  const sbtList = useMemo(() => {
    return [
      {
        text: 'WISE SBT I',
        img: <img src={sbtPNG} className="size-16" />,
        isOpen: true,
        type: 1,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt2kIcon width="64px" height="64px" />,
        isOpen: false,
        type: 2,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt5kIcon />,
        isOpen: false,
        type: 3,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt20kIcon />,
        isOpen: false,
        type: 4,
      },
      {
        text: 'WISE Credit SBT',
        img: <Sbt50kIcon />,
        isOpen: false,
        type: 5,
      },
    ];
  }, []);
  return (
    <div className="flex-auto w-full pb-10 space-y-6 px-5 mt-3 lg:px-0 mx-auto">
      <Nav title="WISE SBT" />

      <div className="flex flex-col items-center gap-y-3">
        <div className="relative">
          <img src={sbtPNG} className="size-[150px]" />
          <Tag className="absolute top-0 -right-10" />
        </div>
        <div>
          <h4 className="text-xs text-white/60">Eligible to mint</h4>
          <h2 className="text-base font-medium">WISE SBT I</h2>
        </div>
      </div>

      <div className="px-5 py-4 rounded-xl bg-white/5 space-y-4">
        <h2 className="text-base">All WISE SBTs</h2>
        <div className="grid grid-cols-3 gap-x-2 gap-y-5">
          {sbtList.map((v) => {
            return (
              <div
                key={v.type}
                className="flex items-center justify-center flex-col gap-y-1 relative"
                onClick={() => {
                  if (v.isOpen) {
                    navigate(`/wise-score/sbt/${v.type}`);
                  }
                }}
              >
                {v.img}
                <span className="text-xs">{v.text}</span>
                {v.isOpen && <Tag className="absolute top-0 -right-4" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
