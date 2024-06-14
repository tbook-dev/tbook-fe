import Banner from './components/banner';
import WisescoreCard from './components/wisescoreCard';
import Rewards from './components/rewards';
import Friends from './components/friends';
import Leaderboard from './components/leaderboard';
import { useLevel } from '@/hooks/useUserRenaissance';

export default function Renaissance () {
  const { userLevel } = useLevel();

  return (
    <div className='px-5 pt-3 lg:px-0 mx-auto space-y-2 pb-10'>
      <div className=''>
        <Banner />
        <WisescoreCard />

        <div className='pt-2'>
          <Friends />
        </div>
      </div>

      {[1, 2].includes(userLevel) && <Rewards />}

      {userLevel === 3 && <Leaderboard />}
    </div>
  );
}
