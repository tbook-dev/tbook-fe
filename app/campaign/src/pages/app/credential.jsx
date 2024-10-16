import Preview from '../snapshot/Preview';
import { getCrenditialType } from '@/utils/conf';
import { getSnapshotIdBylink, useUserVotes } from '@tbook/snapshot/api';
import WithVerify from '@/components/withVerify';
import { verifyCredential, takTaskSign } from '@/api/incentive';
import VerifyStatus, {
  verifyStatusEnum,
} from '@/components/withVerify/VerifyStatus';
import { verifyTbook } from '@/api/incentive';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useParams, Link, useLoaderData } from 'react-router-dom';
import { useResponsive } from 'ahooks';
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { useCredentialSign, useAutoVerify } from '@/hooks/useCampaignQuery';
import { setLoginModal, setConnectWalletModal } from '@/store/global';
import { useAccount } from 'wagmi';
import { useQueryClient } from 'react-query';
import warningSvg from '@/images/icon/warning.svg';
import clsx from 'clsx';
import AirDrop from './airdrop';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { Display, actionMap } from '@tbook/credential';
import DisableVerify from '@/components/withVerify/disableVerify';
import { useTelegram } from '@/hooks/useTg';
import { getStrJSON, delay } from '@/utils/common';
import { useSignMessage } from 'wagmi';
import { cn } from '@/utils/conf';
import useWallet from '@/hooks/useWallet';
import WebApp from '@twa-dev/sdk';

const themeSchema = {
  white: {
    text: 'text-black hover:border-black',
  },
  dark: {
    text: 'text-white hover:border-white',
    disabled: 'text-white/40 bg-[#CFF469]/5',
  },
};
export default function Credential({
  credential,
  showVerify,
  theme = 'dark',
  onVerifySuccess,
}) {
  const { isUsingSubdomain, projectUrl, project } = useLoaderData();
  const { campaignId } = useParams();
  const queryClient = useQueryClient();
  useAutoVerify(credential, campaignId);
  const dispatch = useDispatch();
  const { isTMA } = useTelegram();
  const [messageApi, contextHolder] = message.useMessage();
  const signData = useCredentialSign(credential);
  const { signMessageAsync } = useSignMessage();
  const { optional } = actionMap[credential.labelType];
  const { userLogined, wallectConnected, evmAddress, user } = useUserInfo();
  const { pc } = useResponsive();
  const [showAirdop, setShowAirdop] = useState(false);
  const labelType = credential.labelType;
  const credentialType = getCrenditialType(labelType);
  const hiddenGotoButton = [12, 13].includes(labelType);
  const isAirdopType = labelType === 13;
  const isSnapshotType = labelType === 12;
  const isLocalClient = [1, 2, 3, 11, 20].includes(labelType);
  const snapshotId = getSnapshotIdBylink(credential.link);
  const { data: votes = [] } = useUserVotes(
    snapshotId,
    evmAddress,
    credential.isVerified === 1
  );
  const unikey = `localkey-${user?.userId}-${credential?.credentialId}`;
  const { isConnected } = useAccount();
  const [count, setCount] = useState(0);
  const clearInterIdRef = useRef();
  const retryCounter = useRef(0);
  const canVerify = credential.isVerified === 0;
  const { getWallets } = useWallet();
  const [ton, evm] = getWallets(['ton', 'evm']);
  const hasVoted = useMemo(() => {
    if (!votes) return false;
    return !!votes?.find(
      (v) => v.voter?.toLowerCase() === evmAddress?.toLowerCase()
    );
  }, [votes]);
  const canUseWallect = useMemo(() => {
    return isConnected && wallectConnected;
  }, [isConnected, wallectConnected]);
  const resetCount = useCallback(() => {
    setCount(30);
  }, []);
  const connectWallect = useCallback(() => {
    dispatch(setConnectWalletModal(true));
  }, []);
  const login = useCallback(() => {
    dispatch(setLoginModal(true));
  }, []);
  const localClientVerify = useCallback(() => {
    // 如果不是推特类型，根本不会走到这一步
    // setTwitterClicked(true);
    localStorage.setItem(unikey, '1');
    // console.log("--> log", unikey);
  }, [unikey]);
  const handleVerify = async (credential) => {
    // 如果是snapshot，先坚持上报然后
    let hasError = false;
    if (isSnapshotType) {
      if (hasVoted) {
        //先上报
        await verifyTbook(credential.credentialId);
      } else {
        hasError = true;
        resetCount();
        throw new Error(true);
      }
    }
    if (isAirdopType) {
      // 如果是snapshot，直接提交表单， 不在此处验证
      console.log('auto exe');
    }
    const clientClicked = !!localStorage.getItem(unikey);
    if (isLocalClient && !clientClicked) {
      localClientVerify();
      // 如果是推特，点击了按钮就可以认为完成任务了, 这个逻辑由后端控制
      // 前端只控制先后次序，即：验证之前必须要先点击任务按钮
      hasError = true;
      resetCount();
      throw new Error(true);
    }
    try {
      const res = await verifyCredential(credential.credentialId);
      if (res.isVerified === 1) {
        hasError = false;
        await queryClient.refetchQueries(['campaignDetail', campaignId, true]);
        onVerifySuccess && onVerifySuccess(credential.credentialId);
      } else {
        hasError = true;
        if (isAirdopType && !showAirdop) {
          setShowAirdop(true);
        }
        if (labelType === 8 && retryCounter.current < 1) {
          // never fail
          retryCounter.current = 1;
          hasError = false;
          const { getLink } = actionMap[labelType];
          const link = getLink(getStrJSON(credential.options));
          await verifyTbook(credential.credentialId);
          window.open(link, isTMA ? '_blank' : pc ? '_blank' : '_self');
          await delay(1000);
          await handleVerify(credential);
        }
      }
    } catch (error) {
      console.log(error);
      hasError = true;
    }

    if (hasError) {
      resetCount();
      throw new Error(hasError);
    }
  };

  const signCredential = async (credential) => {
    const m = signData?.data?.data;
    const sign = await signMessageAsync({ message: m });
    try {
      const d = await takTaskSign(credential.credentialId, { sign });
      if (!d?.['success']) {
        messageApi.error(d['error']);
      }
    } catch (error) {
      messageApi.error('Sign failed');
    }
  };
  const options = useMemo(() => {
    return getStrJSON(credential.options);
  }, [credential]);
  const taskMap = {
    1: localClientVerify,
    2: localClientVerify,
    3: localClientVerify,
    11: localClientVerify,
    20: localClientVerify,
    8: async () => {
      // log event, 需要任意登录即可
      if (userLogined) {
        if (showVerify) {
          await verifyTbook(credential.credentialId);
          await handleVerify(credential);
        }
      } else {
        login();
      }
    },
    10: () => {
      if (canUseWallect) {
        signCredential(credential);
      } else {
        connectWallect();
      }
    },
    12: () => {
      // 当前页面不需要登录
      window.open(
        `${isUsingSubdomain ? '' : `/${projectUrl}`}/snapshot/${campaignId}/${
          credential.credentialId
        }/${snapshotId}`,
        pc ? (isTMA ? '_self' : '_blank') : '_self'
      );
    },
    13: () => {
      if (userLogined) {
        setShowAirdop((v) => !v);
      } else {
        login();
      }
    },
    23: () => {
      // ton
      if (userLogined) {
        !ton.connected && ton.connectHandle();
      } else {
        login();
      }
    },
    24: () => {
      // eth
      if (userLogined) {
        !evm.connected && evm.connectHandle();
      } else {
        login();
      }
    },
    40: ()=>{
      const {condition,ctaLink} = options
      if(condition === 1){
        if (userLogined) {
          if(!ton.connected){
            ton.connectHandle()
          }else{
            try {
              const parseLink = new URL(ctaLink);
              if (parseLink.hostname === 't.me') {
                WebApp.openTelegramLink(ctaLink);
              } else {
                WebApp.openLink(ctaLink);
              }
            } catch (error) {
              console.log(error)
            }
          }
        } else {
          login();
        }
      }
    }
  };

  const showErrorTip = count > 0 && !credential.isVerified;
  const showSnapshot = isSnapshotType && snapshotId;
 
  useEffect(() => {
    clearInterIdRef.current = setInterval(() => {
      if (count > 0) {
        setCount((v) => v - 1);
      } else {
        clearInterval(clearInterIdRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(clearInterIdRef.current);
    };
  }, [count]);

  return (
    <div
      className={cn(
        'border transition-all duration-300 ease-in-out p-4 rounded-lg lg:bg-none space-y-5 border-white/15',
        // canVerify
        //   ? 'text-white hover:border-white'
        //   : 'text-white/40 bg-[#CFF469]/5'
        canVerify ? themeSchema[theme].text : themeSchema[theme].disabled
      )}
    >
      <div className="flex items-start justify-between w-full gap-x-1">
        <Display
          pc={pc}
          labelType={credential.labelType}
          options={options}
          canVerify={canVerify}
          theme={theme}
          clickHandle={
            typeof taskMap[credential.labelType] === 'function'
              ? taskMap[credential.labelType]
              : null
          }
        />
        {credential.isVerified === 1 ? (
          <span
            className={clsx(
              'flex-none flex items-center gap-x-1 text-md whitespace-nowrap',
              optional ? 'text-[#FFDE1C]' : 'text-[#CFF469]'
            )}
          >
            <VerifyStatus
              status={verifyStatusEnum.Sucess}
              optional={optional}
            />
            {optional ? 'Done' : 'Verified'}
          </span>
        ) : credential.isVerified === -1 ? (
          <DisableVerify />
        ) : (
          showVerify && (
            <WithVerify
              handleFn={() => handleVerify(credential)}
              evmRequire={!!project?.evmRequire || labelType === 10}
              tvmRequire={!!project?.tonRequire}
              credentialType={credentialType}
              credential={credential}
              taskHandle={taskMap[credential.labelType]}
            />
          )
        )}
      </div>
      {showErrorTip && (
        <div className="pt-5 border-t border-[#281545] space-y-4">
          <div className="flex items-start text-sm gap-x-3">
            <img
              src={warningSvg}
              className="object-center w-5 h-5"
              alt="verify error"
            />
            It seems you have not finished the task. Please finish task, then
            try to verify again.
          </div>

          {!hiddenGotoButton &&
            (!actionMap[labelType]?.isLink ? (
              <div
                onClick={taskMap[credential.labelType]}
                className="cursor-pointer flex justify-center items-center text-black bg-[#E4FA73] shadow-s4 rounded py-1.5 px-4  text-sm font-medium"
              >
                Go to finish
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.03 11.06L9.08333 8L6.03 4.94L6.97 4L10.97 8L6.97 12L6.03 11.06Z"
                    fill="black"
                  />
                </svg>
              </div>
            ) : (
              <Link
                // onClick={handleManualFn}
                onClick={taskMap[credential.labelType]}
                // to={pc ? credential.intentDisplayLink : credential.displayLink}
                to={actionMap[labelType]?.getLink({ ...options, pc })}
                target={isTMA ? '_self' : '_blank'}
                rel="nofollow noopener noreferrer"
                className="cursor-pointer flex justify-center items-center text-black bg-[#E4FA73] shadow-s4 rounded py-1.5 px-4  text-sm font-medium"
              >
                Go to finish
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.03 11.06L9.08333 8L6.03 4.94L6.97 4L10.97 8L6.97 12L6.03 11.06Z"
                    fill="black"
                  />
                </svg>
              </Link>
            ))}
        </div>
      )}
      {showSnapshot && (
        <Link
          target={isTMA ? '_self' : '_blank'}
          className="text-base font-medium"
          to={`${
            isUsingSubdomain ? '' : `/${projectUrl}`
          }/snapshot/${campaignId}/${credential.credentialId}/${snapshotId}`}
        >
          <div
            className={clsx(
              'mt-4',
              showErrorTip ? '' : 'pt-5 border-t border-[#281545]'
            )}
          >
            <Preview id={snapshotId} />
          </div>
        </Link>
      )}
      {showAirdop && (
        <AirDrop
          {...credential}
          errorHandle={resetCount}
          successHandle={() => {
            setShowAirdop(false);
          }}
        />
      )}
      {contextHolder}
    </div>
  );
}
