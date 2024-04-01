import logoSvg from '@/images/icon/logo.svg';
import bannerUrl from '@/images/aboard-banner.png';
import bannerBg from '@/images/aboard-bg.png';
import metaMask from '@/images/icon/metamask.svg';
import walletconnect from '@/images/icon/walletconnect.svg';
import useSignIn from '@/hooks/useSignIn';
import Button from '@/components/button';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '@/api/incentive';
import Slide from './slide';
import { getNonce } from '@/utils/web3';
import { useAccount, useSignMessage } from 'wagmi';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { useState, useCallback } from 'react';

const h1 = 'Get Started on TBOOK';
const h1Text = [
  'Build a collaborative community with TBOOK from now.',
  'Connect your wallet and start setting up Campaigns.',
];

const evmWalletType = {
  metaMask: 1,
  walletconnect: 2,
};
const defaultWalletStatus = {
  type: 0,
  isLoading: false,
};
export default function Aboard() {
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();
  const { handleSignIn } = useSignIn();
  const { signMessageAsync } = useSignMessage();
  const { refetch, projects } = useUserInfo();
  const [loading, setLoading] = useState({
    ...defaultWalletStatus,
  });
  const enableMM = useCallback(() => {
    setLoading({ type: evmWalletType.metaMask, isLoading: true });
  }, []);
  const enableWC = useCallback(() => {
    setLoading({ type: evmWalletType.walletconnect, isLoading: true });
  }, []);
  const resetWallet = useCallback(() => {
    setLoading({ ...defaultWalletStatus });
  });

  const clickSignIn = async (useWc) => {
    if (!isConnected) {
      useWc ? enableWC() : enableMM();
      try {
        await handleSignIn(useWc);
      } catch (error) {
        console.log('conect error', error);
        resetWallet();
      }
    }
    if (!address) return;
    useWc ? enableWC() : enableMM();
    const nonce = await getNonce(address);
    let sign = '';
    try {
      sign = await signMessageAsync({ message: nonce });
    } catch (error) {
      console.log('sign error', error);
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
                loading.type === evmWalletType.metaMask && loading.isLoading
              }
            >
              <img src={metaMask} className="mr-3 w-5 h-5 object-contain" />
              MetaMask
            </Button>
            <Button
              className="w-full text-base font-bold text-white"
              onClick={() => clickSignIn(true)}
              loading={
                loading.type === evmWalletType.walletconnect &&
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
