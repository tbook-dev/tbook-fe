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
import WiseTag from './components/wiseTag';

export default function TonWise() {
  const { data: hasWiseScoreRes } = useWiseHasWiseScore();
  const { data, isLoading } = useWiseScore({
    enabled: hasWiseScoreRes !== undefined,
  });
  const { data: showGen } = useWiseGobal();
  const setShowGen = useWiseGobalMutation();
  const navigate = useNavigate();
  const totalScore = data?.totalScore ?? 0;

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
                    <span className="text-[80px] leading-[80px]">
                      {formatImpact(data?.totalScore ?? 0)}
                    </span>
                  )}
                </div>
                <Link to="/wise-score/detail">
                  <div className="space-y-1 mb-2">
                    <WiseTag className="text-xs" value={totalScore} />
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
