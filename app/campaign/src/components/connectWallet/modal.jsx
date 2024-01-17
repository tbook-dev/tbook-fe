import { useResponsive } from "ahooks";
import { Fragment, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
// use tailiwind to create slide-over in pc on the right side
// use tailwind to  create slide-over in moble at bottom

export default function Modal({ children, open, onCancel, title }) {
  const { pc } = useResponsive();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCancel}>
        <div className="fixed inset-0" />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[rgb(0,0,0)]/[0.8] overflow-hidden">
            <div
              className={clsx(
                "pointer-events-none fixed flex max-w-full",
                pc ? "inset-y-0 right-0" : "inset-x-0 bottom-0"
              )}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom={pc ? "translate-x-full" : "translate-y-full"}
                enterTo={pc ? "translate-x-0" : "translate-y-0"}
                leave="transform transition ease-in-out duration-500"
                leaveFrom={pc ? "translate-x-0" : "translate-y-0"}
                leaveTo={pc ? "translate-x-full" : "translate-y-full"}
              >
                <Dialog.Panel className="pointer-events-auto w-screen lg:w-[448px]">
                  <div className="flex h-full flex-col overflow-y-auto bg-linear6 pb-6 shadow-s5 rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none">
                    <div className="p-6 border-b border-[rgb(255,255,255)]/[0.1]">
                      <div className="flex items-start justify-between ">
                        <Dialog.Title>{title}</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <CloseOutlined
                            className="text-white cursor-pointer w-6"
                            onClick={onCancel}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="relative flex-1 flex flex-col">
                      {children}
                    </div>
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
