import Layout from '@/layout/ton/Layout';
import useWiseScore from '@/hooks/useWiseScore';
import ScoreSkeleton from './components/score-skeleton';
import WiseInfo from './components/wise-info';
import WiseDetail from './wise-detail';

export default function TonWiseScore() {
  const { data } = useWiseScore();
  return (
    <Layout>
      <div className="px-5 mt-3 lg:px-0 max-w-md mx-auto">
        {!data ? (
          <ScoreSkeleton />
        ) : (
          <div className="space-y-16">
            <WiseInfo />
            <WiseDetail />
          </div>
        )}
      </div>
    </Layout>
  );
}
