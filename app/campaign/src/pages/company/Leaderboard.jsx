import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import ArrowIcon from '@/images/icon/svgr/arrow.svg?react';
import useTopBoard from '@/hooks/useTopBoard';
import useCompanyLeaderboard from '@/hooks/useCompanyLeaderboard';

import Layout from '@/layout/custom/Layout';
import LeaderboardSkeleton from './LeaderBoardSkeleton';
import LeaderBoardNav from './LeaderBoardNav';
import UserScore from './UserScore';
import ScoreItem from './ScoreItem';

const pageSize = 10;


export default function CompanyLeaderboard () {
  const { companyId } = useParams();
  // const { data = [], isLoading } = useCompanyLeaderboard(companyId);
  const data =
    [
      {
        "userId": 154283420008,
        "projectId": 158473060086,
        "address": "0x3555881459e5252d918a205b91f0900b1e11fe3f",
        "pointNum": 20
      },
      {
        "userId": 153284940002,
        "projectId": 158473060086,
        "address": "0x624f313007ca80eae6cd1536362721f479558e3f",
        "pointNum": 15
      },
      {
        "userId": 398855332579,
        "projectId": 158473060086,
        "address": "0x3B566ca18c3604c4fca9Ee068a1e3378A0de5538",
        "pointNum": 10
      },
      {
        "userId": 549659883392,
        "projectId": 158473060086,
        "address": "",
        "pointNum": 10
      },
      {
        "userId": 314069611566,
        "projectId": 158473060086,
        "address": "0x97Ca38aeE3FE8B44722E5F528fEf26Cd43EeF60D",
        "pointNum": 0
      },
      {
        "userId": 417045782790,
        "projectId": 158473060086,
        "address": "realdecfan",
        "pointNum": 0
      },
      {
        "userId": 229933120808,
        "projectId": 158473060086,
        "address": "0x0206eb62a15656f983b0601b5111875d40b9c3b7",
        "pointNum": 0
      },
      {
        "userId": 531812533337,
        "projectId": 158473060086,
        "address": "",
        "pointNum": 0
      },
      {
        "userId": 564752433817,
        "projectId": 158473060086,
        "address": "0x3a2153855bFB4AD94113BE8E7981aE9355A7EDb0",
        "pointNum": 0
      }
    ]

  const [ cursor, setCursor ] = useState(0);

  const pagedList = data?.slice(cursor * pageSize, (cursor + 1) * pageSize);
  const totalPageNum = Math.ceil(data?.length / pageSize);
  const disableStart = cursor === 0;
  const disableEnd = cursor === totalPageNum - 1;

  return (
    <Layout>
      <div className="flex-auto w-full min-h-[calc(100vh_-_160px)] space-y-4 px-5 mt-3 lg:px-0 mx-auto bg-gradient-to-b from-[#FCFAFD] to-[#EDE1F5] pb-32">
        
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
