import Banner from './components/banner';
import WisescoreCard from './components/wisescoreCard';
import Rewards from './components/rewards';
import moduleConf from './conf';

export default function Renaissance () {
  return (
    <div className='px-5 pt-3 lg:px-0 max-w-md mx-auto'>
      <div className=''>
        <Banner />
        <WisescoreCard />
      </div>

      <p className='text-[#FFDFA2]/60 pt-4 my-2 pb-1 font-syne text-sm font-medium text-center'>
        {moduleConf.inviteTip3}
      </p>

      <Rewards />
    </div>
  );
}
