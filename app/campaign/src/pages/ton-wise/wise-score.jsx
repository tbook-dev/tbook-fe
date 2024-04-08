import Layout from '@/layout/ton/Layout';
import useWiseScore from '@/hooks/useWiseScore';
import ScoreSkeleton from './score-skeleton';
import WiseInfo from './wise-info';

export default function TonWiseScore() {
  const { data, isLoading } = useWiseScore();
  return (
    <Layout>
      <div className="px-5 mt-3 lg:px-0 max-w-md mx-auto">
        {isLoading ? (
          <ScoreSkeleton />
        ) : (
          <div className='space-y-16'>
            <WiseInfo />
          </div>
        )}
      </div>
    </Layout>
  );
}
