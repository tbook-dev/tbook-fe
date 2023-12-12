import { Modal, Divider } from 'antd'
import { useSelector } from 'react-redux'
import { useResponsive } from 'ahooks'
import walletIcon from '@/images/icon/wallet.svg'
import xIcon from '@/images/icon/x2.svg'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setLoginModal, setConnectWalletModal } from '@/store/global'
import { loginUsingTwitterUrl } from '@/api/incentive'
import WalletWeb3Modal from './walletWeb3Modal'

const pageConf = {
  title: 'Log in',
  desc: 'Connect your wallet or log in with Twitter to participate and earn.',
  divider: 'or',
  connectWallet: {
    icon: walletIcon,
    text: 'Connect Wallet'
  },
  connectTwitter: {
    icon: xIcon,
    text: 'Log in with X'
  }
}

const ConnectWalletModal = () => {
  const showConnectWalletModal = useSelector(
    s => s.global.showConnectWalletModal
  )
  const showLoginModal = useSelector(s => s.global.showLoginModal)
  const dispath = useDispatch()
  const { pc } = useResponsive()

  const handleCloseModal = useCallback(() => {
    dispath(setLoginModal(false))
  }, [])

  return (
    <>
      {showLoginModal && (
        <Modal
          footer={null}
          title={null}
          centered
          open={showLoginModal}
          closable={pc ? true : false}
          onCancel={handleCloseModal}
        >
          <div className='-mx-6'>
            <div className='border-b px-5 pb-3 border-[rgb(19,21,23)]/[0.08] space-y-2'>
              <h1 className='text-base font-medium'>{pageConf.title}</h1>
              <h2 className='text-xs text-[#C0ABD9]'>{pageConf.desc}</h2>
            </div>
            <div className='px-5 pt-5'>
              <button
                onClick={() => {
                  dispath(setConnectWalletModal(true))
                  handleCloseModal()
                }}
                className='text-black px-4 bg-white w-full h-8 rounded-md flex items-center justify-start overflow-hidden'
              >
                <img
                  src={pageConf.connectWallet.icon}
                  className='w-4 h-4 object-center'
                />
                <span className='text-center flex-auto'>
                  {pageConf.connectWallet.text}
                </span>
              </button>
              <Divider style={{ color: '#8148C6' }}>
                <span className='text-xs text-[#8148C6]'>
                  {pageConf.divider}
                </span>
              </Divider>
              <button
                onClick={loginUsingTwitterUrl}
                className='text-white px-4 border border-white w-full h-8 rounded-md flex items-center justify-start overflow-hidden'
              >
                <img
                  src={pageConf.connectTwitter.icon}
                  className='w-4 h-4 object-center'
                />
                <span className='text-center flex-auto'>
                  {pageConf.connectTwitter.text}
                </span>
              </button>
            </div>
          </div>
        </Modal>
      )}
      <WalletWeb3Modal />
    </>
  )
}

export default ConnectWalletModal
