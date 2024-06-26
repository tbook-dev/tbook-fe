import Preview from '../snapshot/Preview';
import { getCrenditialType } from '@/utils/conf';
import { getSnapshotIdBylink, useUserVotes } from '@tbook/snapshot/api';
import WithVerify from '@/components/withVerify';
import { verifyCredential } from '@/api/incentive';
import VerifyStatus, {
  verifyStatusEnum,
} from '@/components/withVerify/VerifyStatus';
import { verifyTbook } from '@/api/incentive';
import useUserInfo from '@/hooks/useUserInfoQuery';
import useSocial from '@/hooks/useSocial';
import { useParams, Link, useLoaderData } from 'react-router-dom';
import { useResponsive } from 'ahooks';
import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { setLoginModal, setConnectWalletModal } from '@/store/global';
import { useAccount } from 'wagmi';
import { useQueryClient } from 'react-query';
import warningSvg from '@/images/icon/warning.svg';
import clsx from 'clsx';
import AirDrop from './airdrop';
import { useDispatch } from 'react-redux';
import { Display, actionMap } from '@tbook/credential';
import DisableVerify from '@/components/withVerify/disableVerify';
import { useTelegram } from '@/hooks/useTg';

// const errorMsg =
//   'It seems you have not finished the task.Please click and finish the task, then verify in 30s later.'

export default function Credential ({ redential, showVerify, signCredential }) {
  const { isUsingSubdomain, projectUrl, project } = useLoaderData();
  const { campaignId } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { isTMA } = useTelegram();

  const {
    twitterConnected,
    userLogined,
    discordConnected,
    telegramConnected,
    wallectConnected,
    address,
    user,
  } = useUserInfo();
  const { getSocialByName } = useSocial();
  const { pc } = useResponsive();
  const [showAirdop, setShowAirdop] = useState(false);
  const labelType = redential.labelType;
  const credentialType = getCrenditialType(redential.labelType);
  const hiddenGotoButton = [12, 13].includes(redential.labelType);
  const isAirdopType = redential.labelType === 13;
  const isSnapshotType = redential.labelType === 12;
  const isTwitterType = [1, 2, 3, 11].includes(redential.labelType);
  const snapshotId = getSnapshotIdBylink(redential.link);
  const { data: votes = [] } = useUserVotes(
    snapshotId,
    address,
    redential.isVerified
  );
  const unikey = `localkey-${user?.userId}-${redential?.credentialId}`;
  // console.log({user, redential, unikey})
  // console.log({isVerified: redential.isVerified ,votes,isLoading})
  const { isConnected } = useAccount();
  const [count, setCount] = useState(0);
  const clearInterIdRef = useRef();
  const hasVoted = useMemo(() => {
    if (!votes) return false;
    return !!votes?.find(
      v => v.voter?.toLowerCase() === address?.toLowerCase()
    );
  }, [votes]);

  // const sysConnectedMap = {
  //   twitter: twitterConnected,
  //   discord: discordConnected,
  //   telegram: telegramConnected,
  //   tbook: userLogined,
  // };
  // const sycLoginFnMap = {
  //   twitter: getSocialByName('twitter').loginFn,
  //   discord: getSocialByName('discord').loginFn,
  //   telegram: getSocialByName('telegram').loginFn,
  // };
  const canUseWallect = useMemo(() => {
    return isConnected && wallectConnected;
  }, [isConnected, wallectConnected]);
  const resetCount = useCallback(() => {
    setCount(30);
  }, []);
  const connectWallect = useCallback(() => {
    dispatch(setConnectWalletModal(true));
  }, []);
  const signIn = useCallback(() => {
    dispatch(setLoginModal(true));
  }, []);
  const localTwitterVerify = useCallback(() => {
    // 如果不是推特类型，根本不会走到这一步
    // setTwitterClicked(true);
    localStorage.setItem(unikey, '1');
    // console.log("--> log", unikey);
  }, [unikey]);
  const handleVerify = async redential => {
    // 如果是snapshot，先坚持上报然后
    let hasError = false;
    if (isSnapshotType) {
      if (hasVoted) {
        //先上报
        await verifyTbook(redential.credentialId);
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
    const twitterClicked = !!localStorage.getItem(unikey);
    if (isTwitterType && !twitterClicked) {
      localTwitterVerify();
      // 如果是推特，点击了按钮就可以认为完成任务了, 这个逻辑由后端控制
      // 前端只控制先后次序，即：验证之前必须要先点击任务按钮
      hasError = true;
      resetCount();
      throw new Error(true);
    }

    try {
      const res = await verifyCredential(redential.credentialId);
      if (res.isVerified) {
        hasError = false;
        await queryClient.refetchQueries(['campaignDetail', campaignId, true]);
      } else {
        hasError = true;
        if (isAirdopType && !showAirdop) {
          setShowAirdop(true);
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

  // 点击任务，除了跳转外的额外处理。
  const taskMap = {
    1: localTwitterVerify,
    2: localTwitterVerify,
    3: localTwitterVerify,
    11: localTwitterVerify,

    8: async () => {
      // log event, 需要任意登录即可
      if (userLogined) {
        await verifyTbook(redential.credentialId);
        await handleVerify(redential);
      } else {
        signIn();
      }
    },
    10: () => {
      if (canUseWallect) {
        signCredential(redential);
      } else {
        connectWallect();
      }
    },
    12: () => {
      // 当前页面不需要登录
      window.open(
        `${isUsingSubdomain ? '' : `/${projectUrl}`}/snapshot/${campaignId}/${
          redential.credentialId
        }/${snapshotId}`,
        pc ? (isTMA ? '_self' : '_blank') : '_self'
      );
    },
    13: () => {
      if (userLogined) {
        setShowAirdop(v => !v);
      } else {
        signIn();
      }
    },
  };
  // const isRedentialNotLink = redential.labelType === 10;
  // const getTaskFn = (redential) => {
  //   if (isRedentialNotLink) {
  //     taskMap[redential.labelType]()
  //   } else {
  //     window.open(redential.link, pc ? '_blank' : '_self')
  //   }
  // }
  // const handleManualFn = async () => {
  //   if (redential.labelType === 8) {
  //     await verifyTbook(redential.credentialId);
  //     await handleVerify(redential);
  //   }
  //   if (isTwitterType) {
  //     localTwitterVerify();
  //   }
  // };

  useEffect(() => {
    clearInterIdRef.current = setInterval(() => {
      if (count > 0) {
        setCount(v => v - 1);
      } else {
        clearInterval(clearInterIdRef.current);
      }
    }, 1000);
    return () => {
      clearInterval(clearInterIdRef.current);
    };
  }, [count]);
  const showErrorTip = count > 0 && !redential.isVerified;
  const showSnapshot = isSnapshotType && snapshotId;
  const options = useMemo(() => {
    try {
      return JSON.parse(redential.options);
    } catch (error) {
      return {};
    }
  }, [redential]);
  // console.log({ options, redential });
  return (
    <div className='border border-[#904BF6] transition-all duration-300 ease-in-out lg:hover:border-[#904BF6] lg:border-[#281545] p-4 rounded-lg bg-linear1 lg:bg-none space-y-5'>
      <div className='flex items-start justify-between w-full gap-x-1'>
        {/* <div className="flex items-start gap-x-1 pt-[3px] flex-auto w-[calc(100%_-_45px)]">
          <img
            src={redential.picUrl}
            className="w-5 h-5 object-contain mt-0.5"
          />
          <div
            onClick={
              typeof taskMap[redential.labelType] === 'function'
                ? taskMap[redential.labelType]
                : null
            }
            className="text-sm max-w-[calc(100%_-_26px)] lg:max-w-[430px]"
            dangerouslySetInnerHTML={{
              __html: pc ? redential.intentDisplayExp : redential.displayExp,
            }}
          />
        </div> */}
        <Display
          pc={pc}
          labelType={redential.labelType}
          options={options}
          clickHandle={
            typeof taskMap[redential.labelType] === 'function'
              ? taskMap[redential.labelType]
              : null
          }
        />
        {redential.isVerified === 1 ? (
          <span className='flex-none flex items-center gap-x-1 text-md whitespace-nowrap'>
            <VerifyStatus status={verifyStatusEnum.Sucess} />
            Verified
          </span>
        ) : redential.isVerified === -1 ? (
          <DisableVerify />
        ) : (
          showVerify && (
            <WithVerify
              // sysConnectedMap={sysConnectedMap}
              // sycLoginFnMap={sycLoginFnMap}
              // resetCount={resetCount}
              handleFn={() => handleVerify(redential)}
              evmRequire={!!project?.evmRequire}
              count={count}
              credentialType={credentialType}
            />
          )
        )}
      </div>
      {showErrorTip && (
        <div className='pt-5 border-t border-[#281545] space-y-4'>
          <div className='text-sm flex gap-x-3 items-start'>
            <img
              src={warningSvg}
              className='w-5 h-5 object-center'
              alt='verify error'
            />
            It seems you have not finished the task.Please click and finish the
            task, then verify in {count}s later.
          </div>

          {!hiddenGotoButton &&
            (!actionMap[labelType]?.isLink ? (
              <div
                onClick={taskMap[redential.labelType]}
                className='cursor-pointer flex justify-center items-center bg-[#904BF6] shadow-s4 rounded py-1.5 px-4  text-sm font-medium'
              >
                Go to finish
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.03 11.06L9.08333 8L6.03 4.94L6.97 4L10.97 8L6.97 12L6.03 11.06Z'
                    fill='white'
                  />
                </svg>
              </div>
            ) : (
              <Link
                // onClick={handleManualFn}
                onClick={taskMap[redential.labelType]}
                // to={pc ? redential.intentDisplayLink : redential.displayLink}
                to={actionMap[labelType]?.getLink({ ...options, pc })}
                target={isTMA ? '_self' : '_blank'}
                rel='nofollow noopener noreferrer'
                className='cursor-pointer flex justify-center items-center bg-[#904BF6] shadow-s4 rounded py-1.5 px-4  text-sm font-medium'
              >
                Go to finish
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M6.03 11.06L9.08333 8L6.03 4.94L6.97 4L10.97 8L6.97 12L6.03 11.06Z'
                    fill='white'
                  />
                </svg>
              </Link>
            ))}
        </div>
      )}
      {showSnapshot && (
        <Link
          target={isTMA ? '_self' : '_blank'}
          className='text-base font-medium'
          to={`${
            isUsingSubdomain ? '' : `/${projectUrl}`
          }/snapshot/${campaignId}/${redential.credentialId}/${snapshotId}`}
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
          {...redential}
          errorHandle={resetCount}
          successHandle={() => {
            setShowAirdop(false);
          }}
        />
      )}
    </div>
  );
}
