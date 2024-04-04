import logoSvg from '@/images/icon/logo.svg';
import metaMask from '@/images/icon/metamask.svg';
import walletconnect from '@/images/icon/walletconnect.svg';
import Button from '@/components/button';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '@/api/incentive';
import Slide from './slide';
import { getNonce } from '@/utils/web3';
import { useAccount, useConnect, useSignMessage } from 'wagmi';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { useState, useCallback } from 'react';
import { mainnet } from 'wagmi/chains';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { disconnect, getAccount, signMessage } from '@wagmi/core';
import moduleConf from './moduleConf';
import clsx from 'clsx';
import useTonLogin from '@/hooks/useTonLogin';
import { useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';

const connectWalletType = {
  metaMask: 1,
  walletconnect: 2,
};
const defaultWalletStatus = {
  type: 0,
  isLoading: false,
};
window.disconnect = disconnect;
const networkType = {
  evm: 1,
  ton: 2,
};
export default function Aboard() {
  const [selectNetworkType, setSelectNetworkType] = useState(networkType.evm);
  const { isDisconnected, address } = useAccount();
  const navigate = useNavigate();
  const { loading: tonLoading } = useTonLogin();
  const [tonConnectUI] = useTonConnectUI();
  const { open: openTon } = useTonConnectModal();
  const { connectAsync, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { refetch, projects } = useUserInfo();
  const [loading, setLoading] = useState({
    ...defaultWalletStatus,
  });
  const { open } = useWeb3Modal();
  const enableMM = useCallback(() => {
    setLoading({ type: connectWalletType.metaMask, isLoading: true });
  }, []);
  const enableWC = useCallback(() => {
    setLoading({ type: connectWalletType.walletconnect, isLoading: true });
  }, []);
  const resetWallet = useCallback(() => {
    setLoading({ ...defaultWalletStatus });
  });
  const handleTonOpen = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (e) {
      console.log(e);
    }
    openTon();
  };
  const clickSignIn = async (useWc) => {
    // connect step1
    const loadfn = useWc ? enableWC : enableMM;
    loadfn();
    if (isDisconnected) {
      if (useWc) {
        open('ConnectWallet');
      } else if (window.ethereum) {
        await connectAsync({
          connector: connectors.find((c) => c.id == 'injected'),
          chainId: mainnet.id,
        });
      } else {
        open('ConnectWallet');
      }
    }
    // sign step2
    const { address } = getAccount();
    const nonce = await getNonce(address);
    let sign = '';
    try {
      sign = await signMessage({ message: nonce });
    } catch (error) {
      console.log('sign error--->', error);
      resetWallet();
      return;
    }
    await authenticate(address, sign);
    await refetch();
    if (projects?.length === 0) {
      navigate('/new-project');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen bg-[#121212]">
      <div className="select-none	w-1/2 overflow-hidden min-h-full relative p-12 flex flex-col justify-center">
        <Slide />
      </div>

      <div className="w-1/2  flex items-center justify-center">
        <div className="w-[560px]">
          <div className="flex items-center flex-col gap-y-4 mb-8">
            <img
              src={moduleConf.page.logo}
              className="w-10 h-10 mb-8"
              alt="logo"
            />
            <h1 className="text-2xl font-medium self-start">
              {moduleConf.page.title}
            </h1>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-base text-[#A1A1AA]">Network</h2>
              <div className="flex items-center gap-x-4 text-white text-sm">
                {[moduleConf.evm.network, moduleConf.ton.network].map((v) => {
                  return (
                    <button
                      key={v.value}
                      onClick={() => {
                        setSelectNetworkType(v.value);
                      }}
                      className={clsx(
                        'bg-gradient-to-br from-purple-500 to-pink-500 flex-auto inline-flex rounded-lg hover:opacity-70',
                        v.value === selectNetworkType && 'p-px'
                      )}
                    >
                      <span className="h-10 w-full rounded-lg bg-[#1E1E1E] inline-flex items-center justify-center gap-x-2 ">
                        <img
                          src={v.picUrl}
                          className="h-4"
                          alt="network logo"
                        />
                        {v.displayName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base text-[#A1A1AA]">Wallet</h2>
              {selectNetworkType === networkType.evm && (
                <div className="space-y-4">
                  {moduleConf.evm.connector.map((v) => {
                    return (
                      <Button
                        key={v.value}
                        className="w-full text-base font-bold text-white"
                        onClick={() => {
                          if (v.value === 1) {
                            clickSignIn(false);
                          } else if (v.value === 2) {
                            clickSignIn(true);
                          }
                        }}
                        loading={loading.type === v.value && loading.isLoading}
                      >
                        <img
                          src={v.picUrl}
                          className="mr-3 w-5 h-5 object-contain"
                        />
                        {v.displayName}
                      </Button>
                    );
                  })}
                </div>
              )}
              {selectNetworkType === networkType.ton && (
                <div className="space-y-4">
                  {moduleConf.ton.connector.map((v) => {
                    return (
                      <Button
                        key={v.value}
                        className="w-full text-base font-bold text-white"
                        onClick={handleTonOpen}
                        // loading={tonLoading}
                      >
                        <img
                          src={v.picUrl}
                          className="mr-3 w-5 h-5 object-contain"
                        />
                        {v.displayName}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
