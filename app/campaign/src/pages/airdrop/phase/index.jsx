import Card from './card';
import dayjs from 'dayjs';
import clsx from 'clsx';
import useUserInfo from '@/hooks/useUserInfoQuery';
import UnloginCard from './unloginCard';
import useGameCheckAirdrop from '@/hooks/useGameCheckAirdrop';
import { Skeleton } from 'antd';

export default function Phases ({ setModalData, openModal }) {
  const { userLogined } = useUserInfo();
  const { checkList, data, logo: gameLogo, symbol } = useGameCheckAirdrop();

  return (
    <div className='space-y-10'>
      <div className='text-[#71717A] text-sm font-medium grid grid-cols-4 gap-x-2 border-b border-[#71717A]'>
        {checkList.map(ph => {
          const isEnded = ph.status === 3;
          const isActive = ph.status === 2;
          return !data ? (
            <Skeleton
              paragraph={{ rows: 1 }}
              title={false}
              className='px-6 py-4'
              key={ph.phaseNum}
            />
          ) : (
            <button
              className={clsx(
                'flex flex-col gap-y-1 border-b-2 px-6 py-4 cursor-default',
                isActive
                  ? 'border-[#904BF6] text-white'
                  : 'border-b-transparent'
              )}
              key={ph.phaseNum}
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
        {checkList.map(ph => {
          return userLogined ? (
            !data ? (
              <Skeleton key={ph.phaseNum} />
            ) : (
              <Card
                key={ph.phaseNum}
                {...ph}
                symbol={symbol}
                logoUrl={gameLogo}
                setModalData={setModalData}
                openModal={openModal}
              />
            )
          ) : (
            <UnloginCard
              key={ph.phaseNum}
              userLogined={userLogined}
              {...ph}
              symbol={symbol}
              logoUrl={gameLogo}
            />
          );
        })}
      </div>
    </div>
  );
}
