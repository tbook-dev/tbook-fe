import Banner from './components/banner';
import WisescoreCard from './components/wisescoreCard';
import FriendsBoost from './components/friendsBoost';
import Leaderboard from './components/leaderboard';

export default function RenaissanceDetail () {
  return (
    <div className='px-5 pt-3 lg:px-0 mx-auto space-y-2 pb-10'>
      <div className=''>
        <Banner />
        <WisescoreCard />

        <div className='pt-2'>
          <FriendsBoost />
        </div>
      </div>

      <Leaderboard />
    </div>
  );
}
