import useUserRenaissance from '@/hooks/useUserRenaissance';
import useWiseScore from '@/hooks/useWiseScore';
import useTopBoard from '@/hooks/useTopBoard';
import UserScore from '@/pages/ton-wise/components/userScore';
import Top from './ui/top';
import { cn } from '@/utils/conf';

export default function Leaderboard () {
  const { isLoading, data } = useUserRenaissance();
  const { data: userScore, isLoading: isUserScoreLoading } = useWiseScore();
  const { data: top } = useTopBoard();
  const top1 = top?.[0];
  const top2 = top?.[1];
  const top3 = top?.[2];
  return (
    <div className='p-4 border border-[#8541EE]/70 rounded-2xl space-y-5'>
      <h2 className='text-lg font-syne font-bold text-[#FFDFA2]'>
        WISE Score Leaderboard
      </h2>

      <UserScore user={userScore} type={2} />

      <div
        className={cn('flex px-4', top3 ? 'justify-between' : 'justify-around')}
      >
        {top2 && (
          <Top
            rank={2}
            className='mt-10'
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
            className='mt-12'
            score={top3?.totalScore ?? 0}
            address={top3?.address}
            avatar={top3?.avatar}
          />
        )}
      </div>
    </div>
  );
}
