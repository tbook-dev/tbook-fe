import useWiseScore from '@/hooks/useWiseScore';
import { useWisescoreTop3 } from '@/hooks/useTopBoard';
import UserScore from './userScore';
import Top from './ui/top';
import { cn } from '@/utils/conf';
import { Link } from 'react-router-dom';

export default function Leaderboard () {
  const { data: userScore } = useWiseScore();
  const { data: top } = useWisescoreTop3();
  const top1 = top?.[0];
  const top2 = top?.[1];
  const top3 = top?.[2];
  return (
    <div className='p-4 border border-[#3f3b30] rounded-2xl space-y-5'>
      <div className='flex items-center justify-between'>
        <h2 className='text-base font-syne font-bold text-[#FFDFA2]'>
          WISE Score Leaderboard
        </h2>
        <Link to='/wise-score/leaderboard'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M12.75 15L15.75 12M15.75 12L12.75 9M15.75 12H8.25M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z'
              stroke='#F8C685'
              strokeOpacity='0.6'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
      </div>

      <UserScore user={userScore} />

      <div
        className={cn('flex px-4', top3 ? 'justify-between' : 'justify-around')}
      >
        {top2 && (
          <Top
            rank={2}
            score={top2?.totalScore ?? 0}
            address={top2?.address}
            avatar={top2?.avatar}
          />
        )}

        <Top
          rank={1}
          score={top1?.totalScore ?? 0}
          address={top1?.address}
          avatar={top1?.avatar}
        />

        {top3 && (
          <Top
            rank={3}
            score={top3?.totalScore ?? 0}
            address={top3?.address}
            avatar={top3?.avatar}
          />
        )}
      </div>
    </div>
  );
}
