import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import useSocial from '@/hooks/useSocial'
import VerifyStatus, { verifyStatusEnum } from './VerifyStatus'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useDispatch } from 'react-redux'
import { setLoginModal, setConnectWalletModal } from '@/store/global'

export default function WithVerify ({ handleFn, credentialType }) {
  const { getSocialByName } = useSocial()
  const [status, setStatus] = useState(verifyStatusEnum.NotStarted)
  const { userLogined, wallectConnected } = useUserInfo()
  const dispath = useDispatch()
  const [count, setCount] = useState(0)
  const clearInterIdRef = useRef()
  const social = getSocialByName(credentialType)
  const isSocial = !!social
  const handleVerify = async evt => {
    setStatus(verifyStatusEnum.Pending)
    try {
      await handleFn(evt)
      setStatus(verifyStatusEnum.Sucess)
    } catch (e) {
      setCount(30)
      setStatus(verifyStatusEnum.NotStarted)
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

  // console.log({social})

  return (
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
          if (isSocial && !social.connected) {
            // setOpen(true)
            social.loginFn(false)
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
  )
}
