import { useMemo, useState } from 'react';
import Card from './card';
import dayjs from 'dayjs';
import clsx from 'clsx';
import gameLogo from '@/images/icon/game.svg';
import useUserInfo from '@/hooks/useUserInfoQuery';
import UnloginCard from './unloginCard';

export default function Phases ({ setModalData, openModal }) {
  const [current, setCurrent] = useState(1);
  const { userLogined } = useUserInfo();

  const phases = useMemo(() => {
    return [
      {
        title: 'phase 1',
        phaseNum: 1,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 1,
        active: true,
      },
      {
        title: 'phase 2',
        phaseNum: 2,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 2,
        active: false,
      },
      {
        title: 'phase 3',
        phaseNum: 3,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 3,
        active: false,
      },
      {
        title: 'phase 4',
        phaseNum: 4,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 1,
        active: false,
      },
    ];
  }, []);
  return (
    <div className='space-y-10'>
      <div className='text-[#71717A] text-sm font-medium grid grid-cols-4 gap-x-2 border-b border-[#71717A]'>
        {phases.map((ph, idx) => {
          const isEnded = idx % 2 === 0;
          return (
            <button
              className={clsx(
                'flex flex-col gap-y-1 border-b-2 px-6 py-4 cursor-default',
                current === ph.value
                  ? 'border-[#904BF6] text-white'
                  : 'border-b-transparent'
              )}
              key={ph.phaseNum}
              // onClick={() => {
              //   setCurrent(ph.value);
              // }}
            >
              <p className='uppercase'>{ph.title}</p>
              <p className='text-[#71717A]'>
                {isEnded
                  ? `The claim has ended.`
                  : `Estimated to start in ${dayjs(ph.endTime).format(
                      'MMM D, YYYY'
                    )}`}
              </p>
            </button>
          );
        })}
      </div>

      <div className='grid grid-cols-4 gap-x-2'>
        {phases.map(ph => {
          return userLogined ? (
            <Card
              key={ph.phaseNum}
              {...ph}
              symbol='GAME'
              logoUrl={gameLogo}
              setModalData={setModalData}
              openModal={openModal}
            />
          ) : (
            <UnloginCard
              key={ph.phaseNum}
              userLogined={userLogined}
              {...ph}
              symbol='GAME'
              logoUrl={gameLogo}
            />
          );
        })}
      </div>
    </div>
  );
}
