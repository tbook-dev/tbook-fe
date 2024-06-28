import clsx from 'clsx';
import useAdmins from '@/hooks/queries/useAdmins';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { notification, Skeleton, Input, Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import Button from '@/components/button';
import { useState } from 'react';
import { addAdmin, deleteAdmin } from '@/api/incentive';
import AdminItem from './AdminItem';
import { getAdminNonce } from '@/api/incentive';
import { getWalletClient } from '@wagmi/core';

const moduleConf = {
  name: 'Administrators',
  roles: [
    {
      title: 'Owner',
      desc: 'Able to modify the project setting, manage incentive campaigns, manage incentive assets and create campaigns, manage administrators.',
    },
    {
      title: 'Admin',
      desc: 'Able to modify the project setting, manage incentive campaigns, manage incentive assets and create campaigns.',
    },
  ],
  actionName: 'Add Admin',
  actionNameTip: 'Paste an address to add an admin',
  addErrorTip: 'add admin error! Please try it later!',
  addSucessTip: 'add admin sucess!',
  delSucessTip: 'del admin sucess!',
  delErrorTip: 'add admin error! Please try it later!',
};

const formatTonEQUQAdress = async address => {
  // 如果是eth地址，直接返回
  if (address?.startsWith('0x')) {
    return address;
  } else {
    const sdk = await import('https://cdn.jsdelivr.net/npm/tonweb@0.0.66/+esm');
    const TonWeb = sdk.default;
    const ton = new TonWeb();
    const isValid = TonWeb.utils.Address.isValid(address);
    if (isValid) {
      const tonAddress = new TonWeb.utils.Address(address);
      return [
        tonAddress.toString(true, true, true, false),
        tonAddress.toString(true, true, false, false),
      ].join(',');
    } else if (address.length === 64) {
      const publicKeyArr = TonWeb.utils.hexToBytes(address);
      const wallet = new ton.wallet.all['v3R1'](ton.provider, {
        publicKey: publicKeyArr,
        wc: 0,
      });
      const walletAddress = (await wallet.getAddress()).toString(
        true,
        true,
        true
      );
      const address = new TonWeb.utils.Address(walletAddress);
      return [
        address.toString(true, true, true, false),
        address.toString(true, true, false, false),
      ].join(',');
    } else {
      return address;
    }
  }
};
export default function Admins () {
  const [api, contextHolder] = notification.useNotification();

  const { projectId, address: currentUserAddress } = useUserInfo();
  const [addAdminLoading, setAddAdminLoading] = useState(false);
  const [newAdmin, setNewAdmin] = useState();
  const { data, refetch } = useAdmins();
  const ownerAddress = data?.find?.(v => v.isOwner)?.wallet;
  const isOwner = currentUserAddress === ownerAddress;
  //   console.log({ data, ownerAddress });

  const handleAddAdmin = async () => {
    const newAdmin2 = await formatTonEQUQAdress(newAdmin);
    // console.log({ newAdmin2 });
    setAddAdminLoading(true);
    try {
      const nonce = await getAdminNonce({
        projectId,
        address: newAdmin2?.toLowerCase(),
        op: 'ADD',
      });
      const signer = await getWalletClient();
      const sign = await signer.signMessage({ message: nonce.entity });
      const res = await addAdmin(projectId, newAdmin2?.toLowerCase(), sign);
      if (res.success) {
        await refetch();
        setAddAdminLoading(false);
        api.success({ message: moduleConf.addSucessTip });
        setAddAdminLoading(false);
        setNewAdmin('');
      } else {
        api.error({ message: res.message });
        setAddAdminLoading(false);
      }
    } catch (e) {
      api.error({ message: e?.shortMessage || moduleConf.addErrorTip });
      setAddAdminLoading(false);
    }
  };

  const handleMenuClick = async (action, item) => {
    try {
      if (action.key === 'delete') {
        const nonce = await getAdminNonce({
          projectId,
          address: item.wallet,
          op: 'DEL',
        });
        const signer = await getWalletClient();
        const sign = await signer.signMessage({ message: nonce.entity });
        const res = await deleteAdmin(
          projectId,
          item.wallet,
          item.isOwner,
          sign
        );
        if (res.success) {
          await refetch();
          api.success({ message: moduleConf.delSucessTip });
        } else {
          api.error({ message: res.message });
        }
      }
    } catch (e) {
      api.error({ message: e?.shortMessage || moduleConf.delErrorTip });
    }
  };

  return (
    <div className='bg-[#121212] w-full rounded-xl'>
      <div
        className={clsx(
          'py-4 px-5 text-[18px] font-medium',
          'border-b border-b-1'
        )}
      >
        <div className='flex items-center gap-x-1 text-[#F0F0F0]'>
          {moduleConf.name}
          <Popover
            content={
              <div className='w-[485px] space-y-4'>
                {moduleConf.roles.map(role => {
                  return (
                    <div className='text-sm space-y-0.5' key={role.title}>
                      <h2 className='font-medium text-white'>{role.title}</h2>
                      <p className='text-[#A1A1A2]'>{role.desc}</p>
                    </div>
                  );
                })}
              </div>
            }
            className='cursor-pointer'
          >
            <InfoCircleOutlined className='text-[#A1A1A2] hover:text-white' />
          </Popover>
        </div>
      </div>
      <div>
        <div className='text-base text-[#A1A1A2]'>
          {!data ? (
            <div className='px-5 py-4'>
              <Skeleton />
            </div>
          ) : (
            <div className='space-y-4'>
              {data?.map?.((v, idx) => {
                return (
                  <AdminItem
                    key={v.userId}
                    name={'Admin' + (idx + 1)}
                    item={v}
                    handleMenuClick={handleMenuClick}
                    isOwner={isOwner}
                  />
                );
              })}
            </div>
          )}
        </div>
        {isOwner && (
          <div className='text-[#A1A1A2] px-5 py-4 text-base border-t border-b-1 flex items-center justify-between'>
            <div className='flex items-center gap-x-1 flex-none'>
              {moduleConf.actionName}
              <Popover
                content={moduleConf.actionNameTip}
                className='cursor-pointer'
              >
                <InfoCircleOutlined className='text-[#A1A1A2] hover:text-white' />
              </Popover>
            </div>
            <Input
              value={newAdmin}
              className='w-[380px]'
              placeholder={moduleConf.actionNameTip}
              onChange={e => setNewAdmin(e.target.value)}
            />
            <Button
              disabled={!newAdmin || addAdminLoading}
              type='primary'
              onClick={handleAddAdmin}
              loading={addAdminLoading}
              className='flex-none'
            >
              Save
            </Button>
          </div>
        )}
      </div>
      {contextHolder}
    </div>
  );
}
