import { lazy, Suspense, useState, Fragment } from 'react';
import { useUserRenaissanceKit } from '@/hooks/useUserRenaissance';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../conf';
import Button from './ui/button';
import ScratchCard from '@/components/scratchCard/card';
import bgPic from '@/images/wise/rewards/cover.png';
import { preloadBatchImage } from '@/utils/common';
import { takeLuckyDraw } from '@/api/incentive';
import initPic from '@/images/wise/prize/init.png';
// import resultPic from '@/images/wise/prize/result.png';
import nocard from '@/images/wise/prize/no-card.png';
import lottieJson from '@/images/lottie/cat-claw.json';
import social from '@/utils/social';
import { useCallback } from 'react';

import none from '@/images/wise/scratch/none.png';
import tpoint10 from '@/images/wise/scratch/tpoint10.png';
import tpoint25 from '@/images/wise/scratch/tpoint25.png';
import tpoint50 from '@/images/wise/scratch/tpoint50.png';
import tpoint100 from '@/images/wise/scratch/tpoint100.png';
import tpoint500 from '@/images/wise/scratch/tpoint500.png';

import wisesbt from '@/images/wise/scratch/wisesbt.png';
import wisesore from '@/images/wise/scratch/wisescore.png';
import { Link } from 'react-router-dom';
const Lottie = lazy(() => import('lottie-react'));

const prizeMap = {
  1: none,
  2: tpoint10,
  3: tpoint25,
  4: tpoint50,
  5: tpoint100,
  6: wisesbt,
  7: wisesore,
  8: tpoint500,
};
preloadBatchImage(Object.values(prizeMap).concat([initPic, bgPic, nocard]));

export default function Scratch ({
  closeModal,
  inviteTgUser,
  handleGenerate,
  refetchUserLevel,
}) {
  const { user } = useUserInfoQuery();
  const { tpoints, luckyDrawCnt, refetchInfo, targetDate } =
    useUserRenaissanceKit();
  const [prize, setPrize] = useState(0); // 0没开始
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [userStarted, setUserStarted] = useState(false);
  // const [isLoadingPrize, setLoadingPrize] = useState(false);
  const handleCloseModal = useCallback(() => {
    closeModal();
    setTimeout(() => {
      setUserStarted(false);
    }, 300);
  }, []);

  const handleUserStart = () => {
    if (!userStarted) {
      setUserStarted(true);
      makeLuckDraw();
    }
  };

  const makeLuckDraw = async () => {
    if (luckyDrawCnt === 0) return;
    const res = await takeLuckyDraw(user?.userId);
    const {
      fissionLevel,
      tpointsNum,
      isEligibleToGenerateWiseScore,
      isEligibleToGenerateSBT,
    } = res;
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
  };

  return (
    <div
      onClick={handleUserStart}
      onTouchStart={handleUserStart}
      className='space-y-5 max-w-md mx-auto overflow-hidden transition-all shadow-xl'
    >
      <div className='w-full flex flex-col justify-center gap-y-2 items-center'>
        <div className='bg-[#e71f1f] w-full flex justify-center items-center rounded-2xl relative'>
          <div
            className='w-[343px] h-[433px] rounded-2xl relative bg-cover bg-center'
            style={{ backgroundImage: `url(${bgPic})` }}
          >
            <div className='absolute left-1/2 -translate-x-1/2 bottom-[18px]'>
              {/* {luckyDrawCnt === 0 ? (
                <div className='absolute left-0 bottom-0 z-20 h-[224px] flex items-center'>
                  <img src={nocard} className='w-full' />
                </div>
              ) : (
                !userStarted && (
                  <div className='absolute left-0 bottom-0 z-20 h-[224px] flex items-center'>
                    <Suspense>
                      <Lottie animationData={lottieJson} loop />
                    </Suspense>
                  </div>
                )
              )} */}

              <ScratchCard
                width={304}
                height={257}
                coverImg={initPic}
                autoReinit={false}
                onFinish={async () => {
                  refetchUserLevel();
                  handleCloseModal();
                  refetchInfo();
                  setShowPrizeModal(true);
                }}
              >
                {userStarted && prize > 0 && (
                  <img src={prizeMap[prize]} className='absolute inset-0' />
                )}
              </ScratchCard>
            </div>
          </div>
        </div>

        <div className='w-full flex gap-x-2'>
          <Link to='/ton-explore' className='w-full h-10'>
            <Button className='w-full'>Earn</Button>
          </Link>
          <Button className='w-full h-10' onClick={inviteTgUser}>
            <social.tg className='fill-white' /> Invite friends
          </Button>
        </div>
      </div>
    </div>
  );
}
