import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { useMemo } from 'react';
import { useState, Fragment } from 'react';
import Button from '../ui/button';
import social from '@/utils/social';
import useUserRenaissance from '@/hooks/useUserRenaissance';
import { formatImpact } from '@tbook/utils/lib/conf';
import moduleConf from '../../conf';
import ScratchCard from '@/components/scratchCard/card';
import bgPic from '@/images/wise/rewards/cover.png';

import initPic from '@/images/wise/prize/init.png';
import point10 from '@/images/wise/prize/point10.png';
import point25 from '@/images/wise/prize/point25.png';
import point50 from '@/images/wise/prize/point50.png';
import point100 from '@/images/wise/prize/point100.png';
import wisesbt from '@/images/wise/prize/wise-sbt.png';
import wisesore from '@/images/wise/prize/wise-score.png';

import { preloadBatchImage } from '@/utils/common';

const prizeMap = {
  1: point10,
  2: point25,
  3: point50,
  4: point100,
  5: wisesbt,
  6: wisesore,
};
preloadBatchImage(Object.values(prizeMap).concat([initPic, bgPic]));

export default function ScratchModal ({
  open,
  closeModal,
  inviteTgUser,
  handleGenerate,
  handleJoin,
}) {
  const { data } = useUserRenaissance();
  const [prize, setPrize] = useState(0);
  const [action, setAction] = useState(0);
  const actionItem = useMemo(() => {
    const map = {
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
        text: 'You win 10 TPoints',
      },
      2: {
        button: (
          <Button
            className='w-[120px]'
            onClick={() => {
              closeModal();
              handleJoin();
            }}
          >
            Join
          </Button>
        ),
        text: 'You win the eligibility to mint WISE SBT',
      },
      3: {
        button: (
          <Button
            className='w-[120px]'
            onClick={() => {
              closeModal();
              handleGenerate();
            }}
          >
            Generate
          </Button>
        ),
        text: 'You win the eligibility to generate WISE Score',
      },
    };
    return map[action];
  }, [action]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={closeModal}
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
              onClick={closeModal}
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
            <div className='inline-block space-y-5 w-full max-w-md p-8 my-8 overflow-hidden transition-all shadow-xl rounded-2xl'>
              <div className='w-full flex flex-col justify-center gap-y-5  items-center'>
                <div
                  className='w-[280px] h-[476px] rounded-2xl relative bg-cover'
                  style={{ backgroundImage: `url(${bgPic})` }}
                >
                  <div className='absolute left-1/2 -translate-x-1/2 bottom-[86px]'>
                    <ScratchCard
                      width={215}
                      height={205}
                      coverImg={initPic}
                      autoReinit
                      onFinish={() => {
                        console.log('onFinish--------->');
                      }}
                      onInit={() => {
                        // set under pic
                        console.log('onint');
                        setPrize(v => v + 1);
                      }}
                    >
                      {prize && (
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
                    <button className='flex items-center gap-x-1 text-xs font-syne font-bold text-[#FFDFA2] bg-[#F8C685]/15 px-2 py-1 rounded-md'>
                      {formatImpact(data?.scratchcard ?? 0)} scratch card
                      {data?.scratchcard > 1 && 's'}
                      {moduleConf.svg.add}
                    </button>
                    <span className='flex items-center gap-x-1 text-xs text-[#FFDFA2] font-syne font-bold  bg-[#F8C685]/15 px-2 py-1 rounded-md'>
                      TPoints
                      <b className='font-normal font-rhd'>
                        {formatImpact(data?.TPoints ?? 0)}
                      </b>
                    </span>
                  </div>
                  <div className='flex gap-x-1 items-center'>
                    {moduleConf.svg.timer}
                    <span className='text-color6 text-xs'>
                      next free card in 09:59
                    </span>
                  </div>
                </div>

                {actionItem.button}

                {action > 0 && (
                  <div className='text-center space-y-0.5 w-[280px]'>
                    <h2 className='text-xl font-bold'>
                      <span className='text-color4'>Congratulations！</span>
                    </h2>
                    <p className='text-sm text-[#F8C685]/60'>
                      {actionItem.text}
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
