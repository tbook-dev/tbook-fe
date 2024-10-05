import { useCallback, useMemo } from 'react';
import { Tooltip } from 'antd';
import useUserInfo from '@/hooks/useUserInfoQuery';
import walletGrayIcon from '@/images/icon/wallet-gray.svg';
import useSocial from '@/hooks/useSocial';
import { useDispatch } from 'react-redux';
import { setConnectWalletModal } from '@/store/global';
import {
  Link,
  useLoaderData,
  useLocation,
  useParams,
} from 'react-router-dom';
import Address from '@tbook/ui/src/Address';
import suiSVG from '@/images/zklogin/sui.svg';
import tonSVG from '@/images/wallet/ton.svg';
import tonUnlockSVG from '@/images/wallet/ton-unlock.svg';
import evmUnlockSVG from '@/images/wallet/evm-unlock.svg';
import evmSVG from '@/images/wallet/evm.svg';
import passportlg from '@/images/passport/passport.png';

import passportGamebuild from '@/images/passport/passport-gamebuild.png';

import shapeLink from '@/images/shape-link.png';
import wiseScoreSVG from '@/images/icon/wise-score.svg';
import fallbackAvatarSVG from '@/images/passport/avatar.svg';
import LazyImage from '../lazyImage';
import { useTelegram } from '@/hooks/useTg';
import useTonToolkit from '@/components/ton/useTon';
import TipAddress from './TipAddress';
import clsx from 'clsx';

// const linkNoClickList = ['/ton-explore', '/wise-score', '/wise-leaderboard'];
const footprintTips = [
  'The feature to manage overall incentive campaigns and incentive assets is coming soon.',
  'For now, you could open incentive passport on any campaign page to track your footprint within certain project.',
  'Stay tuned!',
];
export default function PassportCard({ onClose }) {
  const {
    user,
    currentSocial,
    tonConnected,
    address,
    evmConnected,
    evmAddress,
    currentAddress,
    tonAddress,
    isUsingWallet,
    isZK,
  } = useUserInfo();
  const { socialList } = useSocial();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { isUsingSubdomain, projectUrl, projectId, companyId } =
    useLoaderData();

  const { isTMA, canConnectEvm } = useTelegram();
  const { openTonModalLogin, disconnectTon } = useTonToolkit();
  const zkGoogle = getZkfnByName('google');
  const handleConnectWallet = useCallback(() => {
    onClose();
    dispatch(setConnectWalletModal(true));
  }, []);
  const handleTonClick = async () => {
    onClose();
    openTonModalLogin();
  };

  const checkIsCompanyPage = () => pathname.indexOf('/company') > -1;
  const links = useMemo(() => {
    // 存在 companyId(非默认的 0 值)，只展示 asset
    if (companyId > 0) {
      return [
        {
          name: 'Incentive Assets',
          path: `/company/${companyId}/asset?type=3`,
        },
      ];
    }

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
  }, [
    pathname,
    pathname,
    projectUrl,
    companyId,
    isUsingSubdomain,
    companyId,
    isUsingSubdomain,
  ]);

  const handleDisconnectTon = () => {
    onClose();
    disconnectTon(600);
  };

  const isShowList = () => {
    const isCompanyPage = checkIsCompanyPage();
    return projectId || isCompanyPage;
  };

  const walletIconList = useMemo(() => {
    return [
      {
        render: tonConnected ? (
          <TipAddress address={tonAddress} key="evm-t">
            <img src={tonUnlockSVG} className="object-center w-5 h-5" />
          </TipAddress>
        ) : (
          <button
            onClick={handleTonClick}
            className="focus-visible:outline-none"
            key="evm-b"
          >
            <img
              src={tonUnlockSVG}
              alt="ton connect"
              className="object-center w-5 h-5"
            />
          </button>
        ),
        name: 'ton',
        connected: tonConnected,
      },
      {
        render: evmConnected ? (
          <TipAddress address={evmAddress} key="ton-t">
            <img
              src={evmUnlockSVG}
              alt="wallet connect"
              className="object-contain object-center w-6 h-6 focus-visible:outline-none"
            />
          </TipAddress>
        ) : !canConnectEvm ? (
          <Tooltip
            key="evm-tma"
            title={() => (
              <>
                <p>For now, you could bind EVM address in web browser.</p>
                <a
                  target="_blank"
                  href={`${window.location.origin}/edit-attestation`}
                  className="block underline break-all hover:text-white hover:underline"
                >
                  {window.location.origin}/edit-attestation
                </a>
              </>
            )}
          >
            <img
              src={walletGrayIcon}
              alt="wallet connect"
              className="object-contain object-center w-6 h-6 focus-visible:outline-none"
            />
          </Tooltip>
        ) : (
          <button
            key="ton-b"
            onClick={handleConnectWallet}
            className="focus-visible:outline-none"
          >
            <img
              src={walletGrayIcon}
              alt="wallet connect"
              className="object-contain object-center w-6 h-6"
            />
          </button>
        ),
        name: 'evm',
        connected: evmConnected,
      },
      {
        render: isZK ? (
          <Tooltip key={zkGoogle?.name} title={`${zkGoogle?.userName}`}>
            <img
              src={zkGoogle?.connected ? zkGoogle?.activePic : zkGoogle?.picUrl}
              className="object-contain object-center w-6 h-6"
            />
          </Tooltip>
        ) : (
          <button
            className="focus-visible:outline-none"
            key={zkGoogle.name}
            onClick={() => zkGoogle?.loginFn(false)}
          >
            <img
              src={zkGoogle?.connected ? zkGoogle?.activePic : zkGoogle?.picUrl}
              className="object-contain object-center w-6 h-6"
            />
          </button>
        ),
        name: 'google',
        connected: zkGoogle?.connected,
      },
    ];
  }, [tonConnected, evmConnected, zkGoogle]);

  return (
    <div className="flex flex-col justify-start flex-auto pt-6 pb-16 text-white lg:py-0 lg:justify-center">
      <div
        className="relative mx-auto h-[452px] w-[317px] flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            companyId === 1 ? passportGamebuild : passportlg
          })`,
        }}
      >
        <div className={clsx('mb-3', isTMA ? '' : 'invisible')}>
          {companyId === 1 ? (
            <Link
              to={`/company/${companyId}/asset?type=3`}
              style={{ backgroundImage: `url("${wiseScoreSVG}")` }}
              onClick={onClose}
              className="focus-visible:outline-none w-[135px] h-6  mx-auto bg-center bg-contain font-zen-dot text-xs flex items-center justify-center gap-x-0.5"
            >
              Build Point
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L9 3M9 3H4.5M9 3V7.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          ) : (
            <Link
              to="/wise-score"
              style={{ backgroundImage: `url("${wiseScoreSVG}")` }}
              onClick={onClose}
              className="focus-visible:outline-none w-[135px] h-6  mx-auto bg-center bg-contain font-zen-dot text-xs flex items-center justify-center gap-x-0.5"
            >
              WISE Credit
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L9 3M9 3H4.5M9 3V7.5"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>
        <div className="relative flex flex-col items-center mb-3 text-lg font-medium gap-y-5">
          <LazyImage
            fallbackSrc={fallbackAvatarSVG}
            src={user?.avatar}
            alt="passport avatar"
            className="object-center w-20 h-20 rounded-full"
          />
          <div className="space-y-2">
            <div className="text-center">
              {/* 优先展示wallet,然后就是social */}
              {isUsingWallet ? (
                <div className="flex items-center gap-x-1.5 font-zen-dot">
                  {currentAddress?.type === 'zk' && (
                    <img
                      src={suiSVG}
                      alt="zk"
                      className="object-center w-5 h-5"
                    />
                  )}
                  {currentAddress?.type === 'ton' && (
                    <img
                      src={tonSVG}
                      alt="ton"
                      className="object-center w-5 h-5"
                    />
                  )}
                  {currentAddress?.type === 'evm' && (
                    <img
                      src={evmSVG}
                      alt="evm"
                      className="object-center w-5 h-5"
                    />
                  )}
                  <Address
                    address={address}
                    className="text-xl font-zen-dot"
                    disconnect={
                      currentAddress?.type === 'ton'
                        ? handleDisconnectTon
                        : null
                    }
                    style={{
                      textShadow: '0px 0px 2px #CF0063',
                      color: currentAddress?.type === 'ton' ? '#1AC9FF' : '',
                    }}
                  />
                </div>
              ) : (
                currentSocial && (
                  <div className="flex items-center gap-x-0.5 text-[#717374] text-base">
                    {`@${currentSocial.name}`}
                    <img
                      src={
                        socialList.find((v) => v.name === currentSocial.type)
                          ?.activePic
                      }
                      className="object-center w-5 h-5"
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mb-5 space-y-2">
          <div className="relative flex items-center justify-center gap-x-3">
            {walletIconList
              .filter((v) =>
                isUsingWallet ? currentAddress?.type !== v.name : true
              )
              .map((v) => {
                return v.render;
              })}

            {socialList
              .filter((v) =>
                isUsingWallet ? true : currentSocial?.type !== v.name
              )
              .map((v) => {
                return v.connected ? (
                  <Tooltip key={v.name} title={`${v.userName}`}>
                    <img
                      src={v.connected ? v.activePic : v.picUrl}
                      className="object-contain object-center w-6 h-6"
                    />
                  </Tooltip>
                ) : (
                  <button
                    className="focus-visible:outline-none"
                    key={v.name}
                    onClick={() => v.loginFn(false)}
                  >
                    <img
                      src={v.connected ? v.activePic : v.picUrl}
                      className="object-contain object-center w-6 h-6"
                    />
                  </button>
                );
              })}
          </div>
          <Link
            to={`/edit-attestation`}
            onClick={onClose}
            className="text-[#B5859E] invisible lg:visible font-zen-dot focus-visible:outline-none group hover:text-white w-max mx-auto flex items-center gap-x-1 bg-[rgb(244,140,193)]/[0.1] px-3 py-1 rounded-xl text-xs"
          >
            Edit Identity Attestation
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 2.25L10.5 6M10.5 6L6.75 9.75M10.5 6H1.5"
                className="stroke-[#B5859E] group-hover:stroke-white"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="relative flex flex-col px-6 py-4 text-sm font-medium gap-y-1">
          {!isShowList() ? (
            <Tooltip
              title={footprintTips.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            >
              <span
                style={{ backgroundImage: `url(${shapeLink})` }}
                className="text-[#FFBCDC] h-12 w-[240px] font-medium focus-visible:outline-none flex items-center justify-center hover:text-white bg-cover backdrop-blur-sm"
              >
                Incentive Footprint
              </span>
            </Tooltip>
          ) : (
            links.map((v) => {
              return (
                <Link
                  key={v.name}
                  to={v.path}
                  style={{ backgroundImage: `url(${shapeLink})` }}
                  className="text-[#FFBCDC] h-12 w-[240px] font-medium focus-visible:outline-none flex items-center justify-center hover:text-white bg-cover backdrop-blur-sm"
                  target={isTMA ? '_self' : '_blank'}
                  onClick={onClose}
                >
                  {v.name}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
