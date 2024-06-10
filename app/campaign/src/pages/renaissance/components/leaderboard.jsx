import useUserRenaissance from '@/hooks/useUserRenaissance';
import useWiseScore from '@/hooks/useWiseScore';
import UserScore from '@/pages/ton-wise/components/userScore';
import Top from './ui/top';

export default function Leaderboard () {
  const { isLoading, data } = useUserRenaissance();
  const { data: userScore, isLoading: isUserScoreLoading } = useWiseScore();
  console.log({ userScore });
  const friends = data?.friends ?? [];
  return (
    <div className='p-4 border border-[#8541EE]/70 rounded-2xl space-y-5'>
      <h2 className='text-lg font-syne font-bold text-[#FFDFA2]'>
        WISE Score Leaderboard
      </h2>

      <UserScore user={userScore} type={2} />

      <div className='flex -space-x-1.5'>
        <Top />
      </div>
    </div>
  );
}
