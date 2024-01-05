import Preview from '../snapshot/Preview'
import { getCrenditialType } from '@/utils/conf'
import { getSnapshotIdBylink } from '@tbook/snapshot/api'
import WithVerify from '@/components/withVerify'
import { verifyCredential } from '@/api/incentive'
import VerifyStatus, {
  verifyStatusEnum
} from '@/components/withVerify/VerifyStatus'
import { verifyTbook } from '@/api/incentive'
import useUserInfo from '@/hooks/useUserInfoQuery'
import useSocial from '@/hooks/useSocial'
import { useParams, Link, useLoaderData } from 'react-router-dom'
import { useResponsive } from 'ahooks'
import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { setLoginModal, setConnectWalletModal } from '@/store/global'
import { useAccount } from 'wagmi'
import { useQueryClient } from 'react-query'
import warningSvg from '@/images/icon/warning.svg'
import clsx from 'clsx'

// const errorMsg =
//   'It seems you have not finished the task.Please click and finish the task, then verify in 30s later.'

export default function Credential ({ redential, showVerify, signCredential }) {
  const { isUsingSubdomain } = useLoaderData()
  const { campaignId, projectName } = useParams()
  const queryClient = useQueryClient()
  const {
    twitterConnected,
    userLogined,
    discordConnected,
    telegramConnected,
    wallectConnected
  } = useUserInfo()
  const { getSocialByName } = useSocial()
  const { pc } = useResponsive()

  const credentialType = getCrenditialType(redential.labelType)
  const isSnapshotType = redential.labelType === 12
  const snapshotId = getSnapshotIdBylink(redential.link)
  const { isConnected } = useAccount()
  const [count, setCount] = useState(0)
  const clearInterIdRef = useRef()

  const sysConnectedMap = {
    twitter: twitterConnected,
    discord: discordConnected,
    telegram: telegramConnected,
    tbook: userLogined
  }
  const sycLoginFnMap = {
    twitter: getSocialByName('twitter').loginFn,
    discord: getSocialByName('discord').loginFn,
    telegram: getSocialByName('telegram').loginFn
  }
  const canUseWallect = useMemo(() => {
    return isConnected && wallectConnected
  }, [isConnected, wallectConnected])
  const resetCount = useCallback(() => {
    setCount(30)
  }, [])
  const connectWallect = useCallback(() => {
    dispath(setConnectWalletModal(true))
  }, [])
  const signIn = useCallback(() => {
    dispath(setLoginModal(true))
  }, [])
  const handleVerify = useCallback(async redential => {
    let hasError = false
    try {
      const res = await verifyCredential(redential.credentialId)
      if (res.isVerified) {
        hasError = false
        await queryClient.refetchQueries(['campaignDetail', campaignId])
      } else {
        hasError = true
      }
    } catch (error) {
      console.log(error)
      hasError = true
    }

    if (hasError) {
      resetCount()
      throw new Error(hasError)
    }
  }, [])

  // 点击任务，除了跳转外的额外处理。
  const taskMap = {
    8: async () => {
      // log event, 需要任意登录即可
      if (userLogined) {
        await verifyTbook(redential.credentialId)
        await handleVerify(redential)
      } else {
        signIn()
      }
    },
    10: () => {
      if (canUseWallect) {
        signCredential(redential)
      } else {
        connectWallect()
      }
    },
    12: () => {
      // 当前页面不需要登录
      window.open(
        `${isUsingSubdomain ? '' : `/${projectName}`}/snapshot/${campaignId}/${
          redential.credentialId
        }/${snapshotId}`,
        pc ? '_blank' : '_self'
      )
    }
  }
  useEffect(() => {
    clearInterIdRef.current = setInterval(() => {
      if (count > 0) {
        setCount(v => v - 1)
      } else {
        clearInterval(clearInterIdRef.current)
      }
    }, 1000)
    return () => {
      clearInterval(clearInterIdRef.current)
    }
  }, [count])
  const showErrorTip = count > 0

  return (
    <div className='border border-[#904BF6] lg:hover:border-[#904BF6] lg:border-[#281545] p-4 rounded-lg bg-linear1 lg:bg-none space-y-5'>
      <div className='flex items-start justify-between w-full'>
        <div className='flex items-start gap-x-1 pt-[3px] flex-auto w-[calc(100%_-_45px)]'>
          <img
            src={redential.picUrl}
            className='w-5 h-5 object-contain mt-0.5'
          />
          <div
            onClick={
              typeof taskMap[redential.labelType] === 'function'
                ? taskMap[redential.labelType]
                : null
            }
            className='text-sm max-w-[calc(100%_-_26px)] lg:max-w-[430px]'
            dangerouslySetInnerHTML={{
              __html: pc ? redential.intentDisplayExp : redential.displayExp
            }}
          />
        </div>
        {redential.isVerified ? (
          <span className='flex items-center gap-x-1 text-md whitespace-nowrap'>
            <VerifyStatus status={verifyStatusEnum.Sucess} />
            Verified
          </span>
        ) : (
          showVerify && (
            <WithVerify
              sysConnectedMap={sysConnectedMap}
              sycLoginFnMap={sycLoginFnMap}
              credentialType={credentialType}
              handleFn={() => handleVerify(redential)}
              resetCount={resetCount}
              count={count}
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

          <div
            onClick={
              typeof taskMap[redential.labelType] === 'function'
                ? taskMap[redential.labelType]
                : () => window.open(redential.link, pc ? '_blank' : '_self')
            }
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
        </div>
      )}
      {isSnapshotType && snapshotId && (
        <Link
          target='_blank'
          className='text-base font-medium'
          to={`${
            isUsingSubdomain ? '' : `/${projectName}`
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
    </div>
  )
}
