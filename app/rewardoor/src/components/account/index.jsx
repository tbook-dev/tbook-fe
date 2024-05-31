import { disconnect } from '@wagmi/core';
import { useAccount } from 'wagmi';
import { useState } from 'react';
// import { shortAddress } from '@tbook/utils/lib/conf'
import eth from '@/images/icon/eth.svg';
import ton2 from '@/images/icon/ton2.svg';
import useUserInfo from '@/hooks/queries/useUserInfo';
import { Popover } from 'antd';
import { logout } from '@/utils/web3';
import Address from '@tbook/ui/src/Address';
import { useTonConnectUI } from '@tonconnect/ui-react';

export default function Account () {
  const { currentAddress } = useUserInfo();
  const [tonConnectUI] = useTonConnectUI();
  const { isConnected } = useAccount();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
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

    setLogoutLoading(false);
    window.location.reload();
  };
  return (
    <div className='w-[200px] h-10 p-1 rounded-2.5xl bg-black shadow-s1 mx-auto'>
      <div className='flex items-center justify-between h-full'>
        <div className='flex'>
          {currentAddress?.type === 'evm' && (
            <img src={eth} className='ml-2.5' />
          )}
          {currentAddress?.type === 'ton' && (
            <img src={ton2} className='ml-2.5' />
          )}

          <span className='text-sm font-bold ml-2.5'>
            <Address address={currentAddress?.address} placement='right' />
          </span>
        </div>
        <Popover
          trigger='click'
          placement='top'
          content={
            <button
              disabled={logoutLoading}
              onClick={handleLogout}
              className='lg:hover:opacity-70'
            >
              Disconnect{logoutLoading ? 'ing' : ''}
            </button>
          }
        >
          <button className='w-8 h-8 rounded-full flex justify-center items-center text-base font-bold text-c-9 bg-b-1 lg:hover:opacity-70'>
            ···
          </button>
        </Popover>
      </div>
    </div>
  );
}
