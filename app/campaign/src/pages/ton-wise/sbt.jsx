import Nav from './components/nav';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import SBT20KIcon from '@/images/icon/svgr/sbt20K.svg?react';
import SBT50KIcon from '@/images/icon/svgr/sbt50K.svg?react';
import SBT200KIcon from '@/images/icon/svgr/sbt200K.svg?react';
import SBT500KIcon from '@/images/icon/svgr/sbt500K.svg?react';
import SBT1MIcon from '@/images/icon/svgr/sbt1M.svg?react';
import { useMemo } from 'react';
import { cn } from '@/utils/conf';
import { useNavigate } from 'react-router-dom';
import { useSBTList } from '@/hooks/useWiseScore';
import WebApp from '@twa-dev/sdk';

const Tag = ({ className, level }) => {
  const textMap = {
    0: 'Not Open',
    1: 'Mint Open',
    2: 'Pending',
    3: 'Minted',
    4: 'Error',
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
  const { list } = useSBTList();
  const type1 = list.find((v) => v.type === 1);
  const sbtList = useMemo(() => {
    return [
      {
        text: 'WISE SBT I',
        img: <SBTIcon className="size-16" />,
        isOpen: true,
        level: type1?.level,
        link: type1?.link,
        type: 1,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT20KIcon className="size-16" />,
        isOpen: false,
        type: 2,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT50KIcon className="size-16" />,
        isOpen: false,
        type: 3,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT200KIcon className="size-16" />,
        isOpen: false,
        type: 4,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT500KIcon className="size-16" />,
        isOpen: false,
        type: 5,
      },
      {
        text: 'WISE Credit SBT',
        img: <SBT1MIcon className="size-16" />,
        isOpen: false,
        type: 6,
      },
    ];
  }, [type1]);
  return (
    <div className="flex-auto w-full pb-10 space-y-6 px-5 mt-3 lg:px-0 mx-auto">
      <Nav to="/wise-score" title="WISE SBT" />

      <div className="flex flex-col items-center gap-y-3">
        <div className="relative">
          <SBTIcon className="size-[150px]" />
          <Tag
            className="absolute top-0 left-1/2 translate-x-3"
            level={type1?.level}
          />
        </div>
        <div>
          <h4 className="text-xs text-white/60">
            {[2, 3].includes(type1?.level) ? '' : 'Eligible to mint'}
          </h4>
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
                className={cn(
                  'flex items-center justify-center flex-col gap-y-1 relative',
                  v.isOpen ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'
                )}
                onClick={() => {
                  if ([2, 3].includes(v.level)) {
                    WebApp.openLink(v.link, { try_instant_view: true });
                  } else {
                    navigate(`/wise-score/sbt/${v.type}`);
                  }
                }}
              >
                {v.img}
                <span className="text-xs">{v.text}</span>
                {v.isOpen && (
                  <Tag className="absolute top-0 left-1/2" level={v.level} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
