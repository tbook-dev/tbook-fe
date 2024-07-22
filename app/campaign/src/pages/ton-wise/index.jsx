import useWiseScore, {
  useWiseHasWiseScore,
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

const getWiseTag = (value) => {
  // Novice(<20K)
  // Adept(20-50K)
  // Pathfinder(50-200K)
  // Strategist(200-500K)
  // Mentor(500K-1M)
  // Apex(>=1M)
  if (value < 20000) {
    return 'Novice';
  } else if (value < 50000) {
    return 'Adept';
  } else if (value < 200000) {
    return 'Pathfinder';
  } else if (value < 500000) {
    return 'Strategist';
  } else if (value < 1000000) {
    return 'Mentor';
  } else {
    return 'Apex';
  }
};
export default function TonWise() {
  const { data: hasWiseScoreRes } = useWiseHasWiseScore();
  const { data, isLoading } = useWiseScore({
    enabled: hasWiseScoreRes !== undefined,
  });
  const { data: showGen } = useWiseGobal();
  const setShowGen = useWiseGobalMutation();
  const wiseTag = getWiseTag(data?.totalScore ?? 0);
  const navigate = useNavigate();
  if (hasWiseScoreRes === undefined) {
    return <Loading />;
  } else if (hasWiseScoreRes === false) {
    navigate('/wise-score/join', { replace: true });
    window.sessionRoutesCount -= 1;
  }

  return (
    <div className="flex flex-col px-5 mt-3 pb-20 lg:px-0 max-w-md mx-auto space-y-8">
      {showGen ? (
        <Generating
          hasWiseScoreRes={hasWiseScoreRes}
          data={data}
          wiseTag={wiseTag}
          hide={() => {
            setShowGen(false);
          }}
        />
      ) : (
        <div className="pb-10 space-y-6">
          <div className="space-y-8">
            <div className="space-y-5">
              <h2 className="text-2xl font-light">WISE Credit Score</h2>
              <div className="flex items-end gap-x-4">
                <div className="flex">
                  {isLoading ? (
                    <span className="animate-pulse bg-[#1f1f1f] w-40 h-20" />
                  ) : (
                    <span className="text-color8 text-[80px] leading-[80px]">
                      {formatImpact(data?.totalScore ?? 0)}
                    </span>
                  )}
                </div>
                <Link to="/wise-score/detail">
                  <div className="space-y-1 mb-2">
                    <div className="text-color8 text-xs">{wiseTag}</div>
                    <span className="flex items-center gap-x-1 text-xs rounded-md border border-white px-2 py-1">
                      <Trend />
                      Improve Now
                    </span>
                  </div>
                </Link>
              </div>
            </div>
            <Invite />
          </div>

          <Privilege />
          <BottomNav />
        </div>
      )}
    </div>
  );
}
