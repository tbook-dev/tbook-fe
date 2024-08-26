import { useMemo, memo } from 'react';
import SBTIcon from '@/images/icon/svgr/sbt.svg?react';
import TpointIcon from '@/images/icon/svgr/tpoint.svg?react';
import clsx from 'clsx';
import LockIcon from '@/images/icon/svgr/lock.svg?react';
import { useAmbassadorLevels } from '@/hooks/useAmbassador';
import { formatImpact } from '@tbook/utils/lib/conf';
function AmbassadorPrivilege({ userLevel, dispalyLevel, color }) {
  const { data: confList = [] } = useAmbassadorLevels();

  const list = useMemo(() => {
    const hasLock = dispalyLevel > userLevel;
    const privilege =
      confList.find((v) => v.level === dispalyLevel)?.vanguardPrivilege ?? {};

    return [
      {
        type: 1,
        content: `${formatImpact(privilege.wiseInviteNum)} Invite`,
        icon: <SBTIcon className="size-8" />,
        isGranted: privilege.wiseInviteNum > 0,
        hasLock,
      },
      {
        type: 2,
        content: '1.2x TPoints',
        icon: <TpointIcon className="size-8" />,
        isGranted: privilege.onePointTwoTPoints > 0,
        hasLock,
      },
      {
        type: 3,
        content: 'Exclusive SBT',
        icon: <span className="text-[24px]">🪙</span>,
        isGranted: privilege.exclusiveSBT > 0,
        hasLock: false,
      },
      {
        type: 4,
        content: 'Invite Perks',
        icon: <span className="text-[24px]">🥂</span>,
        isGranted: privilege.inviteVanguardNum > 0,
        hasLock: false,
      },
    ];
  }, [userLevel, dispalyLevel, confList]);
  const isGranted = userLevel >= dispalyLevel;

  return (
    <div className="space-y-2">
      <h1 className="text-base font-medium">
        {isGranted ? 'Privilege' : `Privileges unlocked at Lv ${dispalyLevel}`}
      </h1>
      <div className="grid grid-cols-4 gap-2">
        {list.map((v, i) => {
          const showLock = v.hasLock;
          return (
            <div
              key={i}
              className={clsx(
                'flex flex-col items-center gap-y-1',
                v.isGranted ? '' : v.isLocked ? '' : 'opacity-30'
              )}
            >
              <div className="flex items-center justify-center rounded-full bg-white/10 size-12 relative">
                {v.icon}
                {showLock && (
                  <LockIcon
                    className="size-[14px] absolute right-2 bottom-2"
                    fill={color}
                  />
                )}
              </div>
              <div className="text-xs text-center">{v.content}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(AmbassadorPrivilege);
