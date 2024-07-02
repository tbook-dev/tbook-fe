import { useCallback } from 'react';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import { useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';

export default function useWallet() {
  const { evmConnected, tonConnected, tonAddress, evmAddress } =
    useUserInfoQuery();
  const dispath = useDispatch();
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();

  const getWallets = useCallback(
    (typeList) => {
      const list = [
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
      ];

      return typeList.map((wallet) =>
        list.find((listWwallet) => wallet === listWwallet.type)
      );
    },
    [evmConnected, tonConnected, tonConnectUI, tonAddress, evmAddress]
  );
  return {
    getWallets,
  };
}
