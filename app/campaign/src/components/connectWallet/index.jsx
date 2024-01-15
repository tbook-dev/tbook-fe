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
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useAccount, useWalletClient } from 'wagmi'
import { changeAccountSignIn, logout, preGetNonce, isIOS } from '@/utils/web3'
import googleSVG from '@/images/zkLogin/google.svg'
import facebookSVG from '@/images/zkLogin/facebook.svg'
import talkSVG from '@/images/zkLogin/talk.svg'
import suiBg from '@/images/zkLogin/suibg.svg'
import metamaskSVG from '@/images/zkLogin/metamask.svg'
import walletconnectSVG from '@/images/zkLogin/walletconnect.svg'
import suiSVG from '@/images/zkLogin/sui.svg'
import xSVG from '@/images/icon/x-white.svg'
import ActionBution from './actionButton'
import useSocial from '@/hooks/useSocial'

const moduleConf = {
  zkLogin: {
    title: 'Log in or create a wallet with',
    name: 'zkLogin',
    bg: suiBg
  },

  wallet: {
    title: 'Log in with wallet',
    list: [
      {
        type: 'metamask',
        picUrl: metamaskSVG,
        text: 'Metamask'
      },
      {
        type: 'walletconnect',
        picUrl: walletconnectSVG,
        text: 'WalletConnect'
      },
      {
        type: 'sui',
        picUrl: suiSVG,
        text: 'Sui Wallet'
      }
    ]
  },
  social: {
    title: 'Log in with social account',
    list: [
      {
        type: 'twitter',
        picUrl: xSVG,
        text: 'Log in with X'
      }
    ]
  }
}

const ConnectWalletModal = () => {
  const showConnectWalletModal = useSelector(
    s => s.global.showConnectWalletModal
  )
  const { zkList, getZkfnByName } = useSocial()
  const showLoginModal = useSelector(s => s.global.showLoginModal)
  const dispath = useDispatch()
  const { pc } = useResponsive()
  const [currentAddress, setCurrentAddress] = useState('')
  const { walletClient } = useWalletClient()
  const { userLogined, user } = useUserInfo()
  const { address } = useAccount({
    onConnect ({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
      if (currentAddress == address) return
      if (currentAddress) {
        // account change
        changeAccountSignIn(address, walletClient).then(r => {
          location.href = location
        })
      } else {
        // new account connect
        if (isIOS) {
          preGetNonce(address)
        } else if (!/Mobi/i.test(window.navigator.userAgent)) {
          // const signer = await getWalletClient()
          // signLoginMetaMask(acc.address, signer)
        }
      }
    },
    onDisconnect () {
      if (userLogined && user.evm.binded) {
        logout().then(r => {
          location.href = location
        })
      }
    }
  })
  useEffect(() => {
    setCurrentAddress(address)
  }, [address, setCurrentAddress])

  const handleCloseModal = useCallback(() => {
    dispath(setLoginModal(false))
  }, [])

  const handleWallet = useCallback(type => {
    if (type === 'walletconnect') {
      dispath(setConnectWalletModal(true))
      handleCloseModal()
    }
  }, [])

  const handleSocial = useCallback(async type => {
    if (type === 'twitter') {
      await loginUsingTwitterUrl()
    }
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
          <div className='-mx-6 space-y-8 p-5'>
            {/* zkLogin */}
            <div className='space-y-5'>
              <h2 className='text-white text-xs font-medium'>
                {moduleConf.zkLogin.title}
              </h2>
              <div className='bg-[rgb(4,32,76)] p-4 rounded-lg relative space-y-3 overflow-hidden'>
                <img
                  src={moduleConf.zkLogin.bg}
                  className='w-12 absolute right-4 top-0 rotate-12'
                />
                <div className='text-[#63A1F8] flex items-center gap-x-2 text-sm font-medium'>
                  <img src={suiSVG} className='w-5 h-5 object-center' />
                  {moduleConf.zkLogin.name}
                </div>
                <div className='flex items-center justify-center gap-x-8'>
                  {zkList.map(v => {
                    return (
                      <ActionBution
                        key={v.name}
                        replace
                        handleAsync={async () => v.loginFn(false)}
                      >
                        <img
                          src={v.picUrl}
                          className='w-8 h-8 object-center'
                          alt={v.name}
                        />
                      </ActionBution>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* wallet */}
            <div className='space-y-5'>
              <h2 className='text-white text-xs font-medium'>
                {moduleConf.wallet.title}
              </h2>

              <div className='space-y-5'>
                {moduleConf.wallet.list.map(v => {
                  return (
                    <button
                      onClick={() => handleWallet(v.type)}
                      key={v.type}
                      className='h-[52px] flex items-center justify-center relative w-full bg-[rgba(255,255,255,0.05)] rounded-lg px-4 py-3 text-sm font-medium'
                    >
                      <img
                        src={v.picUrl}
                        className='w-5 h-5 object-center absolute left-4'
                        alt={v.type}
                      />
                      {v.text}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* social */}
            <div className='space-y-5'>
              <h2 className='text-white text-xs font-medium'>
                {moduleConf.social.title}
              </h2>

              <div className='flex items-center justify-center gap-x-8'>
                {moduleConf.social.list.map(v => {
                  return (
                    <ActionBution
                      handleAsync={() => handleSocial(v.type)}
                      key={v.type}
                      className='h-[52px] flex items-center justify-center relative w-full bg-[rgba(255,255,255,0.05)] rounded-lg px-4 py-3 text-sm font-medium'
                    >
                      <img
                        src={v.picUrl}
                        className='w-5 h-5 object-center absolute left-4'
                        alt={v.type}
                      />
                      {v.text}
                    </ActionBution>
                  )
                })}
              </div>
            </div>
          </div>
        </Modal>
      )}
      <WalletWeb3Modal />
    </>
  )
}

export default ConnectWalletModal
