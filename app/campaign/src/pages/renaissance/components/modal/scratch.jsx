import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';

export default function ScratchModal ({ open, closeModal }) {
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
                <div className='w-[280px] h-[476px] bg-red-500 rounded-2xl'>
                  xx
                </div>

                <div className='text-center space-y-0.5'>
                  <h2 className='text-xl font-bold'>
                    <span className='text-color4'>Congratulations！</span>
                  </h2>
                  <p className='text-sm text-[#F8C685]/60'>
                    You have joined WISE SBT whitelist
                  </p>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
