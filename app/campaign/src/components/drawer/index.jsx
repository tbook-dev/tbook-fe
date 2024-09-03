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
import { useResponsive } from 'ahooks';

export default function Drawer({
  title,
  onCancel,
  children,
  open = false,
  showClose = false,
}) {
  const { pc } = useResponsive();
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onCancel}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div
            className={clsx(
              'absolute inset-0 overflow-hidden',
              'bg-black/80 backdrop-blur-md'
            )}
          >
            <div
              className={clsx(
                'fixed flex justify-center lg:items-center max-w-full',
                'inset-x-0 bottom-0 lg:top-0 max-h-[calc(100dvh_-_60px)]'
              )}
            >
              <TransitionChild
                as={Fragment}
                enter={'transform transition ease-in-out duration-150'}
                enterFrom={pc ? 'opacity-0' : 'translate-y-full'}
                enterTo={pc ? 'opacity-100' : 'translate-y-0'}
                leave={'transform transition ease-in-out duration-150'}
                leaveFrom={pc ? 'opacity-100' : 'translate-y-0'}
                leaveTo={pc ? 'opacity-0' : 'translate-y-full'}
              >
                <DialogPanel className="w-screen lg:w-[448px]">
                  <div className="flex w-full h-full flex-col overflow-y-auto overscroll-none shadow-s5 rounded-t-xl lg:rounded-b-xl">
                    {title && (
                      <div className="sticky top-0 z-10 pt-6 backdrop-blur-3xl ">
                        <div className="flex items-start  px-6 justify-between pb-4 lg:pb-6 border-b border-[rgb(255,255,255)]/[0.1] text-white">
                          <DialogTitle>{title}</DialogTitle>
                          {showClose && (
                            <div className="ml-3 flex h-7 items-center">
                              <CloseOutlined
                                className="text-white cursor-pointer w-6"
                                onClick={onCancel}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="w-full relative flex-1 flex flex-col">
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
