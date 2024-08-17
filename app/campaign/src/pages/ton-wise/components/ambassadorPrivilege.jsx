import { useMemo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import clsx from 'clsx';

export default function AmbassadorPrivilege() {
  const list = useMemo(() => {
    return [
      {
        type: 'invite',
        content: '500 Invite',
        icon: <SBTIcon className="size-8" />,
        isGranted: true,
      },
      {
        type: 'tpoint',
        content: '1.2x TPoints',
        icon: <TpointIcon className="size-8" />,
        isGranted: true,
      },
      {
        type: 'tpoint',
        content: '1.2x TPoints',
        icon: <TpointIcon className="size-8" />,
        isGranted: false,
      },
    ];
  }, []);
  return (
    <div className="space-y-2">
      <h1 className="text-base font-medium">Privilege</h1>
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
