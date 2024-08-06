import { useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setShowMergeAccountModal,
  resetMergeAccountData,
} from '@/store/global';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { mergePassport } from '@/api/incentive';
import { useState } from 'react';
import { Spin } from 'antd';
import useUserInfo from '@/hooks/useUserInfoQuery';
import MergeResult from './MergeResult';
import { shortAddress } from '@tbook/utils/lib/conf';
import MergePassportCard from './MergePassportCard';
import { useQueryClient } from 'react-query';

const moduleConf = {
  title: 'Merge the passport',
  desc: `All data from the 2 incentive passports will be merged. The merge operation can’t be reverted`,
  button: ['Cancel', 'Confirm'],
};
export default function MergeAccount() {
  const { refetch } = useUserInfo();
  const queryClient = useQueryClient();

  const showMergeAccountModal = useSelector(
    (s) => s.global.showMergeAccountModal
  );
  const mergeAccountData = useSelector((s) => s.global.mergeAccountData);
  const dispath = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showMergeResultModal, setShowMergeResultModal] = useState(false);
  const [mergeResult, setMergeResult] = useState({});
  const [mergeSucess, setMergeSucess] = useState(false);
  const hideMergeAccountModal = useCallback(() => {
    dispath(setShowMergeAccountModal(false));
  }, []);
  const onCancel = () => {
    setShowMergeResultModal(false);
    if (mergeAccountData?.redirect && mergeSucess) {
      const key = 'redirect_url';
      const redirect = localStorage.getItem(key);
      if (redirect != null) {
        localStorage.removeItem(key);
        location.href = redirect;
      }
    }
  };

  const handleMergeAccount = () => {
    setLoading(true);
    // api
    mergePassport({
      passportA: mergeAccountData.passportA,
      passportB: mergeAccountData.passportB,
    })
      .then((res) => {
        // console.log(res);
        if (res.code === 200) {
          setMergeSucess(true);
          setMergeResult({
            status: 'sucess',
            twitterName: res.mergeTwitterInfo?.twitterName,
            address: shortAddress(res.address),
          });
          setShowMergeResultModal(true);
          queryClient.invalidateQueries('wise-score');
          refetch();
        } else if (res.code === 400) {
          setMergeSucess(false);
          setShowMergeResultModal(true);
          setMergeResult({
            status: 'failed',
            message: res.message,
          });
        } else {
          setMergeSucess(false);
          setShowMergeResultModal(true);
          setMergeResult({
            status: 'failed',
          });
        }
      })
      .catch(() => {
        setMergeSucess(false);
        setShowMergeResultModal(true);
        setMergeResult({
          status: 'failed',
        });
      })
      .finally(() => {
        // hideMergeAccountModal
        setLoading(false);
        resetMergeAccountData();
        hideMergeAccountModal();
      });
  };

  return (
    <>
      <Transition show={showMergeAccountModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          // initialFocus={cancelButtonRef}
          onClose={hideMergeAccountModal}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-linear2 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="pt-4">
                    <div className="sm:flex sm:items-start">
                      <div className="">
                        <div className="space-y-2 pb-3  px-4 border-b border-white/10">
                          <DialogTitle
                            as="h3"
                            className="text-lg font-medium text-white text-left"
                          >
                            {moduleConf.title}
                          </DialogTitle>
                          <p className="text-[#C0ABD9] text-xs">
                            {moduleConf.desc}
                          </p>
                        </div>

                        <div className="px-4 divide-y divide-white/10  border-b border-white/10 text-[#C0ABD9]">
                          <MergePassportCard
                            name="Current Incentive Passport"
                            account={mergeAccountData.passportA}
                          />
                          <MergePassportCard
                            name="Incentive Passport you want to merge with"
                            account={mergeAccountData.passportB}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex flex-col-reverse gap-y-3 lg:px-6 lg:flex-row lg:gap-x-3">
                    <button
                      type="button"
                      className="inline-flex flex-auto w-full justify-center rounded-md border border-white px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-70 sm:w-auto"
                      onClick={hideMergeAccountModal}
                    >
                      {moduleConf.button[0]}
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      className="inline-flex  flex-auto w-full justify-center items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm sm:w-auto hover:opacity-70"
                      onClick={handleMergeAccount}
                    >
                      {moduleConf.button[1]}
                      {loading && (
                        <Spin spinning size="small" className="ml-1" />
                      )}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <MergeResult
        open={showMergeResultModal}
        onCancel={onCancel}
        data={mergeResult}
      />
    </>
  );
}
