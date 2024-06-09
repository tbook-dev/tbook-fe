import Banner from './components/banner';
import WisescoreCard from './components/wisescoreCard';
import Rewards from './components/rewards';

export default function Renaissance () {
  return (
    <div className='px-5 pt-3 lg:px-0 max-w-md mx-auto'>
      <div className=''>
        <Banner />
        <WisescoreCard />
      </div>

      <Rewards />
    </div>
  );
}
