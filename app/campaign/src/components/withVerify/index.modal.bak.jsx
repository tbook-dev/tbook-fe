import { useState, useRef, useEffect } from 'react'
import { Spin, Modal } from 'antd'
import { useResponsive } from 'ahooks'
import clsx from 'clsx'
import useSocial from '@/hooks/useSocial'
import { useCallback } from 'react'
import VerifyStatus, { verifyStatusEnum } from './VerifyStatus'
import { delay } from '@/utils/common'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useDispatch } from 'react-redux'
import { setLoginModal, setConnectWalletModal } from '@/store/global'

const modalConf = {
  title: 'Verify',
  step1: {
    title: 'Authorize your account',
    desc: {
      twitter: 'Authorize your Twitter account to verify.',
      discord: 'Authorize your Discord account to verify.',
      telegram: 'Authorize your Discord account to verify.'
    }
  },
  step2: {
    title: 'Verify your accomplishment.',
    desc: 'Verify your accomplishment.'
  }
}

export default function WithVerify ({
  handleFn,
  sysConnectedMap,
  credentialType
}) {
  const [open, setOpen] = useState(false)
  const { pc } = useResponsive()
  const { getSocialByName } = useSocial()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(verifyStatusEnum.NotStarted)
  const { userLogined, wallectConnected } = useUserInfo()
  const dispath = useDispatch()
  const [count, setCount] = useState(0)
  const clearInterIdRef = useRef()
  const sysLogined = sysConnectedMap[credentialType]
  const social = getSocialByName(credentialType)
  const isSocial = !!social
  const handleVerify = async evt => {
    setStatus(verifyStatusEnum.Pending)
    try {
      await handleFn(evt)
      setStatus(verifyStatusEnum.Sucess)
      await delay(1000)
      handleCancel()
    } catch (e) {
      handleCancel()
      setCount(30)
      setStatus(verifyStatusEnum.NotStarted)
    }
  }
  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

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

  // console.log({social})

  return (
    <>
      <button
        disabled={status === verifyStatusEnum.Pending || count > 0}
        className={clsx(
          'text-base whitespace-nowrap px-1.5 py-1 rounded',
          'flex items-center gap-x-1',
          {
            'bg-transparent': [
              verifyStatusEnum.Sucess,
              verifyStatusEnum.Pending
            ].includes(status),
            'text-white bg-[#904BF6]': status === verifyStatusEnum.NotStarted,
            'bg-[#2B174A] text-[#55456E] w-[78px] justify-center cursor-not-allowed':
              count > 0
          }
        )}
        onClick={evt => {
          if (!userLogined) {
            dispath(setLoginModal(true))
          } else if (!wallectConnected) {
            dispath(setConnectWalletModal(true))
          } else {
            if (isSocial) {
              setOpen(true)
            } else {
              handleVerify(evt)
            }
          }
        }}
      >
        {count > 0 ? (
          `${count}s`
        ) : (
          <>
            <VerifyStatus status={status} />
            {status === verifyStatusEnum.Sucess && 'Verified'}
            {status === verifyStatusEnum.Pending && 'Verify...'}
            {status === verifyStatusEnum.NotStarted && 'Verify'}
          </>
        )}
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
          <div className='-mx-6'>
            <h1 className='text-base font-medium border-b px-5 pb-3 border-[#8148C6]'>
              {modalConf.title}
            </h1>
            <div className='border-[#8148C6] border-b'>
              <div className='px-5 pt-5 pb-4'>
                <div className={clsx('text-base font-medium')}>
                  <h2>{modalConf.step1.title}</h2>
                </div>
                <p
                  className={clsx(
                    'text-xs mb-6',
                    sysLogined && 'text-[#C0ABD9]'
                  )}
                >
                  {modalConf.step1.desc[credentialType]}
                </p>

                {social.connected ? (
                  <div className='w-max py-2  rounded-md flex items-center gap-x-1 text-sm font-medium'>
                    <img
                      src={social.activePic}
                      className='w-4 h-4 object-contain object-center'
                      alt='social logo'
                    />
                    @{social.userName}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setLoading(true)
                      social.loginFn().finally(() => setLoading(false))
                    }}
                    className='flex items-center gap-x-1 px-4 py-1 text-sm text-black rounded-md bg-white'
                    // style={{ backgroundColor: social.activeColor }}
                  >
                    <img
                      src={social.picUrl}
                      className='w-4 h-4 object-contain object-center'
                      alt='social logo'
                    />
                    Connect {credentialType}
                    {loading && (
                      <Spin spinning size='small' style={{ marginLeft: 4 }} />
                    )}
                  </button>
                )}
              </div>
            </div>
            <div>
              <div className='px-5 pt-5 pb-4'>
                <div
                  className={clsx(
                    'text-base font-medium',
                    !social.connected && 'text-[#C0ABD9]'
                  )}
                >
                  <h2>{modalConf.step2.name}</h2>
                  <h2>{modalConf.step2.title}</h2>
                </div>
                <p
                  className={clsx(
                    'text-xs mb-6',

                    !social.connected && 'text-[#C0ABD9]'
                  )}
                >
                  {modalConf.step2.desc}
                </p>
                {social.connected && (
                  <button
                    className={clsx(
                      'text-base whitespace-nowrap px-5 py-1 rounded-md',
                      'flex items-center gap-x-1 bg-white text-black'
                    )}
                    onClick={handleVerify}
                    disabled={status === verifyStatusEnum.Pending}
                  >
                    {status === verifyStatusEnum.Pending && (
                      <VerifyStatus status={status} />
                    )}
                    {status === verifyStatusEnum.Sucess && 'Verified'}
                    {status === verifyStatusEnum.Pending && 'Verify...'}
                    {status === verifyStatusEnum.NotStarted && 'Verify'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
