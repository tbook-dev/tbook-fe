import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, lazy, useMemo } from 'react';
import Button from '../ui/button';
import moduleConf from '../../conf';
import social from '@/utils/social';
import nonebg from '@/images/wise/prize/nonebg.svg';
import none from '@/images/wise/prize/none.png';
import tpoint from '@/images/wise/prize/tpoint.png';
import wisesbt from '@/images/wise/prize/wise-sbt.png';
import wisesore from '@/images/wise/prize/wise-score.png';
import { preloadBatchImage } from '@/utils/common';
import { cn } from '@/utils/conf';
import bgMp4 from '@/images/wise/prize/bg.mp4';

const prizeMap = {
  1: none,
  2: tpoint,
  3: tpoint,
  4: tpoint,
  5: tpoint,
  6: wisesbt,
  7: wisesore,
};
preloadBatchImage(Object.values(prizeMap));

export default function ResultTModal ({
  open,
  prize,
  closeModal,
  handleGenerate,
  inviteTgUser,
}) {
  console.log({ prize });
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
            {prize === 1 ? (
              <div
                className='fixed inset-0 bg-center bg-cover backdrop-blur-lg'
                onClick={closeModal}
                style={{ backgroundImage: `url(${nonebg})` }}
              >
                <div className='fixed inset-0 bg-linear12 z-10' />
              </div>
            ) : (
              <div
                className='fixed inset-0  backdrop-blur-xl  flex items-center justify-center'
                onClick={closeModal}
              >
                <video
                  autoPlay
                  loop
                  muted
                  className='w-full h-full object-cover object-center rotate-180'
                >
                  <source src={`${bgMp4}`} type='video/mp4' />
                </video>
                <div className='fixed inset-0 bg-linear12 z-10' />
              </div>
            )}
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
            <div className='w-full max-w-md p-8 my-8 overflow-hidden rounded-2xl flex flex-col justify-center items-center'>
              <img
                src={prizeMap[prize]}
                className={cn({
                  'size-[160px]': [2, 3, 4, 5, 6].includes(prize),
                  'size-[240px]': prize === 1,
                  'w-[280px] h-[251px]': prize === 7,
                })}
              />
              <div className='space-y-2'>
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
                <div className='flex justify-center'>
                  {actionMap[prize].button ? (
                    actionMap[prize].button
                  ) : (
                    <button onClick={closeModal}>{moduleConf.svg.close}</button>
                  )}
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}