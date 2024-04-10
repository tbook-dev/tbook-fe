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
export default function TonWiseLeaderboard() {
  const { data, userScore } = useTopBoard();
  const [cusor, setCusor] = useState(0);
  const top1 = data?.[0];
  const top2 = data?.[1];
  const top3 = data?.[2];
  const pagedList = data?.slice(cusor * pageSize, (cusor + 1) * pageSize);
  // const currentUserScore = data?.find(v=>'')
  const updateAt = dayjs().format('MMMM DD, YYYY');
  console.log({ data, userScore });

  return (
    <Layout className="flex flex-col">
      <div className="flex-auto w-full min-h-full px-5 mt-3 lg:px-0 mx-auto text-white bg-linear8">
        <div className="space-y-1 text-center mb-5 relative">
          <h2 className="pt-10 text-lg font-zen-dot w-[162px] mx-auto">
            {modlueConf.title}
          </h2>
          <p className="text-xs">{updateAt}</p>
          {modlueConf.decorate.map((v) => (
            <img
              src={v.url}
              className={v.className}
              key={v.url}
              alt="decorate"
            />
          ))}
        </div>

        <div className="pt-10 mb-3">
          <div
            className={clsx(
              'flex px-4',
              top3 ? ' justify-between' : 'justify-around'
            )}
          >
            {top2 && (
              <BoardTop
                className="mt-10"
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
                className="mt-10"
                rank={3}
                score={top3?.totalScore ?? 0}
                address={top3?.address}
                avatar={top3?.avatar}
              />
            )}
          </div>
        </div>

        {!data ? (
          <LeaderboardSkeleton size={3} />
        ) : (
          <div className="bg-white rounded-2xl py-3">
            <UserScore user={userScore} />
            <div className="divide">
              {pagedList.map((v) => (
                <ScoreItem user={v} key={v.userId} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
