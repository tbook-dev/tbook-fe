import passport_generating from "@/images/passport/passport_generating.png";
import { useResponsive } from "ahooks";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { setShowPassportGeneratingModal } from "@/store/global";
import Card from "./card";

export default function PassportGen() {
  const { pc } = useResponsive();
  const open = useSelector((s) => s.global.showPassportGeneratingModal);
  const dispatch = useDispatch();
  const [genPending, setGenPending] = useState(true);
  const setClose = useCallback(() => {
    dispatch(setShowPassportGeneratingModal(false));
  }, []);
  console.log({ open });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
        </Transition.Child>
        <button onClick={() => setGenPending((v) => !v)}>switch</button>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            {genPending ? (
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Dialog.Panel className="relative rounded-lg">
                  <img
                    className="w-[317px] h-[452px]"
                    src={passport_generating}
                    alt="passport gennerat"
                  />
                </Dialog.Panel>
              </Transition.Child>
            ) : (
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Dialog.Panel className="relative rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    className="hidden lg:block absolute right-0 -top-8 cursor-pointer group"
                    onClick={setClose}
                  >
                    <path
                      d="M14.5 13.5L26.5 25.5M26.5 13.5L14.5 25.5"
                      className="stroke-white/60 group-hover:stroke-white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Card />
                </Dialog.Panel>
              </Transition.Child>
            )}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
