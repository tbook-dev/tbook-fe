import dataJSON from '@/images/lottie/wise-score-skeleton.json';
import { lazy, Suspense } from 'react';

const Lottie = lazy(() => import('lottie-react'));
const moduleConf = {
  title: 'Calculating your WISE score',
};
export default function ScoreSkeleton () {
  return (
    <div className='space-y-20'>
      <h2 className='text-white text-base font-zen-dot'>{moduleConf.title}</h2>
      <Suspense
        fallback={
          <div className='animate-pulse bg-[#1f1f1f] h-[393px] w-[251px] mx-auto' />
        }
      >
        <Lottie
          loop
          autoplay={true}
          animationData={dataJSON}
          style={{ height: '393px', width: '251px', margin: '0 auto' }}
        />
      </Suspense>
    </div>
  );
}
