import { lazy, Suspense, useState, useRef } from 'react';
import { useUserRenaissanceKit } from '@/hooks/useUserRenaissance';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import Button from './ui/button';
import ScratchCard from '@/components/scratchCard/card';
import bgPic from '@/images/wise/rewards/cover.png';
import { preloadBatchImage } from '@/utils/common';
import { takeLuckyDraw } from '@/api/incentive';
import initPic from '@/images/wise/scratch/init.png';
import nocard from '@/images/wise/scratch/no-card.png';
import lottieJson from '@/images/lottie/cat-claw.json';
import social from '@/utils/social';
import { ConfigProvider, message } from 'antd';
import moduleConf from '../conf';
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

const prizeTextMap = {
  2: 'You earn 10 TPoints',
  3: 'You earn 25 TPoints',
  4: 'You earn 50 TPoints',
  5: 'You earn 100 TPoints',
  6: 'You are eligible to join WISE SBT waitlist ',
  7: 'You are eligible to generate WISE Score',
  8: 'You earn 500 TPoints',
};

preloadBatchImage(Object.values(prizeMap).concat([initPic, bgPic, nocard]));

export default function Scratch () {
  const { user } = useUserInfoQuery();
  const [messageApi, contextHolder] = message.useMessage();
  const cardRef = useRef();
  const { hashLuckyCardCntData, luckyDrawCnt, refetchInfo, inviteTgUser } =
    useUserRenaissanceKit();
  const [prize, setPrize] = useState(0); // 0没开始
  const [userStarted, setUserStarted] = useState(false);

  const openMessage = (content, onClose) => {
    messageApi.open({
      icon: null,
      content: <div className='px-1 py-1'>🌟🌟 {content} 🌟🌟</div>,
      className: 'mt-40',
      onClose,
    });
  };
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
  const handleFinish = async () => {
    await refetchInfo();
    if (prize > 1) {
      openMessage(prizeTextMap[prize], () => {
        setUserStarted(false);
        setPrize(0);
      });
    } else {
      setTimeout(() => {
        setUserStarted(false);
        setPrize(0);
      }, 1000);
    }
  };

  return (
    <div className='space-y-5 mx-auto overflow-hidden transition-all shadow-xl'>
      <div className='w-full flex flex-col justify-center gap-y-2 items-center'>
        <div
          onClick={handleUserStart}
          onTouchStart={handleUserStart}
          className='bg-[#e71f1f] w-full flex justify-center items-center rounded-2xl overflow-hidden relative'
        >
          <div
            className='w-[343px] h-[433px] rounded-2xl relative bg-cover bg-center'
            style={{ backgroundImage: `url(${bgPic})` }}
          >
            <div className='absolute left-1/2 -translate-x-1/2 bottom-[26px]'>
              {hashLuckyCardCntData && luckyDrawCnt === 0 ? (
                <div className='absolute left-0 bottom-0 z-20 h-[257px] flex items-center'>
                  <img src={nocard} className='w-full' />
                </div>
              ) : (
                !userStarted && (
                  <div className='absolute left-0 bottom-0 z-20 h-[257px] flex items-center'>
                    <Suspense>
                      <Lottie animationData={lottieJson} loop />
                    </Suspense>
                  </div>
                )
              )}

              <ScratchCard
                ref={cardRef}
                width={304}
                height={257}
                coverImg={initPic}
                data={{ prize }}
                autoReinit={luckyDrawCnt > 0}
                onFinish={handleFinish}
              >
                {userStarted && prize > 0 && (
                  <img src={prizeMap[prize]} className='absolute inset-0' />
                )}
              </ScratchCard>
            </div>
          </div>
        </div>

        <div className='w-full space-y-2'>
          <Button className='w-full flex-col' onClick={inviteTgUser}>
            <div className='flex  items-center justify-center'>
              <social.tg className='fill-white' /> Invite friends
            </div>
            <div className='text-sm text-[#F8C685] flex items-center justify-center'>
              Invite 1 friend to earn 500
              <img src={moduleConf.url.tpoint} className='size-3 mx-1' />+ 3
              <img src={moduleConf.url.cat} className='w-5 ml-1 -mt-1' />
            </div>
          </Button>
          <div className='w-full flex gap-x-2'>
            <Link to='/event/renaissance/boost' className='w-full h-10'>
              <Button className='w-full'>Boost</Button>
            </Link>
            <Link to='/ton-explore' className='w-full h-10'>
              <Button className='w-full'>Earn</Button>
            </Link>
          </div>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: '#A138F4',
            },
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>
    </div>
  );
}
