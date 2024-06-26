import { useSelector } from 'react-redux';
import { useResponsive, useSize } from 'ahooks';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginModal, setConnectWalletModal } from '@/store/global';
import { loginUsingTwitterUrl } from '@/api/incentive';
import WalletWeb3Modal from './walletWeb3Modal';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useAccount, useWalletClient } from 'wagmi';
import suiBg from '@/images/zklogin/suibg.svg';
import metamaskSVG from '@/images/zklogin/metamask.svg';
import walletconnectSVG from '@/images/zklogin/walletconnect.svg';
import suiSVG from '@/images/zklogin/sui.svg';
import xSVG from '@/images/icon/x-white.svg';
import ActionBution from './actionButton';
import useSocial from '@/hooks/useSocial';
import Modal from './modal';
import { Tooltip } from 'antd';
import {
  useTonConnectUI,
  useTonWallet,
  TonConnectButton,
  useTonConnectModal,
  useTonAddress,
} from '@tonconnect/ui-react';
import useTonLogin from '@/hooks/useTonLogin';
import { useIsConnectionRestored } from '@tonconnect/ui-react';
import suiBlackSVG from '@/images/zklogin/sui-black.svg';
import tonSVG from '@/images/icon/ton.svg';
import googleBg from '@/images/zklogin/google-bg.svg';
import facebookBg from '@/images/zklogin/facebook-bg.svg';
import twitchBg from '@/images/zklogin/twitch-bg.svg';
import talkBg from '@/images/zklogin/talk-bg.svg';
import passport_locked_h5 from '@/images/passport/passport_locked_h5.png';
import WalletSelectModal from './walletSelect';
import Back from '../back';

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
          transform: 'rotate(7deg)',
        },
      },
      {
        name: 'facebook',
        url: facebookBg,
        style: {
          left: 58,
          top: 12,
          transform: 'rotate(7deg)',
        },
      },
      {
        name: 'twitch',
        url: twitchBg,
        style: {
          right: 70,
          top: -4,
          transform: 'rotate(-6.995deg)',
        },
      },
      {
        name: 'talk',
        url: talkBg,
        style: {
          right: 5,
          top: 8,
          transform: 'rotate(0deg)',
        },
      },
    ],
  },

  tonWallet: {
    type: 'tonWallet',
    picUrl: tonSVG,
    text: 'TON Connect',
  },

  wallet: [
    {
      type: 'walletconnect',
      picUrl: walletconnectSVG,
      text: 'WalletConnect',
    },
  ],

  social: [
    {
      type: 'twitter',
      picUrl: xSVG,
      text: 'Log in with X',
    },
  ],
};

const ConnectWalletModal = () => {
  const { contextHolder } = useTonLogin();
  const showConnectWalletModal = useSelector(
    s => s.global.showConnectWalletModal
  );
  const size = useSize(document.documentElement);
  const { open } = useTonConnectModal();
  const { zkList, getZkfnByName } = useSocial();
  const showLoginModal = useSelector(s => s.global.showLoginModal);
  const dispath = useDispatch();
  const [tonConnectUI] = useTonConnectUI();
  // const connectionRestored = useIsConnectionRestored();
  const { pc } = useResponsive();
  // const { walletClient } = useWalletClient();
  // const { userLogined, user } = useUserInfo();
  // const [loginStep, setLoginStep] = useState(2);
  // // const [loginType, setLoginType] = useState(null)
  // const [loginType, setLoginType] = useState('option');
  // const [currentAddress, setCurrentAddress] = useState('');
  // const { address } = useAccount({
  //   onConnect ({ address, connector, isReconnected }) {
  //     console.log('Connected', { address, connector, isReconnected });
  //     if (currentAddress == address) return;
  //     if (currentAddress) {
  //       // account change
  //       changeAccountSignIn(address, walletClient).then(r => {
  //         location.href = location;
  //       });
  //     } else {
  //       // new account connect
  //       if (isIOS) {
  //         preGetNonce(address);
  //       } else if (!/Mobi/i.test(window.navigator.userAgent)) {
  //         // const signer = await getWalletClient()
  //         // signLoginMetaMask(acc.address, signer)
  //       }
  //     }
  //   },
  //   onDisconnect () {
  //     if (userLogined && user.evm.binded) {
  //       logout().then(r => {
  //         location.href = location;
  //       });
  //     }
  //   },
  // });

  // useEffect(() => {
  //   setCurrentAddress(address);
  // }, [address, setCurrentAddress]);

  // const handleTonClick = useCallback(() => {
  //   // alert('clicked ton!');
  //   open()
  //   console.log({state})
  // }, []);
  const handleTonClick = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (e) {
      console.log(e);
    }
    open();
    handleCloseModal();
  };

  const handleWallet = useCallback(type => {
    if (type === 'walletconnect') {
      dispath(setConnectWalletModal(true));
      handleCloseModal();
    }
  }, []);

  const handleSocial = useCallback(async type => {
    if (type === 'twitter') {
      await loginUsingTwitterUrl();
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    dispath(setLoginModal(false));
    // setTimeout(handleBackToInitLogin, 1000)
  }, []);

  return (
    <>
      <Modal
        title={<div className='text-base font-zen-dot text-white'>Log in</div>}
        open={showLoginModal}
        onCancel={handleCloseModal}
      >
        <div className='flex-none px-5 py-4 space-y-6 text-white h-[420px]'>
          <div className='space-y-5 text-sm'>
            {moduleConf.wallet.map(v => {
              return (
                <button
                  onClick={() => handleWallet(v.type)}
                  key={v.type}
                  className='h-10 hover:opacity-70 flex items-center justify-center relative w-full bg-white px-4 py-3 text-sm font-medium text-black rounded-lg'
                >
                  <img
                    src={v.picUrl}
                    className='w-5 h-5 object-center absolute left-4'
                    alt={v.type}
                  />
                  {v.text}
                </button>
              );
            })}
            <button
              className='h-10 hover:opacity-70 flex items-center justify-center relative w-full bg-white px-4 py-3 text-sm font-medium text-black rounded-lg'
              onClick={handleTonClick}
            >
              <img
                src={moduleConf.tonWallet.picUrl}
                className='w-5 h-5 object-center absolute left-4'
                alt='ton wallet logo'
              />
              {moduleConf.tonWallet.text}
            </button>

            {moduleConf.social.map(v => {
              return (
                <ActionBution
                  handleAsync={() => handleSocial(v.type)}
                  key={v.type}
                  className='h-10 hover:opacity-70 flex items-center justify-center relative w-full rounded-lg px-4 py-3 text-sm font-medium border border-white'
                >
                  <img
                    src={v.picUrl}
                    className='w-5 h-5 object-center absolute left-4'
                    alt={v.type}
                  />
                  {v.text}
                </ActionBution>
              );
            })}
          </div>
        </div>

        {!pc && (
          <div className='absolute bottom-0 left-0 w-full h-[216px]'>
            <img
              src={passport_locked_h5}
              alt='passport'
              className='h-full w-[317px] mx-auto'
            />
          </div>
        )}
      </Modal>
      {contextHolder}
      <WalletWeb3Modal />
      <WalletSelectModal />
    </>
  );
};

export default ConnectWalletModal;
