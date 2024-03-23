import { useCallback, useMemo } from 'react';
import { Tooltip } from 'antd';
import useUserInfo from '@/hooks/useUserInfoQuery';
import walletGrayIcon from '@/images/icon/wallet-gray.svg';
import useSocial from '@/hooks/useSocial';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import { Link, useLoaderData } from 'react-router-dom';
import Address from '@tbook/ui/src/Address';
import suiSVG from '@/images/zklogin/sui.svg';
import passportlg from '@/images/passport/passport.png';
import shapeLink from '@/images/shape-link.png';

export default function PassportCard ({ onClose }) {
  const { user, isZK, address, data } = useUserInfo();
  const { socialList, getZkfnByName } = useSocial();
  const dispatch = useDispatch();
  const { isUsingSubdomain, projectUrl } = useLoaderData();
  const handleConnectWallet = useCallback(() => {
    onClose();
    dispatch(setConnectWalletModal(true));
  }, []);

  const links = useMemo(() => {
    return [
      {
        name: 'Incentive Campaigns',
        path: `${isUsingSubdomain ? '' : `/${projectUrl}`}/campaign`,
      },
      {
        name: 'Incentive Assets',
        path: `${isUsingSubdomain ? '' : `/${projectUrl}`}/asset`,
      },
    ];
  }, [projectUrl]);

  const isUsingWallet = useMemo(() => {
    return Boolean(address);
  }, [address]);

  return (
    <div className='flex-auto flex flex-col justify-start pb-16 pt-6 lg:py-0 lg:justify-center text-white'>
      <div
        className='relative mx-auto  h-[452px] w-[317px] flex flex-col justify-center items-center bg-cover bg-center'
        style={{ backgroundImage: `url(${passportlg})` }}
      >
        <div className='absolute  inset-x-0 top-10'>
          <Link
            to={
              isUsingSubdomain
                ? `/edit-attestation`
                : `/${projectUrl}/edit-attestation`
            }
            className='text-[#B5859E] focus-visible:outline-none group hover:text-white w-max mx-auto flex items-center gap-x-1 bg-[rgb(244,140,193)]/[0.1] px-3 py-1 rounded-xl text-sm'
          >
            Edit Attestation
            <svg
              width='12'
              height='13'
              viewBox='0 0 12 13'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.25 10.25L9.75 2.75M9.75 2.75H4.125M9.75 2.75V8.375'
                className='stroke-[#B5859E] group-hover:stroke-white'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>
        <div className='relative flex flex-col items-center gap-y-5  text-lg font-medium mb-3'>
          <img
            src={user?.avatar}
            className='w-20 h-20 rounded-full object-center'
          />
          <div className='text-center'>
            {/* 优先展示wallet,然后就是tw */}
            {isUsingWallet ? (
              <div className='flex items-center gap-x-1.5 font-zen-dot'>
                {isZK && <img src={suiSVG} className='w-5 h-5 object-center' />}
                <Address
                  address={address}
                  className='font-zen-dot text-xl'
                  style={{ textShadow: '0px 0px 2px #CF0063' }}
                />
              </div>
            ) : (
              data?.userTwitter?.connected && (
                <div className='flex items-center gap-x-0.5 text-[#717374] text-base'>
                  {`@${data?.userTwitter?.twitterUserName}`}
                  <img
                    src={socialList.find(v => v.name === 'twitter')?.activePic}
                    className='w-5 h-5 object-center'
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className='relative flex items-center justify-center gap-x-3 pb-5'>
          {!isUsingWallet && (
            <button
              onClick={handleConnectWallet}
              className='focus-visible:outline-none'
            >
              <img
                src={walletGrayIcon}
                alt='wallet connect'
                className='w-6 h-6 object-contain object-center'
              />
            </button>
          )}
          {
            //socialList
            // .concat(getZkfnByName("google"))
            socialList
              .filter(v => {
                if (v.name === 'twitter') {
                  return data?.userTwitter?.connected && !user?.wallet
                    ? false
                    : true;
                } else {
                  return true;
                }
              })
              .map(v => {
                return v.connected ? (
                  <Tooltip key={v.name} title={`${v.userName}`}>
                    <img
                      src={v.connected ? v.activePic : v.picUrl}
                      className='w-6 h-6 object-contain object-center'
                    />
                  </Tooltip>
                ) : (
                  <button
                    className='focus-visible:outline-none'
                    key={v.name}
                    onClick={() => v.loginFn(false)}
                  >
                    <img
                      src={v.connected ? v.activePic : v.picUrl}
                      className='w-6 h-6 object-contain object-center'
                    />
                  </button>
                );
              })
          }
        </div>
        <div className='relative flex flex-col px-6 py-4 gap-y-1 text-sm font-medium'>
          {links.map(v => {
            return (
              <Link
                key={v.name}
                to={v.path}
                style={{ backgroundImage: `url(${shapeLink})` }}
                className='text-[#FFBCDC] h-12 w-[240px] font-medium focus-visible:outline-none flex items-center justify-center hover:text-white bg-cover backdrop-blur-sm'
                target='_blank'
                onClick={onClose}
              >
                {v.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
