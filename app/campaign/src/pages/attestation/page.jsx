import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import useSocial from '@/hooks/useSocial';
import Box from './box';
import Address from './address';
import Line from './line';
import { Skeleton } from 'antd';
import LazyImage from '@/components/lazyImage';
import clsx from 'clsx';
import moduleConf from './conf';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  setConnectWalletModal,
  setShowDistoryTon,
  setunbindSocialData,
  setShowUnbindSocial,
} from '@/store/global';
import {
  useTonConnectUI,
  useTonWallet,
  TonConnectButton,
  useTonConnectModal,
  useTonAddress,
} from '@tonconnect/ui-react';

export default function PageAttestation () {
  const { user, data, isLoading, isMultAccount } = useUserInfoQuery();
  const dispatch = useDispatch();
  const [tonConnectUI] = useTonConnectUI();
  const { open: openTonModal } = useTonConnectModal();
  const { socialList } = useSocial();

  const setModalData = ({ accountName, accountType }) => {
    dispatch(
      setunbindSocialData({
        accountName,
        accountType,
      })
    );
    dispatch(setShowUnbindSocial(true));
  };
  const handleTonClick = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (e) {
      console.log(e);
    }
    openTonModal();
  };
  const handleConnectWallet = useCallback(() => {
    dispatch(setConnectWalletModal(true));
  }, []);

  // console.log({ isMultAccount });
  const onChainConf = useMemo(() => {
    const ton = moduleConf.onChainList.find(v => v.type === 'tonconnect');
    const evm = moduleConf.onChainList.find(v => v.type === 'walletconnect');

    const isEvm = !!user?.evm?.evmWallet;
    // const isZk = !!user?.zk?.address;
    const isTon = !!data?.userTon?.binded;
    console.log({ isMultAccount });
    return [
      {
        name: 'EVM Chain',
        label: <span>EVM Chain</span>,
        render: isEvm ? (
          <div className='flex px-5 py-2 bg-[#1A1A1A] rounded-2.5xl'>
            <Address address={user?.evm?.evmWallet} />
          </div>
        ) : (
          <button
            className='h-10 w-full rounded-lg bg-white text-black font-medium relative flex items-center justify-center gap-x-2 overflow-hidden hover:opacity-70'
            onClick={handleConnectWallet}
          >
            <img
              src={evm.picUrl}
              className='w-5 h-5 object-center absolute left-4'
              alt={evm.type}
            />
            {evm.text}
          </button>
        ),
      },
      {
        name: 'TON',
        label: <span>TON</span>,
        render: isTon ? (
          <div className='flex items-center gap-x-5'>
            <Address
              icon={ton.whiteSvg}
              address={data?.userTon?.address}
              className='px-5 bg-[#1A1A1A] flex  py-2 rounded-2.5xl flex-auto'
            />
            <button
              className='text-[#904BF6] text-base font-medium flex-none'
              onClick={() => {
                if (isMultAccount) {
                  setModalData({
                    accountType: 'ton',
                    accountName: data?.userTon?.address,
                  });
                } else {
                  dispatch(setShowDistoryTon(true));
                }
              }}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className='h-10 w-full rounded-lg bg-white text-black font-medium relative flex items-center justify-center gap-x-2 overflow-hidden hover:opacity-70'
            onClick={handleTonClick}
          >
            <img
              src={ton.picUrl}
              className='w-5 h-5 object-center absolute left-4'
              alt={ton.type}
            />
            {ton.text}
          </button>
        ),
      },
    ];
  }, [user, isMultAccount]);

  const avatarConf = useMemo(() => {
    const avatarUrl = data?.user?.avatar;
    return {
      name: 'Avatar',
      label: 'Avatar',
      render: (
        <LazyImage
          src={avatarUrl}
          alt='avatar'
          className='size-16 rounded-full'
        />
      ),
    };
  }, [data]);

  const socialConf = useMemo(() => {
    return socialList.map(v => {
      return {
        name: v.name,
        label: <span className='capitalize'>{v.displayName} Account</span>,
        render: v.connected ? (
          <div className='flex items-center gap-x-5'>
            <div className='flex items-center gap-x-2 w-[310px] px-5 py-2 rounded-2.5xl bg-[#1A1A1A]'>
              {moduleConf.connectedSocialConfMap[v.name]}@{v.userName}
            </div>
            {isMultAccount && (
              <button
                className='text-[#904BF6] text-base font-medium'
                onClick={() => {
                  setModalData({
                    accountType: v.name,
                    accountName: v.userName,
                  });
                }}
              >
                Disconnect
              </button>
            )}
          </div>
        ) : (
          <button
            className={clsx(
              moduleConf.unconnectSocialConfMap[v.name]?.cls,
              'flex items-center gap-x-2 w-[250px] px-5 py-2 rounded-2.5xl capitalize hover:opacity-70'
            )}
            onClick={() => v.loginFn(false)}
          >
            {moduleConf.unconnectSocialConfMap[v.name]?.pic}
            connect {v.displayName}
          </button>
        ),
      };
    });
  }, [socialList, isMultAccount]);

  return (
    <div className='w-[840px] mx-auto pb-16 py-2 text-white space-y-8'>
      <h1 className='text-2xl font-zen-dot'>{moduleConf.name}</h1>

      <div className='space-y-4'>
        <Skeleton active avatar={false} loading={isLoading}>
          <Box title={moduleConf.onChain} wrapCls='divide-y divide-[#2A2A2A]'>
            {onChainConf.map(v => {
              return <Line key={v.name} label={v.label} render={v.render} />;
            })}
          </Box>
        </Skeleton>

        <Skeleton active avatar={false} loading={isLoading}>
          <Box title={moduleConf.social} wrapCls='divide-y divide-[#2A2A2A]'>
            {[avatarConf, ...socialConf].map(v => {
              return <Line key={v.name} label={v.label} render={v.render} />;
            })}
          </Box>
        </Skeleton>
      </div>
    </div>
  );
}
