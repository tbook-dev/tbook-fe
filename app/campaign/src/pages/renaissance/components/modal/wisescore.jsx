import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
} from '@headlessui/react';
import { Fragment, useLayoutEffect, useState } from 'react';
import Score from '../ui/score';
import useUserRenaissance, { useLevel } from '@/hooks/useUserRenaissance';
import { formatImpact } from '@tbook/utils/lib/conf';

export default function WisescoreModal ({ open, closeModal, onComplete }) {
  const [generating, setGenerating] = useState(false);
  const { refetch, data } = useUserRenaissance();

  useLayoutEffect(() => {
    if (open) {
      setGenerating(true);
      setTimeout(async () => {
        await onComplete(2);
        await refetch();
        setGenerating(false);
      }, 3000);
    }
  }, [open]);
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
              onClick={generating ? null : closeModal}
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
            <div className='bg-black border border-[#FFEAB5]/60 inline-block space-y-5 w-full max-w-md p-8 my-8 overflow-hidden transition-all shadow-xl rounded-2xl'>
              <DialogTitle
                as='h3'
                className='text-center text-xl font-bold text-color4'
              >
                <span className='text-color4'>WISE Score</span>
              </DialogTitle>

              <div className='w-full flex flex-col justify-center gap-y-5  items-center'>
                <Score
                  className='w-full'
                  text={generating ? '8???8' : formatImpact(data?.wisescore)}
                />
                {generating ? (
                  <div className='text-[#F8C685]/60 text-xl'>Generating...</div>
                ) : (
                  <div className='text-center space-y-0.5'>
                    <h2 className='text-xl font-bold'>
                      <span className='text-color4'>Congratulations！</span>
                    </h2>
                    <p className='text-sm text-[#F8C685]/60'>
                      Now heal the world with your WISE Score
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
