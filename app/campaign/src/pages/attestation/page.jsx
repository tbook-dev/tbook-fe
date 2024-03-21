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

export default function PageAttestation () {
  const { user, data, isLoading } = useUserInfoQuery();
  const { socialList } = useSocial();
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState({
    accountName: '',
    accountType: '',
  });
  const onChainConf = useMemo(() => {
    const isEvm = !!user?.evm?.evmWallet;
    // const isZk = !!user?.zk?.address;
    return [
      {
        name: 'EVM Chain',
        label: <span>EVM Chain</span>,
        render: isEvm ? (
          <div className='flex px-5 py-2 bg-[#1A1A1A] rounded-2.5xl'>
            <Address address={user?.evm?.evmWallet} />
          </div>
        ) : (
          <button>connect wallet</button>
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
  }, [socialList]);

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
