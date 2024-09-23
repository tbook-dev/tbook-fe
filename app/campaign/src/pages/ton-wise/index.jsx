import useWiseScore from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';
import Privilege from './components/privilege';
import Loading from '@/components/loading';
import BottomNav from './components/bottomNav';
import useUserInfo from '@/hooks/useUserInfoQuery';
import LazyImage from '@/components/lazyImage';
import WiseLevel from './components/wiseLevel';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import HotIcon from '@/images/icon/svgr/hot.svg?react';
import useDeFi from '@/hooks/useDeFi';
import Generating from './generating';
import { useDispatch, useSelector } from 'react-redux';
import { setWiseScoreShowGen } from '@/store/global';

function TonWise() {
  const { user } = useUserInfo();
  const { totalScore, isLoaded, isFetching, isFirstCreate } = useWiseScore();
  const { data: defi } = useDeFi();
  const showGen = useSelector((s) => s.global.wiseScoreShowGen);
  const disptch = useDispatch();

  if (!isLoaded || isFetching) {
    return <Loading text="Aggregating metrics..." />;
  }
  if (isFirstCreate && showGen) {
    return (
      <Generating
        hide={() => {
          disptch(setWiseScoreShowGen(false));
        }}
      />
    );
  }
  return (
    <div className="flex flex-col px-5 mt-3 pb-20 lg:px-0 max-w-md mx-auto space-y-8">
      <div className="pb-10 space-y-6">
        <div className="space-y-8">
          <div className="space-y-5">
            <div className="text-2xl font-light">
              <h2 className="flex items-center">
                Your
                <LazyImage
                  src={user?.avatar}
                  className="size-7 rounded-full mx-1"
                />
                WISE Credit
              </h2>
              <h2>Dashboard</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-end justify-between gap-x-4">
                <div className="flex">
                  <span className="text-[80px] leading-[80px] text-color8">
                    {formatImpact(totalScore)}
                  </span>
                </div>
              </div>
              <WiseLevel totalScore={totalScore} />
            </div>
          </div>
        </div>
        {defi && (
          <Link
            to={`/${defi?.projectUrl}/${defi?.campaignId}`}
            className="block p-4 space-y-6 rounded-2xl bg-[#ABEDBB] text-[#22306D] relative overflow-hidden"
          >
            <HotIcon className="absolute right-0 -top-1.5" />
            <div className="">
              <p>Invest with TON Society.</p>
              <p>WIN SBTs!</p>
            </div>
            <button className="text-xs font-bold px-2 py-1 rounded-md bg-[#F36EBD]">
              🔥WIN NOW
            </button>
          </Link>
        )}

        <Privilege />
        <BottomNav />
      </div>
    </div>
  );
}
export default memo(TonWise);
