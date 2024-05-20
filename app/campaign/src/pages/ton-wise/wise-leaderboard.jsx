import Layout from '@/layout/ton/Layout';
import useTopBoard from '@/hooks/useTopBoard';
import sucessSVG from '@/images/wise/sucess.svg';
import balloonSVG from '@/images/wise/balloon.svg';
import BoardTop from './components/boardTop';
import dayjs from 'dayjs';
import clsx from 'clsx';
import LeaderboardSkeleton from './components/leaderBoard-skeleton';
import UserScore from './components/userScore';
import ScoreItem from './components/scoreItem';
import { useState } from 'react';

const modlueConf = {
  title: 'WISE Score Leaderboard',
  decorate: [
    {
      url: sucessSVG,
      className: 'absolute w-[55px] h-[50px] top-[60px] left-9',
    },
    {
      url: balloonSVG,
      className: 'absolute size-[50px] right-8 top-[70px]',
    },
  ],
};

const pageSize = 10;
export default function TonWiseLeaderboard () {
  const { data, userScore } = useTopBoard();
  const [cusor, setCusor] = useState(0);
  const top1 = data?.[0];
  const top2 = data?.[1];
  const top3 = data?.[2];
  const pagedList = data?.slice(cusor * pageSize, (cusor + 1) * pageSize);
  // const currentUserScore = data?.find(v=>'')
  const updateAt = dayjs().format('MMMM DD, YYYY');
  const totalPageNum = Math.ceil(data?.length / pageSize);

  return (
    <Layout className='flex flex-col'>
      <div className='flex-auto w-full min-h-full pb-10 px-5 mt-3 lg:px-0 mx-auto text-white bg-linear8'>
        <div className='space-y-1 text-center mb-5 relative'>
          <h2 className='pt-10 text-lg font-zen-dot w-[162px] mx-auto'>
            {modlueConf.title}
          </h2>
          <p className='text-xs'>{updateAt}</p>
          {modlueConf.decorate.map(v => (
            <img
              src={v.url}
              className={v.className}
              key={v.url}
              alt='decorate'
            />
          ))}
        </div>

        <div className='pt-10 mb-3'>
          <div
            className={clsx(
              'flex px-4',
              top3 ? ' justify-between' : 'justify-around'
            )}
          >
            {top2 && (
              <BoardTop
                className='mt-10'
                rank={2}
                score={top2?.totalScore ?? 0}
                address={top2?.address}
                avatar={top2?.avatar}
              />
            )}

            <BoardTop
              rank={1}
              score={top1?.totalScore ?? 0}
              address={top1?.address}
              avatar={top1?.avatar}
            />

            {top3 && (
              <BoardTop
                className='mt-10'
                rank={3}
                score={top3?.totalScore ?? 0}
                address={top3?.address}
                avatar={top3?.avatar}
              />
            )}
          </div>
        </div>

        {!data ? (
          <div className='bg-white rounded-2xl py-3'>
            <LeaderboardSkeleton size={3} height='58px' />
          </div>
        ) : (
          <div className='bg-white rounded-2xl py-3'>
            <UserScore user={userScore} />
            <div className='divide-y divide-black/[0.1] border-b border-black/[0.1] mb-4'>
              {pagedList.map(v => (
                <ScoreItem user={v} key={v.userId} />
              ))}
            </div>
            <div className='flex items-center justify-between text-[#666] text-sm font-medium px-4 mb-3'>
              <div
                className={clsx(
                  'flex items-center gap-x-3',
                  cusor === 0
                    ? 'text-black/[0.15]'
                    : 'text-[#999] cursor-pointer'
                )}
                onClick={() => {
                  if (cusor > 0) {
                    setCusor(v => v - 1);
                  }
                }}
              >
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.70711 14.7071C7.31658 15.0976 6.68342 15.0976 6.2929 14.7071L2.29289 10.7071C1.90237 10.3166 1.90237 9.68342 2.29289 9.29289L6.29289 5.29289C6.68342 4.90237 7.31658 4.90237 7.70711 5.29289C8.09763 5.68342 8.09763 6.31658 7.70711 6.70711L5.41421 9L17 9C17.5523 9 18 9.44771 18 10C18 10.5523 17.5523 11 17 11L5.41421 11L7.70711 13.2929C8.09763 13.6834 8.09763 14.3166 7.70711 14.7071Z'
                    className={clsx(
                      cusor === 0
                        ? 'fill-black/[0.15]'
                        : 'fill-[#999] cursor-pointer'
                    )}
                  />
                </svg>
                Previous
              </div>
              <div
                className={clsx(
                  'flex items-center gap-x-3',
                  cusor === totalPageNum - 1
                    ? 'text-black/[0.15]'
                    : 'text-[#999] cursor-pointer'
                )}
                onClick={() => {
                  if (cusor < totalPageNum - 1) {
                    setCusor(v => v + 1);
                  }
                }}
              >
                Next
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289L17.7071 9.29289C18.0976 9.68342 18.0976 10.3166 17.7071 10.7071L13.7071 14.7071C13.3166 15.0976 12.6834 15.0976 12.2929 14.7071C11.9024 14.3166 11.9024 13.6834 12.2929 13.2929L14.5858 11H3C2.44772 11 2 10.5523 2 10C2 9.44772 2.44772 9 3 9H14.5858L12.2929 6.70711C11.9024 6.31658 11.9024 5.68342 12.2929 5.29289Z'
                    className={clsx(
                      cusor === totalPageNum - 1
                        ? 'fill-black/[0.15]'
                        : 'fill-[#999] cursor-pointer'
                    )}
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
