import Layout from '@/layout/ton/Layout';
import useWiseScore from '@/hooks/useWiseScore';
import ScoreSkeleton from './components/score-skeleton';
import WiseDetail from './wise-detail';
import { lazy, Suspense } from 'react';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import PageFallBack from '@/components/pageFallback';
import { setLoginModal } from '@/store/global';
import { useDispatch } from 'react-redux';
import Empty from '@/components/empty';

const WiseInfo = lazy(() => import('./components/wise-info'));

export default function TonWiseScore () {
  const { data } = useWiseScore();
  const { firstLoad, userLogined } = useUserInfoQuery();
  const dispath = useDispatch();

  const handleClick = () => {
    dispath(setLoginModal(true));
  };

  return (
    <Layout>
      <div className='px-5 mt-3 lg:px-0 max-w-md mx-auto'>
        {!firstLoad ? (
          <PageFallBack />
        ) : userLogined ? (
          !data ? (
            <ScoreSkeleton />
          ) : (
            <div className='space-y-16'>
              <Suspense fallback={<ScoreSkeleton />}>
                <WiseInfo />
                {/* <ScoreSkeleton /> */}
              </Suspense>
              <WiseDetail />
            </div>
          )
        ) : (
          <div className='pt-[130px]'>
            <div className='flex flex-col items-center justify-center gap-y-4'>
              <Empty text='Log in to generate your WISE Score and mint WISE SBT.' />
              <button
                className='px-5 py-3 rounded-md bg-[#904BF6] w-[280px] hover:opacity-70'
                onClick={handleClick}
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
