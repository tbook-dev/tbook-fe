import { useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { useDispatch } from 'react-redux';
import {
  setShowDistoryTon,
  setunbindSocialData,
  setShowUnbindSocial,
} from '@/store/global';

export default function useTonToolkit() {
  const [tonConnectUI] = useTonConnectUI();
  const { open: openTonModal } = useTonConnectModal();
  const { tonAddress, isMultAccount, tonConnected } = useUserInfo();
  const dispatch = useDispatch();

  const openTonModalLogin = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (e) {
      console.log(e);
    }
    openTonModal();
  };
  const disconnectTon = async (ms = 100) => {
    setTimeout(() => {
      if (isMultAccount) {
        dispatch(
          setunbindSocialData({
            accountName: tonAddress,
            accountType: 'ton',
          })
        );
        dispatch(setShowUnbindSocial(true));
      } else {
        dispatch(setShowDistoryTon(true));
      }
    }, ms);
  };
  return {
    tonConnected,
    tonAddress,
    openTonModalLogin,
    disconnectTon,
  };
}
