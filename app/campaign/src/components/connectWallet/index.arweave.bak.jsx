import { Modal, Typography, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { useResponsive } from 'ahooks'
import clsx from 'clsx'
import { conf } from '@tbook/utils'
import copyIcon from '@/images/icon/copy.svg'
import disconnectIcon from '@/images/icon/disconnect.svg'
import { CheckOutlined } from '@ant-design/icons'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setLoginModal } from '@/store/global'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useSignMessage } from 'wagmi'
import { getNonce } from '@/utils/web3'
import { useQueryClient } from 'react-query'
import { authenticate } from '@/api/incentive'
import { disconnect } from '@wagmi/core'
import Wallet from './wallet'
import { categoriedWallet } from '@tbook/wallet/conf'

const { shortAddress } = conf
const { Paragraph } = Typography

const pageConf = {
  title: 'Connect Wallet',
  step1: {
    name: 'STEP 1',
    title: 'Connect your wallet',
    desc: 'Connect wallet with TBOOK to see your on-chain identifier.',
    button: 'Connect'
  },
  step2: {
    name: 'STEP 2',
    title: 'Sign in',
    desc: 'Verify your wallet to validate your ownership of the address.',
    button: 'Sign in'
  }
}

const ConnectWalletModal = () => {
  const showConnectWalletModal = useSelector(
    s => s.global.showConnectWalletModal
  )
  const queryClient = useQueryClient()
  const dispath = useDispatch()
  const { isConnected, address } = useAccount()
  const { pc } = useResponsive()
  const { open } = useWeb3Modal()
  const [nonce, setNonce] = useState('')
  const { signMessageAsync } = useSignMessage()
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    setLoading(true)
    try {
      const sign = await signMessageAsync({ message: nonce })
      await authenticate(address, sign)
      await queryClient.refetchQueries('userInfo')
      handleCloseModal()
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isConnected) {
      getNonce(address).then(r => {
        setNonce(() => r)
      })
    }
  }, [isConnected, address])

  const handleCloseModal = useCallback(() => {
    dispath(setLoginModal(false))
  }, [])
  console.log({ isConnected })
  return (
    <Modal
      footer={null}
      title={null}
      centered
      open={showConnectWalletModal}
      closable={pc ? true : false}
      onCancel={handleCloseModal}
    >
      <div className='text-black -mx-6'>
        <h1
          className={clsx(
            'text-base font-medium border-b px-5 pb-3 border-[#ececec] relative',
            'after:absolute after:h-0.5 after:left-0 after:bottom-0 after:bg-[#006EE9]',
            isConnected ? 'after:w-full' : 'after:w-1/2'
          )}
        >
          {pageConf.title}
        </h1>
        <div className={isConnected && 'border-[#ececec] border-b'}>
          <div className={clsx('px-5 pt-5 ', isConnected ? 'pb-4' : '')}>
            <div
              className={clsx(
                'text-base font-medium',
                isConnected ? 'text-[#A1A1A2]' : 'mb-6'
              )}
            >
              <h2>{pageConf.step1.name}</h2>
              <h2>{pageConf.step1.title}</h2>
            </div>

            {isConnected ? (
              <div>
                <p
                  className={clsx(
                    'text-[#717374] text-xs mb-6',
                    isConnected && 'text-[#A1A1A2]'
                  )}
                >
                  {pageConf.step1.desc}
                </p>
                <div className='px-4 bg-[#f8f9fa] rounded w-max h-8 flex items-center'>
                  <Paragraph
                    className='flex items-center'
                    style={{ marginBottom: 0 }}
                    copyable={{
                      text: address,
                      icon: (
                        <img
                          src={copyIcon}
                          alt='copy icon'
                          className='w-5 h-5 object-cover'
                        />
                      )
                    }}
                  >
                    <CheckOutlined style={{ color: 'green' }} />
                    <span className='font-medium text-sm ml-2 mr-1 text-[#A1A1A2]'>
                      {shortAddress(address)}
                    </span>
                  </Paragraph>
                </div>
                <button
                  onClick={disconnect}
                  className='flex items-center gap-x-1 pt-2 text-[#006EE9]'
                >
                  <img
                    src={disconnectIcon}
                    alt='disconnect'
                    className='w-2.5 h-2.5 object-center object-contain'
                  />
                  disconnect
                </button>
              </div>
            ) : (
              <Wallet
                list={categoriedWallet}
                loading={loading}
                handleClick={async () => await open()}
              />
            )}
          </div>
        </div>

        {isConnected && (
          <div className='px-5 pt-5 pb-4'>
            <div
              className={clsx(
                'text-base font-medium',
                !isConnected && 'text-[#A1A1A2]'
              )}
            >
              <h2>{pageConf.step2.name}</h2>
              <h2>{pageConf.step2.title}</h2>
            </div>
            <p
              className={clsx(
                'text-[#717374] text-xs mb-6',
                !isConnected && 'text-[#A1A1A2]'
              )}
            >
              {pageConf.step2.desc}
            </p>

            <button
              onClick={signIn}
              className='px-4 py-1 text-sm text-white bg-[#006EE9] rounded-md'
            >
              {pageConf.step2.button}{' '}
              {loading && <Spin spinning size='small' className='ml-1' />}
            </button>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ConnectWalletModal
