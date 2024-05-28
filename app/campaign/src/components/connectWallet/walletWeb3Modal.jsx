import { Modal, Typography, Spin, message } from 'antd';
import { useSelector } from 'react-redux';
import { useResponsive } from 'ahooks';
import clsx from 'clsx';
import { conf } from '@tbook/utils';
import copyIcon from '@/images/icon/copy.svg';
import disconnectIcon from '@/images/icon/disconnect.svg';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  setConnectWalletModal,
  setLoginModal,
  setShowMergeAccountModal,
  setMergeAccountData,
  setUnbindAccountModal,
  setUnbindAccountData,
} from '@/store/global';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount, useSignMessage } from 'wagmi';
import { getNonce } from '@/utils/web3';
// import { useQueryClient } from 'react-query'
import { authenticate, bindEvm } from '@/api/incentive';
import { disconnect } from '@wagmi/core';
import { broadcast } from '@/utils/channel';
import useUserInfo from '@/hooks/useUserInfoQuery';
import { CheckOutlined } from '@ant-design/icons';
import { delay } from '@/utils/common';
import { changeAccountSignIn, logout, preGetNonce, isIOS } from '@/utils/web3';
const { shortAddress } = conf;
const { Paragraph } = Typography;

const pageConf = {
  title: 'Connect Wallet',
  step1: {
    name: 'STEP 1',
    title: 'Connect your wallet',
    desc: 'Connect wallet with TBOOK to see your on-chain identifier.',
    button: 'Connect',
  },
  step2: {
    name: 'STEP 2',
    title: 'Sign in',
    desc: 'Verify your wallet to validate your ownership of the address.',
    button: 'Sign in',
  },
};

const ConnectWalletModal = () => {
  const showConnectWalletModal = useSelector(
    s => s.global.showConnectWalletModal
  );
  const [messageApi, contextHolder] = message.useMessage();
  const {
    data: userData,
    evmAddress,
    refetch,
    userLogined,
    user,
  } = useUserInfo();
  // const queryClient = useQueryClient()
  const dispath = useDispatch();
  // const { isConnected, address } = useAccount()
  const { pc } = useResponsive();
  const { open } = useWeb3Modal();
  const [nonce, setNonce] = useState('');
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);

  const openMergeAccountModal = useCallback(() => {
    dispath(setShowMergeAccountModal(true));
  }, []);
  const openUnbindAccountModal = useCallback(() => {
    dispath(setUnbindAccountModal(true));
  }, []);

  const signIn = async () => {
    setLoading(true);
    try {
      // const nonce = await getNonce(address)
      const sign = await signMessageAsync({ message: nonce });
      if (userLogined && !evmAddress) {
        const r = await bindEvm(address, sign);
        const data = await r.json();
        if (data.code === 4004) {
          dispath(
            setUnbindAccountData({
              passportA: data.passportA,
              passportB: data.passportB,
            })
          );
          openUnbindAccountModal();
        } else if (data.code === 400) {
          // 400 merge
          // setShowMergeAccountModal()
          dispath(
            setMergeAccountData({
              passportA: data.passportA,
              passportB: data.passportB,
              redirect: false,
            })
          );
          openMergeAccountModal();
        } else {
          // 4004要解绑
          if (data.code != 200) {
            messageApi.error(data.message);
            setLoading(false);
            handleCloseModal();
            return;
          } else {
            await delay(100);
            await refetch();
          }
        }
      } else {
        await authenticate(address, sign);
        await delay(100);
        await refetch();
      }

      // cast the userInfo event
      broadcast('userInfo');
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const [currentAddress, setCurrentAddress] = useState('');
  const { isConnected, address } = useAccount({
    onConnect ({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected });
      if (currentAddress == address) return;
      if (currentAddress) {
        // account change
        changeAccountSignIn(address, walletClient).then(r => {
          location.href = location;
        });
      } else {
        // new account connect
        if (isIOS) {
          preGetNonce(address);
        } else if (!/Mobi/i.test(window.navigator.userAgent)) {
          // const signer = await getWalletClient()
          // signLoginMetaMask(acc.address, signer)
        }
      }
    },
    onDisconnect () {
      if (userLogined && user.evm.binded) {
        logout().then(r => {
          location.href = location;
        });
      }
    },
  });
  useEffect(() => {
    setCurrentAddress(address);
  }, [address, setCurrentAddress]);

  useEffect(() => {
    if (isConnected) {
      getNonce(address).then(r => {
        setNonce(() => r);
      });
    }
  }, [isConnected, address]);
  // console.log(nonce)

  const handleCloseModal = useCallback(() => {
    dispath(setConnectWalletModal(false));
    dispath(setLoginModal(false));
  }, []);

  return (
    <Modal
      footer={null}
      title={null}
      centered
      open={showConnectWalletModal}
      closable={pc ? true : false}
      onCancel={handleCloseModal}
    >
      <div className='-mx-6'>
        <h1 className='text-base font-medium border-b px-5 pb-3 border-[#8148C6]'>
          {pageConf.title}
        </h1>
        <div className='border-[#8148C6] border-b'>
          <div className='px-5 pt-5 pb-4'>
            <div
              className={clsx(
                'text-base font-medium',
                isConnected && 'text-[#C0ABD9]'
              )}
            >
              <h2>{pageConf.step1.name}</h2>
              <h2>{pageConf.step1.title}</h2>
            </div>
            <p
              className={clsx('text-xs mb-6', isConnected && 'text-[#C0ABD9]')}
            >
              {pageConf.step1.desc}
            </p>
            {isConnected ? (
              <div>
                <div className='rounded w-max h-8 flex items-center'>
                  <Paragraph
                    className='flex items-center'
                    style={{ marginBottom: 0 }}
                    copyable={{
                      text: address,
                      icon: [
                        <img
                          src={copyIcon}
                          alt='copy icon'
                          className='w-5 h-5 object-cover'
                        />,
                        <CheckOutlined className='text-white' />,
                      ],
                    }}
                  >
                    <span className='font-medium text-sm mr-1'>
                      {shortAddress(address)}
                    </span>
                  </Paragraph>
                </div>
                <button
                  onClick={disconnect}
                  className='flex items-center gap-x-1 pt-2'
                >
                  <img
                    src={disconnectIcon}
                    alt='disconnect'
                    className='w-2.5 h-2.5 object-center object-contain'
                  />
                  disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={async () => await open()}
                className='px-4 py-1 text-sm text-black bg-white rounded-md'
              >
                {pageConf.step1.button}
              </button>
            )}
          </div>
        </div>
        <div>
          <div className='px-5 pt-5 pb-4'>
            <div
              className={clsx(
                'text-base font-medium',
                !isConnected && 'text-[#C0ABD9]'
              )}
            >
              <h2>{pageConf.step2.name}</h2>
              <h2>{pageConf.step2.title}</h2>
            </div>
            <p
              className={clsx('text-xs mb-6', !isConnected && 'text-[#C0ABD9]')}
            >
              {pageConf.step2.desc}
            </p>
            {isConnected && (
              <button
                onClick={signIn}
                className='px-4 py-1 text-sm text-black bg-white rounded-md'
              >
                {pageConf.step2.button}{' '}
                {loading && <Spin spinning size='small' className='ml-1' />}
              </button>
            )}
          </div>
        </div>
      </div>
      {contextHolder}
    </Modal>
  );
};

export default ConnectWalletModal;
