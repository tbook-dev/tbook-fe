import { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';

import ArrowIcon from '@/images/icon/svgr/arrow.svg?react';

import useCompanyLeaderboard from '@/hooks/useCompanyLeaderboard';

import LeaderboardSkeleton from './componets/LeaderBoardSkeleton';
import LeaderBoardNav from './componets/LeaderBoardNav';
import UserScore from './componets/UserScore';
import ScoreItem from './componets/ScoreItem';
import clsx from 'clsx';

const pageSize = 10;

export default function CompanyLeaderboard () {
  const { companyId } = useParams();
  const { isLightTheme } = useLoaderData();
  const { data = [], isLoading } = useCompanyLeaderboard(companyId);
  const list = data?.data?.leaderboard ?? [];
  const companyName = data?.data?.companyName || ''

  const [ cursor, setCursor ] = useState(0);

  const pagedList = list?.slice(cursor * pageSize, (cursor + 1) * pageSize);
  const totalPageNum = Math.ceil(list?.length / pageSize);
  const disableStart = cursor === 0;
  const disableEnd = cursor === totalPageNum - 1;

  return (
    <div className={ clsx("flex-auto w-full min-h-[calc(100vh_-_160px)] space-y-4 px-6 mt-3 lg:px-0 mx-auto pb-32", 
      isLightTheme ? 'bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] text-black' : 'bg-black text-white')}>

      <LeaderBoardNav title="Leaderboard">
        { totalPageNum > 1 && (
          <div className="flex items-center gap-x-2">
            <ArrowIcon
              className="rotate-180"
              stroke={ disableStart ? '#FCFAFD' : 'black' }
              onClick={ () => {
                if (cursor > 0) {
                  setCursor((v) => v - 1);
                }
              } }
            />
            <ArrowIcon
              stroke={ disableEnd ? '#FCFAFD' : 'black' }
              onClick={ () => {
                if (cursor < totalPageNum - 1) {
                  setCursor((v) => v + 1);
                }
              } }
            />
          </div>
        ) }

      </LeaderBoardNav>

      <div className="space-y-2">
        <UserScore list={ list } className="bg-[#E4FA73]" />

        { isLoading ? (
          <LeaderboardSkeleton />
        ) : (
          <div className="space-y-2">
            { pagedList?.map((v, index) => (
              <ScoreItem user={ v } key={ v.userId } />
            )) }
          </div>
        ) }

      </div>
    </div>
  );
}
