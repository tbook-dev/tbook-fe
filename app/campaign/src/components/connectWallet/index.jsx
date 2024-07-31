import { useSelector } from 'react-redux';
import { useResponsive } from 'ahooks';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setLoginModal, setConnectWalletModal } from '@/store/global';
import { loginUsingTwitterUrl } from '@/api/incentive';
import WalletWeb3Modal from './walletWeb3Modal';
import ActionBution from './actionButton';
import useSocial from '@/hooks/useSocial';
import walletconnectSVG from '@/images/zklogin/walletconnect.svg';
import xSVG from '@/images/icon/x-white.svg';
import ActionButton from './actionButton';
import Modal from './modal';
import {
  useTonConnectUI,
  useTonWallet,
  TonConnectButton,
  useTonConnectModal,
  useTonAddress,
} from '@tonconnect/ui-react';
import useTonLogin from '@/hooks/useTonLogin';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import tonSVG from '@/images/icon/ton.svg';
import tgSVG from '@/images/icon/tg-blue.svg';
import { Tooltip } from 'antd';
import passport_locked_h5 from '@/images/passport/passport_locked_h5.png';
import WalletSelectModal from './walletSelect';
import { walletMap } from '@/utils/logType';
import { useMemo } from 'react';
import { useTelegram } from '@/hooks/useTg';

const moduleConf = {
  title: 'Log in or create a wallet with',
  passport: 'Log in to unlock incentive passport',
  ...walletMap,
  platform: {
    tma: [
      [
        {
          type: 'telegram',
          picUrl: tgSVG,
          text: 'Log in with Telegram',
        },
        {
          type: 'tonWallet',
          picUrl: tonSVG,
          text: 'TON Connect',
        },
        {
          type: 'moreOptions',
          picUrl: null,
          text: 'More Options',
        },
      ],
      [
        {
          type: 'walletconnect',
          picUrl: walletconnectSVG,
          text: 'WalletConnect',
        },
        {
          type: 'twitter',
          picUrl: xSVG,
          text: 'Log in with X',
        },
      ],
    ],
    web: [
      [
        {
          type: 'walletconnect',
          picUrl: walletconnectSVG,
          text: 'WalletConnect',
        },
        {
          type: 'tonWallet',
          picUrl: tonSVG,
          text: 'TON Connect',
        },
        {
          type: 'twitter',
          picUrl: xSVG,
          text: 'Log in with X',
        },
      ],
    ],
  },
};

const ConnectWalletModal = () => {
  const { contextHolder } = useTonLogin();
  const { open } = useTonConnectModal();
  const { zkList } = useSocial();
  const showLoginModal = useSelector((s) => s.global.showLoginModal);
  const dispath = useDispatch();
  const [tonConnectUI] = useTonConnectUI();
  const { pc } = useResponsive();

  const { refetch } = useUserInfoQuery();
  const { isTMA, tgLogin } = useTelegram();

  const handleTonClick = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (e) {
      console.log(e);
    }
    open();
    handleCloseModal();
  };

  const handleButtonClick = useCallback(async (v) => {
    if (v.type === 'telegram') {
      await tgLogin();
      await refetch();
      handleCloseModal();
    } else if (v.type === 'tonWallet') {
      await handleTonClick();
    } else if (v.type === 'moreOptions') {
      setLoginStep(2);
    } else if (v.type === 'walletconnect') {
      dispath(setConnectWalletModal(true));
      handleCloseModal();
    } else if (v.type === 'twitter') {
      await loginUsingTwitterUrl();
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    dispath(setLoginModal(false));
  }, []);

  const stageOneList = useMemo(() => {
    return isTMA ? moduleConf.platform.tma[0] : moduleConf.platform.web[0];
  }, [isTMA]);
  const stageTwoList = useMemo(() => {
    return isTMA
      ? moduleConf.platform.tma[1]
      : moduleConf.platform.web[1] ?? [];
  }, [isTMA]);

  // console.log({ stageOneList, stageTwoList });
  return (
    <>
      <Modal
        title={<div className="text-base font-zen-dot text-white">Log in</div>}
        open={showLoginModal}
        onCancel={handleCloseModal}
      >
        <div className="flex-none px-5 py-4 space-y-6 text-white pb-[256px] lg:pb-0">
          <h2 className="text-white text-sm">{moduleConf.title}</h2>
          <div className="space-y-5 text-sm">
            <div className="bg-[#63A1F8] border border-[rgb(99,161,248)]/[0.40] py-4 px-5 rounded-lg relative overflow-hidden">
              <img
                src={moduleConf.zkLogin.bg}
                className="w-12 absolute right-4 top-0 rotate-12"
              />
              <div className="text-white flex items-center gap-x-2 text-sm font-medium space-y-4 mb-4">
                <img
                  src={moduleConf.zkLogin.icon}
                  className="w-4 h-5 object-center"
                />
                {moduleConf.zkLogin.name}
              </div>
              <div className="flex items-center justify-center gap-x-8">
                {zkList.map((v) => {
                  return v.ready ? (
                    <ActionBution
                      key={v.name}
                      replace
                      handleAsync={async () => v.loginFn(false)}
                    >
                      <img
                        src={v.picColorUrl}
                        className="w-8 h-8 object-center hover:opacity-70"
                        alt={v.name}
                      />
                    </ActionBution>
                  ) : (
                    <Tooltip title="Stay tuned" key={v.name}>
                      <img
                        src={v.picUrl}
                        className="w-8 h-8 object-center"
                        alt={v.name}
                      />
                    </Tooltip>
                  );
                })}
              </div>
            </div>
            <div className="space-y-5 text-sm font-medium">
              {stageOneList.map((v) => {
                return (
                  <ActionButton
                    handleAsync={() => handleButtonClick(v)}
                    key={v.type}
                    className="hover:opacity-70 h-10 flex items-center justify-center relative w-full px-4 py-3 rounded-lg bg-white text-black last:border last:border-white last:bg-transparent last:text-white"
                  >
                    {v.picUrl && (
                      <img
                        src={v.picUrl}
                        className="w-5 h-5 object-center absolute left-4"
                        alt={v.type}
                      />
                    )}

                    {v.text}
                  </ActionButton>
                );
              })}
            </div>
          </div>
        </div>

        {!pc && (
          <div className="absolute bottom-0 left-0 w-full h-[216px]">
            <img
              src={passport_locked_h5}
              alt="passport"
              className="h-full w-[317px] mx-auto"
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
