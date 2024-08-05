import useWiseScore, {
  useWiseGobal,
  useWiseGobalMutation,
} from '@/hooks/useWiseScore';
import { formatImpact } from '@tbook/utils/lib/conf';
import Trend from '@/images/icon/svgr/trend.svg?react';
import { Link } from 'react-router-dom';
import Privilege from './components/privilege';
import Invite from './components/invite';
import Loading from '@/components/loading';
import Generating from './generating';
import BottomNav from './components/bottomNav';
import { useNavigate } from 'react-router-dom';
import useUserInfo from '@/hooks/useUserInfoQuery';
import LazyImage from '@/components/lazyImage';
import WiseLevel from './components/wiseLevel';
export default function TonWise() {
  const { user } = useUserInfo();
  const {
    data: userWiseScore,
    totalScore,
    isFetching,
    isGranted,
    isFirstCreate,
  } = useWiseScore();
  const {
    data: { showGen },
  } = useWiseGobal();
  const setShowGen = useWiseGobalMutation();
  const navigate = useNavigate();
  if (isFetching) {
    return <Loading text="Aggregating metrics..." />;
  } else if (!isGranted) {
    window.sessionRoutesCount -= 1;
    navigate('/wise-score/join', { replace: true });
    return null;
  }

  return (
    <div className="flex flex-col px-5 mt-3 pb-20 lg:px-0 max-w-md mx-auto space-y-8">
      {showGen ? (
        <Generating
          hasWiseScoreRes={isGranted}
          isFirstCreate={isFirstCreate}
          data={userWiseScore}
          hide={() => {
            setShowGen({ showGen: false });
          }}
        />
      ) : (
        isGranted && (
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
                    {/* <Link
                      to="/wise-score/detail"
                      className="flex items-center gap-x-1 text-xs rounded-md border border-white/20 px-3 py-1.5 mb-3"
                    >
                      <Trend />
                      Improve Now
                    </Link> */}
                  </div>
                  <WiseLevel totalScore={totalScore} />
                </div>
              </div>
              <Invite />
            </div>

            <Privilege />
            <BottomNav />
          </div>
        )
      )}
    </div>
  );
}
