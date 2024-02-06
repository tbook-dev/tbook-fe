import { useSelector } from 'react-redux'
import { useResponsive, useSize } from 'ahooks'
import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { setLoginModal, setConnectWalletModal } from '@/store/global'
import { loginUsingTwitterUrl } from '@/api/incentive'
import WalletWeb3Modal from './walletWeb3Modal'
import useUserInfo from '@/hooks/useUserInfoQuery'
import { useAccount, useWalletClient } from 'wagmi'
import { changeAccountSignIn, logout, preGetNonce, isIOS } from '@/utils/web3'
import suiBg from '@/images/zklogin/suibg.svg'
import metamaskSVG from '@/images/zklogin/metamask.svg'
import walletconnectSVG from '@/images/zklogin/walletconnect.svg'
import suiSVG from '@/images/zklogin/sui.svg'
import xSVG from '@/images/icon/x-white.svg'
import ActionBution from './actionButton'
import useSocial from '@/hooks/useSocial'
import Modal from './modal'
import { Tooltip } from 'antd'
import passportlg from '@/images/passport-lg.png'
import passportUnlogin from '@/images/passport-unlogin.png'
import passportleft_half from '@/images/passport/left_half.png'
import passportmiddle_half from '@/images/passport/middle_half.png'
import passportright_half from '@/images/passport/right_half.png'
import suiBlackSVG from '@/images/zklogin/sui-black.svg'
import googleBg from '@/images/zklogin/google-bg.svg'
import facebookBg from '@/images/zklogin/facebook-bg.svg'
import twitchBg from '@/images/zklogin/twitch-bg.svg'
import talkBg from '@/images/zklogin/talk-bg.svg'

import lockSVG from '@/images/lock.svg'
import Back from '../back'

const moduleConf = {
  title: 'Log in or create a wallet with',
  passport: 'Log in to unlock incentive passport',
  zkLogin: {
    name: 'zkLogin',
    bg: suiBg,
    logoBgList: [
      {
        name: 'google',
        url: googleBg,
        style: {
          left: 0,
          top: 0,
          transform: 'rotate(7deg)'
        }
      },
      {
        name: 'facebook',
        url: facebookBg,
        style: {
          left: 58,
          top: 12,
          transform: 'rotate(7deg)'
        }
      },
      {
        name: 'twitch',
        url: twitchBg,
        style: {
          right: 70,
          top: -4,
          transform: 'rotate(-6.995deg)'
        }
      },
      {
        name: 'talk',
        url: talkBg,
        style: {
          right: 5,
          top: 8,
          transform: 'rotate(0deg)'
        }
      }
    ]
  },

  wallet: [
    {
      type: 'walletconnect',
      picUrl: walletconnectSVG,
      text: 'WalletConnect'
    }
  ],

  social: [
    {
      type: 'twitter',
      picUrl: xSVG,
      text: 'Log in with X'
    }
  ]
}

const ConnectWalletModal = () => {
  const showConnectWalletModal = useSelector(
    s => s.global.showConnectWalletModal
  )
  const size = useSize(document.documentElement)
  const { zkList, getZkfnByName } = useSocial()
  const showLoginModal = useSelector(s => s.global.showLoginModal)
  const dispath = useDispatch()
  const { pc } = useResponsive()
  const [currentAddress, setCurrentAddress] = useState('')
  const { walletClient } = useWalletClient()
  const { userLogined, user } = useUserInfo()
  const [loginStep, setLoginStep] = useState(1)
  const [loginType, setLoginType] = useState(null)
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
  const handleBackToInitLogin = useCallback(() => {
    setLoginStep(1)
    setLoginType(null)
  }, [])
  const handleMainLogin = useCallback(() => {
    setLoginStep(2)
    setLoginType('zklogin')
  }, [])
  const handleOptionLogin = useCallback(() => {
    setLoginStep(2)
    setLoginType('option')
  }, [])
  const handleCloseModal = useCallback(() => {
    dispath(setLoginModal(false))
    setTimeout(handleBackToInitLogin, 1000)
  }, [])

  return (
    <>
      <Modal
        title={<div className='text-base font-zen-dot text-white'>Log in</div>}
        open={showLoginModal}
        onCancel={handleCloseModal}
      >
        <div className='flex-none px-5 py-4 space-y-6 text-white'>
          <h2 className='text-white text-sm'>
            {loginStep === 1 ? (
              moduleConf.title
            ) : (
              <Back onClick={handleBackToInitLogin} />
            )}
          </h2>
          {loginStep === 1 && (
            <div className='space-y-5 text-sm'>
              <button
                className='h-[52px] w-full rounded-lg bg-white text-black font-medium relative flex items-center justify-center gap-x-2 overflow-hidden hover:opacity-70'
                onClick={handleMainLogin}
              >
                {moduleConf.zkLogin.logoBgList.map(v => (
                  <img
                    key={v.name}
                    src={v.url}
                    style={v.style}
                    alt={`${v.name} logo`}
                    className='absolute'
                  />
                ))}
                <img
                  src={suiBlackSVG}
                  className='w-[14px] h-5'
                  alt='sui logo'
                />
                zkLogin
              </button>
              <button
                className='h-[52px] w-full rounded-lg border border-white text-white font-medium hover:opacity-70'
                onClick={handleOptionLogin}
              >
                More options
              </button>
            </div>
          )}
          {loginStep === 2 &&
            (loginType === 'zklogin' ? (
              <div className='bg-[#63A1F8] border border-[rgb(99,161,248)]/[0.40] py-4 px-5 rounded-lg relative overflow-hidden'>
                <img
                  src={moduleConf.zkLogin.bg}
                  className='w-12 absolute right-4 top-0 rotate-12'
                />
                <div className='text-white flex items-center gap-x-2 text-sm font-medium space-y-4 mb-4'>
                  <img src={suiSVG} className='w-4 h-5 object-center' />
                  {moduleConf.zkLogin.name}
                </div>
                <div className='flex items-center justify-center gap-x-8'>
                  {zkList.map(v => {
                    return v.ready ? (
                      <ActionBution
                        key={v.name}
                        replace
                        handleAsync={async () => v.loginFn(false)}
                      >
                        <img
                          src={v.picColorUrl}
                          className='w-8 h-8 object-center hover:opacity-60'
                          alt={v.name}
                        />
                      </ActionBution>
                    ) : (
                      <Tooltip title='Stay tuned' key={v.name}>
                        <img
                          src={v.picUrl}
                          className='w-8 h-8 object-center'
                          alt={v.name}
                        />
                      </Tooltip>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className='space-y-5 text-sm'>
                {moduleConf.wallet.map(v => {
                  return (
                    <button
                      onClick={() => handleWallet(v.type)}
                      key={v.type}
                      className='h-10 flex items-center justify-center relative w-full bg-white px-4 py-3 text-sm font-medium text-black rounded-lg'
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

                {moduleConf.social.map(v => {
                  return (
                    <ActionBution
                      handleAsync={() => handleSocial(v.type)}
                      key={v.type}
                      className='h-10 flex items-center justify-center relative w-full rounded-lg px-4 py-3 text-sm font-medium border border-white'
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
            ))}
        </div>

        <div className='flex-1 flex flex-col justify-start lg:pt-16'>
          <div
            className='w-full relative h-[264px] mx-auto lg:w-full lg:h-[460px] flex flex-col justify-center items-center lg:bg-cover'
            style={{
              backgroundImage: pc ? `url(${passportlg})` : null
            }}
          >
            {pc ? null : (
              <>
                <div
                  className='absolute inset-0 bg-no-repeat bg-contain bg-left-top'
                  style={{ backgroundImage: `url(${passportleft_half})` }}
                />
                {size?.width > 374 && (
                  <div
                    className='absolute inset-y-0 left-[190px] right-[184px] bg-repeat-x bg-center-top'
                    style={{
                      backgroundImage: `url(${passportmiddle_half})`,
                      backgroundSize: size?.width > 394 ? 'contain' : 'cover'
                    }}
                  />
                )}

                <div
                  className='absolute inset-0 bg-no-repeat bg-contain bg-right-top'
                  style={{ backgroundImage: `url(${passportright_half})` }}
                />
                <p className='absolute text-xs text-color3 font-zen-dot text-white top-8'>
                  incentive passport
                </p>
              </>
            )}
            <div className='relative flex flex-col justify-center items-center'>
              <img src={lockSVG} className='w-20 h-20' />
              <p className='text-xs text-center font-zen-dot text-white lg:mb-6 text-color2 max-w-[175px]'>
                {moduleConf.passport}
              </p>
            </div>
          </div>
        </div>
      </Modal>
      <WalletWeb3Modal />
    </>
  )
}

export default ConnectWalletModal
