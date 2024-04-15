import Layout from '@/layout/ton/Layout';
import useWiseScore from '@/hooks/useWiseScore';
import ScoreSkeleton from './components/score-skeleton';
import WiseDetail from './wise-detail';
import { lazy, Suspense } from 'react';
const WiseInfo = lazy(() => import('./components/wise-info'));

export default function TonWiseScore () {
  const { data } = useWiseScore();
  return (
    <Layout>
      <div className='px-5 mt-3 lg:px-0 max-w-md mx-auto'>
        {!data ? (
          <ScoreSkeleton />
        ) : (
          <div className='space-y-16'>
            <Suspense fallback={<ScoreSkeleton />}>
              <WiseInfo />
            </Suspense>
            <WiseDetail />
          </div>
        )}
      </div>
    </Layout>
  );
}
