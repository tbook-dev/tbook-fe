import { Fragment } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import clsx from 'clsx';

export default function Drawer ({
  title,
  onCancel,
  children,
  open = false,
  showClose = false,
}) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as='div' className='relative z-20' onClose={onCancel}>
        <div className='fixed inset-0' />
        <div className='fixed inset-0 overflow-hidden'>
          <div
            className={clsx(
              'absolute inset-0 overflow-hidden',
              'bg-black/90 backdrop-blur-md'
            )}
          >
            <div
              className={clsx(
                'fixed flex justify-center max-w-full',
                'inset-x-0 bottom-0 max-h-[calc(100dvh_-_60px)]'
              )}
            >
              <TransitionChild
                as={Fragment}
                enter='transform transition ease-in-out duration-500'
                enterFrom='translate-y-full'
                enterTo='translate-y-0'
                leave='transform transition ease-in-out duration-500'
                leaveFrom='translate-y-0'
                leaveTo='translate-y-full'
              >
                <DialogPanel className='w-screen lg:w-[448px]'>
                  <div className='flex w-full h-full flex-col overflow-y-auto overscroll-none lg:pb-6 shadow-s5 rounded-t-xl'>
                    {title && (
                      <div className='sticky top-0 z-10 pt-6 backdrop-blur-3xl '>
                        <div className='flex items-start  px-6 justify-between pb-4 lg:pb-6 border-b border-[rgb(255,255,255)]/[0.1]'>
                          <DialogTitle>{title}</DialogTitle>
                          {showClose && (
                            <div className='ml-3 flex h-7 items-center'>
                              <CloseOutlined
                                className='text-white cursor-pointer w-6'
                                onClick={onCancel}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className='w-full relative flex-1 flex flex-col'>
                      {children}
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
