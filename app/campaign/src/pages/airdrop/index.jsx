import { useResponsive } from 'ahooks';
import Banner from './banner';
import Phase from './phase';
import { lazy, Suspense } from 'react';
import PageFallBack from '@/components/pageFallback';
import { useState, useCallback } from 'react';

const AirDropModal = lazy(() => import('./modal/airdrop'));
const ViewInPC = lazy(() => import('@/components/viewInpc'));

export default function AirDrop () {
  const { pc } = useResponsive();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({ amount: 0, symbol: 'GAME' });
  const closeModal = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setModalData({ amount: 0, symbol: 'GAME' });
    }, 100);
  }, []);
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className='space-y-16 pt-10 lg:pt-5 lg:w-[1200px] mx-auto pb-16 lg:py-2  text-white'>
      {pc ? (
        <>
          <Banner />
          <Phase setModalData={setModalData} openModal={openModal} />
        </>
      ) : (
        <Suspense fallback={<PageFallBack />}>
          <ViewInPC />
        </Suspense>
      )}
      <Suspense>
        <AirDropModal open={open} onClose={closeModal} {...modalData} />
      </Suspense>
    </div>
  );
}
