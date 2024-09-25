import { useState } from 'react';
import { useParams } from 'react-router-dom';

import ArrowIcon from '@/images/icon/svgr/arrow.svg?react';

import useCompanyLeaderboard from '@/hooks/useCompanyLeaderboard';

import Layout from '@/layout/custom/Layout';
import LeaderboardSkeleton from './LeaderBoardSkeleton';
import LeaderBoardNav from './LeaderBoardNav';
// import UserScore from './UserScore';
import ScoreItem from './ScoreItem';

const pageSize = 10;

export default function CompanyLeaderboard () {
  const { companyId } = useParams();
  const { data = [], isLoading } = useCompanyLeaderboard(companyId);
  const list = data?.data?.leaderboard ?? [];

  const [ cursor, setCursor ] = useState(0);

  const pagedList = list?.slice(cursor * pageSize, (cursor + 1) * pageSize);
  const totalPageNum = Math.ceil(list?.length / pageSize);
  const disableStart = cursor === 0;
  const disableEnd = cursor === totalPageNum - 1;

  return (
    <Layout title={ companyInfo.companyName }>
      <div className="flex-auto w-full min-h-[calc(100vh_-_160px)] space-y-4 px-6 mt-3 lg:px-0 mx-auto bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] pb-32">
        
        <LeaderBoardNav title="Leaderboard">
          { totalPageNum > 1 && (
            <div className="flex items-center gap-x-2">
              <ArrowIcon
                className="rotate-180"
                stroke={ disableStart ? '#7a7a7a' : 'white' }
                onClick={ () => {
                  if (cursor > 0) {
                    setCursor((v) => v - 1);
                  }
                } }
              />
              <ArrowIcon
                stroke={ disableEnd ? '#7a7a7a' : 'white' }
                onClick={ () => {
                  if (cursor < totalPageNum - 1) {
                    setCursor((v) => v + 1);
                  }
                } }
              />
            </div>
          )}
   
        </LeaderBoardNav>

        <div className="space-y-2">
          {/* <UserScore className="bg-[#E4FA73]" /> */}

          { !data ? (
            <div className="py-3 rounded-2xl">
              <LeaderboardSkeleton size={ 3 } height="70px" />
            </div>
          ) : (
            <div className="space-y-2">
              { pagedList?.map((v, index) => (
                <ScoreItem user={ v } key={ v.userId } />
              )) }
            </div>
          ) }

        </div>
      </div>
    </Layout>
  );
}
