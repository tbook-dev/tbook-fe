import { useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowMergeAccountModal,
  resetMergeAccountData,
} from "@/store/global";
import { Dialog, Transition } from "@headlessui/react";
import { mergeTwitterAndAddressAccount } from "@/api/incentive";
import { useState } from "react";
import { Spin } from "antd";
import useUserInfo from "@/hooks/useUserInfoQuery";
import MergeResult from "./MergeResult";
import { shortAddress } from "@tbook/utils/lib/conf";
import { useAccount } from "wagmi";

const moduleConf = {
  title: "Confirm to merge ?",
  button: ["Cancel", "Confirm"],
  desc: "This action cannot be reverted.",
  getAccountInfo: ({ twitterName = "", address = "" }) => {
    return (
      <>
        All data from the incentive passport associated with X @
        <span className="text-white font-medium">{twitterName}</span>
        and the incentive passport associated with address{" "}
        <span className="text-white font-medium">
          {shortAddress(address)}
        </span>{" "}
        will be merged.
      </>
    );
  },
};
export default function MergeAccount() {
  const { data: userData, refetch } = useUserInfo();
  const showMergeAccountModal = useSelector(
    (s) => s.global.showMergeAccountModal
  );
  const mergeAccountData = useSelector((s) => s.global.mergeAccountData);
  const dispath = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showMergeResultModal, setShowMergeResultModal] = useState(false);
  const [mergeResult, setMergeResult] = useState({});
  const { address } = useAccount();

  const hideMergeAccountModal = useCallback(() => {
    dispath(setShowMergeAccountModal(false));
  }, []);
  const handleMergeAccount = () => {
    setLoading(true);
    // api
    const twitterId = userData?.userTwitter.twitterId;
    mergeTwitterAndAddressAccount({ twitterId, address })
      .then((res) => {
        // console.log(res);
        if (res.code === 200) {
          setMergeResult({
            status: "sucess",
            twitterName: res.mergeTwitterInfo?.twitterName,
            address: res.address,
          });
          setShowMergeResultModal(true);
          refetch();
        } else {
          setShowMergeResultModal(true);
          setMergeResult({
            status: "failed",
          });
        }
      })
      .catch(() => {
        setShowMergeResultModal(true);
        setMergeResult({
          status: "failed",
        });
      })
      .finally(() => {
        // hideMergeAccountModal
        setLoading(false);
        resetMergeAccountData();
        hideMergeAccountModal();
        // callback
        if (typeof mergeAccountData.callback === "function") {
          mergeAccountData.callback();
        }
      });
  };

  return (
    <>
      <Transition.Root show={showMergeAccountModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          // initialFocus={cancelButtonRef}
          onClose={hideMergeAccountModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-linear2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[rgb(69,10,10)]/[0.25] sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="40"
                            height="40"
                            rx="20"
                            fill="#450A0A"
                            fillOpacity="0.25"
                          />
                          <path
                            d="M20 17V19M20 23H20.01M13.0718 27H26.9282C28.4678 27 29.4301 25.3333 28.6603 24L21.7321 12C20.9623 10.6667 19.0378 10.6667 18.268 12L11.3398 24C10.57 25.3333 11.5322 27 13.0718 27Z"
                            stroke="#DC2626"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 sm:ml-4 sm:mt-0">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium text-white text-center lg:text-left"
                        >
                          {moduleConf.title}
                        </Dialog.Title>
                        <div className="mt-2 text-[#C0ABD9]">
                          <p className="text-sm">
                            {moduleConf.getAccountInfo(mergeAccountData)}
                          </p>
                          <p className="text-sm">{moduleConf.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex flex-col-reverse gap-y-3 lg:px-6 lg:flex-row lg:justify-end lg:gap-x-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 sm:w-auto"
                      onClick={hideMergeAccountModal}
                    >
                      {moduleConf.button[0]}
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      className="inline-flex w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm sm:w-auto hover:opacity-70"
                      onClick={handleMergeAccount}
                    >
                      {moduleConf.button[1]}
                      {loading && (
                        <Spin spinning size="small" className="ml-1" />
                      )}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <MergeResult
        open={showMergeResultModal}
        onCancel={() => setShowMergeResultModal(false)}
        data={mergeResult}
      />
    </>
  );
}
