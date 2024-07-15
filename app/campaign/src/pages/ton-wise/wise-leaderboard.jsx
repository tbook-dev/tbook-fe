import useTopBoard from '@/hooks/useTopBoard';
import LeaderboardSkeleton from './components/leaderBoard-skeleton';
import UserScore from './components/userScore';
import ScoreItem from './components/scoreItem';
import { useState } from 'react';
import BackIcon from '@/images/icon/svgr/back.svg?react';
import { Link } from 'react-router-dom';
import ArrowIcon from '@/images/icon/svgr/arrow.svg?react';

const pageSize = 10;
export default function TonWiseLeaderboard() {
  const { data } = useTopBoard();
  const [cusor, setCusor] = useState(0);

  const pagedList = data?.slice(cusor * pageSize, (cusor + 1) * pageSize);
  const totalPageNum = Math.ceil(data?.length / pageSize);
  const disableStart = cusor === 0;
  const disableEnd = cusor === totalPageNum - 1;

  return (
    <div className="flex-auto w-full min-h-[calc(100vh_-_160px)] pb-20 space-y-4 px-5 mt-3 lg:px-0 mx-auto bg-gradient-to-b from-black from-40% to-[#301952]">
      <div className="relative flex items-center justify-between pl-8">
        <Link to="/wise-score" className="absolute left-0">
          <BackIcon />
        </Link>
        <h2 className="text-2xl font-thin">WISE Leaderboard </h2>
        <div className="flex items-center gap-x-2">
          <ArrowIcon
            className="rotate-180"
            stroke={disableStart ? '#7a7a7a' : 'white'}
            onClick={() => {
              if (cusor > 0) {
                setCusor((v) => v - 1);
              }
            }}
          />
          <ArrowIcon
            stroke={disableEnd ? '#7a7a7a' : 'white'}
            onClick={() => {
              if (cusor < totalPageNum - 1) {
                setCusor((v) => v + 1);
              }
            }}
          />
        </div>
      </div>

      {!data ? (
        <div className="rounded-2xl py-3">
          <LeaderboardSkeleton size={3} height="58px" />
        </div>
      ) : (
        <div className="rounded-2xl py-3">
          <div className="space-y-2">
            {pagedList?.map((v) => (
              <ScoreItem user={v} key={v.userId} />
            ))}
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-0 rounded-t-2xl backdrop-blur bg-white/10 px-8 pt-4 pb-16">
        <UserScore />
      </div>
    </div>
  );
}
