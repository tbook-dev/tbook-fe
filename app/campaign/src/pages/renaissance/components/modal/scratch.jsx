import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { lazy, Suspense, useState, Fragment } from 'react';
import {
  useUserRenaissanceKit,
  useCountdown,
} from '@/hooks/useUserRenaissance';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../../conf';
import ScratchCard from '@/components/scratchCard/card';
import bgPic from '@/images/wise/rewards/cover.png';
import { preloadBatchImage } from '@/utils/common';
import { takeLuckyDraw } from '@/api/incentive';
import ResultModal from './result';
import initPic from '@/images/wise/prize/init.png';
import resultPic from '@/images/wise/prize/result.png';
import nocard from '@/images/wise/prize/no-card.png';
import lottieJson from '@/images/lottie/cat-claw.json';
import Button from '../ui/button';
import social from '@/utils/social';

import { useCallback } from 'react';
const Lottie = lazy(() => import('lottie-react'));

preloadBatchImage([initPic, resultPic, bgPic, nocard]);
export default function ScratchModal ({
  open,
  closeModal,
  inviteTgUser,
  handleGenerate,
  handleJoin,
}) {
  const { user } = useUserInfoQuery();
  const { luckyDrawCnt, tpoints, refetchInfo, targetDate } =
    useUserRenaissanceKit();
  const countdown = useCountdown({
    targetDate,
    enabled: open,
    onEnd: refetchInfo,
  });
  const [prize, setPrize] = useState(0); // 0没开始
  const [showPrize, setShowPrize] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  const [isLoadingPrize, setLoadingPrize] = useState(false);
  const handleCloseModal = useCallback(() => {
    closeModal();
    setTimeout(() => {
      setUserStarted(false);
      setUserStarted(false);
    }, 300);
  }, []);

  const handleUserStart = () => {
    if (!isLoadingPrize) {
      setUserStarted(true);
    } else {
      console.log('loading prize');
    }
    if (!isLoadingPrize) {
      setUserStarted(true);
    } else {
      console.log('loading prize');
    }
  };

  const makeLuckDraw = async () => {
    if (luckyDrawCnt === 0) return;
    setLoadingPrize(true);
    // setShowPrize(false);
    // setShowPrize(false);
    const res = await takeLuckyDraw(user?.userId);
    setLoadingPrize(false);
    const {
      fissionLevel,
      tpointsNum,
      isEligibleToGenerateWiseScore,
      isEligibleToGenerateSBT,
    } = res;
    if (tpointsNum === 500) {
      setPrize(8);
    } else if (tpointsNum === 100) {
      if (tpointsNum === 500) {
        setPrize(8);
      } else if (tpointsNum === 100) {
        setPrize(5);
      } else if (tpointsNum === 50) {
        setPrize(4);
      } else if (tpointsNum === 25) {
        setPrize(3);
      } else if (tpointsNum === 10) {
        setPrize(2);
      } else if (tpointsNum === 0) {
        if (fissionLevel === 1) {
          if (isEligibleToGenerateWiseScore === 1) {
            setPrize(7);
          } else {
            setPrize(1);
          }
        } else if (fissionLevel === 2) {
          if (isEligibleToGenerateSBT === 1) {
            setPrize(6);
          } else {
            setPrize(1);
          }
        } else if (fissionLevel === 3) {
          setPrize(1);
        }
      }
    }
  };

  return (
    <>
      <ResultModal
        prize={prize}
        inviteTgUser={inviteTgUser}
        handleGenerate={handleGenerate}
        open={showPrize}
        closeModal={() => {
          setPrize(0);
          setShowPrize(false);
        }}
      />
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={handleCloseModal}
        >
          <div className='min-h-screen w-screen px-4 flex justify-center items-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div
                className='fixed inset-0 bg-black/80 backdrop-blur'
                onClick={handleCloseModal}
              />
            </TransitionChild>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                onClick={handleUserStart}
                onTouchStart={handleUserStart}
                className='inline-block space-y-5 w-max max-w-md overflow-hidden transition-all shadow-xl rounded-2xl'
              >
                <div className='w-full flex flex-col justify-center gap-y-5  items-center'>
                  <div
                    className='w-[300px] h-[510px] rounded-2xl relative bg-cover bg-center'
                    style={{ backgroundImage: `url(${bgPic})` }}
                  >
                    <div className='absolute left-1/2 -translate-x-1/2 bottom-[86px]'>
                      {luckyDrawCnt === 0 ? (
                        <div className='absolute left-0 bottom-0 z-20 h-[224px] flex items-center'>
                          <img src={nocard} className='w-full' />
                        </div>
                      ) : (
                        (isLoadingPrize || !userStarted) && (
                          <div className='absolute left-0 bottom-0 z-20 h-[224px] flex items-center'>
                            <Suspense>
                              <Lottie animationData={lottieJson} loop />
                            </Suspense>
                          </div>
                        )
                      )}

                      <ScratchCard
                        width={264}
                        height={224}
                        coverImg={initPic}
                        autoReinit={false}
                        onFinish={() => {
                          refetchInfo();
                          if (prize === 6) {
                            handleJoin();
                          }
                          setTimeout(() => {
                            handleCloseModal();
                            setShowPrize(true);
                          }, 1000);
                        }}
                        onInit={() => {
                          makeLuckDraw();
                        }}
                      >
                        <img src={resultPic} className='absolute inset-0' />
                      </ScratchCard>
                    </div>
                  </div>

                  <div className='w-[280px] space-y-0.5'>
                    <div className='flex items-center justify-between'>
                      <button
                        onClick={inviteTgUser}
                        className='flex items-center gap-x-1 text-xs font-syne font-bold text-[#FFDFA2] bg-[#F8C685]/15 px-2 py-1 rounded-md'
                      >
                        {formatImpact(luckyDrawCnt)} scratch card
                        {luckyDrawCnt > 1 && 's'}
                        {moduleConf.svg.add}
                      </button>
                      <span className='flex items-center gap-x-1 text-xs text-[#FFDFA2] font-syne font-bold  bg-[#F8C685]/15 px-2 py-1 rounded-md'>
                        TPoints
                        <b className='font-normal font-rhd'>
                          {formatImpact(tpoints)}
                        </b>
                      </span>
                    </div>

                    <div className='flex gap-x-1 items-center'>
                      {moduleConf.svg.timer}
                      <span className='text-color6 text-xs'>
                        {targetDate > 0
                          ? `next free card in ${countdown}`
                          : `next 5 free cards at 0AM`}
                      </span>
                    </div>
                    <div className='flex justify-center pt-4'>
                      <Button
                        className='gap-x-1.5 w-[full] text-xs'
                        onClick={inviteTgUser}
                      >
                        <social.tg className='fill-white' /> invite 1 friend to
                        get 3 free cards
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
