import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { useMemo, lazy, Suspense, useState, Fragment } from 'react';
import Button from '../ui/button';
import social from '@/utils/social';
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

import initPic from '@/images/wise/prize/init.png';
import none from '@/images/wise/prize/none.png';
import point10 from '@/images/wise/prize/point10.png';
import point25 from '@/images/wise/prize/point25.png';
import point50 from '@/images/wise/prize/point50.png';
import point100 from '@/images/wise/prize/point100.png';
import wisesbt from '@/images/wise/prize/wise-sbt.png';
import wisesore from '@/images/wise/prize/wise-score.png';
import lottieJson from '@/images/lottie/cat-claw.json';
import { useCallback } from 'react';
const Lottie = lazy(() => import('lottie-react'));

const prizeMap = {
  1: none,
  2: point10,
  3: point25,
  4: point50,
  5: point100,
  6: wisesbt,
  7: wisesore,
};
preloadBatchImage(Object.values(prizeMap).concat([initPic, bgPic]));
const targetDate = new Date(Date.now() + 1000 * 60 * 10);
export default function ScratchModal ({
  open,
  closeModal,
  inviteTgUser,
  handleGenerate,
  handleJoin,
}) {
  const { user } = useUserInfoQuery();
  const { luckyDrawCnt, tpoints, refetchInfo } = useUserRenaissanceKit();
  const countdown = useCountdown({ targetDate, enabled: open });
  const [prize, setPrize] = useState(0); // 0没开始
  const [showPrize, setShowPrize] = useState(false);
  const [lottiePlayed, setLottiePlayed] = useState(false);
  const handleCloseModal = useCallback(() => {
    closeModal();
    setTimeout(() => {
      setLottiePlayed(false);
    }, 300);
  }, []);

  const makeLuckDraw = async () => {
    if (luckyDrawCnt === 0) return;
    setShowPrize(false);
    const res = await takeLuckyDraw(user?.userId);
    const {
      fissionLevel,
      tpointsNum,
      isEligibleToGenerateWiseScore,
      isEligibleToGenerateSBT,
    } = res;
    if (tpointsNum === 100) {
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
    await refetchInfo();
  };

  const actionMap = useMemo(() => {
    return {
      0: {
        button: (
          <Button className='gap-x-1.5 w-[full] text-xs' onClick={inviteTgUser}>
            <social.tg className='fill-white' /> invite 1 friend to get 3 free
            cards
          </Button>
        ),
      },
      1: {
        button: null,
        text: 'You missed the reward. Adjust your posture and scratch again. ',
      },
      2: {
        button: null,
        text: 'You win 10 TPoints',
      },
      3: {
        button: null,
        text: 'You win 25 TPoints',
      },
      4: {
        button: null,
        text: 'You win 50 TPoints',
      },
      5: {
        button: null,
        text: 'You win 100 TPoints',
      },
      6: {
        button: null,
        text: 'You win the eligibility to mint WISE SBT',
      },
      7: {
        button: (
          <Button
            className='w-[120px]'
            onClick={() => {
              handleCloseModal();
              handleGenerate();
            }}
          >
            Generate
          </Button>
        ),
        text: 'You win the eligibility to generate WISE Score',
      },
    };
  }, [prize]);

  return (
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
            <div className='inline-block space-y-5 w-max max-w-md overflow-hidden transition-all shadow-xl rounded-2xl'>
              <div className='w-full flex flex-col justify-center gap-y-5  items-center'>
                <div
                  className='w-[280px] h-[476px] rounded-2xl relative bg-cover'
                  style={{ backgroundImage: `url(${bgPic})` }}
                >
                  <div className='absolute left-1/2 -translate-x-1/2 bottom-[86px]'>
                    {!lottiePlayed && (
                      <div className='absolute left-0 bottom-0 z-20 h-[205px] flex items-center'>
                        <Suspense>
                          <Lottie
                            animationData={lottieJson}
                            loop={false}
                            onComplete={() => {
                              setLottiePlayed(true);
                            }}
                          />
                        </Suspense>
                      </div>
                    )}

                    <ScratchCard
                      width={215}
                      height={205}
                      coverImg={initPic}
                      autoReinit
                      onFinish={() => {
                        setShowPrize(true);
                        if (prize === 6) {
                          handleCloseModal();
                          handleJoin();
                        }
                      }}
                      onInit={() => {
                        makeLuckDraw();
                      }}
                    >
                      {prizeMap[prize] && (
                        <img
                          src={prizeMap[prize]}
                          className='absolute inset-0'
                        />
                      )}
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
                      next free card in {countdown}
                    </span>
                  </div>
                </div>

                {showPrize ? actionMap[prize].button : actionMap[0].button}

                {showPrize && prize > 0 && (
                  <div className='text-center space-y-0.5 w-[280px]'>
                    <h2 className='text-xl font-bold'>
                      <span className='text-color4'>
                        {prize === 1 ? 'Oops...' : 'Congratulations！'}
                      </span>
                    </h2>
                    <p className='text-sm text-[#F8C685]/60'>
                      {actionMap[prize].text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
