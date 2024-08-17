import Nav from './components/nav';
import Loading from '@/components/loading';
import { useAmbassadorLevel } from '@/hooks/useAmbassador';
import { cn } from '@/utils/conf';
import BackIcon from '@/images/icon/svgr/back2.svg?react';
import { useState, useLayoutEffect } from 'react';
import LazyImage from '@/components/lazyImage';
import useUserInfo from '@/hooks/useUserInfoQuery';
import CheckedIcon from '@/images/icon/svgr/checked2.svg?react';
import { AmbassadorSwiper } from './components/ambassadorSwiper';

const levelMap = {
  1: {
    wrap: 'bg-gradient-to-b from-[#8FC74E] to-[#5AB5AB] to-80%',
  },
  2: {
    wrap: 'bg-gradient-to-b from-[#8FC74E] to-[#5AB5AB] to-80%',
  },
};
export default function Ambassador() {
  const { data: level } = useAmbassadorLevel();
  const isLoaded = !!level;
  const [currentLevel, setLevel] = useState(0);
  const { user, currentSocial } = useUserInfo();
  useLayoutEffect(() => {
    if (isLoaded) {
      setLevel(level);
    }
  }, [isLoaded]);
  console.log({ currentLevel, user, currentSocial });
  return !isLoaded ? (
    <Loading />
  ) : (
    <div
      className={cn(
        'fixed inset-x-0 top-0 flex flex-col h-screen overflow-scroll pt-14 px-5 lg:px-0 mx-auto ',
        levelMap[level]?.wrap
      )}
    >
      <div className="flex-auto space-y-6 pb-32 relative">
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
        <AmbassadorSwiper userLevel={level}/>
      </div>
    </div>
  );
}
