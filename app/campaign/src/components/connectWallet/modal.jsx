import { useResponsive } from 'ahooks';
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
import passport_locked from '@/images/passport/passport_locked.png';
import useUserInfo from '@/hooks/useUserInfoQuery';

// use tailiwind to create slide-over in pc on the right side
// use tailwind to  create slide-over in moble at bottom

export default function Modal ({ children, open, onCancel, title, logout }) {
  const { pc } = useResponsive();
  const { userLogined } = useUserInfo();

  return (
    <>
      {pc && !userLogined && (
        <Transition show={open} as={Fragment}>
          <Dialog as='div' className='relative z-20' onClose={() => undefined}>
            <div className='fixed inset-0' />
            <div className='fixed inset-0 overflow-hidden'>
              <div className='absolute inset-y-0 left-0 w-[calc(100vw_-_448px)] bg-[rgb(0,0,0)]/[0.8] overflow-hidden'>
                <TransitionChild
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom={'opacity-0'}
                  enterTo={'opacity-100'}
                  leave='transform transition ease-in-out duration-500'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <img
                      src={passport_locked}
                      className='w-[317px] h-[452px]'
                    />
                  </div>
                </TransitionChild>
              </div>
              <div className='absolute inset-y-0 right-0 w-[448px] bg-[rgb(0,0,0)]/[0.8]' />
            </div>
          </Dialog>
        </Transition>
      )}

      <Transition show={open} as={Fragment}>
        <Dialog as='div' className='relative z-20' onClose={onCancel}>
          <div className='fixed inset-0' />
          <div className='fixed inset-0 overflow-hidden'>
            <div
              className={clsx('absolute inset-0 overflow-hidden', {
                'bg-black/[0.8]': !pc,
              })}
            >
              <div
                className={clsx(
                  'pointer-events-none fixed flex max-w-full',
                  // 'fixed flex max-w-full',
                  pc
                    ? 'inset-y-0 right-0'
                    : 'inset-x-0 bottom-0 max-h-[calc(100dvh_-_60px)]'
                )}
              >
                <TransitionChild
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500'
                  enterFrom={pc ? 'translate-x-full' : 'translate-y-full'}
                  enterTo={pc ? 'translate-x-0' : 'translate-y-0'}
                  leave='transform transition ease-in-out duration-500'
                  leaveFrom={pc ? 'translate-x-0' : 'translate-y-0'}
                  leaveTo={pc ? 'translate-x-full' : 'translate-y-full'}
                >
                  <DialogPanel className='pointer-events-auto w-screen lg:w-[448px]'>
                    <div className='flex h-full flex-col overflow-y-auto overscroll-none bg-linear6 lg:pb-6 shadow-s5 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none'>
                      <div className='sticky top-0 z-10 pt-6 backdrop-blur-3xl '>
                        <div className='flex items-start  px-6 justify-between pb-4 lg:pb-6 border-b border-[rgb(255,255,255)]/[0.1]'>
                          <DialogTitle>{title}</DialogTitle>
                          <div className='ml-3 flex h-7 items-center'>
                            <CloseOutlined
                              className='text-white cursor-pointer w-6'
                              onClick={onCancel}
                            />
                          </div>
                        </div>

                        <div className='px-6'>{logout}</div>
                      </div>
                      <div className='relative flex-1 flex flex-col'>
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
    </>
  );
}
