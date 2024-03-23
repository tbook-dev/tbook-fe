import useUserInfoQuery from '@/hooks/useUserInfoQuery';
import useSocial from '@/hooks/useSocial';
import Box from './box';
import Address from './Address';
import Line from './line';
import { Skeleton } from 'antd';
import LazyImage from '@/components/lazyImage';
import clsx from 'clsx';
import moduleConf from './conf';
import { useState, useCallback, useMemo } from 'react';
import UnbindModal from './unbindModal';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';

export default function PageAttestation () {
  const { user, data, isLoading } = useUserInfoQuery();
  const dispatch = useDispatch();

  const { socialList } = useSocial();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    accountName: '',
    accountType: '',
  });
  const handleConnectWallet = useCallback(() => {
    dispatch(setConnectWalletModal(true));
  }, []);

  const isMultAccount = useMemo(() => {
    return (
      [
        // user
        !!data?.user?.evm?.evmWallet,
        // tw
        !!data?.userTwitter?.connected,
        !!data?.userDc?.connected,
        !!data?.userTg?.connected,
      ].filter(Boolean).length > 1
    );
  }, [data]);
  // console.log({ isMultAccount });
  const onChainConf = useMemo(() => {
    const isEvm = !!user?.evm?.evmWallet;
    // const isZk = !!user?.zk?.address;
    const evm = moduleConf.onChainList.find(v => v.type === 'walletconnect');

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
    ];
  }, [user]);

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
                  setOpen(true);
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

  const onCancel = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setModalData({
        accountName: '',
        accountType: '',
      });
    }, 300);
  }, []);

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
      <UnbindModal
        open={open}
        onCancal={onCancel}
        modalData={{
          accountName: modalData.accountName,
          accountType: modalData.accountType,
        }}
      />
    </div>
  );
}
