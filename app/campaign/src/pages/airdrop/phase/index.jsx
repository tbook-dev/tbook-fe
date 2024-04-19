import { useMemo, useState } from 'react';
import Card from './card';
import dayjs from 'dayjs';
import clsx from 'clsx';
import carryLogo from '@/images/icon/carry.svg';

export default function Phases ({ setModalData, openModal }) {
  const [current, setCurrent] = useState(0);
  const phases = useMemo(() => {
    return [
      {
        title: 'phase 1',
        value: 1,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 1,
      },
      {
        title: 'phase 2',
        value: 2,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 2,
      },
      {
        title: 'phase 3',
        value: 3,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 3,
      },
      {
        title: 'phase 4',
        value: 4,
        startTime: 1,
        endTime: 1111,
        num: 1223,
        status: 1,
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
                'flex flex-col gap-y-1 border-b-2 px-6 py-4',
                current === ph.value
                  ? 'border-[#904BF6] text-white'
                  : 'border-b-transparent'
              )}
              key={ph.value}
              onClick={() => {
                setCurrent(ph.value);
              }}
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
          return (
            <Card
              key={ph.value}
              {...ph}
              symbol='GAME'
              logoUrl={carryLogo}
              setModalData={setModalData}
              openModal={openModal}
            />
          );
        })}
      </div>
    </div>
  );
}
