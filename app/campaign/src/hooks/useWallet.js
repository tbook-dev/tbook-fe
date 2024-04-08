import { useCallback } from 'react';
import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import { useTonConnectUI } from '@tonconnect/ui-react';

export default function useWallet() {
  const { evmConnected, tonConnected } = useUserInfoQuery();
  const dispath = useDispatch();
  const [tonConnectUI] = useTonConnectUI();

  const getWallets = useCallback(
    (typeList) => {
      return [
        {
          type: 'evm',
          connected: evmConnected,
          connectHandle: async () => {
            dispath(setConnectWalletModal(true));
          },
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
        },
      ].filter((wallet) => typeList.includes(wallet.type));
    },
    [evmConnected, tonConnected, tonConnectUI]
  );
  return {
    getWallets,
  };
}
