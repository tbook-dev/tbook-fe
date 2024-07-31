import { useCallback } from 'react';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import { useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';
import { useMemo } from 'react';

export default function useWallet() {
  const { evmConnected, tonConnected, tonAddress, evmAddress } =
    useUserInfoQuery();
  const dispath = useDispatch();
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();

  const walletList = useMemo(
    () => [
      {
        type: 'evm',
        connected: evmConnected,
        connectHandle: async () => {
          dispath(setConnectWalletModal(true));
        },
        address: evmAddress,
      },
      {
        type: 'ton',
        connected: tonConnected,
        connectHandle: async () => {
          try {
            await tonConnectUI.disconnect();
          } catch (e) {
            console.log(e);
          }
          open();
        },
        address: tonAddress,
      },
    ],
    [evmConnected, tonConnected, tonAddress, evmAddress, tonConnectUI]
  );
  const getWallets = useCallback(
    (input) => {
      const typeList = Array.isArray(input) ? input : [input];
      return typeList.map((wallet) =>
        walletList.find((listWwallet) => wallet === listWwallet.type)
      );
    },
    [walletList]
  );
  return {
    getWallets,
    walletList,
  };
}
