import { useResponsive } from 'ahooks';
import Banner from './banner';
import Phase from './phase';
import { lazy, Suspense } from 'react';
import PageFallBack from '@/components/pageFallback';

const ViewInPC = lazy(() => import('@/components/viewInpc'));

export default function AirDrop () {
  const { pc } = useResponsive();
  return (
    <div className='space-y-16 pt-10 lg:pt-5 lg:w-[1200px] mx-auto pb-16 lg:py-2  text-white'>
      {pc ? (
        <>
          <Banner />
          <Phase />
        </>
      ) : (
        <Suspense fallback={<PageFallBack />}>
          <ViewInPC />
        </Suspense>
      )}
    </div>
  );
}
