import { useState, useCallback } from 'react'
import clsx from 'clsx'
import useSocial from '@/hooks/useSocial'
import VerifyStatus, { verifyStatusEnum } from './VerifyStatus'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useDispatch } from 'react-redux'
import { setLoginModal, setConnectWalletModal } from '@/store/global'
import { Modal } from 'antd'
import { useResponsive } from 'ahooks'

const modalConf = {
  title: 'Verify',
  step1: {
    title: 'Authorize your account',
    desc: {
      twitter: 'Please authorize your X account and continue to verify.',
      discord: 'Please authorize your Discord account and continue to verify.',
      telegram: 'Please authorize your Telegram account and continue to verify.'
    }
  }
}

export default function WithVerify ({ handleFn, count, credentialType }) {
  const { pc } = useResponsive()
  // const open = useSelector(v => v.global.showSocicalModal)
  const [open, setOpen] = useState(false)
  const { getSocialByName } = useSocial()
  const [status, setStatus] = useState(verifyStatusEnum.NotStarted)
  const { userLogined, wallectConnected } = useUserInfo()
  const dispath = useDispatch()
  const social = getSocialByName(credentialType)
  const isSocial = !!social
  const handleVerify = async evt => {
    setStatus(verifyStatusEnum.Pending)
    try {
      await handleFn(evt)
      setStatus(verifyStatusEnum.Sucess)
    } catch (e) {
      setStatus(verifyStatusEnum.NotStarted)
    }
  }
  const handleCancel = useCallback(() => {
    setOpen(false)
  }, [])

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
          // if (!userLogined) {
          //   dispath(setLoginModal(true))
          // } else if (!wallectConnected) {
          //   dispath(setConnectWalletModal(true))
          // } else {
          //   if (isSocial && !social.connected) {
          //     // dispath(setShowSocicalModal(true))
          //     setOpen(true)
          //   } else {
          //     handleVerify(evt)
          //   }
          // }
          if (!userLogined) {
              dispath(setLoginModal(true))
          } else {
            if (isSocial && !social.connected) {
              // dispath(setShowSocicalModal(true))
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
            <div className='px-5 pt-5'>
              <div className={clsx('text-base font-medium')}>
                <h2>{modalConf.step1.title}</h2>
              </div>
              <p className={clsx('text-xs mb-6')}>
                {modalConf.step1.desc[credentialType]}
              </p>

              <button
                onClick={() => {
                  social.loginFn(false)
                }}
                className='flex items-center gap-x-1 px-4 py-1 text-sm font-medium text-black rounded-md bg-white'
              >
                <img
                  src={social.picUrl}
                  className='w-4 h-4 object-contain object-center'
                  alt='social logo'
                />
                Connect {credentialType}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
