import PassportCardPng from '@/images/passport/small-passport.png';
import fallbackAvatarSVG from '@/images/passport/avatar.svg';
import LazyImage from '../lazyImage';
import useUserInfo from '@/hooks/useUserInfoQuery';
import useSocial from '@/hooks/useSocial';
import Address from '@tbook/ui/src/Address';
import { useMemo } from 'react';
import useWallet from '@/hooks/useWallet';
import tonSVG from '@/images/wallet/ton.svg';
import tonUnlockSVG from '@/images/wallet/ton-unlock.svg';
import evmUnlockSVG from '@/images/wallet/evm-unlock.svg';
import evmSVG from '@/images/wallet/evm.svg';

const walletIconList = [
  {
    type: 'evm',
    connected: (
      <img
        src={evmUnlockSVG}
        className="w-6 h-6 object-contain object-center"
      />
    ),
    unConnected: (
      <img src={evmSVG} className="w-6 h-6 object-contain object-center" />
    ),
  },
  {
    type: 'ton',
    connected: (
      <img
        src={tonUnlockSVG}
        className="w-6 h-6 object-contain object-center"
      />
    ),
    unConnected: (
      <img src={tonSVG} className="w-6 h-6 object-contain object-center" />
    ),
  },
];

export default function SmallPassportCard() {
  const { user, currentSocial, currentAddress, isZK, isGoogle, data } =
    useUserInfo();
  const { getZkfnByName, getSocialByName, socialList } = useSocial();
  const { walletList } = useWallet();
  const {
    logo,
    userInfo,
    key: dispalyKey,
  } = useMemo(() => {
    if (currentSocial) {
      return {
        logo: (
          <img
            src={getSocialByName(currentSocial.type)?.activePic}
            alt="twitter"
            className="w-6 h-6"
          />
        ),
        key: currentSocial?.type,
        userInfo: <p>{currentSocial.name}</p>,
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
          key: 'google',
          userInfo: <p>{data?.user?.zk?.identity}</p>,
        };
      } else {
        return {
          logo: null,
          key: currentAddress?.type,
          userInfo: <Address address={currentAddress?.address} />,
        };
      }
    }
  }, [currentAddress, currentSocial, isZK, isGoogle, data]);

  return (
    <div
      className="relative w-[317px] h-[274px] py-12 flex flex-col items-center gap-y-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${PassportCardPng})` }}
    >
      <LazyImage
        fallbackSrc={fallbackAvatarSVG}
        src={user?.avatar}
        alt="passport avatar"
        className="w-20 h-20 rounded-full object-center"
      />
      <div className="text-2xl font-zen-dot text-white flex items-center gap-x-1">
        {logo}
        {userInfo}
      </div>
      <div className="flex items-center gap-x-1">
        {walletList
          .filter((v) => v.type !== dispalyKey)
          .map((wallet) => {
            const icon = walletIconList.find((v) => v.type === wallet.type);
            return (
              <div
                key={wallet.type}
                className="flex items-center gap-x-2 text-white"
              >
                {wallet.connected ? icon.connected : icon.unConnected}
              </div>
            );
          })}
        {socialList
          .filter((v) => v.name !== dispalyKey)
          .map((v) => {
            return (
              <img
                key={v.name}
                src={v.connected ? v.activePic : v.picUrl}
                className="w-6 h-6 object-contain object-center"
              />
            );
          })}
      </div>
    </div>
  );
}
