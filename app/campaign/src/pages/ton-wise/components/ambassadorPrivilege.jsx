import { useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import clsx from 'clsx';

export default function AmbassadorPrivilege({ userLevel, dispalyLevel }) {
  const list = useMemo(() => {
    const isGranted = userLevel >= dispalyLevel;
    return [
      {
        type: 1,
        content: '500 Invite',
        icon: <SBTIcon className="size-8" />,
        isGranted,
      },
      {
        type: 2,
        content: '1.2x TPoints',
        icon: <TpointIcon className="size-8" />,
        isGranted,
      },
      {
        type: 3,
        content: 'Exclusive SBT',
        icon: <span className="text-[24px]">🪙</span>,
        isGranted,
      },
      {
        type: 4,
        content: 'Invite Perks',
        icon: <span className="text-[24px]">🥂</span>,
        isGranted,
      },
    ];
  }, [userLevel, dispalyLevel]);
  const isGranted = userLevel >= dispalyLevel;

  return (
    <div className="space-y-2">
      <h1 className="text-base font-medium">
        {isGranted ? 'Privilege' : `Privileges unlocked at Lv ${dispalyLevel}`}
      </h1>
      <div className="grid grid-cols-4 gap-2">
        {list.map((v, i) => (
          <div
            key={i}
            className={clsx(
              'flex flex-col items-center gap-y-1',
              v.isGranted ? '' : 'opacity-30'
            )}
          >
            <div className="flex items-center justify-center rounded-full bg-white/10 size-12">
              {v.icon}
            </div>
            <div className="text-xs text-center">{v.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
