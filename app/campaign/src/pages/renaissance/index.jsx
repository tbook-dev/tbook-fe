import Banner from './components/banner';
import WisescoreCard from './components/wisescoreCard';
import Rewards from './components/rewards';
import Friends from './components/friends';
import Leaderboard from './components/leaderboard';
import moduleConf from './conf';
import { useUserRenaissanceKit } from '@/hooks/useUserRenaissance';

export default function Renaissance () {
  const { friends } = useUserRenaissanceKit();

  return (
    <div className='px-5 pt-3 lg:px-0 mx-auto space-y-2'>
      <div className=''>
        <Banner />
        <WisescoreCard />
        {friends.length > 0 && (
          <div className='pt-2'>
            <Friends />
          </div>
        )}
      </div>

      <p className='text-[#FFDFA2]/60 pt-4 my-2 pb-1 font-syne text-sm font-medium text-center'>
        {moduleConf.inviteTip3}
      </p>

      <Rewards />

      <Leaderboard />
    </div>
  );
}
