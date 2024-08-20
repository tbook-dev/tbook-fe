import Nav from './components/nav';
import Loading from '@/components/loading';
import { useAmbassadorLevel } from '@/hooks/useAmbassador';
import { cn } from '@/utils/conf';
import BackIcon from '@/images/icon/svgr/back2.svg?react';
import { useState, useLayoutEffect } from 'react';
import LazyImage from '@/components/lazyImage';
import useUserInfo from '@/hooks/useUserInfoQuery';
import CheckedIcon from '@/images/icon/svgr/checked2.svg?react';
import AmbassadorSwiper from './components/ambassadorSwiper';
import AmbassadorPrivilege from './components/ambassadorPrivilege';
import AmbassadorPower from './components/ambassadorPower';

const levelMap = {
  0: {
    wrap: 'bg-gradient-to-b from-[#C5C74E] to-[#72B55A] from-0% to-80%',
    color: '#63691D',
  },
  1: {
    wrap: 'bg-gradient-to-b from-[#8FC74E] to-[#5AB5AB] to-80%',
    color: '#43691D',
  },
};

export default function Ambassador() {
  const { data: userLevel } = useAmbassadorLevel();
  const isLoaded = !!userLevel;
  const [dispalyLevel, setDisplayLevel] = useState(0);
  const { user, currentSocial } = useUserInfo();
  useLayoutEffect(() => {
    if (isLoaded) {
      setDisplayLevel(userLevel.level);
    }
  }, [isLoaded]);
  const level = userLevel?.level ?? 0;

  return !isLoaded ? (
    <Loading text="Aggregating metrics..." />
  ) : (
    <div
      className={cn(
        'fixed inset-x-0 top-0 h-screen  flex flex-col overflow-auto pt-14 pb-[230px] px-4 lg:px-0 mx-auto',
        levelMap[dispalyLevel]?.wrap
      )}
    >
      <div className="flex-auto space-y-6 relative">
        <Nav
          Back={BackIcon}
          title="Ambassador Power"
          justify="center"
          to="/wise-score"
        />
        <div className="flex items-center gap-x-3">
          <div className="relative w-max">
            <LazyImage
              src={user?.avatar}
              alt="Ambassador avatar"
              className="size-7 rounded-full"
            />
            <CheckedIcon className="size-4 absolute bottom-0 -right-2" />
          </div>
          <p className="text-sm font-medium">@{currentSocial?.name}</p>
        </div>
        <AmbassadorSwiper
          dispalyLevel={dispalyLevel}
          setDisplayLevel={setDisplayLevel}
          color={levelMap[dispalyLevel]?.color}
        />
        <AmbassadorPrivilege
          userLevel={level}
          dispalyLevel={dispalyLevel}
          color={levelMap[dispalyLevel]?.color}
        />
        <AmbassadorPower userLevel={level} />
      </div>
    </div>
  );
}
