import { useState, useCallback, useMemo } from 'react';
import useUserInfo from '@/hooks/useUserInfoQuery';
import useSocial from '@/hooks/useSocial';
import { logout } from '@/utils/web3';
import { useAccount } from 'wagmi';
import { disconnect } from '@wagmi/core';
import Address from '@tbook/ui/src/Address';
import Modal from '@/components/connectWallet/modal';
import PassportCard from '@/components/passportGen/card';
import { useTonConnectUI } from '@tonconnect/ui-react';
import fallbackAvatarSVG from '@/images/passport/avatar.svg';
import LazyImage from '@/components/lazyImage';
import { addQueryParameter, logoutRedirecrtKey } from '@/utils/tma';
import { useTelegram } from '@/hooks/useTg';

export default function Avatar() {
  const [open, setOpen] = useState(false);
  const { user, isZK, isGoogle, address, data, currentSocial, currentAddress } =
    useUserInfo();
  const { getZkfnByName, getSocialByName } = useSocial();
  const { isConnected } = useAccount();
  const [tonConnectUI] = useTonConnectUI();
  const { isTMA } = useTelegram();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const handleLogout = useCallback(async () => {
    setLogoutLoading(true);
    if (tonConnectUI.connected) {
      try {
        await tonConnectUI.disconnect();
      } catch (e) {
        console.log(e);
      }
    }
    if (isConnected) {
      await disconnect();
    }
    await logout();
    // reload page, setreload from
    const newUrl = addQueryParameter(
      location.href,
      isTMA ? logoutRedirecrtKey : 't',
      Date.now()
    );

    setLogoutLoading(false);
    window.location.href = newUrl;
  }, [isConnected, tonConnectUI, isTMA]);

  const AvatarLine = () => {
    return (
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="flex items-center gap-x-1 rounded-xl cursor-pointer"
      >
        <LazyImage
          src={user?.avatar}
          fallbackSrc={fallbackAvatarSVG}
          className="h-6 w-6 rounded-full object-center"
        />
      </div>
    );
  };
  const { logo, userInfo } = useMemo(() => {
    if (currentSocial) {
      return {
        logo: (
          <img
            src={getSocialByName(currentSocial.type)?.activePic}
            alt="twitter"
            className="w-6 h-6"
          />
        ),
        userInfo: <p>{currentSocial?.name}</p>,
      };
    } else {
      if (isZK) {
        return {
          logo: isGoogle ? (
            <img
              src={getZkfnByName('google')?.picColorUrl}
              alt="google"
              className="w-6 h-6"
            />
          ) : null,
          userInfo: <p>{data?.user?.zk?.identity}</p>,
        };
      } else {
        return {
          logo: null,
          userInfo: <Address address={currentAddress?.address} />,
        };
      }
    }
  }, [currentAddress, currentSocial, isZK, isGoogle, data]);

  return (
    <>
      <AvatarLine />
      <Modal
        title={
          <div className="text-sm font-zen-dot text-white flex items-center gap-x-1">
            {logo}
            {userInfo}
          </div>
        }
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        logout={
          isTMA ? null : (
            <div className="py-4 flex-none">
              <button
                disabled={logoutLoading}
                className="text-[#C0ABD9] flex items-center group hover:text-white gap-x-1 text-base"
                onClick={handleLogout}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1667 10.6667V7.75C14.1667 7.28587 13.9823 6.84075 13.6541 6.51256C13.3259 6.18437 12.8808 6 12.4167 6H7.75C7.28587 6 6.84075 6.18437 6.51256 6.51256C6.18437 6.84075 6 7.28587 6 7.75V18.25C6 18.7141 6.18437 19.1592 6.51256 19.4874C6.84075 19.8156 7.28587 20 7.75 20H12.4167C12.8808 20 13.3259 19.8156 13.6541 19.4874C13.9823 19.1592 14.1667 18.7141 14.1667 18.25V15.3333M16.5 15.3333L18.8333 13M18.8333 13L16.5 10.6667M18.8333 13H8.91667"
                    stroke=""
                    className="group-hover:stroke-white stroke-[#C0ABD9]"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Logout
              </button>
            </div>
          )
        }
      >
        <PassportCard
          onClose={() => {
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
}
