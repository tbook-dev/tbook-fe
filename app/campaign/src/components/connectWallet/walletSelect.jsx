import { useSelector } from 'react-redux';
import { useResponsive } from 'ahooks';
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setShowWalletConnectModal,
  setConnectWalletModal,
} from '@/store/global';
import suiBg from '@/images/zklogin/suibg.svg';
import metamaskSVG from '@/images/zklogin/metamask.svg';
import walletconnectSVG from '@/images/zklogin/walletconnect.svg';
import tonSVG from '@/images/icon/ton.svg';
import suiSVG from '@/images/zklogin/sui.svg';
import xSVG from '@/images/icon/x-white.svg';
import { Modal } from 'antd';
import suiBlackSVG from '@/images/zklogin/sui-black.svg';
import googleBg from '@/images/zklogin/google-bg.svg';
import facebookBg from '@/images/zklogin/facebook-bg.svg';
import twitchBg from '@/images/zklogin/twitch-bg.svg';
import talkBg from '@/images/zklogin/talk-bg.svg';
import {
  useTonConnectUI,
  useTonWallet,
  TonConnectButton,
  useTonConnectModal,
  useTonAddress,
} from '@tonconnect/ui-react';
import Back from '../back';
import { useIsConnectionRestored } from '@tonconnect/ui-react';
import { useTelegram } from '@/hooks/useTg';

const moduleConf = {
  title: 'Connect Wallet',
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

  walletconnect: {
    type: 'walletconnect',
    picUrl: walletconnectSVG,
    text: 'WalletConnect',
  },

  tonWallet: {
    type: 'tonWallet',
    picUrl: tonSVG,
    text: 'TON Connect',
  },
};

const WalletSelectModal = () => {
  const showWalletConnectModal = useSelector(
    s => s.global.showWalletConnectModal
  );
  const dispath = useDispatch();
  const { isTMA } = useTelegram();
  const { pc } = useResponsive();
  const [loginStep, setLoginStep] = useState(1);
  const [loginType, setLoginType] = useState('option');
  // useTonLogin();
  const { state, open, close } = useTonConnectModal();
  const connectionRestored = useIsConnectionRestored();

  const [tonConnectUI] = useTonConnectUI();

  const handleWallet = useCallback(type => {
    if (type === 'walletconnect') {
      dispath(setConnectWalletModal(true));
      handleCloseModal();
    }
  }, []);

  const handleBackToInitLogin = useCallback(() => {
    setLoginStep(1);
    setLoginType(null);
  }, []);

  const handleTonClick = async () => {
    // console.log({ tonConnectUI });
    try {
      await tonConnectUI.disconnect();
    } catch (e) {
      console.log(e);
    }
    open();
    dispath(setShowWalletConnectModal(false));
    // await tonConnectUI.disconnect();
    // tonConnectUI.modal.open();
  };
  const handleOptionLogin = useCallback(() => {
    setLoginType('option');
    setLoginStep(2);
  }, []);
  const handleCloseModal = useCallback(() => {
    dispath(setShowWalletConnectModal(false));
    setTimeout(handleBackToInitLogin, 100);
  }, []);
  const mainButton = isTMA
    ? {
        type: 'ton',
        text: moduleConf.tonWallet.text,
        pic: moduleConf.tonWallet.picUrl,
        handle: handleTonClick,
      }
    : {
        type: 'evm',
        text: moduleConf.walletconnect.text,
        pic: moduleConf.walletconnect.picUrl,
        handle: () => handleWallet('walletconnect'),
      };
  const subList = isTMA
    ? [
        {
          type: 'evm',
          text: moduleConf.walletconnect.text,
          pic: moduleConf.walletconnect.picUrl,
          handle: () => handleWallet('walletconnect'),
        },
      ]
    : [
        {
          type: 'ton',
          text: moduleConf.tonWallet.text,
          pic: moduleConf.tonWallet.picUrl,
          handle: handleTonClick,
        },
      ];
  return (
    <Modal
      title={null}
      open={showWalletConnectModal}
      footer={null}
      centered
      closable={pc ? true : false}
      onCancel={handleCloseModal}
      zIndex={10}
    >
      <div className='-mx-6'>
        <h2 className='text-base font-medium border-b px-5 pb-3 border-[#8148C6]'>
          {moduleConf.title}
        </h2>
        <div className='px-5 pt-5'>
          {loginStep === 1 && (
            <div className='space-y-5 text-sm'>
              <button
                className='h-[52px] w-full rounded-lg bg-white text-black font-medium relative flex items-center justify-center gap-x-2 overflow-hidden hover:opacity-70'
                onClick={mainButton.handle}
              >
                <img src={mainButton.pic} className='size-5' alt='logo' />
                {mainButton.text}
              </button>

              <button
                className='h-[52px] w-full rounded-lg border border-white text-white font-medium hover:opacity-70'
                onClick={handleOptionLogin}
              >
                More options
              </button>
            </div>
          )}
          {loginStep === 2 && (
            <>
              <div className='mb-6'>
                <Back onClick={handleBackToInitLogin} />
              </div>
              {loginType === 'option' && (
                <div className='space-y-5 text-sm'>
                  {subList.map(v => {
                    return (
                      <button
                        key={v.type}
                        onClick={v.handle}
                        className='h-10 hover:opacity-70 flex items-center justify-center relative w-full bg-white px-4 py-3 text-sm font-medium text-black rounded-lg'
                      >
                        <img
                          src={v.pic}
                          className='w-5 h-5 object-center absolute left-4'
                          alt={v.type}
                        />
                        {v.text}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default WalletSelectModal;
