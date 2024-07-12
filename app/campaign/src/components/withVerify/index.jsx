import { useState, useCallback } from 'react';
import clsx from 'clsx';
import useSocial from '@/hooks/useSocial';
import VerifyStatus, { verifyStatusEnum } from './VerifyStatus';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setLoginModal, setConnectWalletModal } from '@/store/global';
import { Modal } from 'antd';
import { useResponsive } from 'ahooks';
import { actionMap } from '@tbook/credential';
import { getStrJSON } from '@/utils/common';
import { useTelegram } from '@/hooks/useTg';

const modalConf = {
  title: 'Verify',
  step1: {
    title: 'Authorize your account',
    desc: {
      twitter: 'Please authorize your X account and continue to verify.',
      discord: 'Please authorize your Discord account and continue to verify.',
      telegram:
        'Please authorize your Telegram account and continue to verify.',
    },
  },
};
const extraTaskList = [
  8, // log event
  1, // tw
  2,
  3,
  11,
];
export default function WithVerify({
  handleFn,
  evmRequire,
  credentialType,
  credential,
  taskHandle,
}) {
  const { pc } = useResponsive();
  const { isTMA } = useTelegram();
  const [open, setOpen] = useState(false);
  const { getSocialByName } = useSocial();
  const [status, setStatus] = useState(verifyStatusEnum.NotStarted);
  const { userLogined, wallectConnected } = useUserInfo();
  const dispath = useDispatch();
  const social = getSocialByName(credentialType);
  const isSocial = !!social;
  const { isLink, getLink } = actionMap[credential.labelType];
  const link = getLink(getStrJSON(credential.options));
  const handleVerify = async (evt) => {
    setStatus(verifyStatusEnum.Pending);
    try {
      await handleFn(evt);
      setStatus(verifyStatusEnum.Sucess);
    } catch (e) {
      setStatus(verifyStatusEnum.NotStarted);
      if (isLink) {
        // auto complete task, beside open new link
        // task8
        if (
          extraTaskList.includes(credential.labelType) &&
          typeof taskHandle === 'function'
        ) {
          await taskHandle();
        }
        window.open(link, pc ? (isTMA ? '_self' : '_blank') : '_self');
      }
    }
  };
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <button
        disabled={status === verifyStatusEnum.Pending}
        className={clsx(
          'text-base whitespace-nowrap px-1.5 py-1 rounded',
          'flex-none flex items-center gap-x-1',
          {
            'bg-transparent': [
              verifyStatusEnum.Sucess,
              verifyStatusEnum.Pending,
            ].includes(status),
            'text-white bg-[#904BF6]': status === verifyStatusEnum.NotStarted,
            'cursor-not-allowed': verifyStatusEnum.Pending === status,
          }
        )}
        onClick={(evt) => {
          if (!userLogined) {
            dispath(setLoginModal(true));
          } else if (evmRequire && !wallectConnected) {
            dispath(setConnectWalletModal(true));
          } else {
            if (isSocial && !social.connected) {
              setOpen(true);
            } else {
              handleVerify(evt);
            }
          }
        }}
      >
        <>
          <VerifyStatus status={status} />
          {status === verifyStatusEnum.Sucess && 'Verified'}
          {status === verifyStatusEnum.Pending && 'Verify...'}
          {status === verifyStatusEnum.NotStarted && 'Verify'}
        </>
      </button>
      {isSocial && (
        <Modal
          open={open}
          footer={null}
          title={null}
          centered
          closable={pc ? true : false}
          onCancel={handleCancel}
        >
          <div className="-mx-6">
            <h1 className="text-base font-medium border-b px-5 pb-3 border-[#8148C6]">
              {modalConf.title}
            </h1>
            <div className="px-5 pt-5">
              <div className={clsx('text-base font-medium')}>
                <h2>{modalConf.step1.title}</h2>
              </div>
              <p className={clsx('text-xs mb-6')}>
                {modalConf.step1.desc[credentialType]}
              </p>

              <button
                onClick={() => {
                  social.loginFn(false);
                  handleCancel();
                }}
                className="flex items-center gap-x-1 px-4 py-1 text-sm font-medium text-black rounded-md bg-white"
              >
                <img
                  src={social.picUrl}
                  className="w-4 h-4 object-contain object-center"
                  alt="social logo"
                />
                Connect {credentialType}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
