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

const h1 = 'Get Started on TBOOK';
const h1Text = [
  'Build a collaborative community with TBOOK from now.',
  'Connect your wallet and start setting up Campaigns.',
];

const connectWalletType = {
  metaMask: 1,
  walletconnect: 2,
};
const defaultWalletStatus = {
  type: 0,
  isLoading: false,
};
window.disconnect = disconnect;
export default function Aboard() {
  const { isDisconnected, address } = useAccount();
  const navigate = useNavigate();
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
          <img src={logoSvg} className="w-8 h-8 mb-8" alt="logo" />
          <h1 className="text-5xl font-extrabold mb-4">{h1}</h1>
          {h1Text.map((v, idx) => {
            return (
              <p className="text-base font-medium" key={idx}>
                {v}
              </p>
            );
          })}

          <div className="mt-10 space-y-6">
            <Button
              className="w-full text-base font-bold text-white"
              onClick={() => clickSignIn(false)}
              loading={
                loading.type === connectWalletType.metaMask && loading.isLoading
              }
            >
              <img src={metaMask} className="mr-3 w-5 h-5 object-contain" />
              MetaMask
            </Button>
            <Button
              className="w-full text-base font-bold text-white"
              onClick={() => clickSignIn(true)}
              loading={
                loading.type === connectWalletType.walletconnect &&
                loading.isLoading
              }
            >
              <img
                src={walletconnect}
                className="mr-3 w-5 h-5 object-contain"
              />
              WalletConnect
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
