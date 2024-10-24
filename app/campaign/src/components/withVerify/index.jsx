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
import useWallet from '@/hooks/useWallet';
import { jumpLink } from '@/utils/tma';

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
const actionButtonList = Object.entries(actionMap)
  .map(([labelType, v]) => ({ labelType: +labelType, ...v }))
  .filter((v) => !v.isLink);
export default function WithVerify({
  handleFn,
  evmRequire,
  tvmRequire,
  credentialType,
  credential,
  taskHandle,
}) {
  const { pc } = useResponsive();
  const { isTMA } = useTelegram();
  const [open, setOpen] = useState(false);
  const { getSocialByName } = useSocial();
  const [status, setStatus] = useState(verifyStatusEnum.NotStarted);
  const { userLogined, evmConnected, tonConnected } = useUserInfo();
  const dispath = useDispatch();
  const social = getSocialByName(credentialType);
  const isSocial = !!social;
  const { isLink, getLink, optional } = actionMap[credential.labelType];
  const link = getLink(getStrJSON(credential.options));
  const { getWallets } = useWallet();
  const [ton] = getWallets('ton');

  const handleVerify = async (evt) => {
    setStatus(verifyStatusEnum.Pending);
    try {
      await handleFn(evt);
      setStatus(verifyStatusEnum.Sucess);
    } catch (e) {
      setStatus(verifyStatusEnum.NotStarted);
      if (isLink) {
        jumpLink({ link, isTMA, pc });
      } else if (
        actionButtonList.some((c) => c.labelType === credential.labelType)
      ) {
        await taskHandle();
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
            [optional ? 'bg-[#FFDE1C] text-black' : 'text-black bg-[#CFF469]']:
              status === verifyStatusEnum.NotStarted,
            [optional ? 'text-[#FFDE1C]' : 'text-[#CFF469]']:
              verifyStatusEnum.Sucess === status,
            'cursor-not-allowed': verifyStatusEnum.Pending === status,
          }
        )}
        onClick={(evt) => {
          if (!userLogined) {
            dispath(setLoginModal(true));
          } else if (evmRequire && !evmConnected) {
            dispath(setConnectWalletModal(true));
          } else if (tvmRequire && !tonConnected) {
            ton.connectHandle();
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
          <VerifyStatus status={status} optional={optional} />
          {status === verifyStatusEnum.Sucess &&
            (optional ? 'Done' : 'Verified')}
          {status === verifyStatusEnum.Pending &&
            (optional ? 'Check...' : 'Verify...')}
          {status === verifyStatusEnum.NotStarted &&
            (optional ? 'Go Do it!' : 'Verify')}
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
