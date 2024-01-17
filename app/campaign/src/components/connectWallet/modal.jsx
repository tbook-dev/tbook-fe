import { useResponsive } from "ahooks";
import { Fragment, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Dialog, Transition } from "@headlessui/react";
// use tailiwind to create slide-over in pc on the right side
// use tailwind to  create slide-over in moble at bottom

export default function Modal({ children, open, onCancel }) {
  const { pc } = useResponsive();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-linear6 pb-6 shadow-s5">
                    <div className="p-6 border-b border-[rgb(255,255,255)]/[0.1]">
                      <div className="flex items-start justify-between ">
                        <Dialog.Title className="text-base font-zen-dot text-white">
                          Log in
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <CloseOutlined
                            className="text-white cursor-pointer w-6"
                            onClick={onCancel}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
